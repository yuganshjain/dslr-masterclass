import styles from './CheatSheet.module.css';

const sections = [
  {
    title: 'Aperture Quick Reference',
    icon: '◎',
    color: '#f5a623',
    rows: [
      { setting: 'f/1.4 – f/2', use: 'Low light portraits, maximum bokeh', dof: 'Extremely Shallow', light: '●●●●●' },
      { setting: 'f/2.8', use: 'Portraits, indoor sports, events', dof: 'Very Shallow', light: '●●●●○' },
      { setting: 'f/4', use: 'Portrait/environment, some DOF', dof: 'Shallow', light: '●●●○○' },
      { setting: 'f/5.6', use: 'General outdoor, group shots', dof: 'Moderate', light: '●●○○○' },
      { setting: 'f/8', use: 'Sharpest on most lenses — street/documentary', dof: 'Deep', light: '●●○○○' },
      { setting: 'f/11', use: 'Landscapes, architecture', dof: 'Very Deep', light: '●○○○○' },
      { setting: 'f/16+', use: 'Star burst effects, creative', dof: 'Maximum', light: '○○○○○' },
    ]
  },
  {
    title: 'Shutter Speed Quick Reference',
    icon: '⚡',
    color: '#22d3ee',
    rows: [
      { setting: '1/4000 – 1/2000s', use: 'Freeze race cars, splashing water', motion: 'Completely Frozen', risk: 'Dark (need wide aperture)' },
      { setting: '1/1000s', use: 'Freeze sports, birds in flight', motion: 'Frozen Action', risk: 'Needs f/2.8+' },
      { setting: '1/500s', use: 'Running, cyclists', motion: 'Fast Action Frozen', risk: 'Low' },
      { setting: '1/250s', use: 'People walking, casual sport', motion: 'Most Motion Frozen', risk: 'Low' },
      { setting: '1/125s', use: 'General outdoor handheld', motion: 'Sharp (stationary)', risk: 'Low' },
      { setting: '1/60s', use: 'Minimum handheld (50mm lens)', motion: 'May blur people', risk: 'Camera shake on telephoto' },
      { setting: '1/30s – 1/8s', use: 'Silky water, creative blur', motion: 'Motion Blur', risk: 'Tripod needed' },
      { setting: '1s – 30s', use: 'Light trails, star photos, long exposure', motion: 'Major Blur', risk: 'Tripod essential' },
    ]
  },
  {
    title: 'ISO Quick Reference',
    icon: '◈',
    color: '#e879f9',
    rows: [
      { setting: 'ISO 100', use: 'Bright sun, studio strobe', quality: 'Perfect — No noise', when: 'Tripod or bright outdoors' },
      { setting: 'ISO 200', use: 'Cloudy day, outdoor shade', quality: 'Excellent', when: 'Normal outdoor shooting' },
      { setting: 'ISO 400', use: 'Overcast, indoor window light', quality: 'Very Good', when: 'Versatile default' },
      { setting: 'ISO 800', use: 'Indoor dim light, sunset', quality: 'Good on enthusiast+', when: 'Indoor without flash' },
      { setting: 'ISO 1600', use: 'Indoor sports, stage', quality: 'Acceptable modern camera', when: 'Low light action' },
      { setting: 'ISO 3200', use: 'Dark interiors, night street', quality: 'Fine on full frame', when: 'Nighttime handheld' },
      { setting: 'ISO 6400+', use: 'Milky Way, very dark scenes', quality: 'Use denoise in post', when: 'Only when necessary' },
    ]
  },
  {
    title: 'Shooting Mode Guide',
    icon: '⌬',
    color: '#7c6ff7',
    cols: ['Mode', 'You control', 'Camera controls', 'Best for'],
    rows: [
      ['P — Program', 'Nothing (can shift combo)', 'Aperture + Shutter', 'Casual, learning exposure'],
      ['A / Av — Aperture Priority', 'Aperture', 'Shutter Speed', 'Portraits, everyday, DOF control'],
      ['S / Tv — Shutter Priority', 'Shutter Speed', 'Aperture', 'Sports, action, motion control'],
      ['M — Manual', 'Everything', 'Nothing', 'Studio, tripod, video, tricky light'],
    ]
  },
  {
    title: 'Common Scene Settings',
    icon: '◉',
    color: '#22c55e',
    scenes: [
      { name: '👤 Portrait', aperture: 'f/1.8–f/2.8', shutter: '1/200s+', iso: '100–400', wb: 'Auto / Cloudy', af: 'Eye AF / Single', tip: 'Shoot wide open for bokeh; Eye detect AF' },
      { name: '🏔 Landscape', aperture: 'f/8–f/11', shutter: '1/60s–30s', iso: '100–200', wb: 'Daylight / Auto', af: 'Single / MF', tip: 'Tripod + self-timer; Focus 1/3 into scene' },
      { name: '🏃 Sports', aperture: 'f/2.8–f/5.6', shutter: '1/1000s+', iso: 'Auto 800–6400', wb: 'Auto', af: 'AF-C Continuous', tip: 'Pre-focus zone; burst mode; pan with subject' },
      { name: '🌃 Night/Low Light', aperture: 'f/1.4–f/2.8', shutter: '1/60s–30s', iso: '1600–12800', wb: 'Auto / Tungsten', af: 'Manual or center', tip: 'Use a tripod; shoot RAW for NR in post' },
      { name: '🌸 Macro', aperture: 'f/8–f/16', shutter: '1/200s+', iso: '100–400', wb: 'Custom', af: 'Manual Focus', tip: 'Use ring flash; focus rail for precision stacking' },
      { name: '🏙 Street', aperture: 'f/5.6–f/8', shutter: '1/250s+', iso: 'Auto 800', wb: 'Auto', af: 'Single / Zone', tip: 'Zone focus technique; small inconspicuous lens' },
    ]
  },
  {
    title: 'Exposure Compensation Guide',
    icon: '◑',
    color: '#fb923c',
    ecRows: [
      { ec: '+2 to +3', reason: 'Bright snow, white dress, very high key scene', example: 'Snow, white sand beach' },
      { ec: '+1 to +1.5', reason: 'Backlit subject, pale skin, light sand', example: 'Backlit portrait, sunset behind subject' },
      { ec: '+0.3 to +0.7', reason: 'Skin tones (camera underexposes faces)', example: 'Most portrait situations' },
      { ec: '0', reason: 'Neutral gray scene, even lighting', example: 'Green grass, gray wall' },
      { ec: '-0.3 to -0.7', reason: 'Slightly dramatic mood', example: 'Dark subject, moody portrait' },
      { ec: '-1 to -1.5', reason: 'Black cat, very dark subject', example: 'Stage lighting, dark clothing' },
      { ec: '-2 to -3', reason: 'Intentional silhouette or very dark scene', example: 'Silhouette against bright sky' },
    ]
  },
  {
    title: 'Key Formulas & Rules',
    icon: '△',
    color: '#7c6ff7',
    formulas: [
      { name: 'Sunny 16 Rule', formula: 'f/16, 1/(ISO)s in direct sun', example: 'ISO 200 → f/16, 1/200s' },
      { name: '500 Rule (Milky Way)', formula: '500 ÷ focal length = max seconds', example: '500 ÷ 24mm = 20s max' },
      { name: 'Handheld Minimum', formula: '1/(focal length × crop factor)', example: '50mm on APS-C → 1/75s min' },
      { name: 'Flash GN', formula: 'f-stop = GN ÷ distance', example: 'GN 40, 5m away → f/8' },
      { name: 'Hyperfocal', formula: 'fl² ÷ (f × CoC)', example: '24mm, f/8 → ~3.5m hyperfocal' },
      { name: 'ETTR', formula: 'Expose as bright as possible without clipping highlights', example: 'Check histogram — avoid right-edge clipping' },
    ]
  },
];

