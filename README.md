# A Little Universe For You ✦

A mobile-first, romantic-but-low-pressure interactive galaxy website. It uses plain HTML, CSS, and JavaScript — no build step, packages, or API keys required.

## Run it locally
1. Extract `galaxy-for-you.zip`.
2. Open `index.html` in a modern browser.

For a local web server (optional):
- If Python is installed, open a terminal in this folder and run `python -m http.server 8000`.
- Visit `http://localhost:8000`.

## Personalize the secret note
Open `index.html` and edit the paragraphs inside `<article class="letter">`.
Keep it genuine and at the comfort level of your relationship. You can also change the seven star notes in `script.js`, inside the `messages` array.

## Publish a shareable link for free

### Netlify Drop (quickest)
1. Visit https://app.netlify.com/drop
2. Sign in if asked.
3. Drag the extracted `galaxy-for-you` folder onto the page (or follow the upload instructions shown).
4. Netlify will publish it and provide a public URL you can share.

### GitHub Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, and `script.js` to its root.
2. In the repository, open **Settings → Pages**.
3. Under build/deployment, select deployment from a branch and choose `main` / root.
4. Save and wait for the published URL shown by GitHub Pages.

## Project files
- `index.html` — page structure and content
- `style.css` — responsive design, glow effects, and animations
- `script.js` — interactive stars, progress, modal notes, secret ending, animated starfield

## Notes
- Google Fonts are loaded from Google Fonts when online. If unavailable, the page uses fallback fonts.
- The website does not collect data, use analytics, or send information anywhere.
- Keep the tone kind and pressure-free; this version is written for a talking stage.
