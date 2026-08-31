# for my princess 🌸

A tiny, private, interactive website — built as a small digital world for one specific person. Baby pink peonies, icy blue, dreamy forest green, butter yellow. A playful "NO button" intro, a timeline of your story, a color universe, a quiz, a bucket list, a letter, a poem, and a final question.

Everything is static — no backend, no database, no login, no tracking. It runs entirely in the browser.

---

## 1. What you need before you start

- A free [GitHub](https://github.com) account.
- [Node.js](https://nodejs.org) installed on your computer (version 18 or newer). Check with:

  ```
  node -v
  ```

- [Git](https://git-scm.com/downloads) installed. Check with:

  ```
  git --version
  ```

That's it. No paid tools, no API keys, no secrets.

---

## 2. Project structure

```
love-website/
├── .github/workflows/deploy.yml   # auto-deploys to GitHub Pages on every push
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                   # app entry point
│   ├── App.jsx                    # page flow / state machine
│   ├── index.css                  # global styles, fonts, keyframes
│   ├── data/
│   │   └── content.js             # ⭐ ALL the text lives here — edit this first
│   └── components/
│       ├── IntroQuestion.jsx      # "Am I your love?" + dodging NO button
│       ├── Celebration.jsx        # confetti/petals/hearts after YES
│       ├── Welcome.jsx
│       ├── Timeline.jsx
│       ├── NoticeCards.jsx        # "things I notice about you"
│       ├── ColorUniverse.jsx
│       ├── Questionnaire.jsx
│       ├── BucketList.jsx
│       ├── LoveThings.jsx
│       ├── LoveLetter.jsx
│       ├── PoetrySection.jsx      # the Roman Urdu poem
│       ├── FinalScreen.jsx
│       ├── EasterEggs.jsx         # cat + hidden button
│       ├── MusicToggle.jsx        # procedural ambient sound, no external files
│       ├── FloatingPetals.jsx / FloatingHearts.jsx
│       ├── PeonySVG.jsx / CatSVG.jsx
│       ├── PageShell.jsx          # shared page layout + "next" button
│       └── ProgressDots.jsx
```

---

## 3. Creating the files on your computer

You already have this entire project as a folder (sent to you alongside these instructions). Unzip it, then open a terminal inside it:

```
cd path/to/love-website
```

If you'd rather start from a completely empty GitHub repo, just copy every file from this project into it — the structure above shows exactly what belongs where.

---

## 4. Installing dependencies

Inside the project folder, run:

```
npm install
```

This downloads React, Vite, Tailwind CSS, and Framer Motion into a local `node_modules` folder (never committed to GitHub — it's already in `.gitignore`).

---

## 5. Running it locally

```
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`). Open that link in your browser to see the site live — it hot-reloads as you edit files.

Press `Ctrl+C` in the terminal to stop it.

---

## 6. Testing it on mobile

She'll almost certainly open this on her phone, so test it there before sending:

1. Make sure your phone and computer are on the same Wi-Fi network.
2. Run `npm run dev -- --host` instead of `npm run dev`.
3. The terminal will print a "Network" URL like `http://192.168.x.x:5173`.
4. Open that URL in your phone's browser.

Check: buttons are easy to tap, nothing overflows the screen, the NO button never runs off-screen, and animations feel smooth.

---

## 7. Creating a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. **Repository name**: something private-sounding and low-key is best — e.g. `for-her` or `a-tiny-world` (avoid anything too obviously "girlfriend website" if you'd rather keep it low-profile — it doesn't matter technically, purely your call).
3. Keep it **Public** (GitHub Pages on a free account needs the repo to be public — but nobody will find it unless you send them the exact link; it won't be indexed by search engines or listed anywhere).
4. Do **not** check "Add a README" — you already have one.
5. Click **Create repository**.

---

## 8. Committing and pushing the project

Back in your terminal, inside the `love-website` folder:

```
git init
git add .
git commit -m "the beginning of her website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and the repository name you just created.

---

## 9. Enabling GitHub Pages (with auto-deploy)

This project already includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the site automatically every time you push to `main`. You just need to turn Pages on once:

1. On GitHub, open your repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. That's it — go to the **Actions** tab and you should see a workflow run in progress (triggered by your push in step 8). Wait for it to finish (a minute or two, green checkmark).

---

## 10. Getting the final public URL

Once the Actions run finishes successfully:

1. Go back to **Settings → Pages**.
2. Your live URL will be shown at the top, in the form:

   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

Open it, test it fully (see the checklist below), then send her that one link. 🌸

---

## 11. Updating the website later

Whenever you want to change anything (fix a typo, add a memory, update the timeline):

1. Edit the files locally.
2. Test with `npm run dev`.
3. Commit and push:

   ```
   git add .
   git commit -m "small update"
   git push
   ```

4. GitHub Actions automatically rebuilds and redeploys — check the **Actions** tab, and the live site updates within a minute or two. No need to touch GitHub Pages settings again.

---

## 12. Customizing the text and content later

Almost everything you'd want to change lives in **one file**: `src/data/content.js`. It's organized by page, with comments. You can safely edit:

- `nicknames` — the pet names used throughout.
- `startDate` — the date you started talking.
- `introQuestion.noMessages` — the playful messages when the NO button is pressed.
- `timelineMilestones` — add, remove, or rewrite timeline entries.
- `noticeCards` — the "things I notice about you" cards.
- `colorOrbs` — the four color-universe orbs and their moods.
- `questions` — the quiz questions, options, and reactions.
- `bucketList` — the "things I want to do with you" list.
- `loveThings` — the list of things you love about her.
- `letter` — the full love letter text.
- `poetryLines` — the poem (kept exactly as written; edit with care if you ever want to change it).
- `finalScreen` — the closing screen's text.
- `easterEggs` — the hidden messages.

After editing `content.js`, just save the file — if `npm run dev` is running, the browser updates instantly. When you're happy, push to GitHub (step 11) to make it live.

### Adding a real photo

If you'd like to add an actual photo of the two of you (instead of only illustrations):

1. Drop the image file into `src/assets/` (create that folder if it doesn't exist).
2. In the component where you want it (e.g. `Welcome.jsx` or `LoveLetter.jsx`), add near the top:
   ```jsx
   import photo from '../assets/your-photo.jpg'
   ```
3. Render it wherever you like:
   ```jsx
   <img src={photo} alt="us" className="rounded-3xl shadow-glow max-w-xs mx-auto" />
   ```

### Changing colors

The full palette (baby pink, icy blue, forest green, butter yellow) is defined in `tailwind.config.js` under `theme.extend.colors`. Adjust the hex values there to shift the whole site's mood.

---

## 13. Final checklist — test before you send it to her

- [ ] `npm run build` completes with no errors (see command below).
- [ ] No broken buttons anywhere.
- [ ] The NO button dodges correctly and never leaves the screen, on both mobile and desktop.
- [ ] Pressing YES triggers the celebration and moves into the main site.
- [ ] Every "Continue / Next" button advances to the correct page.
- [ ] Text doesn't overflow or get cut off on a small phone screen.
- [ ] The peony, cat, and hidden "don't click" easter eggs all work.
- [ ] The poem displays exactly as written, line by line.
- [ ] The final screen's "Obviously" and "Maybe..." buttons both work.
- [ ] The music toggle turns sound on/off without errors, and the site works fine with it off.
- [ ] No console errors (open your browser's dev tools → Console tab and click through the whole site).
- [ ] Tested on an actual phone, not just desktop.
- [ ] The deployed GitHub Pages link works in a fresh incognito/private window (so you know it works for her, not just because you're logged into something).

To check the build locally before pushing:

```
npm run build
npm run preview
```

`npm run preview` serves the production build locally so you can do one last check before it goes live.

---

## 14. A note on privacy

This site collects nothing, tracks nothing, and needs no login. The only thing that could ever make it "public" in a meaningful sense is if someone has the exact URL — GitHub repos on the free plan must be public for Pages to work, but the site itself isn't listed anywhere and won't show up in search results in any reasonable timeframe. If you'd rather have real privacy guarantees (private repo + Pages), that requires a paid GitHub plan — not necessary for this to work well as a "send one link" gift.

That's everything. Good luck, and enjoy building it. 🌸
