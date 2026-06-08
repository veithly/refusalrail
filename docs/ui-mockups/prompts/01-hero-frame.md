{
  "type": "UI mockup",
  "goal": "Show the five-second landing promise and route into the hero action.",
  "source": {
    "prd_section": "§ 9 / § 10 / § 11",
    "user_case": "HERO PATH",
    "route": "/"
  },
  "layout": {
    "viewport": "1920x1200",
    "main_regions": ["wordmark", "hero copy", "unsafe action card", "receipt rail"]
  },
  "style": {
    "visual_lane": "operational-dashboard",
    "palette": ["oklch(0.09 0.01 250)", "oklch(0.55 0.19 24)", "oklch(0.94 0.01 250)"],
    "hero_composition": "cockpit workbench"
  },
  "constraints": {
    "must_keep": ["Reject 1 unsafe RWA trade in 60 seconds", "NO stamp as future state"],
    "avoid": ["trading charts", "APY cards", "chat bubbles", "generic AI gradient"]
  }
}
