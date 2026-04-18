import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Simulators.module.css';

/* ─── SHARED DATA ─── */
const SAMPLE_IMAGES = [
  { name: 'Portrait',   icon: '👤', sceneEV: 12, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/portrait/800/500',   hint: 'Try f/1.8 for gorgeous background blur behind the subject.' },
  { name: 'Landscape',  icon: '🏔', sceneEV: 14, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/mountain/800/500',   hint: 'f/11 + ISO 100 + tripod = tack-sharp mountains front to back.' },
  { name: 'Night City', icon: '🌃', sceneEV: 5,  url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/citynight/800/500', hint: 'Long exposure (2–30s) on a tripod captures gorgeous light trails.' },
  { name: 'Action',     icon: '🏃', sceneEV: 13, url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/running/800/500',   hint: '1/1000s or faster freezes athletes mid-stride. Raise ISO if needed.' },
  { name: 'Flower',     icon: '🌸', sceneEV: 12, url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc66?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/flower/800/500',   hint: 'f/2.8 close-up + background far away = dreamy macro bokeh.' },
  { name: 'Indoor',     icon: '🏠', sceneEV: 7,  url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=500&fit=crop&auto=format&q=80', fallback: 'https://picsum.photos/seed/indoor/800/500',   hint: 'Tricky! Wide aperture + raise ISO + brace yourself or use a tripod.' },
];

const APERTURE_VALS   = [1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16];
const SHUTTER_LABELS  = ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1/15s','1/8s','1/4s','1/2s','1s'];
const SHUTTER_SECONDS = [1/4000,1/2000,1/1000,1/500,1/250,1/125,1/60,1/30,1/15,1/8,1/4,1/2,1];
const ISO_VALS        = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

/* ─── TABS ─── */
export default function Simulators() {
  const [activeTab, setActiveTab] = useState('exposure');
  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Interactive Simulators</h1>
        <p>Adjust camera settings in real-time and see the result on actual photographs.</p>
      </div>
      <div className={`${styles.tabs} fade-up-1`}>
        {[
          { id: 'exposure',    label: '△ Exposure' },
          { id: 'wb',          label: '◑ White Balance' },
          { id: 'dof',         label: '◎ Depth of Field' },
          { id: 'composition', label: '⊞ Composition' },
          { id: 'scene',       label: '◉ Scene Guide' },
          { id: 'sensor',      label: '⊡ Sensor Sizes' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >{tab.label}</button>
        ))}
      </div>
      <div className={`${styles.simContainer} fade-up-2`}>
        {activeTab === 'exposure'    && <ExposureSimulator />}
        {activeTab === 'wb'          && <WhiteBalanceSimulator />}
        {activeTab === 'dof'         && <DOFSimulator />}
        {activeTab === 'composition' && <CompositionSimulator />}
        {activeTab === 'scene'       && <SceneSimulator />}
        {activeTab === 'sensor'      && <SensorSizeSimulator />}
      </div>
    </div>
  );
}

/* ─── SHARED: image picker ─── */
function ImagePicker({ selImg, setSelImg, uploaded, setUploaded, fileRef }) {
  const handleUpload = e => {
    const f = e.target.files?.[0];
    if (f?.type.startsWith('image/')) setUploaded(URL.createObjectURL(f));
  };
  return (
    <div className={styles.pickerBlock}>
      <div className={styles.pickerRow}>
        <span className={styles.pickerLabel}>Scene</span>
        <label className={styles.uploadBtn}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} hidden />
          ↑ Upload photo
        </label>
      </div>
      <div className={styles.pickerGrid}>
        {SAMPLE_IMAGES.map((img, i) => (
          <button key={i}
            className={`${styles.pickerBtn} ${selImg === i && !uploaded ? styles.pickerBtnActive : ''}`}
            onClick={() => { setSelImg(i); setUploaded(null); }}
            title={img.hint}
          >
            <span className={styles.pickerIcon}>{img.icon}</span>
            <span className={styles.pickerName}>{img.name}</span>
          </button>
        ))}
      </div>
      {uploaded && (
        <div className={styles.uploadedRow}>
          <span className={styles.uploadedBadge}>📷 Your photo active</span>
          <button className={styles.removeBtn} onClick={() => setUploaded(null)}>✕ Remove</button>
        </div>
      )}
    </div>
  );
}

/* ─── SHARED: slider ─── */
function SliderControl({ label, icon, color, value, min, max, displayValue, onChange, leftHint, rightHint }) {
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.sliderHeader}>
        <span className={styles.sliderIcon} style={{ color }}>{icon}</span>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderValue} style={{ color }}>{displayValue}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={styles.slider} style={{ '--accent-color': color }} />
      <div className={styles.sliderHints}><span>{leftHint}</span><span>{rightHint}</span></div>
    </div>
  );
}

/* ─── SHARED: stat badge ─── */
function StatBadge({ icon, label, value, color }) {
  return (
    <div className={styles.statBadge}>
      <span className={styles.statIcon} style={{ color }}>{icon}</span>
      <div>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue} style={{ color }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── HISTOGRAM CANVAS ─── */
function HistogramCanvas({ diff }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 300, H = 90;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    // Clipping zone backgrounds
    ctx.fillStyle = 'rgba(239,68,68,0.12)';
    ctx.fillRect(0, 0, 22, H);
    ctx.fillRect(W - 22, 0, 22, H);

    // Centre shift based on exposure delta (each stop ≈ 30px)
    const center = W / 2 + Math.max(-120, Math.min(120, diff * 28));
    const sigma  = W / 6 + Math.abs(diff) * 3;

    // Build values for each of 256 buckets
    const vals = new Float32Array(256);
    for (let x = 0; x < 256; x++) {
      const pos = (x / 255) * W;
      vals[x] = Math.exp(-0.5 * ((pos - center) / sigma) ** 2);
      // Add subtle secondary peaks for realism
      vals[x] += 0.15 * Math.exp(-0.5 * ((pos - center * 0.6) / (sigma * 0.6)) ** 2);
      vals[x] += 0.1  * Math.exp(-0.5 * ((pos - center * 1.3) / (sigma * 0.7)) ** 2);
    }
    const maxVal = Math.max(...vals);

    // Draw filled curve
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,    'rgba(40,40,80,0.9)');
    grad.addColorStop(0.35, 'rgba(100,90,180,0.85)');
    grad.addColorStop(0.65, 'rgba(160,140,220,0.85)');
    grad.addColorStop(1,    'rgba(255,255,255,0.8)');

    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x++) {
      const bucketIdx = Math.round((x / W) * 255);
      const v = vals[Math.min(255, bucketIdx)] / maxVal;
      ctx.lineTo(x, H - v * H * 0.88);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Clipping indicator lines
    ctx.strokeStyle = 'rgba(239,68,68,0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(22, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 22, 0); ctx.lineTo(W - 22, H); ctx.stroke();
    ctx.setLineDash([]);

    // Middle guideline
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();

    // Zone labels
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '9px monospace';
    ctx.fillText('Shadows', 4, H - 3);
    ctx.fillText('Midtones', W / 2 - 20, H - 3);
    ctx.fillText('Highlights', W - 54, H - 3);

    // Clipping warnings
    if (diff <= -2.5) {
      ctx.fillStyle = 'rgba(239,68,68,0.8)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('CLIPPING', 2, 10);
    }
    if (diff >= 2.5) {
      ctx.fillStyle = 'rgba(239,68,68,0.8)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('CLIPPING', W - 52, 10);
    }
  }, [diff]);

  return (
    <div className={styles.histogramWrap}>
      <div className={styles.histogramLabel}>Histogram</div>
      <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 6, background: '#08080e', display: 'block' }} />
    </div>
  );
}

