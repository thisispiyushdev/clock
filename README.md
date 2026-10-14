# 💧 Nexviqa — Liquid Chronos, Atmosphere & Sound Studio

An ultra-modern, glassmorphic liquid clock, live weather station, and acoustic soundscapes studio featuring 18 chromatic liquid themes, 16 synthesized soundscapes with live audio visualizer, world time observatory, precision stopwatch, fluid countdown chamber, and interactive physics.

Designed and optimized for zero-config deployment on **Cloudflare Pages** and GitHub.

---

## 🌟 Key Features

### 1. 🎨 18 Curated Liquid Themes
Categorized into Cyber & Neon, Elemental & Nature, Warm & Solar, and Minimal & Stealth:
1. 🌊 **Ocean Cyan** (Default) — Deep bioluminescent oceanic blue
2. 💜 **Neon Violet** — High-voltage electric ultraviolet
3. 🌿 **Bio Emerald** — Toxic alien green luminescence
4. ☀️ **Solar Amber** — Incandescent stellar flare
5. 🪞 **Liquid Silver** — Pure reflective molten platinum
6. 🌌 **Midnight Nebula** — Deep interstellar cosmos glow
7. 🌸 **Sakura Blossom** — Delicate glowing peach blossom
8. 👑 **Imperial Gold** — Opulent warm golden radiance
9. 🩸 **Crimson Eclipse** — Dark blood moon ruby aurora
10. 🌌 **Aurora Borealis** — Mystic polar green & purple skies
11. 🕹️ **Synthwave 80s** — Outrun cybernetic retro sunset
12. 🍃 **Deep Jade** — Subtropical lush rainforest canopy
13. ❄️ **Glacial Ice** — Sub-zero crystal diamond frost
14. 🔮 **Twilight Amethyst** — Royal crystalline purple twilight
15. 🌋 **Volcanic Lava** — Molten earth basalt incandescent glow
16. 💻 **Electric Matrix** — Cybernetic high-speed terminal stream
17. 🪸 **Cyber Coral** — Tropical reef sunset gradient
18. 🕶️ **Phantom Stealth** — Dark matter obsidian & clean white

### 2. 🎧 16 Browser-Synthesized Sound Effects & Ambient Studio
Zero external audio files required! 100% synthesized through pure Web Audio API:
- 🌊 **Oceanic Waves** (Ambient tidal swell)
- 🌧️ **Soothing Rainfall** (Calm rain noise)
- ⚡ **Storm & Thunder** (Rolling thunder with storm drops)
- 💧 **Liquid Water Droplet** (Resonant authentic fluid bloop)
- 🔔 **Zen Tibetan Bowl** (432Hz harmonic singing bowl)
- 🕰️ **Vintage Clock Tick** (Mechanical double woodblock tick)
- 🌌 **Cosmic Deep Space** (Sub-bass brownian drone)
- 🪵 **Campfire Embers** (Warm crackling timber embers)
- 🐦 **Morning Birdsong** (Gentle forest sunrise chirps)
- 📻 **Retro Synth Chime** (80s major 7th synth arpeggio)
- 🎧 **Alpha Focus 10Hz** (Binaural beat for deep mental flow)
- 🧘 **Meditation Gong 528Hz** (Pure restorative solfeggio tone)
- 🫧 **Underwater Bubbles** (Effervescent rising liquid bubbles)
- 💨 **Mountain Breeze** (Alpine resonant wind sweeps)
- 🛸 **Cyber HUD Radar** (Sci-fi telemetry pulse & scan)
- 🏞️ **Crystal River Creek** (Fast flowing mountain spring water)
- **Interactive UI Click Sounds**: Optional droplet feedback on clicks.
- **Clock Second Tick Tone**: Optional wood tick on every second.
- **Live Audio Visualizer**: Real-time frequency bar canvas.

### 3. 🕒 Liquid Chronos Engine
- **Triple Display Modes**: Digital Fluid, Analog Viscous, and Dual Core.
- **Dynamic Wave Tank**: Organic liquid undulation synchronized with time.
- **Microsecond Precision**: Millisecond counter, active 12-hour / 24-hour mode switch.
- **Planetary Metadata**: Full calendar date, Day of week, Day of year, Week number, and local UTC offset.
- **Minute & Day Gauges**: Live liquid indicator showing progress percentage.

### 4. 🌦️ Intelligent Live Atmosphere (Weather)
- **Zero API Key Needed**: Powered by **Open-Meteo Satellite API** (free, open, fast, and reliable).
- **Auto GPS Detection**: Automatically detects coordinates via browser geolocation with fallback to New Delhi.
- **Global City Search**: Autocomplete search for any city in the world.
- **Animated Weather Glyphs**: Dynamic SVGs for Clear Skies, Clouds, Rain, Thunderstorms, Snow, and Mist (with Day/Night awareness).
- **Atmospheric Metrics**: Temperature (°C / °F toggle), Feels-like, Humidity, Wind Speed, UV Index, Surface Pressure, and 5-Day Outlook.

### 5. ⚙️ Clock & Display Options Drawer
- Toggle Milliseconds display
- Toggle Seconds display
- Toggle Minute/Day progress track
- Toggle Liquid wave tank
- Typography picker (Outfit Modern, Space Grotesk, Syne Geometric)
- Liquid Canvas density (Battery Saver, Fluid Standard, Ultra Liquid)
- Master Volume slider & reset to defaults

### 6. 🌍 World Clock Observatory, Stopwatch & Countdown Timer
- Live synchronized clocks for Tokyo, New York, London, Dubai, Paris, Sydney, Mumbai, Singapore.
- Millisecond precision stopwatch with circular liquid ring & lap recording.
- Visual fluid draining countdown chamber with Web Audio chime.

---

## 🚀 How to Deploy on Cloudflare Pages

### Method 1: Git Integration (Recommended)
1. Commit and push:
   ```bash
   git add .
   git commit -m "feat: 18 liquid themes and 16 soundscapes studio"
   git push origin main
   ```
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository `thisispiyushdev/clock`.
4. Leave build command and output directory empty.
5. Click **Save and Deploy**.

---

## 📂 Project Structure

```
├── index.html       # Layout, 18 themes modal, 16 soundscapes studio, options drawer
├── style.css        # 18 liquid themes CSS, glassmorphism, responsive styles
├── script.js        # Clock engine, 16 Web Audio synthesizers, Open-Meteo weather
├── _headers         # Cloudflare Pages security and cache headers
└── README.md        # Documentation
```
