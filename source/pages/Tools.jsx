import { useState, useMemo } from 'react';
import styles from './Tools.module.css';

/* ─── SHARED CAMERA DATA ─── */
const APERTURE_VALS   = [1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16];
const SHUTTER_LABELS  = ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1/15s','1/8s','1/4s','1/2s','1s','2s','4s'];
const SHUTTER_SECONDS = [1/4000,1/2000,1/1000,1/500,1/250,1/125,1/60,1/30,1/15,1/8,1/4,1/2,1,2,4];
const ISO_VALS        = [100,200,400,800,1600,3200,6400,12800];

const nearest = (arr, val) => arr.reduce((best, v, i) =>
  Math.abs(v - val) < Math.abs(arr[best] - val) ? i : best, 0);

/* ─── TABS ─── */
export default function Tools() {
  const [tab, setTab] = useState('exposure-calc');
  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>⚙ Photographer's Toolkit</h1>
        <p>Calculators and decoders built for real shooting decisions.</p>
      </div>

      <div className={`${styles.tabs} fade-up-1`}>
        {[
          { id: 'exposure-calc', label: '△ Exposure Calculator' },
          { id: 'hyperfocal',    label: '◎ Hyperfocal Distance' },
          { id: 'exif',         label: '⊟ EXIF Decoder' },
          { id: 'fov',          label: '○ Field of View' },
          { id: 'goldenhour',   label: '☀ Golden Hour' },
        ].map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </div>

      <div className={`${styles.toolContainer} fade-up-2`}>
        {tab === 'exposure-calc' && <ExposureCalculator />}
        {tab === 'hyperfocal'    && <HyperfocalCalculator />}
        {tab === 'exif'         && <ExifDecoder />}
        {tab === 'fov'          && <FovCalculator />}
        {tab === 'goldenhour'   && <GoldenHourCalculator />}
      </div>
    </div>
  );
}

/* ─── EXPOSURE CALCULATOR ─── */
const SCENES = [
  { id: 'sunny_beach', name: 'Bright Sun / Beach / Snow', icon: '☀', ev: 16, desc: 'Clear blue sky, hard shadows, very high reflectivity' },
  { id: 'sunny',       name: 'Sunny Day',                 icon: '🌤', ev: 15, desc: 'Clear sky, full sun, sharp shadows on the ground' },
  { id: 'overcast',    name: 'Slightly Overcast',         icon: '⛅', ev: 13, desc: 'Thin clouds, soft shadows, even diffused light' },
  { id: 'heavy',       name: 'Heavy Overcast / Rain',     icon: '🌧', ev: 11, desc: 'Thick cloud cover, no visible shadows' },
  { id: 'shade',       name: 'Open Shade',                icon: '🌥', ev: 12, desc: 'Subject in shadow on a sunny day, blue sky overhead' },
  { id: 'sunset',      name: 'Sunset / Golden Hour',      icon: '🌅', ev: 11, desc: 'Sun near horizon, warm directional light' },
  { id: 'indoor_day',  name: 'Indoor (Daylight Window)',  icon: '🪟', ev: 9,  desc: 'Well-lit room with natural light from windows' },
  { id: 'indoor_lamp', name: 'Indoor (Lamp / LED)',       icon: '💡', ev: 7,  desc: 'Typical home or office artificial lighting' },
  { id: 'stage',       name: 'Stage / Concert',           icon: '🎭', ev: 7,  desc: 'Mixed artificial spot lighting on performers' },
  { id: 'night_city',  name: 'Night (City Streets)',      icon: '🌃', ev: 5,  desc: 'Street lights, signs, illuminated storefronts' },
  { id: 'night_dark',  name: 'Night (Dark / Moonlit)',    icon: '🌙', ev: 2,  desc: 'Rural dark sky, moonlight, no city glow' },
  { id: 'candle',      name: 'Candlelit',                 icon: '🕯', ev: 3,  desc: 'Very low, warm candle or firelight only' },
];

