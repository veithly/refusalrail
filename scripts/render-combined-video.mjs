import { chromium } from "playwright";
import { mkdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const compositionPath = resolve(projectRoot, process.env.RENDER_COMPOSITION || "pitch/polish-combined/index.html");
const outVideo = resolve(projectRoot, process.env.RENDER_OUT || "pitch/recording/pitch-demo-combined.mp4");
const framesDir = resolve(projectRoot, process.env.RENDER_FRAMES_DIR || "pitch/_render-frames/combined");
const snapshotDir = resolve(projectRoot, process.env.RENDER_SNAPSHOT_DIR || "pitch/polish-combined/snapshots");

const width = Number(process.env.RENDER_WIDTH || "1920");
const height = Number(process.env.RENDER_HEIGHT || "1200");
const fps = Number(process.env.RENDER_FPS || "24");
const duration = Number(process.env.RENDER_DURATION || "86");
const frameExt = (process.env.RENDER_FRAME_EXT || "jpg").replace(/^\./, "");
const jpegQuality = Number(process.env.RENDER_JPEG_QUALITY || "92");
const frameCount = Math.ceil(duration * fps);
const snapshotTimes = (process.env.RENDER_SNAPSHOT_TIMES || "2,10,24,42,62,74,83")
  .split(",")
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value >= 0);

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: options.stdio || "inherit",
    encoding: "utf8"
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
  return result;
}

async function setCompositionTime(page, timeSec) {
  await page.evaluate(async (time) => {
    const clips = Array.from(document.querySelectorAll(".clip"));
    for (const clip of clips) {
      const start = Number(clip.getAttribute("data-start") || "0");
      const duration = Number(clip.getAttribute("data-duration") || "0");
      const active = time >= start && time < start + duration;
      clip.style.visibility = active ? "visible" : "hidden";
      clip.style.pointerEvents = active ? "auto" : "none";
    }

    const timeline = window.__timelines?.root;
    if (timeline?.seek) timeline.seek(time, false);

    const videos = Array.from(document.querySelectorAll("video.clip"));
    await Promise.all(videos.map((video) => new Promise((resolve) => {
      const start = Number(video.getAttribute("data-start") || "0");
      const duration = Number(video.getAttribute("data-duration") || "0");
      const localTime = Math.max(0, Math.min(duration, time - start));
      video.pause();
      if (time < start || time >= start + duration) {
        resolve();
        return;
      }
      if (Math.abs(video.currentTime - localTime) < 0.035 && video.readyState >= 2) {
        resolve();
        return;
      }
      const timer = window.setTimeout(resolve, 900);
      video.addEventListener("seeked", () => {
        window.clearTimeout(timer);
        resolve();
      }, { once: true });
      video.currentTime = localTime;
    })));
  }, timeSec);
}

async function main() {
  if (!existsSync(compositionPath)) throw new Error(`Missing composition: ${compositionPath}`);

  await mkdir(dirname(outVideo), { recursive: true });
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await rm(snapshotDir, { recursive: true, force: true });
  await mkdir(snapshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });
  await page.goto(pathToFileURL(compositionPath).href, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(700);

  for (let index = 0; index < frameCount; index += 1) {
    const timeSec = index / fps;
    await setCompositionTime(page, timeSec);
    const framePath = join(framesDir, `frame-${String(index + 1).padStart(5, "0")}.${frameExt}`);
    await page.screenshot({
      path: framePath,
      animations: "disabled",
      ...(frameExt === "jpg" || frameExt === "jpeg" ? { type: "jpeg", quality: jpegQuality } : {})
    });

    if (index % Math.max(1, Math.round(fps * 5)) === 0) {
      process.stdout.write(`rendered ${index + 1}/${frameCount} frames\r`);
    }
  }
  process.stdout.write(`rendered ${frameCount}/${frameCount} frames\n`);

  for (let i = 0; i < snapshotTimes.length; i += 1) {
    const frameIndex = Math.min(frameCount, Math.max(1, Math.round(snapshotTimes[i] * fps)));
    const source = join(framesDir, `frame-${String(frameIndex).padStart(5, "0")}.${frameExt}`);
    const target = join(snapshotDir, `frame-${String(i).padStart(2, "0")}-at-${snapshotTimes[i].toFixed(1)}s.png`);
    await copyFile(source, target);
  }

  await browser.close();

  run("ffmpeg", [
    "-y",
    "-framerate", String(fps),
    "-i", join(framesDir, `frame-%05d.${frameExt}`),
    "-vf", "format=yuv420p,unsharp=5:5:0.6,eq=contrast=1.04:saturation=1.08",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "17",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    outVideo
  ]);

  run("ffmpeg", [
    "-y",
    "-i", outVideo,
    "-vf", "fps=1/12,scale=480:-1,tile=4x2",
    "-frames:v", "1",
    join(snapshotDir, "contact-sheet.jpg")
  ]);

  console.log(`wrote ${outVideo}`);
  console.log(`wrote ${snapshotDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
