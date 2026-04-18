export const quizQuestions = [
  {
    id: 1,
    category: 'Exposure Triangle',
    difficulty: 'Beginner',
    question: 'Which aperture lets in MORE light?',
    options: ['f/1.8', 'f/8', 'f/16', 'f/22'],
    answer: 0,
    explanation: 'Lower f-numbers mean a WIDER aperture opening, which lets in more light. f/1.8 is much wider than f/22. Think of it as the denominator in a fraction — 1/1.8 is bigger than 1/22.'
  },
  {
    id: 2,
    category: 'Shutter Speed',
    difficulty: 'Beginner',
    question: 'To freeze fast action (like a sprinter), which shutter speed would you use?',
    options: ['1/30s', '1/125s', '1/500s', '2s'],
    answer: 2,
    explanation: '1/500s is fast enough to freeze most running subjects. At 1/30s the sprinter would appear as a blur. The faster the action, the faster shutter speed you need.'
  },
  {
    id: 3,
    category: 'ISO',
    difficulty: 'Beginner',
    question: 'What is the main downside of using a very high ISO (e.g., ISO 12800)?',
    options: ['Slower shutter speed', 'More digital noise/grain', 'Narrower depth of field', 'Reduced color accuracy only'],
    answer: 1,
    explanation: 'Higher ISO amplifies the sensor signal, which also amplifies noise — creating a grainy, speckled appearance. Modern cameras handle high ISO better than older ones, but noise remains the primary trade-off.'
  },
  {
    id: 4,
    category: 'Aperture',
    difficulty: 'Beginner',
    question: 'You want a blurry background (bokeh) for a portrait. Which setting is best?',
    options: ['f/16, far from subject', 'f/1.8, close to subject', 'f/8, close to subject', 'f/22, far from subject'],
    answer: 1,
    explanation: 'Shallow depth of field (bokeh) is maximized with a wide aperture (f/1.8) AND close subject distance. The background also needs to be far from the subject. f/16 creates deep DOF where everything is sharp.'
  },
  {
    id: 5,
    category: 'White Balance',
    difficulty: 'Beginner',
    question: 'You\'re shooting indoors under tungsten bulbs. Your photos look very orange. What WB preset should you use?',
    options: ['Daylight', 'Cloudy', 'Tungsten', 'Flash'],
    answer: 2,
    explanation: 'Tungsten WB (3200K) adds blue to counter the orange cast of tungsten/incandescent bulbs. The camera subtracts what\'s abundant to restore neutral white.'
  },
  {
    id: 6,
    category: 'Focus',
    difficulty: 'Intermediate',
    question: 'What AF mode should you use for a bird in flight?',
    options: ['AF-S (One Shot)', 'Manual Focus', 'AF-C (AI Servo)', 'MF with peaking'],
    answer: 2,
    explanation: 'AF-C (Continuous AF) keeps tracking and updating focus as the subject moves. AF-S would lock focus once and not follow the moving bird, resulting in a blurry shot.'
  },
  {
    id: 7,
    category: 'Metering',
    difficulty: 'Intermediate',
    question: 'You photograph a snowfield. The image comes out gray, not white. What should you do?',
    options: ['Switch to Spot metering', 'Apply +1 to +2 stops Exposure Compensation', 'Use a faster shutter speed', 'Switch to Manual and reduce exposure'],
    answer: 1,
    explanation: 'Cameras meter for 18% gray. Bright snow fools the meter into underexposing. Adding +EC (typically +1.5 to +2 stops) tells the camera to expose brighter, rendering snow as white.'
  },
  {
    id: 8,
    category: 'RAW vs JPEG',
    difficulty: 'Beginner',
    question: 'Which file format gives you the most editing flexibility in post-processing?',
    options: ['JPEG (High Quality)', 'TIFF', 'RAW', 'JPEG (Standard)'],
    answer: 2,
    explanation: 'RAW files contain 12–14 bit unprocessed data from the sensor, allowing up to 4–5 stops of recovery in highlights/shadows and lossless white balance adjustment. JPEG is already processed and compressed to 8-bit.'
  },
  {
    id: 9,
    category: 'Composition',
    difficulty: 'Beginner',
    question: 'The Rule of Thirds divides the image into how many sections?',
    options: ['4 sections', '9 sections', '6 sections', '12 sections'],
    answer: 1,
    explanation: 'A 3×3 grid creates 9 sections with 4 intersection points (power points). Placing subjects at these intersections or along the lines creates more dynamic compositions than centering everything.'
  },
  {
    id: 10,
    category: 'Shooting Modes',
    difficulty: 'Beginner',
    question: 'In Aperture Priority mode, what does the camera automatically set?',
    options: ['Aperture only', 'Both aperture and shutter', 'Shutter speed only', 'ISO only'],
    answer: 2,
    explanation: 'In Aperture Priority (A/Av), YOU choose the aperture. The camera automatically selects the shutter speed to achieve correct exposure. ISO is separately controlled (manually or via Auto ISO).'
  },
  {
    id: 11,
    category: 'Lenses',
    difficulty: 'Intermediate',
    question: 'You have a 50mm lens on an APS-C camera with 1.5x crop factor. What is the equivalent full-frame focal length?',
    options: ['50mm', '75mm', '35mm', '100mm'],
    answer: 1,
    explanation: '50mm × 1.5 (crop factor) = 75mm equivalent field of view. This means the camera "sees" as if it were a 75mm lens on full frame — narrower field of view, more zoomed-in appearance.'
  },
  {
    id: 12,
    category: 'Lighting',
    difficulty: 'Intermediate',
    question: 'Which type of light source creates the SOFTEST, most flattering light for portraits?',
    options: ['Direct midday sun', 'Small bare flash', 'Large diffused softbox close to subject', 'Bare LED panel'],
    answer: 2,
    explanation: 'Light softness is determined by the size of the light source RELATIVE to the subject. A large softbox close to the subject creates a huge, wrap-around soft light source — the gold standard for flattering portraits.'
  },
  {
    id: 13,
    category: 'Exposure Triangle',
    difficulty: 'Intermediate',
    question: 'You expose correctly at f/4, 1/250s, ISO 400. You change to f/8 (same scene). What combination maintains the same exposure?',
    options: ['f/8, 1/250s, ISO 400', 'f/8, 1/60s, ISO 400', 'f/8, 1/500s, ISO 400', 'f/8, 1/250s, ISO 800'],
    answer: 1,
    explanation: 'Going from f/4 to f/8 is 2 stops less light (f/4→f/5.6→f/8). To compensate, you need 2 stops MORE from shutter: 1/250→1/125→1/60s. So f/8, 1/60s, ISO 400 = same exposure.'
  },
  {
    id: 14,
    category: 'Focus',
    difficulty: 'Advanced',
    question: 'What is the main advantage of Back-Button Focus (BBF)?',
    options: ['Faster autofocus speed', 'Separates focusing from shutter release for flexible control', 'Enables eye-detect AF', 'Reduces camera shake'],
    answer: 1,
    explanation: 'BBF separates AF activation (back button) from the shutter button. This lets you: 1) Lock focus on stills without re-focusing each shot, 2) Instantly switch between tracking and locked focus, 3) Use AF without triggering it when shooting.'
  },
  {
    id: 15,
    category: 'Shutter Speed',
    difficulty: 'Intermediate',
    question: 'What is the "500 Rule" used for?',
    options: ['Maximum ISO for event photography', 'Maximum shutter speed for handheld shooting', 'Maximum seconds before star trails in Milky Way shots', 'Minimum GN for flash photography'],
    answer: 2,
    explanation: '500 ÷ focal length = maximum exposure time before stars show as trails instead of points. e.g., 500 ÷ 24mm = ~20 seconds maximum. On APS-C, divide by crop factor first: 500 ÷ (24mm × 1.5) = ~14 seconds.'
  },
  {
    id: 16,
    category: 'Metering',
    difficulty: 'Intermediate',
    question: 'What does ETTR (Expose to the Right) mean?',
    options: ['Always use right-side AF points', 'Push exposure as bright as possible without clipping highlights', 'Use the right side of the histogram only', 'Meter from the right side of the frame'],
    answer: 1,
    explanation: 'ETTR means brightening your exposure as much as possible while keeping highlights from being blown out (clipped). This maximizes captured data and minimizes noise in RAW files. You then reduce exposure in post-processing.'
  },
  {
    id: 17,
    category: 'Aperture',
    difficulty: 'Advanced',
    question: 'What is "diffraction" in photography?',
    options: ['Light bending through a wide aperture causing blur', 'Image softening caused by very small apertures (f/16+)', 'Lens flare from bright light sources', 'Chromatic aberration at wide apertures'],
    answer: 1,
    explanation: 'Diffraction occurs at very small apertures (f/16, f/22+) where light waves bend around the aperture blades and interfere with each other, causing overall image softening. Even though DOF is deep, the image loses sharpness. Each lens has a "sweet spot" 2–3 stops from wide open.'
  },
  {
    id: 18,
    category: 'Lenses',
    difficulty: 'Intermediate',
    question: 'Which focal length is widely considered THE most flattering for portrait photography?',
    options: ['24mm', '50mm', '85mm', '200mm'],
    answer: 2,
    explanation: '85mm is the classic portrait focal length — it provides moderate compression that flatters facial features, and the working distance (you\'re not too close or too far) is comfortable. 135mm is also excellent. Wide lenses (24mm) distort faces.'
  },
  {
    id: 19,
    category: 'White Balance',
    difficulty: 'Beginner',
    question: 'You shoot RAW. What is true about adjusting White Balance in post-processing?',
    options: ['It degrades image quality', 'It\'s completely lossless — no quality loss', 'It only works for minor corrections', 'It converts the file to JPEG first'],
    answer: 1,
    explanation: 'White balance is metadata applied to RAW files — it\'s literally just a number telling the software how to interpret the color data. Changing it in Lightroom/Capture One has zero effect on the actual image data — completely lossless.'
  },
  {
    id: 20,
    category: 'Lighting',
    difficulty: 'Intermediate',
    question: 'What is "Golden Hour" in photography?',
    options: ['The hour when artificial light and natural light are equal', 'The first and last hour of sunlight when light is warm and directional', 'The hour when the moon is golden-colored', 'An hour after sunrise when shadows disappear'],
    answer: 1,
    explanation: 'Golden hour is the first hour after sunrise and the last hour before sunset. The sun is low on the horizon, light travels through more atmosphere creating warm golden tones, and shadows are long and directional. Nearly universally flattering for all subjects.'
  }
];

export const categories = [...new Set(quizQuestions.map(q => q.category))];
