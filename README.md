# Inclusign website

The website for **Inclusign**, inclusive sign language learning. It's a static site (HTML, CSS and JavaScript), so it needs no build step or framework.

- `index.html`: home page. It has the logo intro animation, practice journey, interactive dictionary preview, features, learner stories, FAQ and contact form.
- `team.html`: the core team (eight engineering students from ENSPD Douala).
- `styles.css`: all styles, including the light ("sky blue") and dark ("morning blue") themes.
- `script.js`: English/French text, theme switching, the dictionary preview, contact form, chat helper and team cards.
- `assets/`: images, logo files, favicons and the logo animation layers. `assets/originals/` holds the full-size source images.

## Run it locally

Any static web server works. For example:

```bash
python3 -m http.server 8090
```

Then open <http://localhost:8090>. Opening `index.html` straight from disk also works, but a local server behaves more like the live site.

## Things to edit

Most settings are at the top of `script.js`:

| Setting | What it does |
|---|---|
| `CONFIG.contactEmail` | Contact address used across the site (currently a placeholder) |
| `CONFIG.contactEndpoint` | Optional form service URL (e.g. Formspree). Leave it empty and the form opens the visitor's email app instead |
| `CONFIG.linkedinUrl` | LinkedIn page for the footer button (currently a placeholder) |
| `CONFIG.lscDictionaryUrl` | Full LSC dictionary. While it's empty, the button shows "Coming soon" |
| `TEAM` | Team members on `team.html`: name, role and bio (EN/FR), optional photo in `assets/team/`, optional LinkedIn |

The intro animation plays once per browser tab. To change this, edit `INTRO` in the small script inside the `<head>` of `index.html`: set it to `'always'` or `'off'`.

After editing `styles.css` or `script.js`, bump the `?v=` number where `index.html` and `team.html` load them, so browsers don't keep the old copy.

## Deploying

Upload the folder as-is to any static host (GitHub Pages, Netlify, Vercel and so on). `index.html` is the entry point.