/* ─── BEFORE / AFTER SPLIT VIEW ─── */
function BeforeAfterView({ src, fallbackSrc, imgFilter, noiseOp }) {
  const [pos, setPos] = useState(50);

  const handleImgError = e => {
    if (fallbackSrc && e.target.src !== fallbackSrc) e.target.src = fallbackSrc;
  };

  return (
    <div className={styles.compareWrapper}>
      {/* Original — clipped to left side */}
      <img key={src + '-o'} src={src} alt="Original" className={styles.compareImg}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} onError={handleImgError} />
      {/* Filtered — clipped to right side */}
      <img key={src + '-f'} src={src} alt="Adjusted" className={styles.compareImg}
        style={{ filter: imgFilter, clipPath: `inset(0 0 0 ${pos}%)` }} onError={handleImgError} />
      {/* Noise overlay for filtered side */}
      {noiseOp > 0 && (
        <div className={styles.noiseOverlay}
          style={{ opacity: Math.min(noiseOp, 0.55), clipPath: `inset(0 0 0 ${pos}%)` }} />
      )}
      {/* Divider + handle */}
      <div className={styles.compareDivider} style={{ left: `${pos}%` }}>
        <div className={styles.compareHandle}>⇔</div>
      </div>
      {/* Labels */}
      <div className={styles.compareLabel} style={{ left: 10 }}>ORIGINAL</div>
      <div className={styles.compareLabel} style={{ right: 10 }}>ADJUSTED</div>
      {/* Range input overlay — transparent, covers the whole area for drag interaction */}
      <input type="range" min={0} max={100} value={pos}
        onChange={e => setPos(Number(e.target.value))}
        className={styles.compareRange} />
    </div>
  );
}

