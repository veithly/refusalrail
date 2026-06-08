{
  "type": "UI mockup",
  "goal": "Show mobile QR first-run path with two taps to the hero action.",
  "source": {
    "prd_section": "§ 9 / § 10 / § 11",
    "user_case": "HERO PATH",
    "route": "/app"
  },
  "layout": {
    "viewport": "390x844",
    "main_regions": ["compact wordmark", "shock selector", "single run button", "latest receipt"]
  },
  "style": {
    "visual_lane": "operational-dashboard",
    "palette": ["oklch(0.09 0.01 250)", "oklch(0.55 0.19 24)", "oklch(0.94 0.01 250)"],
    "hero_composition": "mobile receipt-first workbench"
  },
  "constraints": {
    "must_keep": ["two taps to refusal", "receipt visible after action"],
    "avoid": ["small unreadable hashes", "horizontal overflow", "hidden CTA"]
  }
}
