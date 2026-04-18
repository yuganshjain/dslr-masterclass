import { useState, useMemo } from 'react';
import styles from './Cameras.module.css';

/* ─── CAMERA DATA ─── */
const CAMERAS = [
  // Full Frame Mirrorless
  { id: 'sony-a7iv',    name: 'Sony A7 IV',          brand: 'Sony',      type: 'Mirrorless', sensor: 'Full Frame',        mp: 33,  isoRange: '100–51200',  fps: 10,  af: '759 PDAF · 94% coverage',   video: '4K/60p',   ibis: true,  weather: true,  vf: 'EVF', battery: 520,  weight: 659,  price: 2499, year: 2021, mount: 'Sony E',   bestFor: ['Portrait', 'Wedding', 'Travel', 'Video'],   verdict: 'Best all-round FF mirrorless. Exceptional 33MP sensor with class-leading dynamic range.' },
  { id: 'sony-a7cii',   name: 'Sony A7C II',          brand: 'Sony',      type: 'Mirrorless', sensor: 'Full Frame',        mp: 33,  isoRange: '100–51200',  fps: 10,  af: '759 PDAF · 94% coverage',   video: '4K/60p',   ibis: true,  weather: true,  vf: 'None', battery: 740, weight: 514,  price: 2199, year: 2023, mount: 'Sony E',   bestFor: ['Travel', 'Vlog', 'Street'],                 verdict: 'Most compact FF mirrorless. 7-stop IBIS in a travel-friendly body.' },
  { id: 'canon-r6ii',   name: 'Canon EOS R6 Mark II', brand: 'Canon',     type: 'Mirrorless', sensor: 'Full Frame',        mp: 24,  isoRange: '100–102400', fps: 40,  af: '1053 PDAF · 100% coverage', video: '4K/60p',   ibis: true,  weather: true,  vf: 'EVF', battery: 760,  weight: 670,  price: 2499, year: 2022, mount: 'Canon RF', bestFor: ['Sports', 'Wildlife', 'Action', 'Wedding'],  verdict: '40fps electronic shutter makes it a beast for action. 8-stop IBIS is unmatched.' },
  { id: 'canon-r8',     name: 'Canon EOS R8',          brand: 'Canon',     type: 'Mirrorless', sensor: 'Full Frame',        mp: 24,  isoRange: '100–102400', fps: 40,  af: '4779 PDAF · 100% coverage', video: '4K/60p',   ibis: false, weather: false, vf: 'EVF', battery: 220,  weight: 461,  price: 1299, year: 2023, mount: 'Canon RF', bestFor: ['Entry FF', 'Travel', 'Portrait'],           verdict: 'Cheapest FF Canon mirrorless. Same sensor/AF as R6 II without IBIS or weather sealing.' },
  { id: 'nikon-z6iii',  name: 'Nikon Z6 III',          brand: 'Nikon',     type: 'Mirrorless', sensor: 'Full Frame',        mp: 24,  isoRange: '100–64000',  fps: 20,  af: '273 PDAF · 90% coverage',   video: '6K/60p RAW', ibis: true, weather: true, vf: 'EVF',  battery: 380,  weight: 760,  price: 2499, year: 2024, mount: 'Nikon Z',  bestFor: ['Video', 'Journalism', 'Sports'],            verdict: 'Partially stacked sensor gives 20fps and pro-grade 6K raw video in one body.' },
  { id: 'nikon-z5ii',   name: 'Nikon Z5 II',           brand: 'Nikon',     type: 'Mirrorless', sensor: 'Full Frame',        mp: 24,  isoRange: '100–51200',  fps: 14,  af: '273 PDAF · 90% coverage',   video: '4K/30p',   ibis: true,  weather: true,  vf: 'EVF', battery: 470,  weight: 700,  price: 1699, year: 2024, mount: 'Nikon Z',  bestFor: ['Entry FF', 'Wedding', 'Portrait'],          verdict: 'Best value entry-level FF mirrorless for still photography.' },
  { id: 'pana-s5ii',    name: 'Panasonic S5 II',        brand: 'Panasonic', type: 'Mirrorless', sensor: 'Full Frame',        mp: 24,  isoRange: '100–51200',  fps: 9,   af: 'Phase Hybrid',              video: '4K/60p',   ibis: true,  weather: true,  vf: 'EVF', battery: 440,  weight: 740,  price: 1997, year: 2023, mount: 'L-mount',  bestFor: ['Video', 'Hybrid', 'Landscape'],             verdict: 'First Panasonic with phase-detect AF. Excellent 4K video at a fair price.' },
  // APS-C Mirrorless
  { id: 'sony-a6700',   name: 'Sony A6700',            brand: 'Sony',      type: 'Mirrorless', sensor: 'APS-C',             mp: 26,  isoRange: '100–32000',  fps: 11,  af: '759 PDAF · 94% coverage',   video: '4K/120p',  ibis: true,  weather: true,  vf: 'EVF', battery: 490,  weight: 493,  price: 1399, year: 2023, mount: 'Sony E',   bestFor: ['Wildlife', 'Video', 'Travel', 'Sports'],    verdict: 'Top-of-the-line APS-C Sony. 4K/120p with full-frame AI subject recognition.' },
  { id: 'sony-zve10ii', name: 'Sony ZV-E10 II',         brand: 'Sony',      type: 'Mirrorless', sensor: 'APS-C',             mp: 26,  isoRange: '100–32000',  fps: 11,  af: '759 PDAF · 94% coverage',   video: '4K/30p',   ibis: false, weather: false, vf: 'None', battery: 220, weight: 292,  price: 799,  year: 2024, mount: 'Sony E',   bestFor: ['Vlog', 'Content Creator', 'Beginner'],      verdict: 'Ultra-compact vlogging machine. Best AI AF for self-shooting at any price.' },
  { id: 'fuji-xt5',     name: 'Fujifilm X-T5',          brand: 'Fujifilm',  type: 'Mirrorless', sensor: 'APS-C',             mp: 40,  isoRange: '125–12800',  fps: 15,  af: '425 PDAF · 100% coverage',  video: '6.2K/30p', ibis: true,  weather: true,  vf: 'EVF', battery: 580,  weight: 557,  price: 1699, year: 2022, mount: 'Fuji X',   bestFor: ['Landscape', 'Portrait', 'Street', 'Travel'], verdict: '40MP APS-C sensor delivers medium-format-rivalling detail. Film simulations are legendary.' },
  { id: 'fuji-xs20',    name: 'Fujifilm X-S20',          brand: 'Fujifilm',  type: 'Mirrorless', sensor: 'APS-C',             mp: 26,  isoRange: '160–12800',  fps: 20,  af: '425 PDAF · 100% coverage',  video: '6.2K/30p', ibis: true,  weather: false, vf: 'EVF', battery: 800,  weight: 491,  price: 1299, year: 2023, mount: 'Fuji X',   bestFor: ['Vlog', 'Travel', 'Hybrid'],                 verdict: 'Best hybrid Fuji. 800-shot battery + 7-stop IBIS + 6K video — genuinely impressive.' },
  { id: 'fuji-x100vi',  name: 'Fujifilm X100VI',         brand: 'Fujifilm',  type: 'Mirrorless', sensor: 'APS-C',             mp: 40,  isoRange: '125–12800',  fps: 20,  af: '425 PDAF · 100% coverage',  video: '6.2K/30p', ibis: true,  weather: true,  vf: 'OVF/EVF', battery: 450, weight: 521, price: 1599, year: 2024, mount: 'Fixed 23mm f/2', bestFor: ['Street', 'Travel', 'Documentary'], verdict: 'Cult classic updated with 40MP + IBIS + weather sealing. Fixed 35mm-equivalent lens.' },
  { id: 'canon-r10',    name: 'Canon EOS R10',           brand: 'Canon',     type: 'Mirrorless', sensor: 'APS-C',             mp: 24,  isoRange: '100–32000',  fps: 23,  af: '651 PDAF · 100% coverage',  video: '4K/30p',   ibis: false, weather: false, vf: 'EVF', battery: 430,  weight: 429,  price: 879,  year: 2022, mount: 'Canon RF', bestFor: ['Beginner', 'Sports', 'Wildlife'],           verdict: 'Budget APS-C with Canon\'s excellent AI animal AF. 23fps for a surprisingly small body.' },
  { id: 'canon-r50',    name: 'Canon EOS R50',           brand: 'Canon',     type: 'Mirrorless', sensor: 'APS-C',             mp: 24,  isoRange: '100–32000',  fps: 15,  af: '651 PDAF · 100% coverage',  video: '4K/30p',   ibis: false, weather: false, vf: 'None', battery: 310, weight: 375,  price: 679,  year: 2023, mount: 'Canon RF', bestFor: ['Beginner', 'Content Creator', 'Vlog'],      verdict: 'Lightest Canon RF camera. Great for first-time buyers wanting to grow into the RF lens system.' },
  { id: 'nikon-z50ii',  name: 'Nikon Z50 II',            brand: 'Nikon',     type: 'Mirrorless', sensor: 'APS-C',             mp: 21,  isoRange: '100–51200',  fps: 11,  af: '209 PDAF · 90% coverage',   video: '4K/30p',   ibis: false, weather: false, vf: 'EVF', battery: 300,  weight: 385,  price: 857,  year: 2024, mount: 'Nikon Z',  bestFor: ['Beginner', 'Travel', 'Vlog'],               verdict: 'Best beginner Nikon mirrorless. Flip-out screen and solid Nikon colour science.' },
  { id: 'pana-g9ii',    name: 'Panasonic G9 II',          brand: 'Panasonic', type: 'Mirrorless', sensor: 'Micro Four Thirds', mp: 25,  isoRange: '100–25600',  fps: 75,  af: 'Phase Hybrid',              video: '5.7K/60p', ibis: true,  weather: true,  vf: 'EVF', battery: 680,  weight: 658,  price: 1797, year: 2023, mount: 'MFT',      bestFor: ['Wildlife', 'Sports', 'Video', 'Bird'],      verdict: '75fps burst and 8-stop IBIS in a compact body. Wildlife photographers dream camera.' },
  { id: 'om-om1ii',     name: 'OM System OM-1 Mark II',  brand: 'OM System', type: 'Mirrorless', sensor: 'Micro Four Thirds', mp: 20,  isoRange: '200–102400', fps: 120, af: '1053 PDAF · 100% coverage', video: '4K/60p',   ibis: true,  weather: true,  vf: 'EVF', battery: 520,  weight: 599,  price: 2199, year: 2024, mount: 'MFT',      bestFor: ['Wildlife', 'Bird', 'Adventure', 'Sports'],  verdict: '120fps + IP53 weatherproofing + subject detection AI — best wildlife camera value.' },
  // DSLRs
  { id: 'canon-90d',    name: 'Canon EOS 90D',           brand: 'Canon',     type: 'DSLR',       sensor: 'APS-C',             mp: 32,  isoRange: '100–25600',  fps: 10,  af: '45-point all cross-type',   video: '4K/30p',   ibis: false, weather: true,  vf: 'OVF', battery: 1300, weight: 701,  price: 1199, year: 2019, mount: 'Canon EF-S', bestFor: ['Sports', 'Wildlife', 'All-rounder'],      verdict: 'Best APS-C DSLR ever made. 32MP + 10fps + weather seal + 1300-shot battery life.' },
  { id: 'canon-sl3',    name: 'Canon EOS Rebel SL3',     brand: 'Canon',     type: 'DSLR',       sensor: 'APS-C',             mp: 24,  isoRange: '100–25600',  fps: 5,   af: '9-point',                   video: '4K/25p',   ibis: false, weather: false, vf: 'OVF', battery: 1070, weight: 449,  price: 749,  year: 2019, mount: 'Canon EF-S', bestFor: ['Beginner', 'Travel'],                     verdict: 'World\'s smallest and lightest APS-C DSLR. Ideal for first DSLR buyers.' },
  { id: 'nikon-d7500',  name: 'Nikon D7500',             brand: 'Nikon',     type: 'DSLR',       sensor: 'APS-C',             mp: 21,  isoRange: '100–51200',  fps: 8,   af: '51-point',                  video: '4K/30p',   ibis: false, weather: true,  vf: 'OVF', battery: 950,  weight: 720,  price: 1099, year: 2017, mount: 'Nikon DX',  bestFor: ['Sports', 'Wildlife', 'Enthusiast'],         verdict: 'The enthusiast DSLR sweet spot. ISO 51200 + 950-shot battery + tilting screen.' },
  { id: 'nikon-d3500',  name: 'Nikon D3500',             brand: 'Nikon',     type: 'DSLR',       sensor: 'APS-C',             mp: 24,  isoRange: '100–25600',  fps: 5,   af: '11-point',                  video: '1080p/60p', ibis: false, weather: false, vf: 'OVF', battery: 1500, weight: 365, price: 499,  year: 2018, mount: 'Nikon DX',  bestFor: ['Beginner', 'Budget', 'Travel'],             verdict: '1500-shot battery life is legendary. Still the best budget DSLR recommendation for beginners.' },
];