/* ─── EXPOSURE TRIANGLE SIMULATOR ─── */
function ExposureSimulator() {
  const [aperture, setAperture] = useState(5);
  const [shutter,  setShutter]  = useState(4);
  const [iso,      setIso]      = useState(0);
  const [selImg,   setSelImg]   = useState(0);
  const [uploaded, setUploaded] = useState(null);
  const [compare,  setCompare]  = useState(false);
  const fileRef = useRef(null);

  const fNum    = APERTURE_VALS[aperture];
  const tSec    = SHUTTER_SECONDS[shutter];
  const isoVal  = ISO_VALS[iso];
  const evCam   = Math.log2((fNum * fNum) / tSec) - Math.log2(isoVal / 100);
  const sceneEV = uploaded ? 12 : SAMPLE_IMAGES[selImg].sceneEV;
  const diff    = sceneEV - evCam;

  const brightness = Math.max(0.02, Math.min(3.5, Math.pow(2, diff)));
  const saturation = diff > 1.5 ? Math.max(0.25, 1 - (diff - 1.5) * 0.28) : diff < -2.5 ? Math.max(0.4, 1 + (diff + 2.5) * 0.15) : 1;
  const contrast   = diff > 1 ? Math.max(0.55, 1 - (diff - 1) * 0.16) : 1;
  const noiseOp    = iso <= 1 ? 0 : iso <= 3 ? (iso - 1) * 0.025 : 0.05 + (iso - 3) * 0.065;
  const mBlurPx    = shutter <= 5 ? 0 : Math.min(14, (shutter - 5) * 2.5);

  const imgFilter = `brightness(${brightness.toFixed(3)}) contrast(${contrast.toFixed(3)}) saturate(${saturation.toFixed(3)})${mBlurPx > 0 ? ' url(#hblur)' : ''}`;

  const expLabel =
    diff < -3   ? { text: 'Severely Underexposed', color: '#ef4444' } :
    diff < -1.5 ? { text: 'Underexposed',           color: '#f97316' } :
    diff < -0.5 ? { text: 'Slightly Underexposed',  color: '#eab308' } :
    diff <= 0.5 ? { text: 'Correct Exposure ✓',      color: '#22c55e' } :
    diff <= 1.5 ? { text: 'Slightly Overexposed',    color: '#eab308' } :
    diff <= 3   ? { text: 'Overexposed',              color: '#f97316' } :
                  { text: 'Severely Overexposed',     color: '#ef4444' };

  const dofText  = aperture <= 1 ? 'Extremely Shallow' : aperture <= 3 ? 'Shallow (bokeh)' : aperture <= 5 ? 'Moderate' : 'Deep — all sharp';
  const motText  = shutter <= 2 ? 'Frozen (sport)' : shutter <= 4 ? 'Frozen' : shutter <= 6 ? 'Sharp' : shutter <= 8 ? 'Blur risk' : 'Motion blur';
  const noiseTxt = iso <= 1 ? 'Clean' : iso <= 3 ? 'Low' : iso <= 5 ? 'Visible grain' : 'Heavy grain';

  const src         = uploaded || SAMPLE_IMAGES[selImg].url;
  const fallbackSrc = uploaded ? null : SAMPLE_IMAGES[selImg].fallback;
  const handleImgError = e => { if (fallbackSrc && e.target.src !== fallbackSrc) e.target.src = fallbackSrc; };

  return (
    <div className={styles.expSim}>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="hblur" x="-25%" width="150%" y="-5%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={`${mBlurPx} 0`} />
          </filter>
        </defs>
      </svg>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <h2 className={styles.simTitle}>△ Exposure Triangle</h2>
        <p className={styles.simDesc}>Adjust the three pillars of exposure — see the result on a real photograph.</p>

        <SliderControl label="Aperture" icon="◎" color="#f5a623"
          value={aperture} min={0} max={APERTURE_VALS.length - 1}
          displayValue={`f/${APERTURE_VALS[aperture]}`} onChange={setAperture}
          leftHint="f/1.4 · Wide · more light" rightHint="f/16 · Narrow · less light" />

        <SliderControl label="Shutter Speed" icon="⚡" color="#22d3ee"
          value={shutter} min={0} max={SHUTTER_LABELS.length - 1}
          displayValue={SHUTTER_LABELS[shutter]} onChange={setShutter}
          leftHint="1/4000s · freeze action" rightHint="1s · motion blur" />

        <SliderControl label="ISO" icon="◈" color="#e879f9"
          value={iso} min={0} max={ISO_VALS.length - 1}
          displayValue={`ISO ${ISO_VALS[iso]}`} onChange={setIso}
          leftHint="100 · clean" rightHint="12800 · noisy" />

        {/* EV meter */}
        <div className={styles.evBlock}>
          <div className={styles.evRow}>
            <span className={styles.evKey}>Exposure Delta</span>
            <span className={styles.evNum} style={{ color: expLabel.color }}>
              {diff >= 0 ? '+' : ''}{diff.toFixed(1)} stops
            </span>
          </div>
          <div className={styles.evMeterTrack}>
            <div className={styles.evMeterCenter} />
            <div className={styles.evMeterDot} style={{
              left: `calc(50% + ${Math.max(-47, Math.min(47, diff * 9))}%)`,
              background: expLabel.color,
            }} />
          </div>
          <div className={styles.evMeterLabels}><span>−3 stops</span><span>0</span><span>+3 stops</span></div>
        </div>

        <ImagePicker selImg={selImg} setSelImg={setSelImg} uploaded={uploaded} setUploaded={setUploaded} fileRef={fileRef} />
      </div>

      {/* ── Preview ── */}
      <div className={styles.preview}>
        {/* Compare toggle */}
        <div className={styles.previewToolbar}>
          <button
            className={`${styles.compareToggle} ${compare ? styles.compareToggleActive : ''}`}
            onClick={() => setCompare(c => !c)}
          >⇔ {compare ? 'Live View' : 'Compare'}</button>
        </div>

        {compare ? (
          <BeforeAfterView src={src} fallbackSrc={fallbackSrc} imgFilter={imgFilter} noiseOp={noiseOp} />
        ) : (
          <div className={styles.photoOuter}>
            <img key={src} src={src} alt="Scene" className={styles.photoImg}
              style={{ filter: imgFilter }} onError={handleImgError} />
            {noiseOp > 0 && <div className={styles.noiseOverlay} style={{ opacity: Math.min(noiseOp, 0.55) }} />}
            <div className={styles.badgeRow}>
              <span className={styles.badge} style={{ color: expLabel.color, borderColor: expLabel.color + '55' }}>{expLabel.text}</span>
              {mBlurPx > 0 && <span className={styles.badge} style={{ color: '#22d3ee', borderColor: '#22d3ee55' }}>⚡ Motion blur</span>}
              {aperture <= 2 && <span className={styles.badge} style={{ color: '#f5a623', borderColor: '#f5a62355' }}>◎ Shallow DOF</span>}
              {noiseOp > 0.1 && <span className={styles.badge} style={{ color: '#e879f9', borderColor: '#e879f955' }}>◈ ISO grain</span>}
            </div>
          </div>
        )}

        <HistogramCanvas diff={diff} />

        <div className={styles.statsGrid}>
          <StatBadge icon="△" label="Exposure"       value={expLabel.text} color={expLabel.color} />
          <StatBadge icon="◎" label="Depth of Field" value={dofText}       color="#f5a623" />
          <StatBadge icon="⚡" label="Motion"         value={motText}       color="#22d3ee" />
          <StatBadge icon="◈" label="Noise"          value={noiseTxt}      color="#e879f9" />
        </div>

        <div className={styles.tip}>
          <strong>💡</strong>{' '}
          {!uploaded
            ? SAMPLE_IMAGES[selImg].hint
            : diff < -1 ? 'Too dark — open aperture, slow shutter, or raise ISO.'
            : diff > 1  ? 'Too bright — close aperture, speed up shutter, or lower ISO.'
            : 'Perfect! Try pushing the limits to understand the effects.'}
        </div>
      </div>
    </div>
  );
}

