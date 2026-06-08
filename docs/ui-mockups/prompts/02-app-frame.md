{
  "type": "UI mockup",
  "goal": "Show the primary refusal workbench before the judge click.",
  "source": {
    "prd_section": "§ 9 / § 10 / § 11",
    "user_case": "HERO PATH",
    "route": "/app"
  },
  "layout": {
    "viewport": "1920x1200",
    "main_regions": ["shock cards", "agent action card", "policy matrix", "receipt drawer"]
  },
  "style": {
    "visual_lane": "operational-dashboard",
    "palette": ["oklch(0.09 0.01 250)", "oklch(0.55 0.19 24)", "oklch(0.78 0.12 150)"],
    "hero_composition": "policy flight recorder"
  },
  "constraints": {
    "must_keep": ["MARKET_HALT", "STALE_PRICE", "MAX_EXPOSURE", "Let the agent try"],
    "avoid": ["fake feed", "wallet gate", "stock price prediction"]
  }
}