/* ─── LENS GUIDE DATA ─── */
const LENS_CATEGORIES = [
  {
    id: 'portrait',
    label: 'Portrait',
    icon: '👤',
    color: '#f5a623',
    fov: '28–100mm (equiv.)',
    tip: 'Shoot at f/1.4–f/2.8 to separate your subject from the background. 85mm is the gold standard for flattering compression.',
    lenses: [
      { name: 'Sony FE 85mm f/1.8',         brand: 'Sony',     mount: 'Sony E',    price: 599,  type: 'Prime',  note: 'Best value Sony portrait prime. Razor sharp.' },
      { name: 'Sony FE 50mm f/1.2 GM',       brand: 'Sony',     mount: 'Sony E',    price: 1999, type: 'Prime',  note: 'Near-perfect optical performance. Pro choice.' },
      { name: 'Canon RF 85mm f/2 IS Macro',  brand: 'Canon',    mount: 'Canon RF',  price: 499,  type: 'Prime',  note: 'Affordable with IS. Doubles as a macro lens.' },
      { name: 'Canon RF 50mm f/1.2L',        brand: 'Canon',    mount: 'Canon RF',  price: 2299, type: 'Prime',  note: 'Flagship 50mm. Buttery bokeh, elite sharpness.' },
      { name: 'Nikon Z 85mm f/1.8 S',        brand: 'Nikon',    mount: 'Nikon Z',   price: 796,  type: 'Prime',  note: 'Outstanding sharpness. One of Nikon\'s best lenses.' },
      { name: 'Nikon Z 50mm f/1.2 S',        brand: 'Nikon',    mount: 'Nikon Z',   price: 2096, type: 'Prime',  note: 'Premium 50mm with stunning bokeh and fast AF.' },
      { name: 'Fuji XF 56mm f/1.2 R WR',    brand: 'Fujifilm', mount: 'Fuji X',    price: 999,  type: 'Prime',  note: 'Equivalent to 85mm. Stunning portrait results.' },
      { name: 'Sigma 85mm f/1.4 DG DN Art',  brand: 'Sigma',    mount: 'Multi',     price: 1099, type: 'Prime',  note: 'Third-party gem. Available for Sony E and L-mount.' },
      { name: 'Canon EF 50mm f/1.8 STM',     brand: 'Canon',    mount: 'Canon EF',  price: 125,  type: 'Prime',  note: 'The "nifty fifty". Best first prime for any Canon DSLR.' },
      { name: 'Nikon AF-S 50mm f/1.8G',      brand: 'Nikon',    mount: 'Nikon F',   price: 219,  type: 'Prime',  note: 'Essential first prime for Nikon DSLR shooters.' },
    ],
  },
  {
    id: 'wildlife',
    label: 'Wildlife & Sports',
    icon: '🦅',
    color: '#22c55e',
    fov: '200–600mm (equiv.)',
    tip: 'Use Continuous AF (AI Servo/C-AF) and burst mode. Fast telephoto reaches distant subjects without disturbing wildlife.',
    lenses: [
      { name: 'Sony FE 200-600mm f/5.6-6.3G', brand: 'Sony',    mount: 'Sony E',   price: 1999, type: 'Zoom',  note: 'Ultimate wildlife zoom for Sony. Extremely sharp.' },
      { name: 'Sony FE 100-400mm f/4.5-5.6 GM', brand: 'Sony',  mount: 'Sony E',   price: 2498, type: 'Zoom',  note: 'Premium range with GM-grade optics. Great AF.' },
      { name: 'Canon RF 100-500mm f/4.5-7.1L',  brand: 'Canon', mount: 'Canon RF', price: 2699, type: 'Zoom',  note: 'The go-to Canon wildlife lens. L-grade quality.' },
      { name: 'Nikon Z 100-400mm f/4.5-5.6 S',  brand: 'Nikon', mount: 'Nikon Z',  price: 2696, type: 'Zoom',  note: 'Compact but powerful. Great for action and birds.' },
      { name: 'Tamron 150-500mm f/5-6.7 Di III', brand: 'Tamron', mount: 'Sony E / Nikon Z', price: 799, type: 'Zoom', note: 'Outstanding budget option. Huge reach at low cost.' },
      { name: 'Sigma 100-400mm f/5-6.3 DG DN', brand: 'Sigma',  mount: 'Multi',    price: 799,  type: 'Zoom',  note: 'Budget tele zoom. Available Sony E and L-mount.' },
      { name: 'Canon EF 100-400mm f/4.5-5.6L IS II', brand: 'Canon', mount: 'Canon EF', price: 2499, type: 'Zoom', note: 'Classic Canon wildlife lens. Excellent IS system.' },
      { name: 'Nikon AF-S 200-500mm f/5.6E VR', brand: 'Nikon', mount: 'Nikon F',  price: 1499, type: 'Zoom',  note: 'Massive reach at a DSLR-friendly price. VR works great.' },
    ],
  },
  {
    id: 'landscape',
    label: 'Landscape',
    icon: '🏔',
    color: '#22d3ee',
    fov: '10–35mm (equiv.)',
    tip: 'Shoot at f/8–f/11 for maximum sharpness front to back. Golden hour + wide angle + tripod = the magic formula.',
    lenses: [
      { name: 'Sony FE 12-24mm f/2.8 GM',    brand: 'Sony',     mount: 'Sony E',    price: 2999, type: 'Zoom',  note: 'Fastest ultra-wide zoom available. Extraordinary quality.' },
      { name: 'Sony FE 16-35mm f/2.8 GM II',  brand: 'Sony',     mount: 'Sony E',    price: 2299, type: 'Zoom',  note: 'Compact f/2.8 wide zoom. Updated with better sharpness.' },
      { name: 'Canon RF 14-35mm f/4L IS',     brand: 'Canon',    mount: 'Canon RF',  price: 1699, type: 'Zoom',  note: 'Ultra sharp, compact, with IS. Superb for landscapes.' },
      { name: 'Canon RF 15-35mm f/2.8L IS',   brand: 'Canon',    mount: 'Canon RF',  price: 2299, type: 'Zoom',  note: 'L-grade sharpness with IS. Landscape and astro workhorse.' },
      { name: 'Nikon Z 14-24mm f/2.8 S',      brand: 'Nikon',    mount: 'Nikon Z',   price: 2396, type: 'Zoom',  note: 'Best ultra-wide zoom in the Z lineup. Astrophotography king.' },
      { name: 'Fuji XF 10-24mm f/4 R OIS WR', brand: 'Fujifilm', mount: 'Fuji X',    price: 799,  type: 'Zoom',  note: 'Wide 15–36mm equiv. OIS + weather resistance for outdoor work.' },
      { name: 'Sigma 14-24mm f/2.8 DG DN Art', brand: 'Sigma',   mount: 'Multi',     price: 1299, type: 'Zoom',  note: 'Third-party benchmark. Available Sony E and L-mount.' },
      { name: 'Canon EF 16-35mm f/4L IS',     brand: 'Canon',    mount: 'Canon EF',  price: 1099, type: 'Zoom',  note: 'Sharpest EF wide zoom. A staple for landscape DSLRists.' },
    ],
  },
  {
    id: 'street',
    label: 'Street & Travel',
    icon: '🏙',
    color: '#a78bfa',
    fov: '28–50mm (equiv.)',
    tip: 'Compact, quiet, and inconspicuous wins on the street. Prime lenses force creative framing and reduce gear anxiety.',
    lenses: [
      { name: 'Sony FE 35mm f/1.8',           brand: 'Sony',     mount: 'Sony E',    price: 748,  type: 'Prime', note: 'Compact and fast. Perfect walkaround for street work.' },
      { name: 'Sony FE 24mm f/2.8G',          brand: 'Sony',     mount: 'Sony E',    price: 598,  type: 'Prime', note: 'Ultra-compact G-series prime. Great in tight spaces.' },
      { name: 'Canon RF 35mm f/1.8 IS Macro', brand: 'Canon',    mount: 'Canon RF',  price: 449,  type: 'Prime', note: 'Affordable and light. IS system helps in low light.' },
      { name: 'Canon RF 28mm f/2.8',          brand: 'Canon',    mount: 'Canon RF',  price: 299,  type: 'Prime', note: 'Pancake design — barely adds bulk. Great street option.' },
      { name: 'Nikon Z 26mm f/2.8',           brand: 'Nikon',    mount: 'Nikon Z',   price: 346,  type: 'Prime', note: 'Ultra-thin pancake. Makes Z50 II/Z30 a pocket camera.' },
      { name: 'Nikon Z 40mm f/2',             brand: 'Nikon',    mount: 'Nikon Z',   price: 276,  type: 'Prime', note: 'Classic perspective at an incredibly affordable price.' },
      { name: 'Fuji XF 23mm f/2 R WR',        brand: 'Fujifilm', mount: 'Fuji X',    price: 449,  type: 'Prime', note: '35mm-equiv with weather sealing. A legendary Fuji street lens.' },
      { name: 'Fuji XF 35mm f/2 R WR',        brand: 'Fujifilm', mount: 'Fuji X',    price: 399,  type: 'Prime', note: 'Compact 53mm-equiv. Fast, sharp, weather-sealed perfection.' },
    ],
  },
  {
    id: 'video',
    label: 'Video & Hybrid',
    icon: '🎬',
    color: '#f43f5e',
    fov: '24–70mm (equiv.)',
    tip: 'Smooth, silent AF is critical for video. Cine-style lenses have de-clicked aperture rings and consistent T-stops.',
    lenses: [
      { name: 'Sony FE 24-70mm f/2.8 GM II',  brand: 'Sony',     mount: 'Sony E',    price: 2299, type: 'Zoom', note: 'The standard video zoom for Sony. Compact, fast, pristine.' },
      { name: 'Canon RF 24-70mm f/2.8L IS',   brand: 'Canon',    mount: 'Canon RF',  price: 2299, type: 'Zoom', note: 'IS + fast AF makes this a versatile video workhorse.' },
      { name: 'Sigma 18-35mm f/1.8 DC Art',   brand: 'Sigma',    mount: 'Multi',     price: 799,  type: 'Zoom', note: 'APS-C zoom equivalent to f/1.8 prime. Cinematic shallow DOF.' },
      { name: 'Tamron 17-28mm f/2.8 Di III',  brand: 'Tamron',   mount: 'Sony E',    price: 799,  type: 'Zoom', note: 'Compact wide zoom. Great for run-and-gun documentary work.' },
      { name: 'Fuji XF 16-80mm f/4 R OIS WR', brand: 'Fujifilm', mount: 'Fuji X',    price: 699,  type: 'Zoom', note: '5.5-stop OIS. Versatile hybrid lens for photos and video.' },
      { name: 'Laowa 10mm f/2.8 Zero-D',      brand: 'Laowa',    mount: 'Multi',     price: 549,  type: 'Prime', note: 'Zero distortion ultra-wide for architectural/cinematic video.' },
    ],
  },
  {
    id: 'macro',
    label: 'Macro',
    icon: '🌸',
    color: '#e879f9',
    fov: '90–105mm',
    tip: 'True 1:1 macro requires dedicated macro lenses. Use a focusing rail and ring light for precise control at extreme close distances.',
    lenses: [
      { name: 'Sony FE 90mm f/2.8 Macro G',   brand: 'Sony',     mount: 'Sony E',    price: 1098, type: 'Prime', note: 'OSS-stabilised macro with beautiful bokeh for subject isolation.' },
      { name: 'Canon RF 100mm f/2.8L Macro IS', brand: 'Canon',  mount: 'Canon RF',  price: 1299, type: 'Prime', note: '1.4x magnification — beyond 1:1. Hybrid IS for handheld macro.' },
      { name: 'Nikon Z MC 105mm f/2.8 VR S',   brand: 'Nikon',   mount: 'Nikon Z',   price: 1096, type: 'Prime', note: 'True 1:1 with excellent VR. Outstanding sharpness edge-to-edge.' },
      { name: 'Fuji XF 80mm f/2.8 R LM OIS WR', brand: 'Fujifilm', mount: 'Fuji X',  price: 699,  type: 'Prime', note: 'Weather-sealed 1:1 macro for Fuji. OIS is a big help.' },
      { name: 'Sigma 105mm f/2.8 DG DN Macro Art', brand: 'Sigma', mount: 'Multi',   price: 799,  type: 'Prime', note: 'Third-party benchmark. Outstanding optics at a fair price.' },
      { name: 'Tamron 90mm f/2.8 Di III Macro', brand: 'Tamron', mount: 'Sony E',    price: 699,  type: 'Prime', note: 'Budget 1:1 macro for Sony. Reliable AF and good sharpness.' },
    ],
  },
];

