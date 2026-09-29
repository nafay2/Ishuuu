// ─────────────────────────────────────────────────────────────
// EVERYTHING ON THIS PAGE IS YOURS TO EDIT.
// This file holds every word and detail that appears on the site.
// Change anything here and the whole website updates automatically.
// (See the README for a full guide on what's safe to change.)
// ─────────────────────────────────────────────────────────────

export const herName = 'my princess'

// Nicknames used sparingly throughout the site.
export const nicknames = [
  'my princess',
  'my love',
  'honeyyy',
  'meri jaan',
  'honeyy pie',
  'baby',
  'pretty girl',
  'my favorite person',
  'my whole vibe',
]

export const startDate = 'June 4, 2026'

// ── Page 1: the intro question ──────────────────────────────
export const introQuestion = {
  prompt: 'One tiny question before you enter...',
  question: 'Am I your love? 😗',
  yes: 'YES 😚💗',
  no: 'NO 🙃',
  noMessages: [
    'No? 😗',
    'Are you sure? 👀',
    'Princess... think carefully 😭',
    'That button seems suspicious...',
    'Nice try 😭',
    "You're really doing this to me?",
    'Wrong answer detected 🚨',
    'Princess reconsider please.',
    'That was definitely not the correct answer.',
    'I think your finger slipped.',
    'Try again honeyyy.',
    'The website refuses to accept that answer.',
    'Hmmmm suspicious.',
    "I'll give you one more chance 😭",
    'You know the answer.',
    "Okay okay... I'll pretend I didn't see that. 😭",
  ],
}

// ── Page 2: welcome ──────────────────────────────────────────
export const welcome = {
  eyebrow: 'Okayyy... 😚💗',
  title: 'Welcome, my princess.',
  lines: [
    'I made you a tiny little corner of the internet.',
    "Because apparently just telling you how special you are wasn't enough.",
  ],
  cta: 'Come with me →',
}

// ── Page 3: timeline ─────────────────────────────────────────
export const timelineIntro = {
  title: 'Our little timeline',
  date: startDate,
  text: "That was the beginning of something I didn't know would become this important to me.",
}

export const timelineMilestones = [
  { label: 'June 4', title: 'We started talking.', detail: 'The very beginning — no idea it would turn into this.' },
  { label: 'Somewhere along the way', title: 'You became someone I looked forward to.', detail: 'Slowly, and then all at once.' },
  { label: 'The ups', title: 'Some moments made everything feel ridiculously easy.', detail: 'Those are the ones I keep replaying.' },
  { label: 'The downs', title: 'Some moments were difficult.', detail: "I'm not going to pretend they weren't. But we're still here." },
  { label: 'And somehow...', title: "We're still here.", detail: "And I'm genuinely glad we are." },
]

// ── Page 4: things I notice ──────────────────────────────────
export const noticeHeading = "You probably don't realize how many little things I notice."

export const noticeCards = [
  { emoji: '🌸', title: 'Your peonies', text: 'Especially those baby pink ones.' },
  { emoji: '🌊', title: 'Your beaches', text: 'There is something about the way you love peaceful places.' },
  { emoji: '🧊', title: 'Your icy blue', text: 'Of course I had to put it here.' },
  { emoji: '🌲', title: 'Your dreamy greens', text: 'Because apparently even your favorite colors have a personality.' },
  { emoji: '🦋', title: 'Your empathy', text: 'You care more deeply than you probably realize.' },
  { emoji: '🐈', title: 'Hades & Percy', text: 'Hades, your independent cat, and Percy, your clingy baby cat. Obviously they had to make an appearance.' },
  { emoji: '🌻', title: 'Butter yellow', text: 'A little warmth for your little universe.' },
  { emoji: '🫶', title: 'The way you think', text: 'You notice things. You think deeply. Sometimes probably way too deeply.' },
  { emoji: '🤍', title: 'Your sensitivity', text: "It's not something that makes you weak." },
  { emoji: '🌿', title: 'Your quiet side', text: "You don't need to be surrounded by people to have a whole world inside you." },
]

