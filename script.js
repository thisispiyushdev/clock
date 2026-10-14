/**
 * ============================================================================
 * NEXVIQA — LIQUID CHRONOS & ATMOSPHERE ENGINE
 * Real-time clock, dynamic liquid canvas, live weather station, world time,
 * stopwatch, fluid timer, 18 liquid themes, 16 soundscapes & Web Audio Studio.
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 18 LIQUID THEMES DEFINITION
  // ==========================================================================
  const THEMES = [
    { id: 'ocean', name: 'Ocean Cyan', cat: 'natural', dots: ['#00d2ff', '#0066ff', '#00f0ff'], desc: 'Deep bioluminescent oceanic blue' },
    { id: 'neon', name: 'Neon Violet', cat: 'cyber', dots: ['#d946ef', '#8b5cf6', '#f43f5e'], desc: 'High-voltage electric ultraviolet' },
    { id: 'emerald', name: 'Bio Emerald', cat: 'natural', dots: ['#10b981', '#06b6d4', '#34d399'], desc: 'Toxic alien green luminescence' },
    { id: 'solar', name: 'Solar Amber', cat: 'solar', dots: ['#f59e0b', '#ef4444', '#fbbf24'], desc: 'Incandescent stellar flare' },
    { id: 'mercury', name: 'Liquid Silver', cat: 'minimal', dots: ['#cbd5e1', '#64748b', '#f1f5f9'], desc: 'Pure reflective molten platinum' },
    { id: 'nebula', name: 'Midnight Nebula', cat: 'cyber', dots: ['#6366f1', '#3b82f6', '#a855f7'], desc: 'Deep interstellar cosmos glow' },
    { id: 'sakura', name: 'Sakura Blossom', cat: 'natural', dots: ['#fb7185', '#f43f5e', '#fda4af'], desc: 'Delicate glowing peach blossom' },
    { id: 'gold', name: 'Imperial Gold', cat: 'solar', dots: ['#eab308', '#d97706', '#fef08a'], desc: 'Opulent warm golden radiance' },
    { id: 'crimson', name: 'Crimson Eclipse', cat: 'solar', dots: ['#ef4444', '#b91c1c', '#f87171'], desc: 'Dark blood moon ruby aurora' },
    { id: 'aurora', name: 'Aurora Borealis', cat: 'natural', dots: ['#2dd4bf', '#818cf8', '#34d399'], desc: 'Mystic polar green & purple skies' },
    { id: 'synthwave', name: 'Synthwave 80s', cat: 'cyber', dots: ['#ec4899', '#06b6d4', '#facc15'], desc: 'Outrun cybernetic retro sunset' },
    { id: 'forest', name: 'Deep Jade', cat: 'natural', dots: ['#22c55e', '#15803d', '#84cc16'], desc: 'Subtropical lush rainforest canopy' },
    { id: 'frost', name: 'Glacial Ice', cat: 'natural', dots: ['#38bdf8', '#1d4ed8', '#e0f2fe'], desc: 'Sub-zero crystal diamond frost' },
    { id: 'amethyst', name: 'Twilight Amethyst', cat: 'cyber', dots: ['#a855f7', '#581c87', '#c084fc'], desc: 'Royal crystalline purple twilight' },
    { id: 'magma', name: 'Volcanic Lava', cat: 'solar', dots: ['#ff4500', '#ff8c00', '#b91c1c'], desc: 'Molten earth basalt incandescent glow' },
    { id: 'matrix', name: 'Electric Matrix', cat: 'cyber', dots: ['#10e052', '#059669', '#4ade80'], desc: 'Cybernetic high-speed terminal stream' },
    { id: 'coral', name: 'Cyber Coral', cat: 'solar', dots: ['#fb923c', '#14b8a6', '#fdba74'], desc: 'Tropical reef sunset gradient' },
    { id: 'stealth', name: 'Phantom Stealth', cat: 'minimal', dots: ['#f8fafc', '#475569', '#cbd5e1'], desc: 'Dark matter obsidian & clean white' }
  ];

  // ==========================================================================
  // 16 SOUND EFFECTS & AMBIENT GENERATORS DEFINITION
  // ==========================================================================
  const SOUNDS = [
    { id: 'ocean', name: 'Oceanic Waves', emoji: '🌊', type: 'ambient', desc: 'Rhythmic tidal ocean swell' },
    { id: 'rain', name: 'Soothing Rainfall', emoji: '🌧️', type: 'ambient', desc: 'Continuous calm rainfall' },
    { id: 'thunder', name: 'Storm & Thunder', emoji: '⚡', type: 'ambient', desc: 'Rolling thunder with storm drops' },
    { id: 'droplet', name: 'Liquid Water Droplet', emoji: '💧', type: 'sfx', desc: 'Resonant authentic fluid bloop' },
    { id: 'bowl', name: 'Zen Tibetan Bowl', emoji: '🔔', type: 'sfx', desc: '432Hz harmonic singing bowl' },
    { id: 'tick', name: 'Vintage Clock Tick', emoji: '🕰️', type: 'sfx', desc: 'Mechanical double woodblock tick' },
    { id: 'space', name: 'Cosmic Deep Space', emoji: '🌌', type: 'ambient', desc: 'Sub-bass interstellar brownian drone' },
    { id: 'campfire', name: 'Campfire Embers', emoji: '🪵', type: 'ambient', desc: 'Warm crackling timber embers' },
    { id: 'birds', name: 'Morning Birdsong', emoji: '🐦', type: 'ambient', desc: 'Gentle forest sunrise chirps' },
    { id: 'synth', name: 'Retro Synth Chime', emoji: '📻', type: 'sfx', desc: '80s major 7th synth arpeggio' },
    { id: 'binaural', name: 'Alpha Focus 10Hz', emoji: '🎧', type: 'ambient', desc: 'Binaural beat for deep mental flow' },
    { id: 'zen', name: 'Meditation Gong 528Hz', emoji: '🧘', type: 'sfx', desc: 'Pure restorative solfeggio tone' },
    { id: 'bubbles', name: 'Underwater Bubbles', emoji: '🫧', type: 'ambient', desc: 'Effervescent rising liquid bubbles' },
    { id: 'wind', name: 'Mountain Breeze', emoji: '💨', type: 'ambient', desc: 'Alpine resonant wind sweeps' },
    { id: 'cyber', name: 'Cyber HUD Radar', emoji: '🛸', type: 'sfx', desc: 'Sci-fi telemetry pulse & scan' },
    { id: 'stream', name: 'Crystal River Creek', emoji: '🏞️', type: 'ambient', desc: 'Fast flowing mountain spring water' }
  ];

  // --- STATE CONFIGURATION ---
  const state = {
    is24Hour: localStorage.getItem('nexviqa_24h') !== 'false',
    clockMode: 'digital',
    tempUnit: localStorage.getItem('nexviqa_unit') || 'C',
    theme: localStorage.getItem('nexviqa_theme') || 'ocean',
    options: {
      showMs: localStorage.getItem('opt_show_ms') !== 'false',
      showSec: localStorage.getItem('opt_show_sec') !== 'false',
      showProgress: localStorage.getItem('opt_show_progress') !== 'false',
      waveTank: localStorage.getItem('opt_wave_tank') !== 'false',
      font: localStorage.getItem('opt_font') || 'outfit',
      density: localStorage.getItem('opt_density') || 'medium',
      volume: parseInt(localStorage.getItem('opt_volume') || '70', 10),
      clickSfx: localStorage.getItem('opt_click_sfx') !== 'false',
      clockTick: localStorage.getItem('opt_clock_tick') === 'true'
    },
    audio: {
      ctx: null,
      masterGain: null,
      analyser: null,
      activeSoundId: null,
      activeNodes: [],
      visualizerId: null
    },
    currentWeather: null,
    currentLocation: {
      name: 'New Delhi',
      country: 'India',
      lat: 28.6139,
      lon: 77.2090
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
    },
    lastSecond: -1
  };

  // --- DOM SELECTORS ---
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Clock DOM
  const hoursEl = $('hours');
  const minutesEl = $('minutes');
  const secondsEl = $('seconds');
  const secondsBox = $('seconds-box');
  const secondsSeparator = $('seconds-separator');
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
  const fluidProgressWrap = $('fluid-progress-wrap');
  const liquidWaveTank = $('liquid-wave-tank');
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

  // Modals & Header DOM
  const soundStudioBtn = $('sound-studio-btn');
  const activeSoundLabel = $('active-sound-label');
  const themesModalBtn = $('themes-modal-btn');
  const headerThemeName = $('header-theme-name');
  const settingsBtn = $('settings-btn');
  const formatToggle = $('format-toggle');
  const formatIndicator = $('format-indicator');

  const themesModal = $('themes-modal');
  const closeThemesModal = $('close-themes-modal');
  const themesGalleryGrid = $('themes-gallery-grid');

  const soundModal = $('sound-modal');
  const closeSoundModal = $('close-sound-modal');
  const soundsGrid = $('sounds-grid');
  const masterVolumeSlider = $('master-volume-slider');
  const volumeValText = $('volume-val-text');
  const deckStopBtn = $('deck-stop-btn');
  const deckStatusText = $('deck-status-text');
  const soundIndicatorDot = $('sound-indicator-dot');
  const toggleClickSfx = $('toggle-click-sfx');
  const toggleClockTick = $('toggle-clock-tick');
  const visualizerCanvas = $('audio-visualizer-canvas');

  const settingsModal = $('settings-modal');
  const closeSettingsModal = $('close-settings-modal');
  const optShowMs = $('opt-show-ms');
  const optShowSec = $('opt-show-sec');
  const optShowProgress = $('opt-show-progress');
  const optWaveTank = $('opt-wave-tank');
  const btnResetSettings = $('btn-reset-settings');

  // Canvas Background
  const canvas = $('liquid-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const fpsCounter = $('fps-counter');

  // ==========================================================================
  // 1. THEMES GALLERY ENGINE (18 THEMES)
  // ==========================================================================
  function applyTheme(themeId) {
    const t = THEMES.find((item) => item.id === themeId) || THEMES[0];
    state.theme = t.id;
    document.documentElement.setAttribute('data-theme', t.id);
    localStorage.setItem('nexviqa_theme', t.id);

    if (headerThemeName) headerThemeName.textContent = t.name.split(' ')[0];

    // Update active highlight in gallery cards
    $$('.theme-gallery-card').forEach((card) => {
      card.classList.toggle('active', card.dataset.theme === t.id);
    });
  }

  function renderThemesGallery(filterCat = 'all') {
    if (!themesGalleryGrid) return;
    themesGalleryGrid.innerHTML = '';

    const filtered = filterCat === 'all' ? THEMES : THEMES.filter((t) => t.cat === filterCat);

    filtered.forEach((t) => {
      const card = document.createElement('div');
      card.className = `theme-gallery-card ${t.id === state.theme ? 'active' : ''}`;
      card.dataset.theme = t.id;

      card.innerHTML = `
        <div class="theme-card-swatches">
          <span class="swatch-circle" style="background:${t.dots[0]}"></span>
          <span class="swatch-circle" style="background:${t.dots[1]}"></span>
          <span class="swatch-circle" style="background:${t.dots[2]}"></span>
        </div>
        <div class="theme-card-info">
          <div class="theme-card-title">${t.name}</div>
          <div class="theme-card-category">${t.desc}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        applyTheme(t.id);
        playClickSound();
      });

      themesGalleryGrid.appendChild(card);
    });
  }

  // Themes filter pills
  $$('.theme-filter-row .filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      $$('.theme-filter-row .filter-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      renderThemesGallery(pill.dataset.filter);
    });
  });

  themesModalBtn.addEventListener('click', () => {
    themesModal.style.display = 'flex';
    renderThemesGallery();
  });

  closeThemesModal.addEventListener('click', () => {
    themesModal.style.display = 'none';
  });

  // ==========================================================================
  // 2. WEB AUDIO STUDIO & 16 SOUND EFFECTS SYNTHESIZER
  // ==========================================================================
  function initAudioEngine() {
    if (state.audio.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audio.ctx = new AudioCtx();

    // Master Gain Node
    state.audio.masterGain = state.audio.ctx.createGain();
    state.audio.masterGain.gain.setValueAtTime(state.options.volume / 100, state.audio.ctx.currentTime);

    // Analyser Node for Visualizer
    state.audio.analyser = state.audio.ctx.createAnalyser();
    state.audio.analyser.fftSize = 64;

    state.audio.masterGain.connect(state.audio.analyser);
    state.audio.analyser.connect(state.audio.ctx.destination);

    startVisualizerLoop();
  }

  function startVisualizerLoop() {
    if (!visualizerCanvas) return;
    const vCtx = visualizerCanvas.getContext('2d');
    const bufferLength = state.audio.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function drawVisualizer() {
      requestAnimationFrame(drawVisualizer);
      vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

      state.audio.analyser.getByteFrequencyData(dataArray);

      const barWidth = (visualizerCanvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * visualizerCanvas.height;

        vCtx.fillStyle = state.audio.activeSoundId ? 'rgba(0, 210, 255, 0.85)' : 'rgba(255, 255, 255, 0.15)';
        vCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    }
    drawVisualizer();
  }

  function stopAllSounds() {
    state.audio.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {}
    });
    state.audio.activeNodes = [];
    state.audio.activeSoundId = null;

    if (activeSoundLabel) activeSoundLabel.textContent = 'Audio: Off';
    if (deckStatusText) deckStatusText.textContent = 'Audio Engine Ready';
    if (soundIndicatorDot) soundIndicatorDot.classList.remove('active');

    // Remove active styles from sound cards
    $$('.sound-card').forEach((c) => c.classList.remove('playing'));
  }

  // --- Sound Generation Routines ---
  function createNoiseBuffer(type = 'pink') {
    const ctx = state.audio.ctx;
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.15;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    } else {
      // White noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.2;
      }
    }
    return buffer;
  }

  function playSound(soundId) {
    initAudioEngine();
    const ctx = state.audio.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    // If already playing this sound, toggle off
    if (state.audio.activeSoundId === soundId) {
      stopAllSounds();
      return;
    }

    stopAllSounds();
    state.audio.activeSoundId = soundId;

    const s = SOUNDS.find((item) => item.id === soundId);
    if (!s) return;

    if (activeSoundLabel) activeSoundLabel.textContent = `${s.emoji} ${s.name}`;
    if (deckStatusText) deckStatusText.textContent = `Streaming: ${s.name}`;
    if (soundIndicatorDot) soundIndicatorDot.classList.add('active');

    const card = document.querySelector(`.sound-card[data-sound="${soundId}"]`);
    if (card) card.classList.add('playing');

    const now = ctx.currentTime;

    switch (soundId) {
      case 'ocean': {
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer('pink');
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, now); // 8s cycle

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);

        lfo.connect(gain.gain);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        noise.start();
        lfo.start();
        state.audio.activeNodes = [noise, lfo, filter, gain];
        break;
      }

      case 'rain': {
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer('white');
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        noise.start();
        state.audio.activeNodes = [noise, filter, gain];
        break;
      }

      case 'thunder': {
        const rainNoise = ctx.createBufferSource();
        rainNoise.buffer = createNoiseBuffer('white');
        rainNoise.loop = true;
        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(900, now);
        const rainGain = ctx.createGain();
        rainGain.gain.setValueAtTime(0.15, now);

        // Thunder sub-bass rumble
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(55, now);
        const thunderGain = ctx.createGain();
        thunderGain.gain.setValueAtTime(0.1, now);

        rainNoise.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(state.audio.masterGain);

        osc.connect(thunderGain);
        thunderGain.connect(state.audio.masterGain);

        rainNoise.start();
        osc.start();
        state.audio.activeNodes = [rainNoise, rainFilter, rainGain, osc, thunderGain];
        break;
      }

      case 'droplet': {
        playLiquidDropletSFX();
        break;
      }

      case 'bowl': {
        // Tibetan Bowl 432Hz with harmonic overtones
        const freqs = [432, 864, 1296, 1728];
        const nodes = [];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          const vol = 0.2 / (idx + 1);
          gain.gain.setValueAtTime(vol, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

          osc.connect(gain);
          gain.connect(state.audio.masterGain);
          osc.start();
          osc.stop(now + 4.5);
          nodes.push(osc, gain);
        });
        state.audio.activeNodes = nodes;
        break;
      }

      case 'tick': {
        playMechanicalTickSFX();
        break;
      }

      case 'space': {
        const brownNoise = ctx.createBufferSource();
        brownNoise.buffer = createNoiseBuffer('brown');
        brownNoise.loop = true;

        const subOsc = ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(65, now);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, now);

        brownNoise.connect(filter);
        subOsc.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        brownNoise.start();
        subOsc.start();
        state.audio.activeNodes = [brownNoise, subOsc, filter, gain];
        break;
      }

      case 'campfire': {
        const white = ctx.createBufferSource();
        white.buffer = createNoiseBuffer('white');
        white.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(3, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);

        white.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        white.start();
        state.audio.activeNodes = [white, filter, gain];
        break;
      }

      case 'birds': {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2800, now);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(5, now);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(400, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(state.audio.masterGain);

        lfo.start();
        osc.start();
        state.audio.activeNodes = [osc, lfo, lfoGain, gain];
        break;
      }

      case 'synth': {
        // Retro 80s Synth Chime arpeggio
        const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
        const nodes = [];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.12 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.2);

          osc.connect(gain);
          gain.connect(state.audio.masterGain);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 1.2);
          nodes.push(osc, gain);
        });
        state.audio.activeNodes = nodes;
        break;
      }

      case 'binaural': {
        // 440Hz and 450Hz = 10Hz Alpha beat
        const oscL = ctx.createOscillator();
        const oscR = ctx.createOscillator();
        oscL.type = 'sine';
        oscR.type = 'sine';
        oscL.frequency.setValueAtTime(440, now);
        oscR.frequency.setValueAtTime(450, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, now);

        oscL.connect(gain);
        oscR.connect(gain);
        gain.connect(state.audio.masterGain);

        oscL.start();
        oscR.start();
        state.audio.activeNodes = [oscL, oscR, gain];
        break;
      }

      case 'zen': {
        // 528Hz Solfeggio Gong
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 5.0);

        osc.connect(gain);
        gain.connect(state.audio.masterGain);
        osc.start();
        osc.stop(now + 5.0);
        state.audio.activeNodes = [osc, gain];
        break;
      }

      case 'bubbles': {
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer('white');
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, now);
        filter.Q.setValueAtTime(8, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        noise.start();
        state.audio.activeNodes = [noise, filter, gain];
        break;
      }

      case 'wind': {
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer('pink');
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        noise.start();
        state.audio.activeNodes = [noise, filter, gain];
        break;
      }

      case 'cyber': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.35);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(state.audio.masterGain);
        osc.start();
        osc.stop(now + 0.35);
        state.audio.activeNodes = [osc, gain];
        break;
      }

      case 'stream': {
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer('white');
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(1.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.audio.masterGain);

        noise.start();
        state.audio.activeNodes = [noise, filter, gain];
        break;
      }
    }
  }

  function playLiquidDropletSFX() {
    try {
      initAudioEngine();
      const ctx = state.audio.ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(state.audio.masterGain);
      osc.start();
      osc.stop(now + 0.12);
    } catch {}
  }

  function playMechanicalTickSFX() {
    try {
      initAudioEngine();
      const ctx = state.audio.ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(state.audio.masterGain);
      osc.start();
      osc.stop(now + 0.03);
    } catch {}
  }

  function playClickSound() {
    if (state.options.clickSfx) {
      playLiquidDropletSFX();
    }
  }

  // Render 16 sound cards in modal
  function renderSoundsGrid() {
    if (!soundsGrid) return;
    soundsGrid.innerHTML = '';

    SOUNDS.forEach((s) => {
      const card = document.createElement('div');
      card.className = `sound-card ${s.id === state.audio.activeSoundId ? 'playing' : ''}`;
      card.dataset.sound = s.id;

      card.innerHTML = `
        <div class="sound-card-left">
          <span class="sound-emoji">${s.emoji}</span>
          <div class="sound-card-info">
            <span class="sound-card-title">${s.name}</span>
            <span class="sound-card-tag">${s.type === 'ambient' ? 'AMBIENT STREAM' : 'SOUND EFFECT'}</span>
          </div>
        </div>
        <button class="sound-play-btn sfx-click" aria-label="Play ${s.name}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      `;

      card.addEventListener('click', () => {
        playSound(s.id);
      });

      soundsGrid.appendChild(card);
    });
  }

  // Sound Studio Modal Toggles
  soundStudioBtn.addEventListener('click', () => {
    soundModal.style.display = 'flex';
    renderSoundsGrid();
  });

  closeSoundModal.addEventListener('click', () => {
    soundModal.style.display = 'none';
  });

  deckStopBtn.addEventListener('click', () => {
    stopAllSounds();
  });

  masterVolumeSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.options.volume = val;
    localStorage.setItem('opt_volume', val);
    volumeValText.textContent = `${val}%`;
    if (state.audio.masterGain && state.audio.ctx) {
      state.audio.masterGain.gain.setValueAtTime(val / 100, state.audio.ctx.currentTime);
    }
  });

  toggleClickSfx.addEventListener('change', (e) => {
    state.options.clickSfx = e.target.checked;
    localStorage.setItem('opt_click_sfx', e.target.checked);
  });

  toggleClockTick.addEventListener('change', (e) => {
    state.options.clockTick = e.target.checked;
    localStorage.setItem('opt_clock_tick', e.target.checked);
  });

  // Global UI Click Sound listener for interactive elements
  document.addEventListener('click', (e) => {
    if (e.target.closest('.sfx-click') || e.target.closest('button')) {
      playClickSound();
    }
  });

  // ==========================================================================
  // 3. SETTINGS & OPTIONS ENGINE
  // ==========================================================================
  function applyOptions() {
    // Show/hide milliseconds
    if (msecEl) msecEl.style.display = state.options.showMs ? 'inline' : 'none';

    // Show/hide seconds
    if (secondsBox && secondsSeparator) {
      secondsBox.style.display = state.options.showSec ? 'flex' : 'none';
      secondsSeparator.style.display = state.options.showSec ? 'inline' : 'none';
    }

    // Show/hide progress track
    if (fluidProgressWrap) {
      fluidProgressWrap.style.display = state.options.showProgress ? 'block' : 'none';
    }

    // Show/hide wave tank
    if (liquidWaveTank) {
      liquidWaveTank.style.display = state.options.waveTank ? 'block' : 'none';
    }

    // Font selection
    document.body.classList.remove('font-space', 'font-syne');
    if (state.options.font === 'space') {
      document.body.classList.add('font-space');
    } else if (state.options.font === 'syne') {
      document.body.classList.add('font-syne');
    }

    // Sync input values in settings modal
    if (optShowMs) optShowMs.checked = state.options.showMs;
    if (optShowSec) optShowSec.checked = state.options.showSec;
    if (optShowProgress) optShowProgress.checked = state.options.showProgress;
    if (optWaveTank) optWaveTank.checked = state.options.waveTank;
    if (masterVolumeSlider) masterVolumeSlider.value = state.options.volume;
    if (volumeValText) volumeValText.textContent = `${state.options.volume}%`;
    if (toggleClickSfx) toggleClickSfx.checked = state.options.clickSfx;
    if (toggleClockTick) toggleClockTick.checked = state.options.clockTick;

    // Font pills
    $$('#font-selector .opt-pill').forEach((p) => {
      p.classList.toggle('active', p.dataset.font === state.options.font);
    });

    // Density pills
    $$('#density-selector .opt-pill').forEach((p) => {
      p.classList.toggle('active', p.dataset.density === state.options.density);
    });
  }

  settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
    applyOptions();
  });

  closeSettingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  // Close modals on outside backdrop click
  [themesModal, soundModal, settingsModal].forEach((m) => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.style.display = 'none';
      });
    }
  });

  // Settings Toggles Change Handlers
  if (optShowMs) {
    optShowMs.addEventListener('change', (e) => {
      state.options.showMs = e.target.checked;
      localStorage.setItem('opt_show_ms', e.target.checked);
      applyOptions();
    });
  }

  if (optShowSec) {
    optShowSec.addEventListener('change', (e) => {
      state.options.showSec = e.target.checked;
      localStorage.setItem('opt_show_sec', e.target.checked);
      applyOptions();
    });
  }

  if (optShowProgress) {
    optShowProgress.addEventListener('change', (e) => {
      state.options.showProgress = e.target.checked;
      localStorage.setItem('opt_show_progress', e.target.checked);
      applyOptions();
    });
  }

  if (optWaveTank) {
    optWaveTank.addEventListener('change', (e) => {
      state.options.waveTank = e.target.checked;
      localStorage.setItem('opt_wave_tank', e.target.checked);
      applyOptions();
    });
  }

  // Font selector pills
  $$('#font-selector .opt-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      state.options.font = pill.dataset.font;
      localStorage.setItem('opt_font', state.options.font);
      applyOptions();
    });
  });

  // Density selector pills
  $$('#density-selector .opt-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      state.options.density = pill.dataset.density;
      localStorage.setItem('opt_density', state.options.density);
      applyOptions();
      initParticles();
    });
  });

  if (btnResetSettings) {
    btnResetSettings.addEventListener('click', () => {
      state.options = {
        showMs: true,
        showSec: true,
        showProgress: true,
        waveTank: true,
        font: 'outfit',
        density: 'medium',
        volume: 70,
        clickSfx: true,
        clockTick: false
      };
      localStorage.clear();
      applyTheme('ocean');
      applyOptions();
      initParticles();
    });
  }

  // Format 12h/24h toggle
  function updateFormatUI() {
    formatIndicator.textContent = state.is24Hour ? '24H' : '12H';
    localStorage.setItem('nexviqa_24h', state.is24Hour);
  }

  formatToggle.addEventListener('click', () => {
    state.is24Hour = !state.is24Hour;
    updateFormatUI();
  });

  // Tab Navigation
  $$('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.nav-btn').forEach((b) => b.classList.remove('active'));
      $$('.tab-pane').forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = $(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('active');

      if (btn.dataset.tab === 'world-view') {
        renderWorldClocks();
      }
    });
  });

  // Clock Mode Switching (Digital / Analog / Split)
  $$('.mode-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      $$('.mode-pill').forEach((p) => p.classList.remove('active'));
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

  // Build analog dial marks
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
  // 4. REAL-TIME LIQUID CLOCK ENGINE
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

    // Trigger tick sound on second transition
    if (seconds !== state.lastSecond) {
      state.lastSecond = seconds;
      if (state.options.clockTick) {
        playMechanicalTickSFX();
      }
    }

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

    // Progress Bar
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

    // Update UTC Observatory Clock
    const utcTimeEl = $('utc-clock-time');
    if (utcTimeEl) {
      utcTimeEl.textContent = `${padZero(now.getUTCHours())}:${padZero(now.getUTCMinutes())}:${padZero(now.getUTCSeconds())}`;
    }

    requestAnimationFrame(updateClock);
  }

  // ==========================================================================
  // 5. INTELLIGENT LIVE WEATHER STATION (Open-Meteo Integration)
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
            div.className = 'search-suggestion-item sfx-click';
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
  // 6. WORLD CLOCK OBSERVATORY
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
  // 7. FLUID STOPWATCH
  // ==========================================================================
  const swDisplay = $('sw-display');
  const swStatus = $('sw-status');
  const swRingProgress = $('stopwatch-ring-progress');
  const swStartBtn = $('sw-start-btn');
  const swLapBtn = $('sw-lap-btn');
  const swResetBtn = $('sw-reset-btn');
  const swLapsWrapper = $('sw-laps-wrapper');
  const swLapList = $('sw-lap-list');

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

    const ringOffset = 816.8 - ((currentMs % 1000) / 1000) * 816.8;
    swRingProgress.style.strokeDashoffset = ringOffset;

    state.stopwatch.timerId = requestAnimationFrame(updateStopwatch);
  }

  swStartBtn.addEventListener('click', () => {
    if (!state.stopwatch.running) {
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
  // 8. LIQUID CHAMBER COUNTDOWN TIMER
  // ==========================================================================
  const timerFill = $('timer-fill');
  const timerInputsGroup = $('timer-inputs-group');
  const timerActiveDisplay = $('timer-active-display');
  const timerH = $('timer-h');
  const timerM = $('timer-m');
  const timerS = $('timer-s');
  const timerToggleBtn = $('timer-toggle-btn');
  const timerResetBtn = $('timer-reset-btn');

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

  $$('.preset-pill').forEach((pill) => {
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
          playSound('bowl');
          alert('💧 Nexviqa Timer: Interval Complete!');
          timerInputsGroup.style.display = 'flex';
          timerActiveDisplay.style.display = 'none';
          timerFill.style.height = '100%';
        }
      }, 1000);
    } else {
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

  // ==========================================================================
  // 9. INTERACTIVE LIQUID BACKGROUND CANVAS PHYSICS
  // ==========================================================================
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 140 };
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

      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;

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
    let count = 24;
    if (state.options.density === 'low') count = 12;
    else if (state.options.density === 'high') count = 48;

    for (let i = 0; i < count; i++) {
      particles.push(new LiquidDrop());
    }
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

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
    const t = THEMES.find((item) => item.id === state.theme);
    if (!t) return 'rgb(0, 210, 255)';
    const hex = t.dots[0];
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
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
    applyOptions();
    updateFormatUI();
    resizeCanvas();
    requestAnimationFrame(animateCanvas);
    requestAnimationFrame(updateClock);
    detectUserLocation();
  });

})();
