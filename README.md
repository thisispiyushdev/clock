# 💧 Nexviqa — Liquid Chronos & Atmospheric Weather

An ultra-modern, glassmorphic liquid clock and live weather station with interactive fluid physics, world time observatory, precision stopwatch, countdown chamber, and synthesized oceanic ambient soundscapes.

Designed and tailored for deployment on **Cloudflare Pages** and GitHub.

---

## 🌟 Key Features

### 1. 🕒 Liquid Chronos Engine
- **Triple Display Modes**: Seamlessly toggle between **Digital Fluid**, **Analog Viscous**, and **Dual Core** views.
- **Dynamic Water Level Wave**: Organic liquid undulation synchronized with the passage of time.
- **Microsecond Precision**: Millisecond counter, active 12-hour / 24-hour mode switch.
- **Planetary Metadata**: Full calendar date, Day of the Week, Day of the Year (e.g., Day 287), Week of the Year, and UTC Offset badge.
- **Minute & Day Progress Gauges**: Live liquid indicator showing exact completion percentage of the day and minute.

### 2. 🌦️ Intelligent Live Atmosphere (Weather)
- **Zero API Key Needed**: Powered by **Open-Meteo Satellite API** (completely free, open, fast, and reliable).
- **Auto GPS Detection**: Automatically detects your coordinates via browser geolocation with fallback to New Delhi.
- **Global City Search**: Instant autocomplete search for any city, state, or country on Earth.
- **Animated Liquid Weather Glyphs**: Dynamic SVGs for Clear Skies, Clouds, Rain, Thunderstorms, Snow, and Mist (with Day/Night awareness).
- **Comprehensive Atmospheric Metrics**:
  - Temperature (°C / °F instantaneous toggle)
  - Feels-like temperature
  - Humidity %
  - Wind Speed (km/h)
  - UV Index
  - Surface Atmospheric Pressure (hPa)
- **5-Day Planetary Forecast**: Highs and lows with weather condition icons for the upcoming days.

### 3. 🌊 Dynamic Liquid Fluid Canvas & Themes
- **Interactive Fluid Background**: Viscous liquid metaballs drifting organically across your viewport, reacting dynamically to mouse movement and expanding into ripple waves on click.
- **5 Liquid Color Accents**:
  - 🌊 **Ocean Cyan** (Default)
  - 💜 **Neon Violet**
  - 🌿 **Bioluminescent Emerald**
  - 🌅 **Solar Amber**
  - 🪞 **Liquid Silver / Mercury**
- Preferences automatically persisted in `localStorage`.

### 4. 🌍 Global Chronos Observatory (World Time)
- Real-time synchronous clocks for major world hubs: Tokyo, New York, London, Dubai, Paris, Sydney, Mumbai, Singapore.
- Live Day/Night indicator tags and continuous UTC master reference.

### 5. ⏱️ Fluid Stopwatch & Countdown Chamber
- **Stopwatch**: High-precision stopwatch with animated circular liquid ring and split-lap recording.
- **Countdown Chamber**: Hour/Minute/Second countdown timer with visual liquid tank drainage and Web Audio alert tone.

### 6. 🎧 Synthesized Web Audio Ambient Soundscape
- Built-in browser-synthesized **Oceanic Liquid Waves** using Web Audio API (no external sound files required!).

---

## 🚀 How to Deploy on Cloudflare Pages

### Method 1: Git Integration (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Nexviqa liquid clock and weather suite"
   git branch -M main
   git remote add origin https://github.com/thisispiyushdev/clock.git
   git push -u origin main
   ```
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository `thisispiyushdev/clock`.
4. In the build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (or leave empty)
5. Click **Save and Deploy**. Your site will be live instantly with global CDN acceleration and free SSL!

### Method 2: Direct Upload via Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy . --project-name=nexviqa-clock
```

---

## 📂 Project Structure

```
├── index.html       # Semantic HTML5 layout, glass cards, and SVGs
├── style.css        # Vanilla CSS design system, liquid animations, dark mode
├── script.js       # Clock engine, Open-Meteo weather, canvas physics & Web Audio
├── _headers         # Cloudflare Pages HTTP security and cache headers
└── README.md        # Documentation and deployment instructions
```

---

## 🛠️ Technologies Used
- **Vanilla HTML5 & Semantic Web**
- **Modern Vanilla CSS3** (Custom Properties, Glassmorphism, CSS Grid, Flexbox)
- **Vanilla Modern JavaScript (ES6+)**
- **HTML5 Canvas API & Web Audio API**
- **Open-Meteo REST API & BigDataCloud Geocoding**
- **Cloudflare Pages**