/* ─── WHITE BALANCE SIMULATOR ─── */
const WB_PRESETS = [
  { name: 'Auto',        icon: 'A',  kelvin: 5500, filter: '' },
  { name: 'Daylight',    icon: '☀', kelvin: 5500, filter: 'sepia(0.08) hue-rotate(3deg) saturate(1.05)' },
  { name: 'Cloudy',      icon: '⛅', kelvin: 6500, filter: 'sepia(0.18) hue-rotate(-6deg) saturate(1.12) brightness(1.03)' },
  { name: 'Shade',       icon: '🌥', kelvin: 7500, filter: 'sepia(0.25) hue-rotate(-12deg) saturate(1.18) brightness(1.05)' },
  { name: 'Tungsten',    icon: '💡', kelvin: 3200, filter: 'sepia(0.5) hue-rotate(-28deg) saturate(1.4) brightness(1.08)' },
  { name: 'Fluorescent', icon: '🔆', kelvin: 4000, filter: 'hue-rotate(18deg) saturate(0.9) brightness(1.04)' },
  { name: 'Flash',       icon: '⚡', kelvin: 5800, filter: 'hue-rotate(6deg) saturate(0.97) brightness(1.03)' },
];

function kelvinToFilter(k) {
  const delta = k - 5500;
  if (delta < 0) {
    // Warm
    const t = Math.min(1, Math.abs(delta) / 3500);
    return `sepia(${(t * 0.55).toFixed(3)}) hue-rotate(${(delta / 120).toFixed(1)}deg) saturate(${(1 + t * 0.45).toFixed(3)}) brightness(${(1 + t * 0.08).toFixed(3)})`;
  } else {
    // Cool
    const t = Math.min(1, delta / 4500);
    return `hue-rotate(${(delta / 280).toFixed(1)}deg) saturate(${(1 - t * 0.15).toFixed(3)}) brightness(${(1 + t * 0.04).toFixed(3)})`;
  }
}