// ── Page 5: her color universe ───────────────────────────────
export const colorOrbs = [
  { key: 'blue', label: 'Crystal Icy Blue', emoji: '🧊', mood: 'Calm. Quiet. Dreamy.', className: 'from-icy-200 to-icy-400' },
  { key: 'green', label: 'Dreamy Forest Green', emoji: '🌲', mood: 'Deep. Peaceful. Alive.', className: 'from-forest-300 to-forest-600' },
  { key: 'yellow', label: 'Butter Yellow', emoji: '🧈', mood: 'Warm. Soft. Happy.', className: 'from-butter-200 to-butter-400' },
  { key: 'pink', label: 'Baby Pink', emoji: '🌸', mood: 'Obviously... peonies.', className: 'from-peony-200 to-peony-400' },
]

// ── Page 6: questionnaire ────────────────────────────────────
export const questions = [
  {
    id: 'pretty',
    prompt: "Who's the prettier one?",
    type: 'choice',
    options: [
      { label: 'Me 😌', reaction: 'Correct. Finally, some honesty. 😚' },
      { label: 'You obviously 🙄', reaction: "Sweet of you, but no. It's you, honeyyy. It was always you. 😚" },
      { label: 'Hmm let me think...', reaction: "There's nothing to think about, honeyyy. It's you." },
    ],
  },
  {
    id: 'peonies',
    prompt: 'If I randomly showed up with baby pink peonies what would you do?',
    type: 'choice',
    options: [
      { label: 'Hug you', reaction: "That's the correct response. 🫶" },
      { label: 'Cry', reaction: 'Happy tears only, please. 🥺' },
      { label: 'Steal the flowers', reaction: "They were always yours anyway. 🌸" },
      { label: "Pretend I'm not impressed", reaction: "I'd see right through that, pretty girl." },
    ],
  },
  {
    id: 'perfectday',
    prompt: 'Perfect day?',
    type: 'choice',
    options: [
      { label: 'Beach + sunset 🌊', reaction: 'Noted. Adding it to the list.' },
      { label: 'Cozy room + movie', reaction: "Low effort, high comfort. I'm in." },
      { label: 'Cats + peace + no humans 😭', reaction: "This one feels very on-brand for you. Hades and Percy included, obviously." },
      { label: 'Somewhere completely random', reaction: "Chaotic. I like it." },
    ],
  },
  {
    id: 'princess-slider',
    prompt: 'How much do you love being called princess?',
    type: 'slider',
    minLabel: 'Absolutely not',
    maxLabel: 'Keep calling me that.',
  },
  {
    id: 'escape',
    prompt: 'Pick our imaginary escape.',
    type: 'choice',
    options: [
      { label: '🌊 Beach house', reaction: 'Waves, quiet mornings, you. Sold.' },
      { label: '🌲 Forest cabin', reaction: 'Deep green, soft silence — very you.' },
      { label: '🏡 Cozy countryside house', reaction: 'Slow living, exactly like you like it.' },
      { label: '🌅 Tiny house beside the sea', reaction: 'Small space, big view. Perfect.' },
    ],
  },
]

// ── Page 7: bucket list ──────────────────────────────────────
export const bucketList = [
  { emoji: '🌊', text: 'Watch a sunset at the beach.' },
  { emoji: '🌸', text: 'Get you an unnecessarily large bouquet of baby pink peonies.' },
  { emoji: '🐈', text: 'Spend an unreasonable amount of time around cats — Hades and Percy included.' },
  { emoji: '🍿', text: 'Watch movies together.' },
  { emoji: '🌧️', text: 'Have a rainy-day conversation.' },
  { emoji: '🌲', text: 'Go somewhere surrounded by forests.' },
  { emoji: '🍦', text: 'Get random food late at night.' },
  { emoji: '📸', text: 'Take stupid pictures together.' },
  { emoji: '🚗', text: 'Go on a completely unplanned drive.' },
  { emoji: '🌅', text: 'Watch sunrise together.' },
  { emoji: '💬', text: 'Have one of those conversations that somehow lasts until morning.' },
  { emoji: '🧸', text: 'Have a completely lazy day doing absolutely nothing.' },
]

// ── Page 8: things I love about you ──────────────────────────
export const loveThings = [
  'I love how empathetic you are.',
  'I love how deeply you think.',
  'I love that you can be practical while still having this incredibly soft side.',
  'I love your sensitivity.',
  'I love your quietness.',
  'I love that you have an entire universe inside your head.',
  'I love your love for animals — the way you care about Hades and Percy.',
  'I love your obsession with baby pink peonies.',
  'I love your little moods.',
  'I love the way you are simply... you.',
]