const BRANDS   = ['All', 'Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'OM System'];
const TYPES    = ['All', 'Mirrorless', 'DSLR'];
const SENSORS  = ['All', 'Full Frame', 'APS-C', 'Micro Four Thirds'];
const BUDGETS  = [
  { label: 'All budgets', max: Infinity },
  { label: 'Under $800',  max: 800 },
  { label: 'Under $1,500', max: 1500 },
  { label: 'Under $2,500', max: 2500 },
];

const COMPARE_SPECS = [
  { key: 'mp',      label: 'Megapixels',       unit: 'MP',  higherBetter: true },
  { key: 'fps',     label: 'Max Burst',         unit: 'fps', higherBetter: true },
  { key: 'battery', label: 'Battery Life',      unit: ' shots', higherBetter: true },
  { key: 'weight',  label: 'Weight',            unit: 'g',   higherBetter: false },
  { key: 'price',   label: 'Price',             unit: '',    higherBetter: false, fmt: v => `$${v.toLocaleString()}` },
];

const brandColor = b => ({ Canon: '#CC0000', Nikon: '#f59e0b', Sony: '#7c6ff7', Fujifilm: '#22c55e', Panasonic: '#3b82f6', 'OM System': '#06b6d4' }[b] || '#888');

/* ─── BROWSER TAB ─── */
function BrowserTab() {
  const [brand,  setBrand]  = useState('All');
  const [type,   setType]   = useState('All');
  const [sensor, setSensor] = useState('All');
  const [budget, setBudget] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => CAMERAS.filter(c => {
    if (brand  !== 'All' && c.brand  !== brand)  return false;
    if (type   !== 'All' && c.type   !== type)   return false;
    if (sensor !== 'All' && c.sensor !== sensor) return false;
    if (c.price > BUDGETS[budget].max)           return false;
    return true;
  }), [brand, type, sensor, budget]);

  return (
    <div>
      {/* Filters */}
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Brand</span>
          <div className={styles.filterBtns}>
            {BRANDS.map(b => (
              <button key={b} className={`${styles.filterBtn} ${brand === b ? styles.filterBtnActive : ''}`}
                onClick={() => setBrand(b)}>{b}</button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Type</span>
          <div className={styles.filterBtns}>
            {TYPES.map(t => (
              <button key={t} className={`${styles.filterBtn} ${type === t ? styles.filterBtnActive : ''}`}
                onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Sensor</span>
          <div className={styles.filterBtns}>
            {SENSORS.map(s => (
              <button key={s} className={`${styles.filterBtn} ${sensor === s ? styles.filterBtnActive : ''}`}
                onClick={() => setSensor(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Budget</span>
          <div className={styles.filterBtns}>
            {BUDGETS.map((b, i) => (
              <button key={i} className={`${styles.filterBtn} ${budget === i ? styles.filterBtnActive : ''}`}
                onClick={() => setBudget(i)}>{b.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.resultsCount}>{filtered.length} camera{filtered.length !== 1 ? 's' : ''} found</div>

      {/* Camera grid */}
      <div className={styles.cameraGrid}>
        {filtered.map(cam => (
          <div key={cam.id} className={styles.cameraCard}>
            <div className={styles.cameraCardTop}>
              <div className={styles.brandBadge} style={{ background: brandColor(cam.brand) + '20', color: brandColor(cam.brand), borderColor: brandColor(cam.brand) + '50' }}>
                {cam.brand}
              </div>
              <div className={styles.cameraType}>{cam.type} · {cam.sensor}</div>
            </div>

            <div className={styles.cameraName}>{cam.name}</div>
            <div className={styles.cameraYear}>{cam.year} · {cam.mount}</div>

            <div className={styles.cameraSpecRow}>
              <div className={styles.cameraSpec}><span className={styles.specIcon}>◈</span>{cam.mp}MP</div>
              <div className={styles.cameraSpec}><span className={styles.specIcon}>△</span>{cam.fps}fps</div>
              <div className={styles.cameraSpec}><span className={styles.specIcon}>◑</span>{cam.isoRange}</div>
              <div className={styles.cameraSpec}><span className={styles.specIcon}>▷</span>{cam.video}</div>
            </div>

            <div className={styles.cameraFeatures}>
              {cam.ibis    && <span className={styles.featureTag}>IBIS</span>}
              {cam.weather && <span className={styles.featureTag}>Weather</span>}
              {cam.vf === 'EVF' && <span className={styles.featureTag}>EVF</span>}
              {cam.vf === 'OVF' && <span className={styles.featureTag} style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>OVF</span>}
              <span className={styles.featureTag} style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}>🔋 {cam.battery}</span>
            </div>

            <div className={styles.cameraVerdict}>{cam.verdict}</div>

            <div className={styles.cameraBestFor}>
              {cam.bestFor.map(tag => (
                <span key={tag} className={styles.bestForTag}>{tag}</span>
              ))}
            </div>

            <button className={styles.expandBtn} onClick={() => setExpanded(expanded === cam.id ? null : cam.id)}>
              {expanded === cam.id ? '▲ Less' : '▼ Full specs'}
            </button>

            {expanded === cam.id && (
              <div className={styles.expandedSpecs}>
                {[
                  ['Sensor', `${cam.sensor} · ${cam.mp}MP`],
                  ['ISO Range', cam.isoRange],
                  ['Burst Speed', `${cam.fps}fps`],
                  ['AF System', cam.af],
                  ['Video', cam.video],
                  ['Stabilisation', cam.ibis ? 'In-body (IBIS)' : 'Lens-based only'],
                  ['Weather Sealed', cam.weather ? 'Yes' : 'No'],
                  ['Viewfinder', cam.vf],
                  ['Battery', `${cam.battery} shots (CIPA)`],
                  ['Weight', `${cam.weight}g`],
                  ['Mount', cam.mount],
                  ['Price', `~$${cam.price.toLocaleString()} USD`],
                ].map(([label, value]) => (
                  <div key={label} className={styles.specRow}>
                    <span className={styles.specRowLabel}>{label}</span>
                    <span className={styles.specRowValue}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.cameraPrice}>${cam.price.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.emptyState}>No cameras match your current filters.</div>
      )}
    </div>
  );
}

/* ─── COMPARE TAB ─── */
function CompareTab() {
  const [camA, setCamA] = useState('sony-a7iv');
  const [camB, setCamB] = useState('nikon-z6iii');

  const A = CAMERAS.find(c => c.id === camA);
  const B = CAMERAS.find(c => c.id === camB);

  const winner = (key, higherBetter) => {
    if (!A || !B) return null;
    const vA = A[key], vB = B[key];
    if (vA === vB) return 'tie';
    return (vA > vB) === higherBetter ? 'A' : 'B';
  };

  return (
    <div>
      {/* Pickers */}
      <div className={styles.comparePickers}>
        {[{ val: camA, set: setCamA, label: 'Camera A' }, { val: camB, set: setCamB, label: 'Camera B' }].map(({ val, set, label }) => (
          <div key={label} className={styles.comparePicker}>
            <div className={styles.comparePickerLabel}>{label}</div>
            <select className={styles.compareSelect} value={val} onChange={e => set(e.target.value)}>
              {CAMERAS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {A && B && (
        <div className={styles.compareTable}>
          {/* Header */}
          <div className={styles.compareHeader}>
            <div className={styles.compareHeaderSpec}>Specification</div>
            <div className={styles.compareHeaderCam}>
              <div className={styles.compareHeaderName}>{A.name}</div>
              <div className={styles.compareHeaderSub}>{A.brand} · {A.year}</div>
            </div>
            <div className={styles.compareHeaderCam}>
              <div className={styles.compareHeaderName}>{B.name}</div>
              <div className={styles.compareHeaderSub}>{B.brand} · {B.year}</div>
            </div>
          </div>

          {/* Spec rows */}
          {[
            { label: 'Sensor', keyA: c => c.sensor, keyB: null, compare: false },
            { label: 'Megapixels', keyA: c => `${c.mp}MP`, compare: true, raw: 'mp', higherBetter: true },
            { label: 'ISO Range', keyA: c => c.isoRange, compare: false },
            { label: 'Burst Speed', keyA: c => `${c.fps}fps`, compare: true, raw: 'fps', higherBetter: true },
            { label: 'AF System', keyA: c => c.af, compare: false },
            { label: 'Video', keyA: c => c.video, compare: false },
            { label: 'Stabilisation', keyA: c => c.ibis ? 'In-body (IBIS)' : 'None', compare: false },
            { label: 'Weather Sealed', keyA: c => c.weather ? '✓ Yes' : '✗ No', compare: false },
            { label: 'Viewfinder', keyA: c => c.vf, compare: false },
            { label: 'Battery Life', keyA: c => `${c.battery} shots`, compare: true, raw: 'battery', higherBetter: true },
            { label: 'Weight', keyA: c => `${c.weight}g`, compare: true, raw: 'weight', higherBetter: false },
            { label: 'Mount', keyA: c => c.mount, compare: false },
            { label: 'Price', keyA: c => `$${c.price.toLocaleString()}`, compare: true, raw: 'price', higherBetter: false },
          ].map(row => {
            const w = row.compare ? winner(row.raw, row.higherBetter) : null;
            return (
              <div key={row.label} className={styles.compareRow}>
                <div className={styles.compareRowLabel}>{row.label}</div>
                {[A, B].map((cam, idx) => {
                  const side = idx === 0 ? 'A' : 'B';
                  const isWinner = w === side;
                  const isTie = w === 'tie';
                  return (
                    <div key={idx} className={`${styles.compareCell} ${isWinner ? styles.compareCellWin : ''} ${isTie ? styles.compareCellTie : ''}`}>
                      {row.keyA(cam)}
                      {isWinner && <span className={styles.winBadge}>✓</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── LENS GUIDE TAB ─── */
function LensGuideTab() {
  const [activeCategory, setActiveCategory] = useState('portrait');
  const [brandFilter, setBrandFilter] = useState('All');

  const category = LENS_CATEGORIES.find(c => c.id === activeCategory);
  const lensFiltered = brandFilter === 'All' ? category.lenses : category.lenses.filter(l => l.brand === brandFilter);
  const lensFilterBrands = ['All', ...new Set(category.lenses.map(l => l.brand))];

  return (
    <div>
      {/* Category tabs */}
      <div className={styles.lensCategoryRow}>
        {LENS_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.lensCatBtn} ${activeCategory === cat.id ? styles.lensCatBtnActive : ''}`}
            onClick={() => { setActiveCategory(cat.id); setBrandFilter('All'); }}
            style={activeCategory === cat.id ? { borderColor: cat.color, color: cat.color, background: cat.color + '15' } : {}}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Category info */}
      <div className={styles.lensCategoryInfo} style={{ borderColor: category.color + '40' }}>
        <div className={styles.lensCatFov}>
          <span style={{ color: category.color }}>📐</span> Typical range: {category.fov}
        </div>
        <p className={styles.lensCatTip}>💡 {category.tip}</p>
      </div>

      {/* Brand filter */}
      <div className={styles.lensBrandRow}>
        {lensFilterBrands.map(b => (
          <button key={b} className={`${styles.filterBtn} ${brandFilter === b ? styles.filterBtnActive : ''}`}
            onClick={() => setBrandFilter(b)}>{b}</button>
        ))}
      </div>

      {/* Lens grid */}
      <div className={styles.lensGrid}>
        {lensFiltered.map((lens, i) => (
          <div key={i} className={styles.lensCard}>
            <div className={styles.lensCardTop}>
              <span className={styles.lensMountBadge}>{lens.mount}</span>
              <span className={styles.lensTypeBadge}>{lens.type}</span>
            </div>
            <div className={styles.lensName}>{lens.name}</div>
            <div className={styles.lensNote}>{lens.note}</div>
            <div className={styles.lensPrice}>${lens.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Cameras() {
  const [tab, setTab] = useState('browse');

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>📷 Camera & Lens Hub</h1>
        <p>Latest DSLR and mirrorless cameras compared — specs, verdicts, and lens recommendations all in one place.</p>
      </div>

      <div className={`${styles.tabs} fade-up-1`}>
        {[
          { id: 'browse',  label: '◈ Browse Cameras' },
          { id: 'compare', label: '⊞ Compare' },
          { id: 'lenses',  label: '○ Lens Guide' },
        ].map(t => (
          <button key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </div>

      <div className={`${styles.content} fade-up-2`}>
        {tab === 'browse'  && <BrowserTab />}
        {tab === 'compare' && <CompareTab />}
        {tab === 'lenses'  && <LensGuideTab />}
      </div>
    </div>
  );
}