function WhiteBalanceSimulator() {
  const [mode,     setMode]     = useState('preset');
  const [preset,   setPreset]   = useState(0);
  const [kelvin,   setKelvin]   = useState(5500);
  const [selImg,   setSelImg]   = useState(0);
  const [uploaded, setUploaded] = useState(null);
  const fileRef = useRef(null);

  const activeFilter = mode === 'preset' ? WB_PRESETS[preset].filter : kelvinToFilter(kelvin);
  const activeKelvin = mode === 'preset' ? WB_PRESETS[preset].kelvin : kelvin;

  const src         = uploaded || SAMPLE_IMAGES[selImg].url;
  const fallbackSrc = uploaded ? null : SAMPLE_IMAGES[selImg].fallback;
  const handleImgError = e => { if (fallbackSrc && e.target.src !== fallbackSrc) e.target.src = fallbackSrc; };

  const wbDescriptions = {
    0: 'Camera analyses the scene and tries to neutralise the colour cast. Works great for mixed or unknown lighting.',
    1: 'Calibrated for direct sunlight (~5500K). Neutral colours outdoors. Will look orange indoors under tungsten lights.',
    2: 'Adds warmth to compensate for the cool, bluish light of overcast skies. Flattering for portraits outdoors.',
    3: 'Warmest preset — corrects the strong blue cast you get in open shade on a sunny day.',
    4: 'Set for incandescent bulbs (~3200K). Makes daylight images look strongly blue. Use for tungsten-lit interiors.',
    5: 'Corrects for the green-tinted light of fluorescent tubes. Common in offices and shops.',
    6: 'Slightly cooler than daylight — designed to match the colour of electronic flash units.',
  };

  return (
    <div className={styles.expSim}>
      <div className={styles.controls}>
        <h2 className={styles.simTitle}>◑ White Balance</h2>
        <p className={styles.simDesc}>See how different white balance settings change the colour of your photographs.</p>

        {/* Mode toggle */}
        <div className={styles.wbModeRow}>
          <button className={`${styles.wbModeBtn} ${mode === 'preset' ? styles.wbModeBtnActive : ''}`}
            onClick={() => setMode('preset')}>Presets</button>
          <button className={`${styles.wbModeBtn} ${mode === 'kelvin' ? styles.wbModeBtnActive : ''}`}
            onClick={() => setMode('kelvin')}>Custom Kelvin</button>
        </div>

        {mode === 'preset' ? (
          <div className={styles.wbPresets}>
            {WB_PRESETS.map((p, i) => (
              <button key={i}
                className={`${styles.wbPresetBtn} ${preset === i ? styles.wbPresetBtnActive : ''}`}
                onClick={() => setPreset(i)}
              >
                <span className={styles.wbPresetIcon}>{p.icon}</span>
                <div>
                  <div className={styles.wbPresetName}>{p.name}</div>
                  <div className={styles.wbPresetK}>{p.kelvin}K</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.kelvinBlock}>
            <div className={styles.kelvinBar} />
            <div className={styles.kelvinSliderRow}>
              <input type="range" min={2000} max={10000} step={100} value={kelvin}
                onChange={e => setKelvin(Number(e.target.value))}
                className={styles.slider} style={{ '--accent-color': '#f5a623' }} />
            </div>
            <div className={styles.kelvinVal}>
              <span className={styles.kelvinNum}>{kelvin}K</span>
              <span className={styles.kelvinDesc}>
                {kelvin < 3500 ? 'Candlelight / Tungsten' : kelvin < 4500 ? 'Fluorescent / Sunrise' : kelvin < 5500 ? 'Morning / Evening Sun' : kelvin < 6500 ? 'Daylight (Neutral)' : kelvin < 7500 ? 'Overcast / Cloudy' : 'Open Shade / Blue Sky'}
              </span>
            </div>
            <div className={styles.sliderHints}><span>2000K · Warm</span><span>10000K · Cool</span></div>
          </div>
        )}

        {mode === 'preset' && (
          <div className={styles.tip}>
            <strong>💡 {WB_PRESETS[preset].name}:</strong> {wbDescriptions[preset]}
          </div>
        )}

        <ImagePicker selImg={selImg} setSelImg={setSelImg} uploaded={uploaded} setUploaded={setUploaded} fileRef={fileRef} />
      </div>

      <div className={styles.preview}>
        {/* Split: original | WB-adjusted */}
        <div className={styles.wbSplit}>
          <div className={styles.wbHalf}>
            <img key={src + '-orig'} src={src} alt="Original" className={styles.photoImg} onError={handleImgError} />
            <div className={styles.wbHalfLabel}>Auto / Original</div>
          </div>
          <div className={styles.wbHalf}>
            <img key={src + '-wb'} src={src} alt="WB adjusted" className={styles.photoImg}
              style={{ filter: activeFilter }} onError={handleImgError} />
            <div className={styles.wbHalfLabel} style={{ color: '#f5a623' }}>
              {mode === 'preset' ? WB_PRESETS[preset].name : `${kelvin}K Custom`}
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <StatBadge icon="◑" label="White Balance"   value={mode === 'preset' ? WB_PRESETS[preset].name : `${kelvin}K`} color="#f5a623" />
          <StatBadge icon="🌡" label="Colour Temp"    value={`${activeKelvin}K`}  color="#22d3ee" />
          <StatBadge icon="◐" label="Tone"            value={activeKelvin < 4500 ? 'Very Warm' : activeKelvin < 5500 ? 'Warm' : activeKelvin < 6500 ? 'Neutral' : activeKelvin < 7500 ? 'Cool' : 'Very Cool'} color="#e879f9" />
          <StatBadge icon="⬡" label="Use Case"        value={activeKelvin < 3500 ? 'Indoors / Candle' : activeKelvin < 5500 ? 'Indoor / Mixed' : activeKelvin < 7000 ? 'Outdoors / Sun' : 'Shade / Overcast'} color="#22c55e" />
        </div>

        <div className={styles.tip}>
          <strong>💡 Pro tip:</strong> Shoot in RAW format and you can change white balance non-destructively in post. JPEG white balance is baked in — get it right in camera.
        </div>
      </div>
    </div>
  );
}

/* ─── DOF SIMULATOR ─── */
function DOFSimulator() {
  const [aperture,    setAperture]    = useState(4);
  const [focalLength, setFocalLength] = useState(3);
  const [distance,    setDistance]    = useState(3);
  const [selImg,      setSelImg]      = useState(0);
  const [uploaded,    setUploaded]    = useState(null);
  const fileRef = useRef(null);

  const apertureVals    = [1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16];
  const focalLengthVals = [24, 35, 50, 85, 105, 135, 200];
  const distanceVals    = [0.5, 1, 1.5, 2, 3, 5, 7, 10];

  const f  = apertureVals[aperture];
  const fl = focalLengthVals[focalLength];
  const d  = distanceVals[distance];

  const coc        = 0.029;
  const H          = (fl * fl) / (f * coc * 1000);
  const dofNear    = (H * d) / (H + d);
  const dofFarRaw  = (H * d) / Math.max(H - d, 0.01);
  const dofFar     = dofFarRaw > 100 ? Infinity : dofFarRaw;
  const dofRange   = dofFar === Infinity ? '∞' : (dofFar - dofNear).toFixed(2) + 'm';

  const bgBlurPx   = Math.max(0, (9 - aperture) * 1.8 + focalLength * 0.6 - distance * 0.5);
  const sharpZonePct = Math.max(15, Math.min(98, aperture * 9 - focalLength * 3.5 + distance * 5));

  const src         = uploaded || SAMPLE_IMAGES[selImg].url;
  const fallbackSrc = uploaded ? null : SAMPLE_IMAGES[selImg].fallback;
  const handleImgError = e => { if (fallbackSrc && e.target.src !== fallbackSrc) e.target.src = fallbackSrc; };

  return (
    <div className={styles.expSim}>
      <div className={styles.controls}>
        <h2 className={styles.simTitle}>◎ Depth of Field</h2>
        <p className={styles.simDesc}>See how aperture, focal length, and distance control which parts stay sharp.</p>

        <SliderControl label="Aperture" icon="◎" color="#f5a623"
          value={aperture} min={0} max={apertureVals.length - 1}
          displayValue={`f/${apertureVals[aperture]}`} onChange={setAperture}
          leftHint="f/1.4 · Shallow DOF" rightHint="f/16 · Deep DOF" />

        <SliderControl label="Focal Length" icon="○" color="#7c6ff7"
          value={focalLength} min={0} max={focalLengthVals.length - 1}
          displayValue={`${focalLengthVals[focalLength]}mm`} onChange={setFocalLength}
          leftHint="24mm · Wide angle" rightHint="200mm · Telephoto" />

        <SliderControl label="Subject Distance" icon="↔" color="#22d3ee"
          value={distance} min={0} max={distanceVals.length - 1}
          displayValue={`${distanceVals[distance]}m`} onChange={setDistance}
          leftHint="0.5m · Very close" rightHint="10m · Far away" />

        <div className={styles.dofStats}>
          <div className={styles.dofStat}><div className={styles.dofStatLabel}>DOF Range</div><div className={styles.dofStatValue}>{dofRange}</div></div>
          <div className={styles.dofStat}><div className={styles.dofStatLabel}>Near Limit</div><div className={styles.dofStatValue}>{dofNear.toFixed(2)}m</div></div>
          <div className={styles.dofStat}><div className={styles.dofStatLabel}>Far Limit</div><div className={styles.dofStatValue}>{dofFar === Infinity ? '∞' : dofFar.toFixed(2) + 'm'}</div></div>
        </div>

        <ImagePicker selImg={selImg} setSelImg={setSelImg} uploaded={uploaded} setUploaded={setUploaded} fileRef={fileRef} />
      </div>

      <div className={styles.preview}>
        <div className={styles.dofPhotoWrapper}>
          <img key={src + '-bg'} src={src} alt="" aria-hidden="true"
            className={styles.dofBgImg} style={{ filter: `blur(${bgBlurPx.toFixed(1)}px)` }}
            onError={handleImgError} />
          <img key={src + '-fg'} src={src} alt="DOF preview"
            className={styles.dofFgImg}
            style={{ clipPath: `ellipse(${sharpZonePct}% ${(sharpZonePct * 1.25).toFixed(0)}% at 50% 58%)` }}
            onError={handleImgError} />
          <div className={styles.dofBadgeRow}>
            <span className={styles.badge} style={{ color: '#f5a623', borderColor: '#f5a62355' }}>
              ◎ {bgBlurPx < 1 ? 'All sharp' : bgBlurPx < 4 ? 'Subtle blur' : bgBlurPx < 8 ? 'Moderate bokeh' : 'Heavy bokeh'}
            </span>
            <span className={styles.badge} style={{ color: '#22d3ee', borderColor: '#22d3ee55' }}>
              Sharp zone: {sharpZonePct < 30 ? 'Narrow' : sharpZonePct < 60 ? 'Medium' : 'Wide'}
            </span>
          </div>
        </div>
        <div className={styles.tip}>
          <strong>💡 Bokeh recipe:</strong> Use f/1.4–f/2.8 + get close to your subject + put the background far away + use 85mm or longer.
        </div>
      </div>
    </div>
  );
}

/* ─── COMPOSITION SIMULATOR ─── */
const OVERLAYS_CONFIG = [
  { key: 'thirds',   label: 'Rule of Thirds', color: 'rgba(255,255,255,0.7)',  desc: 'Divide the frame into thirds. Place subjects at intersections.' },
  { key: 'golden',   label: 'Golden Ratio',   color: 'rgba(245,166,35,0.8)',   desc: 'Based on φ=1.618. Similar to rule of thirds but mathematically pleasing.' },
  { key: 'diagonal', label: 'Diagonals',      color: 'rgba(239,68,68,0.7)',    desc: 'Dynamic lines create energy. Align leading lines with corners.' },
  { key: 'cross',    label: 'Centre Cross',   color: 'rgba(34,211,238,0.7)',   desc: 'Symmetrical framing. Works well for portraits and reflections.' },
];

function CompositionSimulator() {
  const [overlays,  setOverlays]  = useState({ thirds: true, golden: false, diagonal: false, cross: false });
  const [selImg,    setSelImg]    = useState(0);
  const [uploaded,  setUploaded]  = useState(null);
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const fileRef      = useRef(null);

  const toggleOverlay = key => setOverlays(prev => ({ ...prev, [key]: !prev[key] }));

  const drawOverlays = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width, H = canvas.height;
    if (!W || !H) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    const line = (x1, y1, x2, y2, color, width = 1.5) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.restore();
    };

    const circle = (cx, cy, r, color, width = 2) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    };

    if (overlays.thirds) {
      const c = 'rgba(255,255,255,0.65)';
      line(W/3, 0, W/3, H, c); line(2*W/3, 0, 2*W/3, H, c);
      line(0, H/3, W, H/3, c); line(0, 2*H/3, W, 2*H/3, c);
      [[W/3, H/3], [2*W/3, H/3], [W/3, 2*H/3], [2*W/3, 2*H/3]].forEach(([x, y]) => {
        circle(x, y, 7, 'rgba(255,200,0,0.85)', 2);
      });
    }

    if (overlays.golden) {
      const phi = 0.618;
      const c = 'rgba(245,166,35,0.7)';
      line(W*phi, 0, W*phi, H, c); line(W*(1-phi), 0, W*(1-phi), H, c);
      line(0, H*phi, W, H*phi, c); line(0, H*(1-phi), W, H*(1-phi), c);
    }

    if (overlays.diagonal) {
      const c = 'rgba(239,68,68,0.65)';
      line(0, 0, W, H, c); line(W, 0, 0, H, c);
      line(0, H/2, W/2, 0, c, 1); line(W/2, 0, W, H/2, c, 1);
      line(0, H/2, W/2, H, c, 1); line(W/2, H, W, H/2, c, 1);
    }

    if (overlays.cross) {
      const c = 'rgba(34,211,238,0.65)';
      line(W/2, 0, W/2, H, c); line(0, H/2, W, H/2, c);
      circle(W/2, H/2, 14, c, 2); circle(W/2, H/2, 28, c, 1);
    }
  }, [overlays]);

  // Resize canvas when container changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
      drawOverlays();
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [drawOverlays]);

  useEffect(() => { drawOverlays(); }, [drawOverlays]);

  const src         = uploaded || SAMPLE_IMAGES[selImg].url;
  const fallbackSrc = uploaded ? null : SAMPLE_IMAGES[selImg].fallback;
  const handleImgError = e => { if (fallbackSrc && e.target.src !== fallbackSrc) e.target.src = fallbackSrc; };

  const activeOverlay = OVERLAYS_CONFIG.find(o => overlays[o.key]) || OVERLAYS_CONFIG[0];

  return (
    <div className={styles.expSim}>
      <div className={styles.controls}>
        <h2 className={styles.simTitle}>⊞ Composition</h2>
        <p className={styles.simDesc}>Overlay composition guidelines on your photo to analyse framing.</p>

        <div>
          <div className={styles.pickerLabel}>Overlays</div>
          <div className={styles.overlayToggles}>
            {OVERLAYS_CONFIG.map(o => (
              <button key={o.key}
                className={`${styles.overlayBtn} ${overlays[o.key] ? styles.overlayBtnActive : ''}`}
                onClick={() => toggleOverlay(o.key)}
                style={overlays[o.key] ? { borderColor: o.color.replace(/[\d.]+\)$/, '0.9)') } : {}}
              >
                <span className={styles.overlayBtnCheck}>{overlays[o.key] ? '✓' : '○'}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tip}>
          <strong>💡 {activeOverlay.label}:</strong> {activeOverlay.desc}
        </div>

        <div className={styles.compositionTips}>
          <div className={styles.compTipTitle}>Composition Rules</div>
          {[
            { rule: 'Rule of Thirds', desc: 'Never centre everything. Place your horizon on the top or bottom third.' },
            { rule: 'Leading Lines', desc: 'Roads, rivers, fences — guide the eye into the frame.' },
            { rule: 'Framing', desc: 'Use natural frames (doors, trees) to isolate your subject.' },
            { rule: 'Simplify', desc: 'Remove distractions. A strong subject in a clean background wins.' },
          ].map((t, i) => (
            <div key={i} className={styles.compTipItem}>
              <div className={styles.compTipRule}>{t.rule}</div>
              <div className={styles.compTipDesc}>{t.desc}</div>
            </div>
          ))}
        </div>

        <ImagePicker selImg={selImg} setSelImg={setSelImg} uploaded={uploaded} setUploaded={setUploaded} fileRef={fileRef} />
      </div>

      <div className={styles.preview}>
        <div ref={containerRef} className={styles.composeWrapper}>
          <img key={src} src={src} alt="Composition" className={styles.photoImg} style={{ position: 'absolute', inset: 0 }}
            onError={handleImgError} />
          <canvas ref={canvasRef} className={styles.composeCanvas} />
        </div>
      </div>
    </div>
  );
}