function ExposureCalculator() {
  const [sceneId,   setSceneId]   = useState('sunny');
  const [priority,  setPriority]  = useState('aperture');
  const [lockAp,    setLockAp]    = useState(4);   // index: f/4
  const [lockSh,    setLockSh]    = useState(4);   // index: 1/250s
  const [lockIso,   setLockIso]   = useState(0);   // index: ISO 100

  const scene = SCENES.find(s => s.id === sceneId);
  const ev    = scene.ev;

  // Solve for missing values
  let sugAp = lockAp, sugSh = lockSh, sugIso = lockIso;
  let warnings = [];

  if (priority === 'aperture') {
    const f   = APERTURE_VALS[lockAp];
    const iso = ISO_VALS[lockIso];
    // t = f² / (2^EV * iso/100)
    const tIdeal = (f * f) / (Math.pow(2, ev) * iso / 100);
    let shIdx = nearest(SHUTTER_SECONDS, tIdeal);
    sugSh = shIdx;

    // If shutter is too slow, bump ISO
    if (shIdx >= 7 && lockIso < ISO_VALS.length - 1) {
      // Try ISO 400
      const isoTry = Math.min(ISO_VALS.length - 1, lockIso + 2);
      const tRetry = (f * f) / (Math.pow(2, ev) * ISO_VALS[isoTry] / 100);
      sugSh = nearest(SHUTTER_SECONDS, tRetry);
      sugIso = isoTry;
      warnings.push(`Shutter too slow for handheld — bumped ISO to ${ISO_VALS[isoTry]}.`);
    }
    if (SHUTTER_SECONDS[sugSh] < 1/60) {
      warnings.push('Slow shutter risk — use a tripod or image stabilisation.');
    }

  } else if (priority === 'shutter') {
    const t   = SHUTTER_SECONDS[lockSh];
    const iso = ISO_VALS[lockIso];
    // f = sqrt(t * 2^EV * iso/100)
    const fIdeal = Math.sqrt(t * Math.pow(2, ev) * iso / 100);
    let apIdx = nearest(APERTURE_VALS, fIdeal);
    sugAp = apIdx;

    if (apIdx >= APERTURE_VALS.length - 1) {
      // Hit f/16, need more ISO
      const isoTry = Math.min(ISO_VALS.length - 1, lockIso + 2);
      const fRetry = Math.sqrt(t * Math.pow(2, ev) * ISO_VALS[isoTry] / 100);
      sugAp = nearest(APERTURE_VALS, fRetry);
      sugIso = isoTry;
      warnings.push(`Need to raise ISO to ${ISO_VALS[isoTry]} to achieve this shutter speed.`);
    }
    if (apIdx === 0 && ISO_VALS[lockIso] > 100) {
      warnings.push('Very wide aperture — lower ISO first to regain some control.');
    }

  } else {
    // ISO priority — suggest balanced aperture + shutter
    const iso = ISO_VALS[lockIso];
    // Aim for f/5.6 in good light, f/2.8 in low light
    const targetAp = ev >= 12 ? 5.6 : ev >= 8 ? 2.8 : 1.8;
    const apIdx = nearest(APERTURE_VALS, targetAp);
    const f = APERTURE_VALS[apIdx];
    const tIdeal = (f * f) / (Math.pow(2, ev) * iso / 100);
    sugAp = apIdx;
    sugSh = nearest(SHUTTER_SECONDS, tIdeal);
    if (SHUTTER_SECONDS[sugSh] < 1/60) warnings.push('Slow shutter — consider tripod.');
  }

  // Noise level from ISO
  const noiseLabel = sugIso <= 1 ? 'Clean' : sugIso <= 3 ? 'Low noise' : sugIso <= 5 ? 'Visible grain' : 'Heavy grain';
  const dofLabel   = sugAp <= 1 ? 'Very shallow' : sugAp <= 3 ? 'Shallow (bokeh)' : sugAp <= 5 ? 'Moderate' : 'Deep';
  const motLabel   = sugSh <= 2 ? 'Frozen (sport)' : sugSh <= 4 ? 'Frozen' : sugSh <= 6 ? 'Sharp' : sugSh <= 8 ? 'Blur risk' : 'Motion blur';

  return (
    <div className={styles.toolPanel}>
      <div className={styles.toolGrid2}>
        {/* Scene selector */}
        <div>
          <div className={styles.sectionLabel}>Scene Type</div>
          <div className={styles.sceneGrid}>
            {SCENES.map(s => (
              <button
                key={s.id}
                className={`${styles.sceneBtn} ${sceneId === s.id ? styles.sceneBtnActive : ''}`}
                onClick={() => setSceneId(s.id)}
                title={s.desc}
              >
                <span className={styles.sceneBtnIcon}>{s.icon}</span>
                <span className={styles.sceneBtnName}>{s.name}</span>
                <span className={styles.sceneBtnEV}>EV {s.ev}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls + Results */}
        <div className={styles.calcRight}>
          <div className={styles.sceneInfo}>
            <span className={styles.sceneInfoIcon}>{scene.icon}</span>
            <div>
              <div className={styles.sceneInfoName}>{scene.name}</div>
              <div className={styles.sceneInfoDesc}>{scene.desc}</div>
            </div>
            <div className={styles.evBadge}>EV {ev}</div>
          </div>

          {/* Priority */}
          <div className={styles.sectionLabel}>Shooting Priority</div>
          <div className={styles.priorityRow}>
            {[
              { id: 'aperture', label: 'Aperture Priority', sub: 'You pick f-stop' },
              { id: 'shutter',  label: 'Shutter Priority',  sub: 'You pick shutter' },
              { id: 'iso',      label: 'ISO Priority',       sub: 'You pick ISO' },
            ].map(p => (
              <button
                key={p.id}
                className={`${styles.priorityBtn} ${priority === p.id ? styles.priorityActive : ''}`}
                onClick={() => setPriority(p.id)}
              >
                <div className={styles.priorityBtnLabel}>{p.label}</div>
                <div className={styles.priorityBtnSub}>{p.sub}</div>
              </button>
            ))}
          </div>

          {/* Lock control */}
          <div className={styles.lockControl}>
            {priority === 'aperture' && (
              <>
                <ToolSlider label="Your Aperture" color="#f5a623" value={lockAp} min={0} max={APERTURE_VALS.length-1}
                  display={`f/${APERTURE_VALS[lockAp]}`} onChange={setLockAp} />
                <ToolSlider label="ISO" color="#e879f9" value={lockIso} min={0} max={ISO_VALS.length-1}
                  display={`ISO ${ISO_VALS[lockIso]}`} onChange={setLockIso} />
              </>
            )}
            {priority === 'shutter' && (
              <>
                <ToolSlider label="Your Shutter Speed" color="#22d3ee" value={lockSh} min={0} max={SHUTTER_LABELS.length-1}
                  display={SHUTTER_LABELS[lockSh]} onChange={setLockSh} />
                <ToolSlider label="ISO" color="#e879f9" value={lockIso} min={0} max={ISO_VALS.length-1}
                  display={`ISO ${ISO_VALS[lockIso]}`} onChange={setLockIso} />
              </>
            )}
            {priority === 'iso' && (
              <ToolSlider label="Your ISO" color="#e879f9" value={lockIso} min={0} max={ISO_VALS.length-1}
                display={`ISO ${ISO_VALS[lockIso]}`} onChange={setLockIso} />
            )}
          </div>

          {/* Results */}
          <div className={styles.sectionLabel}>Suggested Settings</div>
          <div className={styles.resultGrid}>
            <ResultCard label="Aperture" value={`f/${APERTURE_VALS[sugAp]}`} sub={dofLabel}
              color="#f5a623" locked={priority === 'aperture'} />
            <ResultCard label="Shutter" value={SHUTTER_LABELS[sugSh]} sub={motLabel}
              color="#22d3ee" locked={priority === 'shutter'} />
            <ResultCard label="ISO" value={`${ISO_VALS[sugIso]}`} sub={noiseLabel}
              color="#e879f9" locked={priority === 'iso'} />
          </div>

          {warnings.length > 0 && (
            <div className={styles.warnings}>
              {warnings.map((w, i) => (
                <div key={i} className={styles.warningItem}>⚠ {w}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, color, locked }) {
  return (
    <div className={`${styles.resultCard} ${locked ? styles.resultCardLocked : ''}`} style={{ borderColor: color + '40' }}>
      {locked && <div className={styles.lockedBadge}>You set this</div>}
      <div className={styles.resultLabel}>{label}</div>
      <div className={styles.resultValue} style={{ color }}>{value}</div>
      <div className={styles.resultSub}>{sub}</div>
    </div>
  );
}

function ToolSlider({ label, color, value, min, max, display, onChange }) {
  return (
    <div className={styles.toolSliderBlock}>
      <div className={styles.toolSliderRow}>
        <span className={styles.toolSliderLabel}>{label}</span>
        <span className={styles.toolSliderVal} style={{ color }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={styles.toolSlider}
        style={{ '--tc': color }}
      />
    </div>
  );
}

/* ─── HYPERFOCAL DISTANCE CALCULATOR ─── */
const SENSORS = [
  { name: 'Full Frame (35mm)', coc: 0.029 },
  { name: 'APS-C (Canon)',     coc: 0.019 },
  { name: 'APS-C (Nikon/Sony)', coc: 0.020 },
  { name: 'Micro 4/3',         coc: 0.015 },
  { name: 'Smartphone',        coc: 0.006 },
];

function HyperfocalCalculator() {
  const [sensor,      setSensor]     = useState(0);
  const [focalLength, setFocalLength] = useState(50);   // mm
  const [aperture,    setAperture]   = useState(4);     // index

  const coc = SENSORS[sensor].coc;
  const f   = APERTURE_VALS[aperture];
  const fl  = focalLength;

  // H = fl² / (f * coc) + fl  (in mm, then convert to m)
  const H_mm  = (fl * fl) / (f * coc) + fl;
  const H_m   = H_mm / 1000;
  const near  = H_m / 2;
  const hStr  = H_m > 999 ? '>999m' : H_m.toFixed(2) + 'm';
  const nearStr = near > 999 ? '>999m' : near.toFixed(2) + 'm';

  const tooFar = H_m > 50;

  return (
    <div className={styles.toolPanel}>
      <div className={styles.toolGrid2}>
        <div>
          <div className={styles.sectionLabel}>Camera Sensor</div>
          <div className={styles.sensorGrid}>
            {SENSORS.map((s, i) => (
              <button
                key={i}
                className={`${styles.sensorBtn} ${sensor === i ? styles.sensorBtnActive : ''}`}
                onClick={() => setSensor(i)}
              >
                <div className={styles.sensorName}>{s.name}</div>
                <div className={styles.sensorCoc}>CoC {s.coc}mm</div>
              </button>
            ))}
          </div>

          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Focal Length</div>
          <div className={styles.flRow}>
            <input
              type="range" min={12} max={400} value={focalLength}
              onChange={e => setFocalLength(Number(e.target.value))}
              className={styles.toolSlider}
              style={{ '--tc': '#7c6ff7', flex: 1 }}
            />
            <span className={styles.flVal}>{focalLength}mm</span>
          </div>

          <div className={styles.sectionLabel} style={{ marginTop: 16 }}>Aperture</div>
          <ToolSlider label="" color="#f5a623" value={aperture} min={0} max={APERTURE_VALS.length-1}
            display={`f/${APERTURE_VALS[aperture]}`} onChange={setAperture} />
        </div>

        {/* Results */}
        <div>
          <div className={styles.sectionLabel}>Results</div>
          <div className={styles.hfResults}>
            <div className={styles.hfMain}>
              <div className={styles.hfMainLabel}>Hyperfocal Distance</div>
              <div className={styles.hfMainVal}>{hStr}</div>
              <div className={styles.hfMainSub}>
                Focus at this distance for maximum sharpness
              </div>
            </div>

            <div className={styles.hfGrid}>
              <div className={styles.hfCard}>
                <div className={styles.hfCardLabel}>Near Limit</div>
                <div className={styles.hfCardVal} style={{ color: '#22c55e' }}>{nearStr}</div>
                <div className={styles.hfCardSub}>Closest sharp point (H/2)</div>
              </div>
              <div className={styles.hfCard}>
                <div className={styles.hfCardLabel}>Far Limit</div>
                <div className={styles.hfCardVal} style={{ color: '#22d3ee' }}>∞</div>
                <div className={styles.hfCardSub}>Everything to infinity sharp</div>
              </div>
            </div>

            <div className={styles.hfExplain}>
              <strong>💡 In practice:</strong>{' '}
              {tooFar
                ? `${hStr} is impractical with ${fl}mm at f/${f}. Use a wider aperture like f/8–f/16 or a shorter focal length to bring this into shooting range.`
                : `Set your focus to ${hStr} and everything from ${nearStr} to infinity will be acceptably sharp. Great for landscapes and street photography.`}
            </div>

            <div className={styles.hfFormula}>
              <span className={styles.hfFormulaLabel}>Formula</span>
              <span className={styles.hfFormulaVal}>H = f² ÷ (N × c) + f</span>
              <span className={styles.hfFormulaVars}>{fl}mm² ÷ (f/{f} × {coc}mm) = {hStr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXIF DECODER ─── */
const SAMPLE_EXIF = `Make: Canon
Model: EOS 5D Mark IV
Aperture: f/2.8
Shutter Speed: 1/500s
ISO: 800
Focal Length: 85mm
Exposure Mode: Aperture Priority
Metering Mode: Evaluative
White Balance: Auto
Flash: Flash did not fire`;

function parseExif(text) {
  if (!text.trim()) return null;

  const find = (patterns) => {
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return m;
    }
    return null;
  };

  const fMatch    = find([/f\/(\d+\.?\d*)/i, /f.?number[:\s]+(\d+\.?\d*)/i, /aperture[:\s]+f?(\d+\.?\d*)/i]);
  const shMatch   = find([/1\/(\d+)\s*s?\b/i, /shutter[:\s]+1\/(\d+)/i, /exposure.?time[:\s]+1\/(\d+)/i]);
  const shSecMatch= find([/\b(\d+\.?\d*)\s*sec\b/i, /shutter.?speed[:\s]+(\d+\.?\d*)\s*s\b/i]);
  const isoMatch  = find([/\biso[:\s-]*(\d+)/i, /iso.?speed[:\s]*(\d+)/i]);
  const flMatch   = find([/(\d+\.?\d*)\s*mm/i, /focal.?length[:\s]+(\d+)/i]);
  const meterM    = find([/(evaluative|matrix|center.?weighted|spot|partial)/i]);
  const wbMatch   = find([/(auto\s*wb?|daylight|cloudy|shade|tungsten|fluorescent|flash|custom)/i]);
  const flashM    = find([/(flash\s*fired|flash did not fire|no\s*flash)/i]);
  const modeMatch = find([/(manual|aperture.?priority|shutter.?priority|program.?auto|tv|av|m\b)/i]);
  const makeMatch = find([/^make[:\s]+(.+)/im, /^camera[:\s]+(.+)/im]);
  const modelMatch= find([/^model[:\s]+(.+)/im]);

  const fields = [];

  if (makeMatch || modelMatch) {
    const cam = [makeMatch?.[1]?.trim(), modelMatch?.[1]?.trim()].filter(Boolean).join(' ');
    fields.push({ key: 'Camera', raw: cam, explain: `${cam} — a real camera. This info helps identify the sensor size, lens mount, and expected image quality.`, type: 'info' });
  }

  let fNum = null, tSec = null, isoVal = null;

  if (fMatch) {
    fNum = parseFloat(fMatch[1]);
    const dof = fNum <= 1.8 ? 'very shallow — thin DOF, great bokeh' : fNum <= 2.8 ? 'shallow — good background separation' : fNum <= 5.6 ? 'moderate — versatile everyday aperture' : fNum <= 11 ? 'deep — most things in focus' : 'very deep — use for landscapes with tripod';
    const light = fNum <= 2 ? 'excellent low-light' : fNum <= 4 ? 'good low-light' : fNum <= 8 ? 'average' : 'poor — needs bright light or high ISO';
    fields.push({ key: 'Aperture', raw: `f/${fNum}`, explain: `f/${fNum} — ${dof}. Light gathering: ${light}.`, type: fNum <= 1.4 ? 'good' : fNum >= 16 ? 'warn' : 'good' });
  }

  if (shMatch || shSecMatch) {
    if (shMatch) {
      tSec = 1 / parseFloat(shMatch[1]);
      const spd = parseFloat(shMatch[1]);
      const motion = spd >= 1000 ? 'freezes fast action (sport/wildlife)' : spd >= 500 ? 'freezes people / casual motion' : spd >= 250 ? 'safe for handheld (most subjects)' : spd >= 125 ? 'safe handheld — stationary subjects' : spd >= 60 ? 'borderline — brace yourself' : 'too slow handheld — use a tripod';
      fields.push({ key: 'Shutter Speed', raw: `1/${spd}s`, explain: `1/${spd}s — ${motion}.`, type: spd < 60 ? 'warn' : 'good' });
    } else {
      tSec = parseFloat(shSecMatch[1]);
      fields.push({ key: 'Shutter Speed', raw: `${tSec}s`, explain: `${tSec}s is a long exposure. Use a tripod — any camera movement will blur the image.`, type: 'warn' });
    }
  }

  if (isoMatch) {
    isoVal = parseInt(isoMatch[1]);
    const noise = isoVal <= 200 ? 'very clean — use whenever possible' : isoVal <= 800 ? 'minimal noise on modern cameras' : isoVal <= 3200 ? 'visible noise — acceptable for action/low light' : isoVal <= 6400 ? 'significant grain — use as last resort' : 'heavy grain — emergency only';
    fields.push({ key: 'ISO', raw: `ISO ${isoVal}`, explain: `ISO ${isoVal} — ${noise}.`, type: isoVal > 3200 ? 'warn' : isoVal > 800 ? 'note' : 'good' });
  }

  if (flMatch) {
    const fl = parseFloat(flMatch[1]);
    const perspective = fl <= 24 ? 'ultra-wide — architecture, landscapes, interiors' : fl <= 35 ? 'wide — street, environmental portraits' : fl <= 50 ? 'normal — closest to human eye perspective' : fl <= 85 ? 'short telephoto — ideal for portraits' : fl <= 135 ? 'telephoto — compression, wildlife, sports' : 'long telephoto — wildlife, distant subjects';
    fields.push({ key: 'Focal Length', raw: `${fl}mm`, explain: `${fl}mm — ${perspective}.`, type: 'info' });
  }

  if (modeMatch) {
    const mode = modeMatch[1].toLowerCase();
    const modeMap = {
      'manual': 'Full manual — you control everything. Maximum creative control, highest skill requirement.',
      'aperture priority': 'Aperture Priority (Av) — you set f-stop, camera picks shutter. Great for controlling DOF.',
      'av': 'Aperture Priority (Av) — you set f-stop, camera picks shutter.',
      'shutter priority': 'Shutter Priority (Tv) — you set shutter speed, camera picks aperture. Great for action.',
      'tv': 'Shutter Priority (Tv) — you set shutter speed, camera picks aperture.',
      'program auto': 'Program Auto — camera picks both. Good starting point for beginners.',
    };
    fields.push({ key: 'Exposure Mode', raw: modeMatch[1], explain: modeMap[mode] || `${modeMatch[1]} mode.`, type: 'info' });
  }

  if (meterM) {
    const m = meterM[1].toLowerCase();
    const meterMap = {
      'evaluative': 'Evaluative/Matrix — meters entire frame, great for most scenes. Best default.',
      'matrix': 'Matrix/Evaluative — meters entire frame intelligently. Best default choice.',
      'center-weighted': 'Center-Weighted — prioritises the centre of the frame. Good for backlit subjects.',
      'spot': 'Spot metering — reads only a tiny area. Use when subject brightness differs greatly from background.',
      'partial': 'Partial metering — similar to spot but slightly larger area. Good for portraits in variable light.',
    };
    fields.push({ key: 'Metering', raw: meterM[1], explain: meterMap[m] || meterM[1], type: 'info' });
  }

  if (wbMatch) {
    const wb = wbMatch[1].toLowerCase();
    const wbMap = {
      'auto': 'Auto WB — camera guesses the light colour. Works well for mixed or unknown lighting.',
      'daylight': 'Daylight — calibrated for outdoor sun (~5500K). Will look orange indoors under tungsten.',
      'cloudy': 'Cloudy — slightly warmer than daylight (~6500K). Adds warmth to overcast scenes.',
      'shade': 'Shade — warmest preset (~7500K). Counteracts the strong blue cast in open shade.',
      'tungsten': 'Tungsten — set for incandescent bulbs (~3200K). Makes daylight photos look very blue.',
      'fluorescent': 'Fluorescent — corrects for greenish fluorescent light (~4000K).',
      'flash': 'Flash — slightly cool preset for electronic flash (~5800K).',
      'custom': 'Custom WB — photographer measured the exact light colour. Most accurate option.',
    };
    fields.push({ key: 'White Balance', raw: wbMatch[1], explain: wbMap[wb] || wbMatch[1], type: 'info' });
  }

  if (flashM) {
    const fired = /fired/i.test(flashM[1]);
    fields.push({
      key: 'Flash', raw: flashM[1],
      explain: fired
        ? 'Flash fired — fill flash or main flash used. Check if it overpowered the ambient or created harsh shadows.'
        : 'Flash did not fire — available light only.',
      type: 'info',
    });
  }

  // Overall assessment
  const issues = [];
  if (fNum !== null && tSec !== null && isoVal !== null) {
    if (tSec < 1/60) issues.push({ type: 'warn', msg: 'Shutter below 1/60s — risk of camera shake without stabilisation.' });
    if (isoVal > 3200) issues.push({ type: 'warn', msg: `ISO ${isoVal} is high — expect visible noise.` });
    if (fNum < 2 && flMatch && parseFloat(flMatch[1]) > 85) issues.push({ type: 'note', msg: 'Razor-thin DOF: long lens at wide aperture = very easy to miss focus.' });
    if (tSec < 1/500 && fNum > 8) issues.push({ type: 'note', msg: 'Fast shutter + narrow aperture — may be underexposed in typical daylight. Check your histogram.' });
    if (!issues.length) issues.push({ type: 'good', msg: 'Settings look solid — no major concerns.' });
  }

  return { fields, issues };
}

/* ─── FIELD OF VIEW CALCULATOR ─── */
const SENSORS_FOV = [
  { name: 'Full Frame',        w: 36.0,  h: 24.0,  crop: 1.0   },
  { name: 'APS-C (Sony/Nikon/Fuji)', w: 23.5, h: 15.6, crop: 1.53 },
  { name: 'APS-C (Canon)',     w: 22.3,  h: 14.9,  crop: 1.61  },
  { name: 'Micro Four Thirds', w: 17.3,  h: 13.0,  crop: 2.0   },
  { name: '1-inch',            w: 13.2,  h: 8.8,   crop: 2.73  },
];

function toDeg(rad) { return rad * 180 / Math.PI; }
function fovAngle(dimension, focalLength) {
  return toDeg(2 * Math.atan(dimension / (2 * focalLength)));
}

function FovCalculator() {
  const [fl, setFl]         = useState(50);
  const [sensorIdx, setSensorIdx] = useState(0);

  const sensor = SENSORS_FOV[sensorIdx];
  const diag   = Math.sqrt(sensor.w ** 2 + sensor.h ** 2);
  const fovH   = fovAngle(sensor.w, fl);
  const fovV   = fovAngle(sensor.h, fl);
  const fovD   = fovAngle(diag, fl);
  const ffEq   = Math.round(fl * sensor.crop);

  const perspective =
    fl <= 20 ? 'Ultra-wide — extreme perspective distortion, great for architecture and dramatic landscapes'
    : fl <= 35 ? 'Wide angle — natural-looking wide shots, popular for street and environmental portraits'
    : fl <= 60 ? 'Normal — closest to human eye perspective, versatile everyday shooting'
    : fl <= 100 ? 'Short telephoto — flattering portrait compression, great subject separation'
    : fl <= 200 ? 'Telephoto — background compression, sports, wildlife'
    : 'Super telephoto — distant subjects, birding, wildlife';

  return (
    <div className={styles.toolPanel}>
      <div className={styles.toolGrid2}>
        <div>
          <div className={styles.sectionLabel}>Sensor Format</div>
          <div className={styles.sensorBtns}>
            {SENSORS_FOV.map((s, i) => (
              <button key={i}
                className={`${styles.sensorBtn} ${sensorIdx === i ? styles.sensorBtnActive : ''}`}
                onClick={() => setSensorIdx(i)}
              >
                <div className={styles.sensorName}>{s.name}</div>
                <div className={styles.sensorCoc}>{s.w}×{s.h}mm · ×{s.crop.toFixed(1)}</div>
              </button>
            ))}
          </div>

          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Focal Length</div>
          <div className={styles.flRow}>
            <input type="range" min={8} max={600} value={fl}
              onChange={e => setFl(Number(e.target.value))}
              className={styles.toolSlider}
              style={{ '--tc': '#22d3ee', flex: 1 }} />
            <span className={styles.flVal}>{fl}mm</span>
          </div>
          <div className={styles.fovPerspective}>{perspective}</div>
        </div>

        <div>
          <div className={styles.sectionLabel}>Field of View Angles</div>
          <div className={styles.hfResults}>
            <div className={styles.hfMain}>
              <div className={styles.hfMainLabel}>FF Equivalent</div>
              <div className={styles.hfMainVal}>{ffEq}mm</div>
              <div className={styles.hfMainSub}>{fl}mm on {sensor.name} = {ffEq}mm on full frame</div>
            </div>
            <div className={styles.hfGrid}>
              {[
                { label: 'Horizontal FoV', val: fovH, color: '#22d3ee' },
                { label: 'Vertical FoV',   val: fovV, color: '#7c6ff7' },
                { label: 'Diagonal FoV',   val: fovD, color: '#f5a623' },
              ].map(r => (
                <div key={r.label} className={styles.hfCard}>
                  <div className={styles.hfCardLabel}>{r.label}</div>
                  <div className={styles.hfCardVal} style={{ color: r.color }}>{r.val.toFixed(1)}°</div>
                  <div className={styles.hfCardSub}>{r.val > 90 ? 'Ultra-wide' : r.val > 60 ? 'Wide' : r.val > 40 ? 'Normal' : r.val > 20 ? 'Tele' : 'Super tele'}</div>
                </div>
              ))}
            </div>

            {/* Visual FoV bar */}
            <div className={styles.fovBarWrap}>
              <div className={styles.fovBarLabel}>Horizontal FoV: {fovH.toFixed(0)}°</div>
              <div className={styles.fovBarTrack}>
                <div className={styles.fovBar} style={{ width: `${Math.min(100, (fovH / 140) * 100)}%`, background: '#22d3ee' }} />
              </div>
              <div className={styles.fovBarEnds}><span>0°</span><span>140°</span></div>
            </div>

            <div className={styles.hfExplain}>
              <strong>💡 {sensor.name} with {fl}mm:</strong>{' '}
              {fovH.toFixed(0)}° horizontal field of view — equivalent to using a {ffEq}mm lens on a full-frame camera.
              Crop factor ×{sensor.crop.toFixed(1)} means you need a {Math.round(fl / sensor.crop)}mm full-frame lens to get the same framing on {sensor.name}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GOLDEN HOUR CALCULATOR ─── */
const CITIES = [
  { name: 'New York',    lat: 40.71,  lng: -74.01,  tz: 'America/New_York' },
  { name: 'Los Angeles', lat: 34.05,  lng: -118.24, tz: 'America/Los_Angeles' },
  { name: 'London',      lat: 51.51,  lng: -0.13,   tz: 'Europe/London' },
  { name: 'Paris',       lat: 48.85,  lng: 2.35,    tz: 'Europe/Paris' },
  { name: 'Berlin',      lat: 52.52,  lng: 13.40,   tz: 'Europe/Berlin' },
  { name: 'Barcelona',   lat: 41.39,  lng: 2.15,    tz: 'Europe/Madrid' },
  { name: 'Tokyo',       lat: 35.68,  lng: 139.69,  tz: 'Asia/Tokyo' },
  { name: 'Mumbai',      lat: 19.08,  lng: 72.88,   tz: 'Asia/Kolkata' },
  { name: 'Delhi',       lat: 28.61,  lng: 77.21,   tz: 'Asia/Kolkata' },
  { name: 'Bangalore',   lat: 12.97,  lng: 77.59,   tz: 'Asia/Kolkata' },
  { name: 'Sydney',      lat: -33.87, lng: 151.21,  tz: 'Australia/Sydney' },
  { name: 'Dubai',       lat: 25.20,  lng: 55.27,   tz: 'Asia/Dubai' },
  { name: 'Singapore',   lat: 1.35,   lng: 103.82,  tz: 'Asia/Singapore' },
  { name: 'Toronto',     lat: 43.65,  lng: -79.38,  tz: 'America/Toronto' },
  { name: 'São Paulo',   lat: -23.55, lng: -46.63,  tz: 'America/Sao_Paulo' },
  { name: 'Bangkok',     lat: 13.76,  lng: 100.50,  tz: 'Asia/Bangkok' },
  { name: 'Cape Town',   lat: -33.93, lng: 18.42,   tz: 'Africa/Johannesburg' },
  { name: 'Nairobi',     lat: -1.29,  lng: 36.82,   tz: 'Africa/Nairobi' },
  { name: 'Beijing',     lat: 39.91,  lng: 116.39,  tz: 'Asia/Shanghai' },
  { name: 'Chicago',     lat: 41.88,  lng: -87.63,  tz: 'America/Chicago' },
  { name: 'Reykjavik',   lat: 64.13,  lng: -21.82,  tz: 'Atlantic/Reykjavik' },
];

function getSunTimes(lat, lng, date) {
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;

  const JD = date.getTime() / 86400000 + 2440587.5;
  const JC = (JD - 2451545) / 36525;
  const L0 = ((280.46646 + JC * (36000.76983 + JC * 0.0003032)) % 360 + 360) % 360;
  const M  = 357.52911 + JC * (35999.05029 - 0.0001537 * JC);
  const Mr = toRad(M);
  const C  = Math.sin(Mr) * (1.914602 - JC * (0.004817 + 0.000014 * JC))
           + Math.sin(2 * Mr) * (0.019993 - 0.000101 * JC)
           + Math.sin(3 * Mr) * 0.000289;
  const sunLon = L0 + C;
  const omega  = 125.04 - 1934.136 * JC;
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(toRad(omega));
  const eps0   = 23 + (26 + (21.448 - JC * (46.815 + JC * (0.00059 - JC * 0.001813))) / 60) / 60;
  const eps    = eps0 + 0.00256 * Math.cos(toRad(omega));
  const sinDec = Math.sin(toRad(eps)) * Math.sin(toRad(lambda));
  const dec    = toDeg(Math.asin(sinDec));

  const L0r    = toRad(L0), Mr2 = toRad(M);
  const y      = Math.tan(toRad(eps / 2)) ** 2;
  const eot    = 4 * toDeg(
    y * Math.sin(2 * L0r) - 2 * 0.016708634 * Math.sin(Mr2)
    + 4 * 0.016708634 * y * Math.sin(Mr2) * Math.cos(2 * L0r)
    - 0.5 * y * y * Math.sin(4 * L0r)
    - 1.25 * 0.016708634 * 0.016708634 * Math.sin(2 * Mr2)
  );

  const solarNoonMin = 720 - 4 * lng - eot; // minutes from UTC midnight

  const latR   = toRad(lat);
  const decR   = toRad(dec);

  function getHA(elev) {
    const cosHA = (Math.sin(toRad(elev)) - Math.sin(latR) * Math.sin(decR))
                / (Math.cos(latR) * Math.cos(decR));
    if (cosHA < -1 || cosHA > 1) return null;
    return toDeg(Math.acos(cosHA)); // degrees → × 4 = minutes
  }

  const HA_sr  = getHA(-0.833);
  const HA_g6  = getHA(6);
  const HA_civ = getHA(-6);

  if (!HA_sr) return null; // polar day or night

  function minsToDate(mins) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return new Date(d.getTime() + mins * 60000);
  }

  return {
    morningBlueStart:    HA_civ ? minsToDate(solarNoonMin - HA_civ * 4) : null,
    morningGoldenStart:  minsToDate(solarNoonMin - HA_sr * 4),
    morningGoldenEnd:    HA_g6  ? minsToDate(solarNoonMin - HA_g6 * 4) : minsToDate(solarNoonMin - HA_sr * 4 + 60),
    solarNoon:           minsToDate(solarNoonMin),
    eveningGoldenStart:  HA_g6  ? minsToDate(solarNoonMin + HA_g6 * 4) : minsToDate(solarNoonMin + HA_sr * 4 - 60),
    eveningGoldenEnd:    minsToDate(solarNoonMin + HA_sr * 4),
    eveningBlueEnd:      HA_civ ? minsToDate(solarNoonMin + HA_civ * 4) : null,
  };
}

function GoldenHourCalculator() {
  const today = new Date().toISOString().split('T')[0];
  const [city, setCity]  = useState(0);
  const [date, setDate]  = useState(today);

  const times = useMemo(() => {
    const d = new Date(date + 'T12:00:00Z');
    return getSunTimes(CITIES[city].lat, CITIES[city].lng, d);
  }, [city, date]);

  const tz = CITIES[city].tz;
  const fmt = (d) => d ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: tz }).format(d) : '—';
  const dur = (a, b) => {
    if (!a || !b) return '';
    const mins = Math.round((b - a) / 60000);
    return ` (${mins} min)`;
  };

  const schedule = times ? [
    { label: 'Blue Hour',          color: '#3b82f6', icon: '🌙', start: times.morningBlueStart,   end: times.morningGoldenStart,  desc: 'Deep blue sky before sunrise. Great for cityscapes.' },
    { label: 'Morning Golden Hour', color: '#f5a623', icon: '🌅', start: times.morningGoldenStart, end: times.morningGoldenEnd,    desc: 'Warm, low, directional light. Best portrait & landscape time.' },
    { label: 'Morning — Hard Light', color: '#94a3b8', icon: '☀', start: times.morningGoldenEnd,   end: times.solarNoon,           desc: 'Harsh shadows. Avoid portraits. Good for architecture detail.' },
    { label: 'Solar Noon',          color: '#22d3ee', icon: '⬆', start: times.solarNoon,           end: null,                      desc: 'Sun is at its highest point. Longest shadows of midday.' },
    { label: 'Afternoon — Hard Light', color: '#94a3b8', icon: '☀', start: times.solarNoon,         end: times.eveningGoldenStart,  desc: 'Still harsh midday light. Wait for golden hour.' },
    { label: 'Evening Golden Hour', color: '#f5a623', icon: '🌇', start: times.eveningGoldenStart, end: times.eveningGoldenEnd,    desc: 'The magic hour. Warm light, long shadows, perfect for everything.' },
    { label: 'Blue Hour',           color: '#3b82f6', icon: '🌆', start: times.eveningGoldenEnd,   end: times.eveningBlueEnd,      desc: 'Sky glows deep blue after sunset. Cityscapes at their best.' },
  ] : [];

  return (
    <div className={styles.toolPanel}>
      <div className={styles.ghLayout}>
        <div className={styles.ghControls}>
          <div className={styles.sectionLabel}>City</div>
          <select className={styles.ghSelect} value={city} onChange={e => setCity(Number(e.target.value))}>
            {CITIES.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
          </select>

          <div className={styles.sectionLabel} style={{ marginTop: 16 }}>Date</div>
          <input type="date" className={styles.ghDate} value={date} onChange={e => setDate(e.target.value)} />

          <div className={styles.ghCoords}>
            📍 {CITIES[city].lat.toFixed(2)}°, {CITIES[city].lng.toFixed(2)}°
          </div>

          <div className={styles.ghTip}>
            <strong>💡 Pro tip:</strong> The golden hour lasts longer in winter and at higher latitudes — sometimes 90+ minutes of magic light.
          </div>
        </div>

        <div className={styles.ghSchedule}>
          <div className={styles.sectionLabel}>Shooting Schedule</div>
          {!times ? (
            <div className={styles.ghNoSun}>☀ Polar day/night — sun doesn't rise or set on this date.</div>
          ) : (
            <div className={styles.ghTimeline}>
              {schedule.map((s, i) => (
                <div key={i} className={styles.ghRow} style={{ borderLeftColor: s.color }}>
                  <div className={styles.ghRowIcon}>{s.icon}</div>
                  <div className={styles.ghRowContent}>
                    <div className={styles.ghRowLabel} style={{ color: s.color }}>{s.label}</div>
                    <div className={styles.ghRowTime}>
                      {s.end ? `${fmt(s.start)} — ${fmt(s.end)}${dur(s.start, s.end)}` : fmt(s.start)}
                    </div>
                    <div className={styles.ghRowDesc}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── EXIF DECODER ─── */
function ExifDecoder() {
  const [text, setText] = useState('');
  const result = parseExif(text);

  return (
    <div className={styles.toolPanel}>
      <div className={styles.exifLayout}>
        <div>
          <div className={styles.sectionLabel}>Paste EXIF Data</div>
          <textarea
            className={styles.exifTextarea}
            placeholder={SAMPLE_EXIF}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={12}
          />
          <div className={styles.exifHint}>
            Paste output from Lightroom, Exiftool, camera properties — any format works.
          </div>
          {text && (
            <button className={styles.clearBtn} onClick={() => setText('')}>✕ Clear</button>
          )}
        </div>

        <div>
          {!result || result.fields.length === 0 ? (
            <div className={styles.exifEmpty}>
              <div className={styles.exifEmptyIcon}>⊟</div>
              <div className={styles.exifEmptyText}>Paste your EXIF data on the left to decode it.</div>
              <div className={styles.exifEmptyHint}>Try the sample data in the placeholder.</div>
            </div>
          ) : (
            <>
              <div className={styles.sectionLabel}>Decoded Fields</div>
              <div className={styles.exifFields}>
                {result.fields.map((f, i) => (
                  <div key={i} className={styles.exifField}>
                    <div className={styles.exifFieldKey}>{f.key}</div>
                    <div className={styles.exifFieldRight}>
                      <div className={styles.exifFieldRaw} style={{
                        color: f.type === 'good' ? 'var(--green)' : f.type === 'warn' ? 'var(--orange)' : f.type === 'note' ? 'var(--gold)' : 'var(--accent2)'
                      }}>{f.raw}</div>
                      <div className={styles.exifFieldExplain}>{f.explain}</div>
                    </div>
                  </div>
                ))}
              </div>

              {result.issues.length > 0 && (
                <>
                  <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Overall Assessment</div>
                  <div className={styles.exifIssues}>
                    {result.issues.map((iss, i) => (
                      <div key={i} className={`${styles.issueBadge} ${styles[`issue_${iss.type}`]}`}>
                        {iss.type === 'good' ? '✓' : iss.type === 'warn' ? '⚠' : 'ℹ'} {iss.msg}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
