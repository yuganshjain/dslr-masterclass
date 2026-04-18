const SAMPLE_MODULES = [
  { id: 1, title: 'Camera Basics', subtitle: 'Your camera, demystified', summary: 'Sensors, bodies, lenses — the anatomy of a DSLR and what every control actually does.',
    difficulty: 'Beginner', duration: '15 min', icon: '◈', gradient: 'linear-gradient(135deg,#22c55e,#7c6ff7)',
    topics: ['Sensor', 'Body', 'Lens'], sections: 4 },
  { id: 2, title: 'Exposure Triangle', subtitle: 'Aperture × Shutter × ISO', summary: 'The three levers that control every photograph. Learn how they trade against each other.',
    difficulty: 'Beginner', duration: '18 min', icon: '△', gradient: 'linear-gradient(135deg,#7c6ff7,#22d3ee)',
    topics: ['Aperture', 'Shutter', 'ISO'], sections: 3 },
  { id: 3, title: 'Mastering Aperture', subtitle: 'Depth of field control', summary: 'f-stops, lens speed, and the art of controlling what is in focus.',
    difficulty: 'Intermediate', duration: '22 min', icon: '◎', gradient: 'linear-gradient(135deg,#f5a623,#e879f9)',
    topics: ['f-stops', 'Bokeh', 'DoF'], sections: 5 },
  { id: 4, title: 'Shutter Speed', subtitle: 'Freeze or blur motion', summary: 'From 1/8000s to 30-second exposures — when to use each and why.',
    difficulty: 'Intermediate', duration: '20 min', icon: '◉', gradient: 'linear-gradient(135deg,#22d3ee,#7c6ff7)',
    topics: ['Motion', 'Long exposure'], sections: 4 },
  { id: 5, title: 'ISO & Noise', subtitle: 'When to push sensitivity', summary: 'Understanding sensor sensitivity, noise, and the art of clean low-light shots.',
    difficulty: 'Intermediate', duration: '16 min', icon: '◆', gradient: 'linear-gradient(135deg,#e879f9,#f5a623)',
    topics: ['ISO', 'Noise', 'Low light'], sections: 3 },
  { id: 6, title: 'Composition', subtitle: 'Rule of thirds and beyond', summary: 'Framing, leading lines, negative space — the decisions that separate a snapshot from a photograph.',
    difficulty: 'Advanced', duration: '25 min', icon: '◇', gradient: 'linear-gradient(135deg,#ef4444,#fb923c)',
    topics: ['Framing', 'Lines', 'Rule of thirds'], sections: 6 },
];

function ModuleGrid({ modules, onOpen, cols = 3 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
      {modules.map(m => <ModuleCard key={m.id} mod={m} onOpen={() => onOpen(m)} />)}
    </div>
  );
}
Object.assign(window, { SAMPLE_MODULES, ModuleGrid });
