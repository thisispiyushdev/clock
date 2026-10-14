/**
 * ============================================================================
 * NEXVIQA — LIQUID CHRONOS & ATMOSPHERE ENGINE
 * Real-time clock, dynamic liquid canvas, live weather station, world time,
 * stopwatch, fluid timer & Web Audio ambient soundscapes.
 * ============================================================================
 */

(function () {
  'use strict';

  // --- STATE CONFIGURATION ---
  const state = {
    is24Hour: localStorage.getItem('nexviqa_24h') !== 'false',
    clockMode: 'digital', // 'digital', 'analog', 'split'
    tempUnit: localStorage.getItem('nexviqa_unit') || 'C', // 'C' or 'F'
    theme: localStorage.getItem('nexviqa_theme') || 'ocean',
    currentWeather: null,
    currentLocation: {
      name: 'New Delhi',
      country: 'India',
      lat: 28.6139,
      lon: 77.2090
    },
    audio: {
      ctx: null,
      isPlaying: false,
      nodes: []
    },
    stopwatch: {
      running: false,
      startTime: 0,
      elapsedTime: 0,
      timerId: null,
      laps: []
    },
    timer: {
      running: false,
      totalSeconds: 300,
      remainingSeconds: 300,
      intervalId: null
    }
  };

  // --- DOM SELECTORS ---
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Clock DOM
  const hoursEl = $('hours');
  const minutesEl = $('minutes');
  const secondsEl = $('seconds');
  const ampmEl = $('ampm');
  const msecEl = $('milliseconds');
  const dateEl = $('calendar-date');
  const dayOfWeekTag = $('day-of-week-tag');
  const dayOfYearTag = $('day-of-year-tag');
  const weekNumberTag = $('week-number-tag');
  const timezoneTag = $('timezone-name-tag');
  const utcOffsetBadge = $('utc-offset-badge');
  const secondProgressBar = $('second-progress-bar');
  const secondRatio = $('second-ratio');
  const dayPercentEl = $('day-percent');
  const digitalView = $('digital-view');
  const analogView = $('analog-view');
  const analogHour = $('analog-hour');
  const analogMinute = $('analog-minute');
  const analogSecond = $('analog-second');
  const dialMarks = $('dial-marks');

  // Weather DOM
  const weatherCityEl = $('weather-city');
  const weatherCountryEl = $('weather-country');
  const currentTempEl = $('current-temp');
  const weatherDescEl = $('weather-desc');
  const feelsLikeValEl = $('feels-like-val');
  const humidityValEl = $('humidity-val');
  const windValEl = $('wind-val');
  const uvValEl = $('uv-val');
  const pressureValEl = $('pressure-val');
  const weatherIconContainer = $('weather-icon-container');
  const forecastContainer = $('forecast-days-container');
  const btnCelsius = $('btn-celsius');
  const btnFahrenheit = $('btn-fahrenheit');
  const btnGeolocate = $('btn-geolocate');
  const citySearchForm = $('city-search-form');
  const citySearchInput = $('city-search-input');
  const searchSuggestions = $('search-suggestions');

  // Navigation & Theme DOM
  const navButtons = $$('.nav-btn');
  const tabPanes = $$('.tab-pane');
  const formatToggle = $('format-toggle');
  const formatIndicator = $('format-indicator');
  const themeBtn = $('theme-btn');
  const themeMenu = $('theme-menu');
  const soundscapeToggle = $('soundscape-toggle');
  const soundLabel = soundscapeToggle.querySelector('.sound-label');

  // Stopwatch DOM
  const swDisplay = $('sw-display');
  const swStatus = $('sw-status');
  const swRingProgress = $('stopwatch-ring-progress');
  const swStartBtn = $('sw-start-btn');
  const swLapBtn = $('sw-lap-btn');
  const swResetBtn = $('sw-reset-btn');
  const swLapsWrapper = $('sw-laps-wrapper');
  const swLapList = $('sw-lap-list');

  // Timer DOM
  const timerFill = $('timer-fill');
  const timerInputsGroup = $('timer-inputs-group');
  const timerActiveDisplay = $('timer-active-display');
  const timerH = $('timer-h');
  const timerM = $('timer-m');
  const timerS = $('timer-s');
  const timerToggleBtn = $('timer-toggle-btn');
  const timerResetBtn = $('timer-reset-btn');
  const presetPills = $$('.preset-pill');

  // Canvas
  const canvas = $('liquid-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const fpsCounter = $('fps-counter');

  // ==========================================================================
  // 1. THEME ENGINE & UI CONTROLS
  // ==========================================================================
  function applyTheme(themeName) {
    state.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('nexviqa_theme', themeName);

    const themeLabel = themeBtn.querySelector('.theme-name');
    if (themeLabel) {
      const titles = {
        ocean: 'Ocean',
        neon: 'Neon',
        emerald: 'Bio Green',
        solar: 'Solar',
        mercury: 'Silver'
      };
      themeLabel.textContent = titles[themeName] || 'Theme';
    }
  }

  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    themeMenu.classList.remove('show');
    searchSuggestions.style.display = 'none';
  });

  $$('.theme-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      applyTheme(opt.dataset.theme);
      themeMenu.classList.remove('show');
    });
  });

  // 12h/24h toggle
  function updateFormatUI() {
    formatIndicator.textContent = state.is24Hour ? '24H' : '12H';
    localStorage.setItem('nexviqa_24h', state.is24Hour);
  }

  formatToggle.addEventListener('click', () => {
    state.is24Hour = !state.is24Hour;
    updateFormatUI();
  });

  // Tab Navigation
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      navButtons.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = $(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('active');

      if (btn.dataset.tab === 'world-view') {
        renderWorldClocks();
      }
    });
  });

  // Clock Mode Switching (Digital / Analog / Split)
  const modePills = $$('.mode-pill');
  modePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      modePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      if (pill.id === 'btn-mode-digital') {
        state.clockMode = 'digital';
        digitalView.style.display = 'flex';
        analogView.style.display = 'none';
      } else if (pill.id === 'btn-mode-analog') {
        state.clockMode = 'analog';
        digitalView.style.display = 'none';
        analogView.style.display = 'flex';
      } else if (pill.id === 'btn-mode-split') {
        state.clockMode = 'split';
        digitalView.style.display = 'flex';
        analogView.style.display = 'flex';
      }
    });
  });

  // Build analog dial marks (12 major, 48 minor)
  function buildDialMarks() {
    if (!dialMarks) return;
    dialMarks.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const tick = document.createElement('div');
      tick.className = i % 5 === 0 ? 'dial-tick major' : 'dial-tick';
      tick.style.transform = `rotate(${i * 6}deg)`;
      dialMarks.appendChild(tick);
    }
  }
  buildDialMarks();

  // ==========================================================================
  // 2. LIQUID CLOCK ENGINE
  // ==========================================================================
  function padZero(num, digits = 2) {
    return String(num).padStart(digits, '0');
  }

  function getDayOfYear(now) {
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function getWeekNumber(now) {
    const target = new Date(now.valueOf());
    const dayNr = (now.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / (7 * 24 * 3600 * 1000));
  }

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // 12/24 hour display
    let ampmStr = 'AM';
    if (!state.is24Hour) {
      ampmStr = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      ampmEl.style.display = 'inline-block';
    } else {
      ampmEl.style.display = 'none';
    }

    hoursEl.textContent = padZero(hours);
    minutesEl.textContent = padZero(minutes);
    secondsEl.textContent = padZero(seconds);
    ampmEl.textContent = ampmStr;
    msecEl.textContent = '.' + padZero(Math.floor(milliseconds / 10));

    // Progress Bar (current minute progress)
    const secProgress = ((seconds + milliseconds / 1000) / 60) * 100;
    secondProgressBar.style.width = `${secProgress}%`;
    secondRatio.textContent = `${padZero(seconds)} / 60s`;

    // Percentage of day completed
    const daySeconds = now.getHours() * 3600 + minutes * 60 + seconds;
    const dayRatio = ((daySeconds / 86400) * 100).toFixed(1);
    dayPercentEl.textContent = `${dayRatio}% of day completed`;

    // Analog Hands calculation
    const smoothSeconds = seconds + milliseconds / 1000;
    const secondDeg = smoothSeconds * 6;
    const minuteDeg = minutes * 6 + (smoothSeconds / 60) * 6;
    const rawHours = now.getHours() % 12;
    const hourDeg = rawHours * 30 + (minutes / 60) * 30;

    analogSecond.style.transform = `rotate(${secondDeg}deg)`;
    analogMinute.style.transform = `rotate(${minuteDeg}deg)`;
    analogHour.style.transform = `rotate(${hourDeg}deg)`;

    // Date Strings
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString(undefined, options);

    dayOfWeekTag.textContent = now.toLocaleDateString(undefined, { weekday: 'long' });
    dayOfYearTag.textContent = `Day ${getDayOfYear(now)}`;
    weekNumberTag.textContent = `Week ${getWeekNumber(now)}`;

    // Timezone & UTC Offset
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneTag.textContent = tz.replace('_', ' ');
      const offsetMinutes = -now.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const offH = padZero(Math.floor(Math.abs(offsetMinutes) / 60));
      const offM = padZero(Math.abs(offsetMinutes) % 60);
      utcOffsetBadge.textContent = `UTC ${sign}${offH}:${offM}`;
    } catch {
      timezoneTag.textContent = 'Local Time';
    }

    // Update UTC Observatory Clock if visible
    const utcTimeEl = $('utc-clock-time');
    if (utcTimeEl) {
      utcTimeEl.textContent = `${padZero(now.getUTCHours())}:${padZero(now.getUTCMinutes())}:${padZero(now.getUTCSeconds())}`;
    }

    requestAnimationFrame(updateClock);
  }

  // ==========================================================================
  // 3. INTELLIGENT LIVE WEATHER STATION (Open-Meteo Integration)
  // ==========================================================================
  const WMO_CODES = {
    0: { desc: 'Clear Sky', icon: 'clear-day' },
    1: { desc: 'Mainly Clear', icon: 'clear-day' },
    2: { desc: 'Partly Cloudy', icon: 'cloudy-day' },
    3: { desc: 'Overcast', icon: 'overcast' },
    45: { desc: 'Foggy Mist', icon: 'fog' },
    48: { desc: 'Depositing Rime Fog', icon: 'fog' },
    51: { desc: 'Light Drizzle', icon: 'rain' },
    53: { desc: 'Moderate Drizzle', icon: 'rain' },
    55: { desc: 'Dense Drizzle', icon: 'rain' },
    61: { desc: 'Slight Rain', icon: 'rain' },
    63: { desc: 'Moderate Rain', icon: 'rain' },
    65: { desc: 'Heavy Rainstorm', icon: 'heavy-rain' },
    71: { desc: 'Slight Snow', icon: 'snow' },
    73: { desc: 'Moderate Snow', icon: 'snow' },
    75: { desc: 'Heavy Snowfall', icon: 'snow' },
    80: { desc: 'Slight Showers', icon: 'rain' },
    81: { desc: 'Moderate Showers', icon: 'rain' },
    82: { desc: 'Violent Showers', icon: 'heavy-rain' },
    95: { desc: 'Thunderstorm', icon: 'thunderstorm' },
    96: { desc: 'Thunderstorm w/ Hail', icon: 'thunderstorm' },
    99: { desc: 'Severe Thunderstorm', icon: 'thunderstorm' }
  };

  function getWeatherSVG(iconType, isDay = 1) {
    if (iconType === 'clear-day' && !isDay) iconType = 'clear-night';
    if (iconType === 'cloudy-day' && !isDay) iconType = 'cloudy-night';

    switch (iconType) {
      case 'clear-day':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="14" fill="#fbbf24" />
            <g stroke="#fbbf24" stroke-width="3" stroke-linecap="round">
              <line x1="32" y1="6" x2="32" y2="12" />
              <line x1="32" y1="52" x2="32" y2="58" />
              <line x1="6" y1="32" x2="12" y2="32" />
              <line x1="52" y1="32" x2="58" y2="32" />
              <line x1="13.6" y1="13.6" x2="17.8" y2="17.8" />
              <line x1="46.2" y1="46.2" x2="50.4" y2="50.4" />
              <line x1="13.6" y1="50.4" x2="17.8" y2="46.2" />
              <line x1="46.2" y1="17.8" x2="50.4" y2="13.6" />
            </g>
          </svg>
        `;
      case 'clear-night':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <path d="M42 38A18 18 0 0 1 24 16a18.3 18.3 0 0 0-4 1 20 20 0 1 0 23 23 18.3 18.3 0 0 0-1-2z" fill="#93c5fd" />
            <circle cx="48" cy="18" r="2" fill="#fff" />
            <circle cx="16" cy="46" r="1.5" fill="#fff" />
          </svg>
        `;
      case 'cloudy-day':
      case 'cloudy-night':
      case 'overcast':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <path d="M46 44H20a12 12 0 0 1-1.7-23.8A16 16 0 0 1 48 24.2 11 11 0 0 1 46 44z" fill="#94a3b8" opacity="0.9" />
            <path d="M40 40H18a9 9 0 0 1-1.3-17.9 12 12 0 0 1 22.3-3.2A8.5 8.5 0 0 1 40 40z" fill="#e2e8f0" />
          </svg>
        `;
      case 'rain':
      case 'heavy-rain':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <path d="M44 34H22a10 10 0 0 1-1.4-19.9 13 13 0 0 1 24.2-2.7A9.5 9.5 0 0 1 44 34z" fill="#94a3b8" />
            <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
              <line x1="22" y1="42" x2="18" y2="52" />
              <line x1="32" y1="42" x2="28" y2="52" />
              <line x1="42" y1="42" x2="38" y2="52" />
            </g>
          </svg>
        `;
      case 'thunderstorm':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <path d="M44 32H22a10 10 0 0 1-1.4-19.9 13 13 0 0 1 24.2-2.7A9.5 9.5 0 0 1 44 32z" fill="#64748b" />
            <polygon points="32 36 24 47 31 47 28 58 40 44 33 44" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" />
          </svg>
        `;
      case 'snow':
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <path d="M44 34H22a10 10 0 0 1-1.4-19.9 13 13 0 0 1 24.2-2.7A9.5 9.5 0 0 1 44 34z" fill="#94a3b8" />
            <circle cx="22" cy="46" r="2.5" fill="#e0f2fe" />
            <circle cx="32" cy="52" r="2.5" fill="#e0f2fe" />
            <circle cx="42" cy="46" r="2.5" fill="#e0f2fe" />
          </svg>
        `;
      default:
        return `
          <svg class="weather-svg-animated" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="14" fill="#38bdf8" />
          </svg>
        `;
    }
  }

  function convertTemp(celsius) {
    if (celsius === undefined || celsius === null) return '--';
    if (state.tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  }

  async function fetchLiveWeather(lat, lon, cityName, countryName) {
    weatherDescEl.textContent = 'Contacting weather satellites...';

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather API request failed');

      const data = await response.json();
      state.currentWeather = data;
      state.currentLocation = { name: cityName, country: countryName, lat, lon };

      renderWeather();
    } catch (err) {
      console.warn('Weather fetch fallback:', err);
      weatherDescEl.textContent = 'Weather temporarily offline';
    }
  }

  function renderWeather() {
    if (!state.currentWeather || !state.currentWeather.current) return;

    const current = state.currentWeather.current;
    const daily = state.currentWeather.daily;

    // Location Info
    weatherCityEl.textContent = state.currentLocation.name;
    weatherCountryEl.textContent = state.currentLocation.country;

    // Temp & Feels like
    const tempVal = convertTemp(current.temperature_2m);
    const feelsLikeVal = convertTemp(current.apparent_temperature);
    const unitSymbol = `°${state.tempUnit}`;

    currentTempEl.textContent = tempVal;
    feelsLikeValEl.textContent = `${feelsLikeVal}${unitSymbol}`;

    // WMO Code Translation
    const wmo = WMO_CODES[current.weather_code] || { desc: 'Fair', icon: 'clear-day' };
    weatherDescEl.textContent = wmo.desc;
    weatherIconContainer.innerHTML = getWeatherSVG(wmo.icon, current.is_day);

    // Metrics
    humidityValEl.textContent = `${current.relative_humidity_2m}%`;
    windValEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    pressureValEl.textContent = `${Math.round(current.surface_pressure)} hPa`;

    const uvMax = daily && daily.uv_index_max ? Math.round(daily.uv_index_max[0]) : 5;
    uvValEl.textContent = uvMax;

    // 5-Day Outlook
    if (daily && daily.time) {
      forecastContainer.innerHTML = '';
      const days = daily.time.slice(0, 5);

      days.forEach((dateStr, idx) => {
        const d = new Date(dateStr);
        const dayName = idx === 0 ? 'Today' : d.toLocaleDateString(undefined, { weekday: 'short' });
        const maxT = convertTemp(daily.temperature_2m_max[idx]);
        const minT = convertTemp(daily.temperature_2m_min[idx]);
        const code = daily.weather_code[idx];
        const dayWmo = WMO_CODES[code] || { icon: 'clear-day' };

        const card = document.createElement('div');
        card.className = 'forecast-day-card';
        card.innerHTML = `
          <span class="fc-day-name">${dayName}</span>
          <div class="fc-icon">${getWeatherSVG(dayWmo.icon, 1)}</div>
          <span class="fc-temps">${maxT}° <span class="fc-low">${minT}°</span></span>
        `;
        forecastContainer.appendChild(card);
      });
    }
  }

  // Unit Switches (°C / °F)
  btnCelsius.addEventListener('click', () => {
    if (state.tempUnit === 'C') return;
    state.tempUnit = 'C';
    localStorage.setItem('nexviqa_unit', 'C');
    btnCelsius.classList.add('active');
    btnFahrenheit.classList.remove('active');
    renderWeather();
  });

  btnFahrenheit.addEventListener('click', () => {
    if (state.tempUnit === 'F') return;
    state.tempUnit = 'F';
    localStorage.setItem('nexviqa_unit', 'F');
    btnFahrenheit.classList.add('active');
    btnCelsius.classList.remove('active');
    renderWeather();
  });

  if (state.tempUnit === 'F') {
    btnFahrenheit.classList.add('active');
    btnCelsius.classList.remove('active');
  }

  // Geolocation trigger
  async function detectUserLocation() {
    weatherCityEl.textContent = 'Locating...';
    weatherCountryEl.textContent = 'Requesting GPS coordinates';

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Reverse geocode via BigDataCloud client API
          try {
            const revRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const revData = await revRes.json();
            const city = revData.city || revData.locality || 'Current Location';
            const country = revData.countryName || '';
            fetchLiveWeather(lat, lon, city, country);
          } catch {
            fetchLiveWeather(lat, lon, 'My Location', 'Earth');
          }
        },
        () => {
          // If denied, fallback to New Delhi
          fetchLiveWeather(28.6139, 77.2090, 'New Delhi', 'India');
        },
        { timeout: 7000 }
      );
    } else {
      fetchLiveWeather(28.6139, 77.2090, 'New Delhi', 'India');
    }
  }

  btnGeolocate.addEventListener('click', detectUserLocation);

  // City Search
  let searchDebounce = null;
  citySearchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchDebounce);
    if (query.length < 2) {
      searchSuggestions.style.display = 'none';
      return;
    }

    searchDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          searchSuggestions.innerHTML = '';
          data.results.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'search-suggestion-item';
            div.textContent = `${item.name}, ${item.admin1 ? item.admin1 + ', ' : ''}${item.country}`;
            div.addEventListener('click', () => {
              citySearchInput.value = '';
              searchSuggestions.style.display = 'none';
              fetchLiveWeather(item.latitude, item.longitude, item.name, item.country);
            });
            searchSuggestions.appendChild(div);
          });
          searchSuggestions.style.display = 'flex';
        } else {
          searchSuggestions.style.display = 'none';
        }
      } catch {
        searchSuggestions.style.display = 'none';
      }
    }, 280);
  });

  citySearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = citySearchInput.value.trim();
    if (!query) return;

    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const first = data.results[0];
        citySearchInput.value = '';
        searchSuggestions.style.display = 'none';
        fetchLiveWeather(first.latitude, first.longitude, first.name, first.country);
      }
    } catch (err) {
      console.warn('Search query error', err);
    }
  });

  // ==========================================================================
  // 4. WORLD CLOCK OBSERVATORY
  // ==========================================================================
  const WORLD_HUBS = [
    { city: 'Tokyo', region: 'Japan', timeZone: 'Asia/Tokyo' },
    { city: 'New York', region: 'United States', timeZone: 'America/New_York' },
    { city: 'London', region: 'United Kingdom', timeZone: 'Europe/London' },
    { city: 'Dubai', region: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
    { city: 'Paris', region: 'France', timeZone: 'Europe/Paris' },
    { city: 'Sydney', region: 'Australia', timeZone: 'Australia/Sydney' },
    { city: 'Mumbai', region: 'India', timeZone: 'Asia/Kolkata' },
    { city: 'Singapore', region: 'Singapore', timeZone: 'Asia/Singapore' }
  ];

  function renderWorldClocks() {
    const grid = $('world-cities-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const now = new Date();

    WORLD_HUBS.forEach((hub) => {
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: hub.timeZone,
        hour12: !state.is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: hub.timeZone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      // Target hour for day/night
      const hubHour = parseInt(
        now.toLocaleTimeString('en-US', { timeZone: hub.timeZone, hour: '2-digit', hour12: false }),
        10
      );
      const isDay = hubHour >= 6 && hubHour < 18;

      const card = document.createElement('div');
      card.className = 'world-city-card';
      card.innerHTML = `
        <div class="wcity-header">
          <div>
            <div class="wcity-name">${hub.city}</div>
            <div class="wcity-region">${hub.region}</div>
          </div>
          <span class="wcity-tag">${isDay ? '☀️ DAY' : '🌙 NIGHT'}</span>
        </div>
        <div class="wcity-time">${timeStr}</div>
        <div class="wcity-footer">
          <span>${dateStr}</span>
          <span>${hub.timeZone.split('/')[1].replace('_', ' ')}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  setInterval(() => {
    if ($('world-view').classList.contains('active')) {
      renderWorldClocks();
    }
  }, 1000);

  // ==========================================================================
  // 5. FLUID STOPWATCH
  // ==========================================================================
  function formatStopwatch(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const mill = Math.floor((ms % 1000) / 10);
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}<span class="sw-ms">.${padZero(mill)}</span>`;
  }

  function updateStopwatch() {
    const currentMs = state.stopwatch.elapsedTime + (performance.now() - state.stopwatch.startTime);
    swDisplay.innerHTML = formatStopwatch(currentMs);

    // Liquid Ring progress (fills every second)
    const ringOffset = 816.8 - ((currentMs % 1000) / 1000) * 816.8;
    swRingProgress.style.strokeDashoffset = ringOffset;

    state.stopwatch.timerId = requestAnimationFrame(updateStopwatch);
  }

  swStartBtn.addEventListener('click', () => {
    if (!state.stopwatch.running) {
      // Start / Resume
      state.stopwatch.running = true;
      state.stopwatch.startTime = performance.now();
      swStatus.textContent = 'RUNNING';
      swStartBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        <span>Pause</span>
      `;
      swLapBtn.disabled = false;
      swResetBtn.disabled = false;
      updateStopwatch();
    } else {
      // Pause
      state.stopwatch.running = false;
      cancelAnimationFrame(state.stopwatch.timerId);
      state.stopwatch.elapsedTime += performance.now() - state.stopwatch.startTime;
      swStatus.textContent = 'PAUSED';
      swStartBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>Resume</span>
      `;
    }
  });

  swLapBtn.addEventListener('click', () => {
    if (!state.stopwatch.running) return;
    const currentMs = state.stopwatch.elapsedTime + (performance.now() - state.stopwatch.startTime);
    state.stopwatch.laps.unshift(currentMs);

    swLapsWrapper.style.display = 'block';
    swLapList.innerHTML = '';
    state.stopwatch.laps.forEach((lapMs, idx) => {
      const lapNum = state.stopwatch.laps.length - idx;
      const row = document.createElement('div');
      row.className = 'lap-row';
      row.innerHTML = `
        <span>Lap ${padZero(lapNum)}</span>
        <span>${formatStopwatch(lapMs).replace(/<[^>]+>/g, '')}</span>
      `;
      swLapList.appendChild(row);
    });
  });

  swResetBtn.addEventListener('click', () => {
    state.stopwatch.running = false;
    cancelAnimationFrame(state.stopwatch.timerId);
    state.stopwatch.startTime = 0;
    state.stopwatch.elapsedTime = 0;
    state.stopwatch.laps = [];

    swDisplay.innerHTML = '00:00:00<span class="sw-ms">.00</span>';
    swRingProgress.style.strokeDashoffset = 816.8;
    swStatus.textContent = 'STANDBY';
    swStartBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Start</span>
    `;
    swLapBtn.disabled = true;
    swResetBtn.disabled = true;
    swLapsWrapper.style.display = 'none';
  });

  // ==========================================================================
  // 6. LIQUID CHAMBER COUNTDOWN TIMER
  // ==========================================================================
  function getTimerTotalSeconds() {
    const h = parseInt(timerH.value, 10) || 0;
    const m = parseInt(timerM.value, 10) || 0;
    const s = parseInt(timerS.value, 10) || 0;
    return h * 3600 + m * 60 + s;
  }

  function formatTimerSeconds(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
  }

  function updateTimerFill() {
    if (state.timer.totalSeconds <= 0) {
      timerFill.style.height = '0%';
      return;
    }
    const ratio = (state.timer.remainingSeconds / state.timer.totalSeconds) * 100;
    timerFill.style.height = `${Math.max(0, Math.min(100, ratio))}%`;
  }

  presetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (state.timer.running) return;
      const secs = parseInt(pill.dataset.seconds, 10);
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;

      timerH.value = padZero(h);
      timerM.value = padZero(m);
      timerS.value = padZero(s);
    });
  });

  timerToggleBtn.addEventListener('click', () => {
    if (!state.timer.running) {
      // Start timer
      const secs = getTimerTotalSeconds();
      if (secs <= 0) return;

      state.timer.totalSeconds = secs;
      state.timer.remainingSeconds = secs;
      state.timer.running = true;

      timerInputsGroup.style.display = 'none';
      timerActiveDisplay.style.display = 'block';
      timerActiveDisplay.textContent = formatTimerSeconds(state.timer.remainingSeconds);
      timerToggleBtn.textContent = 'Pause Countdown';
      updateTimerFill();

      state.timer.intervalId = setInterval(() => {
        state.timer.remainingSeconds--;
        timerActiveDisplay.textContent = formatTimerSeconds(state.timer.remainingSeconds);
        updateTimerFill();

        if (state.timer.remainingSeconds <= 0) {
          clearInterval(state.timer.intervalId);
          state.timer.running = false;
          timerToggleBtn.textContent = 'Start Countdown';
          playTimerAlarm();
          alert('💧 Nexviqa Timer: Interval Complete!');
          timerInputsGroup.style.display = 'flex';
          timerActiveDisplay.style.display = 'none';
          timerFill.style.height = '100%';
        }
      }, 1000);
    } else {
      // Pause timer
      clearInterval(state.timer.intervalId);
      state.timer.running = false;
      timerToggleBtn.textContent = 'Resume Countdown';
    }
  });

  timerResetBtn.addEventListener('click', () => {
    clearInterval(state.timer.intervalId);
    state.timer.running = false;
    timerInputsGroup.style.display = 'flex';
    timerActiveDisplay.style.display = 'none';
    timerToggleBtn.textContent = 'Start Countdown';
    timerFill.style.height = '100%';
  });

  function playTimerAlarm() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Web Audio not permitted or supported
    }
  }

  // ==========================================================================
  // 7. WEB AUDIO SYNTHESIZED LIQUID SOUNDSCAPES
  // ==========================================================================
  function initAmbientAudio() {
    if (state.audio.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audio.ctx = new AudioCtx();
  }

  function startAmbientStream() {
    initAmbientAudio();
    const ctx = state.audio.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    // Generate Pink/Brown Noise for Oceanic Liquid Waves
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate deep fluid resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    // LFO to simulate rhythmic ocean swell
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8 second cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);

    lfo.connect(masterGain.gain);
    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    whiteNoise.start();
    lfo.start();

    state.audio.nodes = [whiteNoise, lfo, masterGain, filter];
    state.audio.isPlaying = true;
  }

  function stopAmbientStream() {
    state.audio.nodes.forEach((n) => {
      try {
        if (n.stop) n.stop();
        n.disconnect();
      } catch {}
    });
    state.audio.nodes = [];
    state.audio.isPlaying = false;
  }

  soundscapeToggle.addEventListener('click', () => {
    if (!state.audio.isPlaying) {
      startAmbientStream();
      soundscapeToggle.classList.add('active');
      soundLabel.textContent = 'Ocean Ambient';
    } else {
      stopAmbientStream();
      soundscapeToggle.classList.remove('active');
      soundLabel.textContent = 'Ambient Off';
    }
  });

  // ==========================================================================
  // 8. INTERACTIVE LIQUID BACKGROUND CANVAS
  // ==========================================================================
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 140 };
  let lastTime = performance.now();
  let frameCount = 0;
  let lastFpsUpdate = performance.now();

  function resizeCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class LiquidDrop {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 45 + 25;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.baseAlpha = Math.random() * 0.15 + 0.05;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.angle += this.pulseSpeed;
      this.x += this.vx;
      this.y += this.vy;

      // Gentle bounds bounce
      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;

      // Mouse displacement
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 5;
        this.y -= (dy / dist) * force * 5;
      }
    }

    draw(themeColor) {
      const currentRadius = this.radius + Math.sin(this.angle) * 8;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius);
      grad.addColorStop(0, themeColor.replace(')', `, ${this.baseAlpha + 0.08})`).replace('rgb', 'rgba'));
      grad.addColorStop(0.6, themeColor.replace(')', `, ${this.baseAlpha * 0.4})`).replace('rgb', 'rgba'));
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(24, Math.floor((width * height) / 45000));
    for (let i = 0; i < count; i++) {
      particles.push(new LiquidDrop());
    }
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Ripple waves on click
  window.addEventListener('click', (e) => {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 260) {
        const push = (260 - dist) * 0.08;
        p.vx -= (dx / dist) * push;
        p.vy -= (dy / dist) * push;
      }
    }
  });

  function getThemeRGB() {
    switch (state.theme) {
      case 'neon': return 'rgb(217, 70, 239)';
      case 'emerald': return 'rgb(16, 185, 129)';
      case 'solar': return 'rgb(245, 158, 11)';
      case 'mercury': return 'rgb(203, 213, 225)';
      default: return 'rgb(0, 210, 255)';
    }
  }

  function animateCanvas(now) {
    frameCount++;
    if (now - lastFpsUpdate >= 1000) {
      if (fpsCounter) fpsCounter.textContent = `${frameCount} FPS`;
      frameCount = 0;
      lastFpsUpdate = now;
    }

    ctx.clearRect(0, 0, width, height);

    const themeColor = getThemeRGB();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(themeColor);
    }

    requestAnimationFrame(animateCanvas);
  }

  // ==========================================================================
  // INITIALIZATION ON LOAD
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    updateFormatUI();
    resizeCanvas();
    requestAnimationFrame(animateCanvas);
    requestAnimationFrame(updateClock);
    detectUserLocation();
  });

})();
