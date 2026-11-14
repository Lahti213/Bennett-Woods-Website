# bennettwoodssmyrna.com

Static site for the Bennett Woods neighborhood in Smyrna, GA. It's published with GitHub Pages on every push to `main`.

## Updating the site

Almost everything you'll want to change lives in **`content.js`**:

| What | Where in `content.js` | Notes |
|---|---|---|
| News posts | `news` | Newest first; posts older than a year hide automatically |
| Events | `events` | Leave `date: ""` for "Date TBA"; past events hide automatically; dated events get an "Add to calendar" button |
| Photo gallery | `photos` | Put images in `photos/` first; the gallery appears once there's one photo |
| Recommended businesses | `services` | The section stays hidden while the list is empty |
| Facebook / Nextdoor links | `social` | Shown in the footer and on the New Neighbors page |

Contact form: in `index.html`, set `data-endpoint` on `<form id="contactForm">` to a form service URL (e.g. Formspree). Until it's set, a friendly note shows instead of the form.

## Files

- `index.html`: home page
- `welcome.html`: new neighbor guide (utilities, trash day, schools, numbers)
- `map.html`: full-screen map
- `styles.css`, `main.js`: shared design and behaviour
- `content.js`: editable content (see above)