export const loveThingsClosing = 'And somehow, out of all the people in this enormous world, I got to meet you.'

// ── Page 9: the letter ───────────────────────────────────────
export const letter = {
  heading: 'For my princess.',
  paragraphs: [
    `We started talking on ${startDate}.`,
    "Since then we've had ups and downs — moments that felt ridiculously easy, and moments that were genuinely hard. I'm not going to pretend otherwise.",
    "But through all of it, you became incredibly important to me. You inspire me to become better. You make me want to notice the little things. You make me want to actually experience life and share the happiness in it with someone — with you.",
    "You're genuinely the best thing that has happened to me.",
    "And I don't love some imaginary perfect version of you. I love you as you are — your quietness, your sensitivity, your moods, your deep thoughts, your empathy, your weird little preferences, your love for cats (Hades and Percy especially), your obsession with baby pink peonies. All of it.",
  ],
  signoff: 'Thank you for being you, my love. 😚💗',
}

// ── Page 9b: poetry ───────────────────────────────────────────
// IMPORTANT: preserved exactly as given. Do not translate, rewrite,
// or alter wording/punctuation.
export const poetryHeading = 'A little promise in words.'

export const poetryLines = [
  'Main har subah tera intezaar karta rahoon',
  'Har shaam tera hi khayaal karta rahoon',
  'Har khushi har gham mein tera saath chahta rahoon',
  'Har dua mein bas tera hi naam rakhta rahoon',
  'Aakhri saans tak mera vaada yahi rahay',
  'Mera dil sirf tera hi ghar bana rahay',
  'Phir jab likha jaaye meri zindagi ka aakhri safha',
  'Tera zikr hi uska sabse haseen hissa rahay',
]

export const poetryClosing = 'Bas itna sa vaada hai, meri jaan. 🤍'

// ── Page 10: final screen ────────────────────────────────────
export const finalScreen = {
  question: 'One last question...',
  ask: 'Will you stay a little while longer? 🥺',
  yes: 'Obviously 😚💗',
  maybe: 'Maybe...',
  afterYes: {
    good: 'Good.',
    reason: 'Because I still have a lot of memories I want to make with you.',
    until: 'Until then...',
    favorite: "You're my favorite person. 🌸",
  },
  afterMaybe: [
    "'Maybe' works too. 😌",
    "I'll take it. Come back whenever, honeyyy.",
  ],
}

// ── Easter eggs ───────────────────────────────────────────────
export const easterEggs = {
  peony: ['Okay you REALLY like peonies.', 'Noted. 🌸'],
  cat: ['Meow.', 'Hades approved the website.', 'Percy says hi.', 'Finally someone important showed up.'],
  hades: [
    "I don't need anyone. ...okay maybe you. 😼",
    'Hades is independent. Do not disturb. (Pet me anyway.)',
    'Fine. One head scratch. Only one.',
  ],
  percy: [
    'Percy is climbing onto your lap. He is staying. 🥺',
    'Clingy baby alert. 🐾',
    'Percy would like to be held. Right now.',
  ],
  // Hades gives the password hint on the lock screen
  passwordHint: [
    'Hint: it is in the song you once sent me on WhatsApp. 🦋',
    'Listen to it again, princess. 🎧',
  ],
  // Percy pops up by himself in the middle of the site
  percyPeek: 'My mama is also sometimes a panda and only Nafay knows it 😋',
  // little tap-me popups sprinkled around the site
  popups: {
    welcomePeony: ['Hi princess. 🌸', "Yes, it's all for you.", 'Tap me again, I dare you.'],
    timelineDate: ['I remember this day perfectly. 👀', 'Do you? 😌'],
    loveClosing: ['Still cannot believe it. 😚', 'Lucky me, honestly.'],
    letterSignoff: ['I meant every word.', 'Read it again if you want. 🤍'],
    poetryDot: ["That's my heartbeat. 💗", 'Yours, mostly.'],
    finalPeony: ["Okay stop, I'm blushing. 🌸", 'Say yes already 😭'],
  },
  dontClick: ["I literally told you not to.", "You're cute."],
}
