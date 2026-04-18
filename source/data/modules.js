export const modules = [
  {
    id: 'exposure-triangle',
    title: 'The Exposure Triangle',
    subtitle: 'The foundation of all photography',
    icon: '△',
    color: '#7c6ff7',
    gradient: 'linear-gradient(135deg, #7c6ff7, #22d3ee)',
    duration: '12 min',
    difficulty: 'Beginner',
    topics: ['Aperture', 'Shutter Speed', 'ISO', 'How they interact'],
    summary: 'The three pillars of exposure: every photo you take is controlled by aperture, shutter speed, and ISO working together.',
    sections: [
      {
        title: 'What is Exposure?',
        content: `Exposure is the amount of light that reaches your camera sensor when you take a photo. A perfectly exposed image has the right amount of brightness — not too dark (underexposed) or too bright (overexposed).

The **Exposure Triangle** has three controls that work together:
- **Aperture** — controls how wide the lens opens
- **Shutter Speed** — controls how long the shutter stays open
- **ISO** — controls the sensor's sensitivity to light

Change one, and you must compensate with another to keep the same exposure. Master this relationship and you master photography.`
      },
      {
        title: 'The Reciprocal Relationship',
        content: `Think of it like a recipe. If you double the amount of one ingredient, you need to halve another to keep balance.

**Stop System** — each "stop" either doubles or halves the light:
- Open aperture one stop → double the light → increase shutter speed to compensate
- Raise ISO one stop → sensor captures twice as much → can use faster shutter

**Example:** Shooting at f/2.8, 1/125s, ISO 400 (correct exposure)
Same exposure achieved with: f/5.6, 1/30s, ISO 400
Or: f/2.8, 1/500s, ISO 1600

These all expose the same amount of light — but produce different creative results!`
      },
      {
        title: 'Exposure Value (EV)',
        content: `EV is a single number that represents a combination of aperture and shutter speed for a given ISO. EV 0 = f/1, 1 second, ISO 100.

**EV chart for common situations:**
| Scene | EV |
|---|---|
| Bright sunny beach | 16 |
| Overcast day | 12 |
| Indoor office | 7 |
| Indoor sports | 8 |
| Candle light | 3 |
| Night street | 3-5 |

The **Sunny 16 Rule**: On a sunny day, set aperture to f/16 and shutter speed to 1/(ISO). E.g., ISO 100 → 1/100s at f/16.`
      }
    ],
    keyTakeaways: [
      'Aperture, shutter speed, and ISO form the exposure triangle',
      'Changing one stop in any element doubles or halves the light',
      'Same exposure = many different creative combinations',
      'The Sunny 16 rule is your emergency meter-free guide'
    ]
  },
  {
    id: 'aperture',
    title: 'Aperture & Depth of Field',
    subtitle: 'Control light and background blur',
    icon: '◎',
    color: '#f5a623',
    gradient: 'linear-gradient(135deg, #f5a623, #fb923c)',
    duration: '14 min',
    difficulty: 'Beginner',
    topics: ['f-stops explained', 'Depth of Field', 'Bokeh', 'Diffraction'],
    summary: 'Aperture controls the size of the lens opening — it affects both exposure and the depth of field in your images.',
    sections: [
      {
        title: 'What is Aperture?',
        content: `Aperture is the opening inside your lens through which light passes. It's measured in **f-stops** (also called f-numbers).

**Confusing but critical:** Lower f-number = WIDER opening = MORE light
- f/1.4 — Very wide. Lets in a LOT of light. Very shallow depth of field.
- f/2.8 — Wide. Great for portraits in low light.
- f/5.6 — Mid. Good balance for many situations.
- f/8 — Often the sharpest aperture on most lenses.
- f/11 — Narrow. Great for landscapes.
- f/16 — Very narrow. Diffraction may soften image.
- f/22 — Extremely narrow. Mostly for special effects.

**The math:** f/stop = focal length ÷ diameter of opening. f/2 on a 50mm lens = 25mm opening.`
      },
      {
        title: 'Depth of Field (DOF)',
        content: `DOF is the range of distance in your photo that appears acceptably sharp. Aperture is the most powerful DOF control.

**Shallow DOF** (f/1.4–f/2.8):
- Subject sharp, background blurry (bokeh)
- Perfect for portraits, product shots, food
- More dramatic, professional look

**Deep DOF** (f/8–f/16):
- Everything sharp front to back
- Perfect for landscapes, architecture, group shots
- Documentation, real estate

**Other factors affecting DOF:**
1. **Focal length** — longer lens = shallower DOF
2. **Subject distance** — closer subject = shallower DOF
3. **Sensor size** — full frame has shallower DOF than APS-C at same settings`
      },
      {
        title: 'Bokeh — Beautiful Background Blur',
        content: `Bokeh (from Japanese "boke" = blur) refers to the quality of out-of-focus areas. Good bokeh is smooth, circular, and pleasing.

**How to maximize bokeh:**
- Use the widest aperture your lens allows (f/1.8, f/2, f/2.8)
- Get CLOSE to your subject
- Put your background FAR from your subject
- Use a longer focal length (85mm, 135mm are portrait kings)

**Aperture blade shape:** More blades = more circular bokeh balls. Nikon 85mm f/1.4G has 9 rounded blades — legendary bokeh.

**Lens recommendations for bokeh:**
- 50mm f/1.8 — Budget king, great bokeh
- 85mm f/1.8 — Portrait perfection
- 135mm f/2 — Silky compression`
      },
      {
        title: 'Diffraction & Sweet Spot',
        content: `**Diffraction** occurs at very small apertures (f/16, f/22) where light waves bend around the blades and soften the image — even if everything is "in focus."

**Finding the sweet spot:**
Most lenses are sharpest 2–3 stops from wide open:
- f/1.8 lens → sweet spot at f/4–f/5.6
- f/2.8 lens → sweet spot at f/5.6–f/8
- f/4 lens → sweet spot at f/8–f/11

**Hyperfocal Distance:** The closest focusing distance that keeps the background sharp to infinity. Used by landscape photographers to maximize sharpness throughout the frame. = (focal length² ÷ (f-stop × circle of confusion))`
      }
    ],
    keyTakeaways: [
      'Lower f-number = wider aperture = more light = shallower DOF',
      'f/1.4–f/2.8 for portraits; f/8–f/11 for landscapes',
      'Most lenses are sharpest 2–3 stops from wide open',
      'Maximize bokeh: wide aperture + close to subject + background far away',
      'Diffraction softens images at very small apertures (f/16+)'
    ]
  },
  {
    id: 'shutter-speed',
    title: 'Shutter Speed & Motion',
    subtitle: 'Freeze action or paint with light',
    icon: '⚡',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #7c6ff7)',
    duration: '11 min',
    difficulty: 'Beginner',
    topics: ['Shutter speeds', 'Motion blur', 'Freezing action', 'Long exposure'],
    summary: 'Shutter speed determines how long your sensor is exposed to light — and whether motion appears frozen or blurred.',
    sections: [
      {
        title: 'Understanding Shutter Speed',
        content: `Shutter speed is the duration your camera's shutter stays open. Measured in seconds (or fractions of seconds).

**Common shutter speeds:**
- 1/4000s — Freeze fast sports, birds in flight
- 1/1000s — Freeze most sports, running
- 1/500s — Freeze people walking, pets
- 1/250s — General people shots
- 1/125s — Casual photography, outdoor
- 1/60s — Minimum for handheld (standard lenses)
- 1/30s — Risk of camera shake (need IS or tripod)
- 1/8s — Silky waterfalls
- 1s — Light trails begin
- 30s — Star photography, fireworks
- BULB — You control when shutter opens/closes (star trails, lightning)`
      },
      {
        title: 'The 1/focal length Rule',
        content: `**The Handheld Rule:** Your minimum safe shutter speed for sharp shots is approximately **1 ÷ focal length**.

- 50mm lens → minimum 1/50s (use 1/60s)
- 85mm lens → minimum 1/85s (use 1/100s)
- 200mm lens → minimum 1/200s
- 400mm lens → minimum 1/400s

**With Image Stabilization (IS/VR/OSS):**
Modern IS systems give you 4–5 stops of stabilization:
- 200mm with IS → can handhold at 1/13s!

**With APS-C cameras**, multiply focal length by crop factor:
- 50mm on APS-C (1.5x crop) = 75mm effective → use 1/80s minimum`
      },
      {
        title: 'Freezing Action',
        content: `To **freeze motion**, you need a shutter speed fast enough that the subject barely moves during the exposure.

**Speed guide:**
| Subject | Shutter Speed |
|---|---|
| Child walking | 1/250s |
| Person running | 1/500s |
| Sports (football) | 1/1000s |
| Bird in flight | 1/2000s |
| Splashing water | 1/4000s |
| Racing car | 1/4000s+ |

**Panning technique:** Follow moving subject with camera while using ~1/30–1/60s. Subject sharp, background blurs dramatically — conveys speed. Practice makes perfect!`
      },
      {
        title: 'Creative Long Exposure',
        content: `Long exposures (1/4s and slower) unlock creative effects impossible to see with the naked eye.

**Silky waterfalls** — 1/4s to 2s: The flowing water smooths into silk threads. Use ND filter in daylight.

**Light trails** — 5–30s: Car headlights/taillights become light streaks. Shoot from overpasses at dusk.

**Star trails** — 20+ minutes: Stars appear to circle Polaris. Use Bulb mode, cable release, and a dark sky.

**Milky Way** — 15–25s at f/2.8, ISO 3200: The 500 Rule for stars: Max shutter = 500 ÷ focal length before stars trail.

**Neutral Density (ND) Filters:** Block light so you can use slow shutters in daylight.
- ND3 (1 stop): Mild effect
- ND6 (2 stops): Smooth water
- ND10 (3 stops): Silky waterfalls
- ND1000 (10 stops): Daytime long exposure magic`
      }
    ],
    keyTakeaways: [
      'Faster shutter = more frozen motion; slower = more blur',
      'Handheld minimum: 1/(focal length) seconds',
      'To freeze action: 1/500s+ for most sports',
      'ND filters let you use slow shutter speeds in bright light',
      '500 Rule for Milky Way: 500 ÷ focal length = max seconds'
    ]
  },
  {
    id: 'iso',
    title: 'ISO & Sensor Sensitivity',
    subtitle: 'Gain light at the cost of noise',
    icon: '◈',
    color: '#e879f9',
    gradient: 'linear-gradient(135deg, #e879f9, #7c6ff7)',
    duration: '10 min',
    difficulty: 'Beginner',
    topics: ['ISO values', 'Noise vs grain', 'Auto ISO', 'High ISO cameras'],
    summary: 'ISO controls your sensor\'s amplification of light — higher ISO means more sensitivity but also more digital noise.',
    sections: [
      {
        title: 'What is ISO?',
        content: `ISO comes from film photography — it measured film's sensitivity to light. In digital cameras, it's the amount your camera amplifies the signal from the sensor.

**ISO Scale:**
- ISO 100 — Base ISO. Lowest noise. Use in bright light.
- ISO 200 — Minimal noise. Good outdoor shooting.
- ISO 400 — Slightly more noise. Overcast outdoors.
- ISO 800 — Noticeable noise on budget cameras.
- ISO 1600 — Good cameras handle this well.
- ISO 3200 — Indoor/low light standard.
- ISO 6400 — Acceptable on enthusiast bodies.
- ISO 12800+ — Noisier. Modern flagships handle well.
- ISO 51200+ — Emergency use only on most cameras.

**Native ISO:** Every sensor has a native (base) ISO where it performs best. Modern sensors: often 100 and a second native at 640 or 1000 (dual native ISO).`
      },
      {
        title: 'Noise vs. Grain',
        content: `**Digital Noise** has two types:
1. **Luminance noise** — random brightness variations. Looks similar to film grain. Usually acceptable and even artistic.
2. **Chroma noise** — random color splotches (red/green blobs). Ugly. Try to avoid.

**Managing noise:**
- Shoot at lowest ISO possible for the situation
- Expose to the right (ETTR): A slightly bright RAW file has less noise when brought down in post than a dark one pushed up
- Use noise reduction in Lightroom/Capture One/DxO
- AI denoise tools (Lightroom Denoise, Topaz DeNoise AI) are incredible in 2025

**High ISO performance by camera tier:**
- Entry DSLR (Rebel, D3500): ISO 1600–3200 usable
- Enthusiast (90D, D7500): ISO 3200–6400 usable
- Prosumer (5D IV, D750): ISO 6400–12800 usable
- Professional (1DX III, D6, Z9): ISO 25600+ usable`
      },
      {
        title: 'Auto ISO — Use It!',
        content: `**Auto ISO** is underused by beginners but beloved by pros. Let the camera handle ISO while you control aperture and shutter speed.

**Best practice setup:**
1. Set your desired aperture (e.g., f/2.8)
2. Set minimum shutter speed (e.g., 1/250s for people)
3. Set maximum ISO (e.g., 12800)
4. Camera picks the lowest ISO that achieves correct exposure

**Nikon/Canon/Sony Auto ISO custom settings:**
- Min shutter speed: Auto (camera uses focal length × crop × subject speed)
- Max ISO: Set based on your camera's capability

**When to use Auto ISO:** Weddings, events, street photography — any situation where light changes rapidly and you can't constantly adjust.

**When NOT to use Auto ISO:** Tripod work, studio, controlled lighting — where you want precise control.`
      }
    ],
    keyTakeaways: [
      'Lower ISO = less noise = better image quality',
      'Raise ISO when you run out of aperture/shutter room',
      'Expose to the right (ETTR) in RAW to minimize noise',
      'Auto ISO with a minimum shutter speed is a pro workflow',
      'AI denoise tools can rescue high-ISO shots in post'
    ]
  },
  {
    id: 'white-balance',
    title: 'White Balance & Color',
    subtitle: 'Make colors look natural and accurate',
    icon: '◐',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #22d3ee)',
    duration: '9 min',
    difficulty: 'Beginner',
    topics: ['Color temperature', 'WB presets', 'Kelvin', 'Gray card'],
    summary: 'White balance corrects color casts from different light sources so whites appear truly white and colors look accurate.',
    sections: [
      {
        title: 'Color Temperature Explained',
        content: `Different light sources emit different colors of light — measured in **Kelvin (K)**. Lower Kelvin = warmer (orange). Higher Kelvin = cooler (blue).

**Kelvin scale for photography:**
| Source | Color Temp |
|---|---|
| Candle flame | 1,800–2,000K |
| Tungsten/incandescent | 2,700–3,200K |
| Sunrise/sunset | 3,000–4,000K |
| Fluorescent | 4,000–5,000K |
| Daylight (noon) | 5,500–6,000K |
| Overcast sky | 6,500–7,500K |
| Open shade | 7,000–8,000K |
| Blue sky | 9,000–10,000K |

**Camera WB presets match these:** When set to "Tungsten," the camera shifts colors blue to compensate for the orange cast.`
      },
      {
        title: 'White Balance Presets',
        content: `**AWB (Auto White Balance):** Camera detects and corrects. Works 90% of the time. Can shift between shots in same scene.

**Daylight (☀️):** 5,500K — Sunny outdoors. Colors as your eye sees them.

**Cloudy (☁️):** 6,500K — Slightly warmer than daylight. Great for portraits in shade.

**Shade (🏠):** 7,500K — Warmer. Compensates for blue open shade.

**Tungsten (💡):** 3,200K — Indoors with bulbs. Reduces orange cast.

**Fluorescent (🔆):** 4,200K — Office/studio fluorescent lights.

**Flash (⚡):** 5,500K — Matches most flash units.

**Custom / Kelvin:** Set exact temperature. Best for consistency across a shoot.

**Pro tip:** Shoot RAW and set WB in post — WB adjustments are completely lossless on RAW files!`
      },
      {
        title: 'Getting Accurate Color',
        content: `**Gray Card Method:**
1. Hold an 18% gray card in your scene's lighting
2. Take a test shot
3. Use that shot as a custom WB reference
4. Camera (or Lightroom) corrects all shots to match

**ColorChecker Passport:** A more advanced calibration tool with multiple reference patches. Creates a color profile for your specific camera + lighting combo.

**Mixed lighting:** One of the hardest situations. Tungsten lamps + daylight from windows = orange and blue in the same shot. Solutions:
- Convert window light with CTO gel (makes it warm)
- Convert tungsten with CTB gel (makes it cool)
- Or shoot in black & white

**Creative WB:** Rules are meant to be broken! Shooting sunset with "Tungsten" WB makes blues incredibly dramatic. Use AWB and override for mood.`
      }
    ],
    keyTakeaways: [
      'Lower Kelvin = warmer (orange); Higher = cooler (blue)',
      'RAW files allow lossless WB correction in post',
      'Use a gray card for accurate color in critical work',
      'Mixed lighting is hard — use gels or convert to B&W',
      'Creative WB can dramatically change mood intentionally'
    ]
  },
  {
    id: 'focus',
    title: 'Autofocus Mastery',
    subtitle: 'Get sharp shots in any situation',
    icon: '⊕',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #fb923c, #f5a623)',
    duration: '15 min',
    difficulty: 'Intermediate',
    topics: ['AF modes', 'AF points', 'Back-button focus', 'Manual focus'],
    summary: 'Modern autofocus is incredibly powerful — knowing which mode to use in which situation separates sharp shots from blurry ones.',
    sections: [
      {
        title: 'AF Modes Explained',
        content: `**Single AF (One-Shot / AF-S):**
- Camera focuses once when you half-press, locks focus
- Best for: still subjects, portraits, landscapes, product
- Won't track movement — if subject moves after lock, refocus

**Continuous AF (AI Servo / AF-C):**
- Camera continuously adjusts focus while half-press held
- Tracks moving subjects
- Best for: sports, wildlife, moving vehicles, kids
- May not always lock on static subjects as precisely

**Automatic AF (AI Focus):**
- Camera switches between Single and Continuous
- Useful in theory, but often slower than manually choosing
- Use manual selection instead

**Face/Eye Detect AF (Modern Mirrorless):**
- Detects and tracks eyes automatically
- Sony Eye AF, Canon iTR, Nikon 3D tracking
- Absolute game-changer for portraits and weddings`
      },
      {
        title: 'AF Point Selection',
        content: `**Single Point:** You choose exactly where to focus. Most precise. Great for still subjects or when you want exact focus placement.

**Zone/Group AF:** A cluster of AF points works together. Good balance of control and tracking ability for moderate motion.

**Wide Area / All Points:** Camera chooses focus point. Defaults to closest subject. Fast but unpredictable.

**3D Tracking (Nikon) / Eye-tracking:** Subject detection tracks across the frame. Set it and the camera follows. Modern mirrorless cameras are exceptional here.

**How to compose with AF:**
1. Put AF point on subject eye
2. Half-press to lock (Single AF)
3. Recompose if needed
4. Full press

OR use the **focus-and-recompose** technique:
- Center point on subject, lock, recompose, shoot
- Note: at wide apertures this can shift the focal plane!`
      },
      {
        title: 'Back-Button Focus (BBF)',
        content: `**Back-button focus** is the most important technique to set up on your camera.

**What it does:** Separates focus from the shutter button.
- Shutter button: ONLY fires the shutter (no focus)
- AF-ON button (or custom back button): ONLY activates focus

**Why it's game-changing:**
1. Lock focus on static subject → release back button → shoot unlimited times without refocusing
2. For moving subjects: hold back button for continuous tracking, release to lock
3. Manual focus override: just don't press the back button

**Setup:**
- Canon: Custom Functions → Shutter/AE Lock button → AF-ON only
- Nikon: Custom Settings a → AF-ON button active
- Sony: AF/MF button → AF On

Once you switch to BBF, you'll never go back. Most working professionals use this.`
      },
      {
        title: 'Manual Focus Techniques',
        content: `Sometimes the camera can't focus where you want. Manual focus (MF) to the rescue.

**When to use MF:**
- Low contrast scenes (foggy landscapes, flat white walls)
- Very low light where AF hunts
- Through glass or mesh
- Macro photography (tiny depth of field)
- Precise focus stacking
- Video (smooth pulls, no AF hunting)

**MF aids:**
1. **Magnified view** (live view): Zoom in 5–10x on screen to confirm sharp focus
2. **Focus peaking** (mirrorless): Highlights in-focus edges in a color (red/white/yellow)
3. **Rangefinder mode**: Some cameras show focus distance and DOF scale
4. **Focus assist light**: Camera emits AF-assist beam for MF confirmation on some bodies

**Lens distance marks:** Read the footage/meter markings. Hyperfocal distance = maximize DOF without a meter.`
      }
    ],
    keyTakeaways: [
      'Use AF-S for still subjects; AF-C for moving subjects',
      'Eye/Face detection AF has revolutionized portrait autofocus',
      'Back-button focus (BBF) is a must-configure feature for pros',
      'Focus peaking and magnified view help confirm manual focus',
      'Focus-and-recompose can shift focal plane at wide apertures'
    ]
  },
  {
    id: 'metering',
    title: 'Metering Modes',
    subtitle: 'How your camera measures light',
    icon: '◑',
    color: '#7c6ff7',
    gradient: 'linear-gradient(135deg, #7c6ff7, #e879f9)',
    duration: '8 min',
    difficulty: 'Intermediate',
    topics: ['Evaluative metering', 'Spot metering', 'Histogram', 'Exposure compensation'],
    summary: 'Your camera\'s light meter determines the suggested exposure — understanding modes helps you get it right in camera.',
    sections: [
      {
        title: 'Metering Modes',
        content: `**Evaluative / Matrix / Multi (recommended default):**
- Analyzes the entire frame, gives weight to focus point area
- Considers subject brightness relative to background
- Excellent for most situations. Smart and reliable.

**Center-Weighted Average:**
- Gives 60–80% weight to the center circle
- Classic mode from film days
- Good for portraits where subject is centered

**Partial (Canon) / Spot:**
- Spot: Measures only 1–5% of the frame (usually at AF point)
- Best for: backlit subjects, bright sky backgrounds, stage performers under spotlights
- Precise but requires skill — meter off a mid-tone

**Highlight-Weighted (Nikon) / Highlight Tone Priority:**
- Prioritizes protecting highlights from blowing out
- Great for stage lighting, weddings with white dresses
- May underexpose slightly`
      },
      {
        title: 'Reading the Histogram',
        content: `The **histogram** is the most reliable exposure guide — ignore the LCD screen, trust the histogram.

**X-axis:** Brightness (left = black, right = white)
**Y-axis:** Number of pixels at that brightness

**Ideal histogram:** No "clipping" — bars don't smash into either wall. But "ideal" varies by scene!

**Clipping:**
- **Left wall hit (blacks clipped):** Loss of shadow detail. Sometimes acceptable (black velvet background).
- **Right wall hit (whites clipped):** Blown-out highlights. Much harder to recover, even in RAW.

**Expose to the Right (ETTR):** Push exposure as far right as possible WITHOUT clipping highlights. This captures maximum data and minimizes noise. Lower to taste in post.

**Blinkies / Highlight Alert:** Camera flashes overexposed areas on the LCD. Enable this in camera settings — it's invaluable.`
      },
      {
        title: 'Exposure Compensation',
        content: `**Exposure Compensation (EC)** tells the camera to intentionally over or underexpose from its metered value.

**Dial:** Usually -3 to +3 EV in 1/3 stop increments.

**When to dial in positive EC (+EV):**
- White subjects (snow, white dress) — camera underexposes them to gray
- Backlit subject — camera sees bright background and underexposes face
- You want a high-key, airy look

**When to dial in negative EC (−EV):**
- Dark subjects (black cat) — camera overexposes to gray
- Spotlighting — preserve the mood of stage lighting
- Low-key, dramatic look

**The 18% Gray Rule:** Cameras meter for 18% gray (mid-tone). Anything brighter or darker tricks the meter. EC corrects for this.

**AE Lock (AEL):** Lock the exposure reading from one spot, then recompose and shoot.`
      }
    ],
    keyTakeaways: [
      'Evaluative/Matrix metering is best for 90% of situations',
      'Spot metering: measure off an 18% gray mid-tone for accuracy',
      'Trust the histogram, not the LCD preview',
      'Clip highlights? Impossible to recover. Clip shadows? Possible.',
      'ETTR: Expose to the Right for maximum RAW data'
    ]
  },
  {
    id: 'shooting-modes',
    title: 'Shooting Modes (P/A/S/M)',
    subtitle: 'From auto to full manual control',
    icon: '⌬',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #22c55e)',
    duration: '10 min',
    difficulty: 'Beginner',
    topics: ['Program mode', 'Aperture Priority', 'Shutter Priority', 'Manual mode'],
    summary: 'Understanding when to use each shooting mode is key to getting the results you envision in any situation.',
    sections: [
      {
        title: 'The Four Core Modes',
        content: `**P — Program:**
- Camera sets both aperture and shutter
- You can shift combinations (Program Shift)
- Like a smarter Auto. Good for casual shooting.

**A/Av — Aperture Priority:**
- YOU set the aperture. Camera sets shutter.
- Most popular mode among professionals
- Perfect for controlling depth of field
- Works in 90% of situations with good metering

**S/Tv — Shutter Priority:**
- YOU set the shutter. Camera sets aperture.
- Perfect for motion control (sports, freeze action)
- Beware: camera may run out of aperture range

**M — Manual:**
- YOU set both aperture and shutter. Also set ISO (or use Auto ISO with manual)
- Full creative control
- Best for: studio, tripod landscape, video, tricky lighting
- Not for fast-changing conditions (unless using Auto ISO)

**Dial cheat sheet:** A+Auto ISO = great portraits. S+Auto ISO = great sports. M = studio/landscape.`
      },
      {
        title: 'Aperture Priority — The Pro Default',
        content: `Why do most pros shoot in Aperture Priority?

1. **DOF control** is usually the most important creative decision
2. The camera is very good at setting shutter speed
3. Add Exposure Compensation to adjust overall exposure
4. Auto ISO handles low-light transitions automatically

**Typical pro portrait workflow:**
- Mode: Aperture Priority (Av)
- Aperture: f/1.8–f/2.8
- ISO: Auto (min 1/100s shutter)
- Metering: Evaluative
- EC: +0.3 to +0.7 (for skin tones)

**When Aperture Priority fails:**
- Fast action: Set a minimum shutter with Auto ISO, or switch to Manual
- Backlit subjects: Use EC or switch to Spot metering`
      },
      {
        title: 'Manual Mode — When and Why',
        content: `Manual mode gives you complete control — essential when you need consistency across shots.

**Use Manual when:**
- **Studio/flash:** Flash output doesn't change so exposure should be locked
- **Landscape on tripod:** Take your time, expose perfectly, bracket if needed
- **Video:** Exposure must be locked — automatic changes look terrible on video
- **Tricky lighting:** Stage performers, neon signs — lock the exposure you want
- **Bracketing:** Lock all three brackets' only EC changes

**Manual + Auto ISO = The Sweet Spot:**
Many professionals now use Manual + Auto ISO. You control creative decisions (aperture and shutter), camera handles brightness. Best of both worlds.

**Reading the meter in M mode:** The bottom of the viewfinder shows a scale (0 = correct, + = overexposed, − = underexposed). Adjust your settings until it hits 0 (or your intended EC).`
      }
    ],
    keyTakeaways: [
      'Aperture Priority (Av/A) is the most versatile mode for most pros',
      'Shutter Priority for sports/action; Manual for studio/tripod/video',
      'Manual + Auto ISO = the modern professional hybrid approach',
      'Program mode with Program Shift is smarter than full Auto',
      'Always understand WHY you\'re in a mode, not just how'
    ]
  },
  {
    id: 'raw-jpeg',
    title: 'RAW vs JPEG',
    subtitle: 'Why RAW is the professional\'s choice',
    icon: '▣',
    color: '#f5a623',
    gradient: 'linear-gradient(135deg, #f5a623, #22c55e)',
    duration: '8 min',
    difficulty: 'Beginner',
    topics: ['RAW advantages', 'JPEG workflow', 'File sizes', 'Editing latitude'],
    summary: 'RAW files contain everything your sensor captured — giving maximum flexibility in post-processing.',
    sections: [
      {
        title: 'What is RAW?',
        content: `A **RAW file** is the unprocessed data directly from your camera's sensor. Think of it as a digital negative — it needs processing (developing) before you see a final image.

**RAW contains:**
- Full bit depth (12 or 14 bit = 4,096 or 16,384 tonal steps vs JPEG's 256)
- Full dynamic range captured by sensor
- No sharpening, no noise reduction, no color grading applied
- Completely adjustable white balance (lossless)
- Full metadata from the shot

**JPEG** is a finished, compressed image:
- 8-bit color (256 tonal steps)
- Camera applies settings: sharpening, NR, color profile
- Discards ~94% of data to compress
- What you see is what you get (limited editing room)

**RAW file types:** .CR3 (Canon), .NEF (Nikon), .ARW (Sony), .ORF (Olympus), .RAF (Fuji), .DNG (Universal/Adobe)`
      },
      {
        title: 'The Real Advantages of RAW',
        content: `**1. Recovery latitude:**
- Recover up to 4–5 stops of blown highlights
- Lift shadows by 4–5 stops with minimal noise
- JPEG: recover 1–1.5 stops before falling apart

**2. White balance:** Set ANY WB after the fact with zero quality loss. In JPEG you're baking it in.

**3. Color grading:** 14-bit data gives incredible smoothness in skin tones and gradients. No banding.

**4. Sharpening and NR control:** Apply optimal amounts for the image, not camera defaults.

**5. Print quality:** For large prints (16x20"+), RAW processed properly produces noticeably better results.

**The tradeoff:**
- File size: RAW is 3–5x larger than JPEG
- Workflow: Must process in Lightroom, Capture One, etc.
- Speed: Slower burst buffers on older cameras`
      },
      {
        title: 'RAW + JPEG Workflow',
        content: `**RAW only:** Maximum flexibility, larger storage, requires processing.

**JPEG only:** Fast workflow, share straight from camera, less editing power.

**RAW + JPEG simultaneously:** Camera saves both files. Best of both worlds at cost of storage. Good for: events where clients want quick JPEGs but you want RAW backup.

**Top RAW processors:**
1. **Adobe Lightroom Classic** — Industry standard. Best library management.
2. **Capture One** — Superior color science. Preferred by fashion/commercial photographers.
3. **DxO PhotoLab** — Best noise reduction in the world (PRIME NR).
4. **Luminar Neo** — AI-powered tools. Great for beginners.
5. **Darktable** — Free and open source. Surprisingly powerful.
6. **Camera Raw (Photoshop)** — Same engine as Lightroom.

**The verdict:** Always shoot RAW for anything that matters. JPEG for casual/throw-away shots or when storage is critical.`
      }
    ],
    keyTakeaways: [
      'RAW = digital negative with full data; JPEG = compressed final image',
      'RAW allows 4–5 stops of highlight/shadow recovery',
      'White balance is 100% lossless to change in RAW',
      'Always shoot RAW for important work; JPEG for casual',
      'Lightroom and Capture One are the top RAW processors'
    ]
  },
  {
    id: 'composition',
    title: 'Composition & Framing',
    subtitle: 'Rules that make images compelling',
    icon: '▦',
    color: '#e879f9',
    gradient: 'linear-gradient(135deg, #e879f9, #fb923c)',
    duration: '16 min',
    difficulty: 'Intermediate',
    topics: ['Rule of thirds', 'Leading lines', 'Framing', 'Golden ratio', 'Negative space'],
    summary: 'Great composition is what separates snapshots from photographs. Learn the rules — then learn when to break them.',
    sections: [
      {
        title: 'Rule of Thirds',
        content: `The **Rule of Thirds** divides your frame into a 3×3 grid. Place key subjects or horizon lines along these lines or at their intersections (power points).

**Why it works:** Humans naturally find centered compositions static and boring. Off-center subjects create visual tension and interest, making the viewer's eye move through the frame.

**In practice:**
- Portrait: eye on upper-third horizontal line
- Landscape: horizon on lower or upper third (never center unless symmetry is the point)
- Subject moving: leave space in the direction of movement

**Enable the grid in your viewfinder/LCD** — Canon: Display settings, Nikon: Viewfinder grid, Sony: Grid Line display.

**When to break it:** Perfect symmetry (reflections, architecture, formal portraits). Center your subject and own it.`
      },
      {
        title: 'Leading Lines & Depth',
        content: `**Leading lines** guide the viewer's eye through the composition toward your subject.

**Types of leading lines:**
- Roads, paths, rivers — converge to vanishing point
- Fences, walls — parallel strong lines
- Shadows, light rays — diagonal energy
- Arms, body language — point to face/eyes
- Architecture — staircases, colonnades

**Creating depth in 2D images:**
1. **Foreground interest:** Include something close to the camera to add layers
2. **Framing within framing:** Arch, doorway, branches frame the main subject
3. **Size diminishing:** Objects get smaller as they recede
4. **Atmospheric haze:** Distant objects lighter, less saturated
5. **Overlapping subjects:** One in front of another implies depth`
      },
      {
        title: 'Framing & Negative Space',
        content: `**Natural framing:** Use elements in your environment to frame your subject — trees, archways, doorframes, windows, tunnels. Draws attention, adds depth, and gives context.

**Negative space:** The empty area around your subject. Counterintuitively, MORE space can make the subject feel MORE powerful and create emotional impact.

- Small subject in large negative space = isolation, loneliness, scale
- Use simple, clean backgrounds for impact
- The sky, water, walls, and fields make great negative space

**Foreground framing:** Get low and use grass, flowers, rocks in the foreground. Adds dimension and draws the eye in.

**The 5 types of framing:**
1. **Architectural** (arches, windows)
2. **Natural** (tree branches, foliage)
3. **Human** (arms, silhouettes)
4. **Light-based** (spotlights, bokeh rings)
5. **Geometric** (shadows, reflections)`
      },
      {
        title: 'Advanced Composition Techniques',
        content: `**Golden Ratio / Fibonacci Spiral:** A more organic version of the rule of thirds. The spiral places the most complex point of interest at the center of a nautilus-like curve. Used in Renaissance paintings. Available as an overlay in Lightroom's crop tool.

**Symmetry and Patterns:** Find perfect reflections, mirrored architecture, repeating geometric shapes. Then introduce ONE element that breaks the pattern — that becomes the subject.

**Color as composition:** Complementary colors (blue/orange, purple/yellow) create visual tension. Analogous colors (blue/green) feel harmonious.

**Visual weight:** Darker tones, bright colors, faces, and eyes carry more visual weight. Balance your frame by distributing weight.

**The "Z" and "F" reading patterns:** Western viewers read images like text — Z-pattern across the frame, F-pattern down-then-across. Place your subject where the eye naturally arrives.

**Aspect ratio:** 3:2 (standard), 4:3, 1:1 (square for Instagram), 16:9 (cinematic), 2:1 (panoramic). Each changes the feeling of the frame.`
      }
    ],
    keyTakeaways: [
      'Rule of Thirds: Place subjects on grid lines/intersections, not center',
      'Leading lines guide the viewer\'s eye through the image',
      'Negative space creates power, isolation, and visual breathing room',
      'Foreground interest adds depth to 2D images',
      'Learn the rules thoroughly — then break them intentionally'
    ]
  },
  {
    id: 'lighting',
    title: 'Understanding Light',
    subtitle: 'Photography is literally writing with light',
    icon: '☀',
    color: '#f5a623',
    gradient: 'linear-gradient(135deg, #f5a623, #fb923c)',
    duration: '18 min',
    difficulty: 'Intermediate',
    topics: ['Natural light', 'Golden hour', 'Artificial light', 'Flash basics', 'Lighting patterns'],
    summary: 'Light is the single most important element in photography. Understanding its quality, direction, and color transforms everything.',
    sections: [
      {
        title: 'Quality of Light',
        content: `Light has two fundamental qualities: **hard** and **soft**.

**Hard light:**
- Direct, small, or distant light source
- Creates sharp-edged, defined shadows
- High contrast — deep shadows, bright highlights
- Sources: direct sun at noon, bare flash/strobe, small LED panel
- Effect: dramatic, harsh, can be unflattering for skin

**Soft light:**
- Large light source relative to subject (or diffused)
- Creates soft, gradual shadow transitions
- Low contrast — detail in shadows and highlights
- Sources: overcast sky, window light, softbox, bounced flash
- Effect: flattering, even, gentle

**Light size is relative to distance:** A 6ft softbox 2ft from your face = extremely soft. Same softbox 30ft away = harsh.

**The goal:** Match light quality to subject/mood. Architecture? Hard is fine. Skin? Usually soft and flattering.`
      },
      {
        title: 'Direction of Light',
        content: `**Front lighting (flat light):** Light behind the camera. Reduces shadows, can look flat and passport-photo-like. Good for showing texture detail.

**Side lighting (Rembrandt / Split):** Light at 45–90° to the subject. Creates dramatic shadows. Reveals texture. Rembrandt: triangular highlight on shadowed cheek.

**Backlight / Rim light:** Light behind the subject. Creates beautiful golden rim/halo. Can lead to silhouettes. Use fill flash or reflector to balance.

**Top light:** Light from directly above. Harsh shadows under eyes and nose. Think noon sun — unflattering for faces.

**Bottom light:** Spooky/dramatic. Light from below. Think horror movies.

**45° above, 45° to the side (Butterfly/Paramount):** Classic Hollywood glamour lighting. Flattering "butterfly" shadow under nose. Great for cheekbones.`
      },
      {
        title: 'Golden Hour & Blue Hour',
        content: `**Golden Hour:** The first and last hour of sunlight. The sun is low, light travels through more atmosphere.
- Warm, golden, directional light
- Long, soft shadows
- Makes everything beautiful
- APP: PhotoPills, The Photographer's Ephemeris — predict exact golden hour for any location

**Timing:** Shoot in the 20 minutes before/after golden hour for peak color. The light changes fast — work quickly!

**Blue Hour:** 20–30 minutes after sunset (or before sunrise). Sky is deep blue, city lights balance perfectly with natural light.
- Great for architecture, cityscapes
- Long exposures on tripod
- Requires slower shutter — 2–30 seconds

**Magic Hour tips:**
1. Arrive 30 min early. Scout, set up, know your shot.
2. Face into the light for golden rim effects
3. Face away from the sun for lit subjects on golden sky
4. Use a reflector to fill shadows on faces
5. Adjust WB to 6,000–7,000K to preserve warmth`
      },
      {
        title: 'Flash & Artificial Light',
        content: `**On-camera flash:** Direct, harsh, unflattering (red-eye). Emergency use only. Bounce off ceiling/wall when possible.

**Bounce flash:** Point flash at a white ceiling or wall. Creates large, soft, beautiful light. The gold standard for event photography.

**Off-camera flash:** Single speedlight on a stand with modifier. Mimics window light. The biggest quality jump in portrait lighting.

**Flash sync speed:** Maximum shutter speed that works with flash. Usually 1/200s–1/250s. Above this: dark band appears. Solution: High Speed Sync (HSS) or Hypersync.

**Guide Number (GN):** Measures flash power. GN = distance × aperture. GN 40 = f/4 at 10m, f/8 at 5m.

**Modifiers:**
- **Umbrella (shoot-through):** Large, soft, inexpensive. Great starter.
- **Softbox:** More controlled spill. Rectangular shape. Professional look.
- **Octabox:** Round catchlights. Beautiful eyes.
- **Beauty dish:** Defined, slightly punchy. Fashion/beauty standard.
- **Grid:** Controls spill/falloff. Adds drama.
- **Reflector/Bounce card:** Fills shadows. Free or near-free.`
      }
    ],
    keyTakeaways: [
      'Soft light (large source) is flattering; hard light (small/distant source) is dramatic',
      'Side lighting reveals texture; front lighting flattens it',
      'Golden hour light makes everything beautiful — be there 30 min early',
      'Bounce flash off ceiling transforms on-camera flash from harsh to beautiful',
      'Off-camera flash with a modifier is the biggest quality leap in portraits'
    ]
  },
  {
    id: 'lenses',
    title: 'Lenses & Focal Lengths',
    subtitle: 'The glass defines the image',
    icon: '○',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #7c6ff7)',
    duration: '13 min',
    difficulty: 'Intermediate',
    topics: ['Prime vs zoom', 'Focal length effects', 'Crop factor', 'Lens recommendations'],
    summary: 'Lenses define your creative vision — understanding focal length perspective, compression, and quality makes you a better photographer.',
    sections: [
      {
        title: 'Focal Length & Perspective',
        content: `**Focal length** (in mm) affects angle of view and apparent compression/expansion of the scene.

**Wide angle (10–35mm):**
- Wide field of view
- Exaggerates perspective — foreground appears larger, background smaller
- Great for: landscape, architecture, environmental portraits, street
- Distorts faces when used too close (not flattering)

**Standard (35–60mm):**
- Close to natural human eye perspective
- Versatile — street, documentary, environmental portrait
- 50mm: The "nifty fifty" — great for learning

**Short Telephoto (70–135mm):**
- Moderate compression
- Flattering portrait perspective
- 85mm is THE portrait length. 135mm is extraordinary.

**Telephoto (150–300mm):**
- Strong compression — stacking elements, background appears close
- Sports, wildlife, candid
- Requires faster shutter speeds

**Super Telephoto (400mm+):**
- Wildlife, sports (NBA, NFL), bird photography
- Very expensive, heavy`
      },
      {
        title: 'Prime vs Zoom Lenses',
        content: `**Prime lenses** (fixed focal length):
- Typically sharper (simpler optical design)
- Wider maximum aperture (f/1.2, f/1.4, f/1.8)
- Lighter, smaller, often cheaper per focal length
- Forces you to "zoom with your feet" — improves composition instincts

**Zoom lenses** (variable focal length):
- Versatile — one lens covers many focal lengths
- Professional zooms (f/2.8) match prime quality
- Great for events, travel, sports where changing lenses isn't possible
- Consumer zooms (f/3.5–5.6) significantly slower and softer

**The holy trinity (Canon/Nikon/Sony):**
1. 16–35mm f/2.8 — wide zoom
2. 24–70mm f/2.8 — workhorse
3. 70–200mm f/2.8 — telephoto

**Starter recommendations:**
- 50mm f/1.8 — $100–250. Amazing quality/price. Start here.
- 35mm f/1.8 — Great street/environmental portrait
- 85mm f/1.8 — Portrait perfection. Often under $400.`
      },
      {
        title: 'Crop Factor',
        content: `**Full Frame (35mm):** Sensor is 36×24mm. What you see is what the focal length says.

**APS-C (Crop sensor):** Smaller sensor (22.5×15mm Canon, 23.5×15.6mm Nikon/Sony).

**Crop factor:** APS-C = 1.5x (Nikon/Sony/Fuji/Pentax), 1.6x (Canon)

**What this means:** A 50mm lens on APS-C camera gives field of view of 75mm (50×1.5). NOT the same as a 75mm — perspective/DOF remains at 50mm equivalent.

**Benefits of APS-C:**
- Telephoto reach: 300mm f/4 on APS-C = 450mm equivalent. Great for wildlife!
- Smaller camera body and lenses available
- More affordable

**Benefits of Full Frame:**
- Better low light and high ISO
- Wider angle of view with same lens
- Shallower DOF more accessible
- Larger viewfinder image

**Micro Four Thirds (MFT/m4/3):** 2x crop factor. 25mm = 50mm. Very compact systems (Olympus, Panasonic).`
      }
    ],
    keyTakeaways: [
      '85–135mm is the flattering portrait focal length for faces',
      'Wide angles expand perspective; telephotos compress/stack elements',
      'Prime lenses offer wider apertures and often better image quality',
      'APS-C crop factor = 1.5x–1.6x (50mm becomes ~75–80mm equivalent)',
      'Start with a 50mm f/1.8 — unbeatable quality for the price'
    ]
  }
];

export const getModule = (id) => modules.find(m => m.id === id);