/* ─── SENSOR SIZE SIMULATOR ─── */
const SENSOR_DATA = [
  { name: 'Full Frame',        w: 36.0,  h: 24.0,  crop: 1.0,  color: '#7c6ff7', examples: 'Sony A7 IV, Canon R6 II, Nikon Z6 III',   mp: '24–61MP typical',  note: 'Largest mainstream sensor. Best low-light, widest DOF control, most lens options.' },
  { name: 'APS-C',             w: 23.5,  h: 15.6,  crop: 1.53, color: '#22d3ee', examples: 'Sony A6700, Fuji X-T5, Nikon Z50 II',      mp: '21–40MP typical',  note: '×1.5–1.6 crop. Reach advantage for wildlife. Compact bodies and affordable lenses.' },
  { name: 'Micro Four Thirds', w: 17.3,  h: 13.0,  crop: 2.0,  color: '#22c55e', examples: 'Panasonic G9 II, OM-1 Mark II',             mp: '20–25MP typical',  note: '×2 crop. Deep DOF at wide apertures. Very compact systems. Great for video and wildlife.' },
  { name: '1-inch',            w: 13.2,  h: 8.8,   crop: 2.73, color: '#f5a623', examples: 'Sony RX100 VII, DJI drones',                mp: '20MP typical',     note: '×2.73 crop. Found in premium compacts. Good image quality in a small package.' },
  { name: 'Phone (1/1.3")',    w: 9.6,   h: 7.2,   crop: 3.7,  color: '#fb923c', examples: 'iPhone 15 Pro, Samsung S24 Ultra',          mp: '12–200MP typical', note: 'Computational photography compensates for small size. Limited low-light and DOF control.' },
  { name: 'Phone (1/2.55")',   w: 6.17,  h: 4.55,  crop: 5.6,  color: '#f43f5e', examples: 'Budget smartphones',                        mp: '12–50MP typical',  note: 'Smallest common sensor. Performance gap vs larger sensors is significant.' },
];