export default function CheatSheet() {
  return (
    <div className="page-wide" style={{ padding: '40px 32px 80px' }}>
      <div className="page-header fade-up">
        <h1>◇ Quick Reference Cheatsheet</h1>
        <p>All the essential DSLR settings and formulas at a glance. Bookmark this page.</p>
      </div>

      <div className={styles.grid}>
        {sections.map((sec, i) => (
          <div key={i} className={`${styles.section} fade-up-${(i % 3) + 1}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon} style={{ color: sec.color }}>{sec.icon}</span>
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
            </div>

            {/* Standard table */}
            {sec.rows && !sec.cols && !sec.scenes && !sec.ecRows && !sec.formulas && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {sec.rows.map((row, j) => (
                      <tr key={j}>
                        <td className={styles.settingCell} style={{ color: sec.color }}>
                          <span className="mono">{row.setting}</span>
                        </td>
                        <td className={styles.useCell}>{row.use}</td>
                        <td className={styles.metaCell}>
                          {row.dof || row.motion || row.quality || ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Mode table with custom cols */}
            {sec.cols && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>{sec.cols.map((c, j) => <th key={j}>{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k} className={k === 0 ? styles.settingCell : ''} style={k === 0 ? { color: sec.color } : {}}>
                            {k === 0 ? <span className="mono">{cell}</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Scenes grid */}
            {sec.scenes && (
              <div className={styles.scenesGrid}>
                {sec.scenes.map((scene, j) => (
                  <div key={j} className={styles.sceneCard}>
                    <div className={styles.sceneName}>{scene.name}</div>
                    <div className={styles.sceneSettings}>
                      <div><span className={styles.sk}>Aperture</span><span className={styles.sv} style={{ color: '#f5a623' }}>{scene.aperture}</span></div>
                      <div><span className={styles.sk}>Shutter</span><span className={styles.sv} style={{ color: '#22d3ee' }}>{scene.shutter}</span></div>
                      <div><span className={styles.sk}>ISO</span><span className={styles.sv} style={{ color: '#e879f9' }}>{scene.iso}</span></div>
                      <div><span className={styles.sk}>WB</span><span className={styles.sv}>{scene.wb}</span></div>
                      <div><span className={styles.sk}>AF</span><span className={styles.sv}>{scene.af}</span></div>
                    </div>
                    <div className={styles.sceneTip}>💡 {scene.tip}</div>
                  </div>
                ))}
              </div>
            )}

            {/* EC Table */}
            {sec.ecRows && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>EC Value</th><th>When to Use</th><th>Example</th></tr>
                  </thead>
                  <tbody>
                    {sec.ecRows.map((row, j) => (
                      <tr key={j}>
                        <td className={styles.settingCell} style={{ color: sec.color }}>
                          <span className="mono">{row.ec}</span>
                        </td>
                        <td>{row.reason}</td>
                        <td className={styles.metaCell}>{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Formulas */}
            {sec.formulas && (
              <div className={styles.formulas}>
                {sec.formulas.map((f, j) => (
                  <div key={j} className={styles.formula}>
                    <div className={styles.formulaName}>{f.name}</div>
                    <div className={styles.formulaExpr} style={{ color: sec.color }}>
                      <span className="mono">{f.formula}</span>
                    </div>
                    <div className={styles.formulaExample}>e.g. {f.example}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