function SensorSizeSimulator() {
  const [highlighted, setHighlighted] = useState(null);
  const canvasRef = useRef(null);

  const SCALE = 6; // pixels per mm
  const PADDING = 24;
  const MAX_W = SENSOR_DATA[0].w * SCALE + PADDING * 2;
  const MAX_H = SENSOR_DATA[0].h * SCALE + PADDING * 2 + 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = MAX_W;
    canvas.height = MAX_H;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sensors from largest to smallest (so smaller ones appear on top)
    [...SENSOR_DATA].reverse().forEach((s, ri) => {
      const i = SENSOR_DATA.length - 1 - ri;
      const px = s.w * SCALE;
      const py = s.h * SCALE;
      const x = PADDING + (SENSOR_DATA[0].w * SCALE - px) / 2;
      const y = PADDING + (SENSOR_DATA[0].h * SCALE - py) / 2;
      const alpha = highlighted === null || highlighted === i ? 1 : 0.25;
      const isHl = highlighted === i;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = s.color + '20';
      ctx.strokeStyle = s.color;
      ctx.lineWidth   = isHl ? 2.5 : 1.5;

      ctx.fillRect(x, y, px, py);
      ctx.strokeRect(x, y, px, py);

      if (px > 50) {
        ctx.fillStyle = s.color;
        ctx.font = `${isHl ? '700 ' : ''}11px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(s.name, x + px / 2, y + py / 2 + 4);
      }

      ctx.restore();
    });
  }, [highlighted]);

  const hl = highlighted !== null ? SENSOR_DATA[highlighted] : null;

  return (
    <div className={styles.sensorSim}>
      <div className={styles.sensorSimLeft}>
        <h2 className={styles.simTitle}>⊡ Sensor Sizes</h2>
        <p className={styles.simDesc}>See how different sensor formats compare in actual physical size. Larger sensors capture more light and offer more shallow DOF control.</p>

        <div className={styles.sensorCanvasWrap}>
          <canvas ref={canvasRef} className={styles.sensorCanvas} />
        </div>

        <div className={styles.sensorLegend}>
          {SENSOR_DATA.map((s, i) => (
            <button key={i}
              className={`${styles.sensorLegendItem} ${highlighted === i ? styles.sensorLegendActive : ''}`}
              onClick={() => setHighlighted(highlighted === i ? null : i)}
              onMouseEnter={() => setHighlighted(i)}
              onMouseLeave={() => setHighlighted(null)}
            >
              <span className={styles.sensorLegendDot} style={{ background: s.color }} />
              <span className={styles.sensorLegendName}>{s.name}</span>
              <span className={styles.sensorLegendSize}>{s.w}×{s.h}mm</span>
              <span className={styles.sensorLegendCrop}>×{s.crop.toFixed(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sensorSimRight}>
        {hl ? (
          <div className={styles.sensorDetail} style={{ borderColor: hl.color + '50' }}>
            <div className={styles.sensorDetailName} style={{ color: hl.color }}>{hl.name}</div>
            <div className={styles.sensorDetailDims}>{hl.w}mm × {hl.h}mm · Crop factor ×{hl.crop.toFixed(2)}</div>
            <div className={styles.sensorDetailNote}>{hl.note}</div>
            <div className={styles.sensorDetailGrid}>
              <div className={styles.sensorDetailItem}>
                <div className={styles.sensorDetailLabel}>Typical Resolution</div>
                <div className={styles.sensorDetailVal}>{hl.mp}</div>
              </div>
              <div className={styles.sensorDetailItem}>
                <div className={styles.sensorDetailLabel}>Example Cameras</div>
                <div className={styles.sensorDetailVal}>{hl.examples}</div>
              </div>
              <div className={styles.sensorDetailItem}>
                <div className={styles.sensorDetailLabel}>50mm FF equivalent</div>
                <div className={styles.sensorDetailVal}>{Math.round(50 / hl.crop)}mm on this sensor</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.sensorHoverHint}>
            <div className={styles.sensorHoverIcon}>⊡</div>
            <div>Hover over a sensor in the legend to see detailed specs and camera examples.</div>
            <div style={{ marginTop: 24 }}>
              {SENSOR_DATA.map((s, i) => (
                <div key={i} className={styles.sensorQuickRow}>
                  <span style={{ color: s.color, fontWeight: 700 }}>{s.name}</span>
                  <span style={{ color: 'var(--text3)', fontSize: 13 }}>×{s.crop.toFixed(1)} crop · {s.w}×{s.h}mm</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── SCENE GUIDE ─── */
function SceneSimulator() {
  const scenes = [
    { name: 'Portrait (Outdoor)', icon: '👤', color: '#f5a623',
      recommended: { Aperture: 'f/1.8–f/2.8', Shutter: '1/200s+', ISO: '100–400', Mode: 'Aperture Priority', Metering: 'Evaluative', AF: 'Single AF / Eye Detect' },
      why: 'Wide aperture for bokeh, fast enough shutter to freeze slight movement, low ISO for clean skin tones.' },
    { name: 'Landscape', icon: '🏔', color: '#22c55e',
      recommended: { Aperture: 'f/8–f/11', Shutter: '1/60s–30s', ISO: '100–200', Mode: 'Aperture Priority / Manual', Metering: 'Evaluative', AF: 'Single AF or MF' },
      why: 'Small aperture for deep DOF, tripod for slow shutter exposures, lowest ISO for maximum detail.' },
    { name: 'Sports / Action', icon: '🏃', color: '#22d3ee',
      recommended: { Aperture: 'f/2.8–f/5.6', Shutter: '1/1000s+', ISO: '800–6400', Mode: 'Shutter Priority / Manual', Metering: 'Evaluative', AF: 'Continuous AF (AI Servo)' },
      why: 'Fast shutter freezes motion. Accept higher ISO. Wide aperture for more light. Continuous AF for tracking.' },
    { name: 'Low Light / Night', icon: '🌃', color: '#7c6ff7',
      recommended: { Aperture: 'f/1.4–f/2.8', Shutter: '1/60s–30s', ISO: '1600–12800', Mode: 'Manual', Metering: 'Spot or Evaluative', AF: 'Single AF or MF' },
      why: 'Widest aperture possible. Tripod for long exposures. Raise ISO as needed. Watch for camera shake.' },
    { name: 'Macro / Close-up', icon: '🌸', color: '#e879f9',
      recommended: { Aperture: 'f/8–f/16', Shutter: '1/200s+', ISO: '100–400', Mode: 'Aperture Priority / Manual', Metering: 'Spot', AF: 'Manual Focus preferred' },
      why: 'Narrow aperture maximises tiny DOF. Ring flash for even lighting. MF for precision.' },
    { name: 'Street Photography', icon: '🏙', color: '#fb923c',
      recommended: { Aperture: 'f/5.6–f/8', Shutter: '1/250s+', ISO: 'Auto (800 max)', Mode: 'Aperture Priority', Metering: 'Evaluative', AF: 'Single AF or Zone' },
      why: "Wider DOF so you don't miss the moment. Fast enough shutter for candid shots. Auto ISO handles changing light." },
  ];

  const [selected, setSelected] = useState(0);
  const scene = scenes[selected];

  return (
    <div className={styles.sceneSim}>
      <div className={styles.sceneGrid}>
        {scenes.map((s, i) => (
          <button key={i}
            className={`${styles.sceneBtn} ${selected === i ? styles.sceneBtnActive : ''}`}
            onClick={() => setSelected(i)}
            style={selected === i ? { borderColor: s.color, background: s.color + '15' } : {}}
          >
            <span className={styles.sceneBtnIcon}>{s.icon}</span>
            <span className={styles.sceneBtnName}>{s.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.sceneDetail} style={{ borderColor: scene.color + '40' }}>
        <div className={styles.sceneDetailHeader}>
          <span className={styles.sceneDetailIcon}>{scene.icon}</span>
          <div>
            <h3 className={styles.sceneDetailTitle}>{scene.name}</h3>
            <p className={styles.sceneDetailWhy}>{scene.why}</p>
          </div>
        </div>
        <div className={styles.settingsGrid}>
          {Object.entries(scene.recommended).map(([key, val]) => (
            <div key={key} className={styles.setting} style={{ borderColor: scene.color + '30' }}>
              <div className={styles.settingKey}>{key}</div>
              <div className={styles.settingVal} style={{ color: scene.color }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
