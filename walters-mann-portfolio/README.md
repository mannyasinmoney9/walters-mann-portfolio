# Walters Mann · Portfolio

A custom-built portfolio site for **Walters Mann** — Senior Java Engineer.

Built with **React 18 + Vite + Tailwind CSS + Framer Motion**. Designed and engineered
to be unique, fast, accessible, and easy to update — every piece of content lives in
plain JavaScript files in `/src/data/`.

---

## ✨ Highlights

- **10 sections** on the home page — Hero, About, Stats, Services, Skills, Projects, Experience, Education, FAQ, Contact
- **Dedicated project case-study pages** at `/projects/:slug` with overview, problem, approach, outcomes, and stack
- **Filterable archive** of all projects at `/projects`
- **Functional contact form** — uses EmailJS when configured, gracefully falls back to a `mailto:` handoff if not
- **Light & dark themes** with `localStorage` persistence
- **Editorial-tech design language** — Fraunces (display), DM Sans (body), JetBrains Mono (mono)
- **Scroll-spy navigation**, **scroll-progress bar**, **mobile drawer**, **404 page**
- **Built-in SEO meta** — Open Graph, Twitter cards, descriptive titles
- **No external image dependencies** — all project covers are CSS-generated

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (defaults to port 5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) once the dev server is running.

---

## ✏️ Customizing the content

Everything you'd want to edit lives in **`src/data/`** — no hunting through components.

| File                       | What it controls                                         |
| -------------------------- | -------------------------------------------------------- |
| `src/data/personal.js`     | Name, title, bio, stats, services, contact info, socials |
| `src/data/skills.js`       | Skill categories, proficiency levels, marquee tech list  |
| `src/data/projects.js`     | All projects (featured + archive) and case-study content |
| `src/data/experience.js`   | Career timeline, education, certifications, FAQs         |

After saving any of those files, the dev server hot-reloads automatically.

---

## 📬 Setting up the contact form (optional)

The contact form **always works**:

- If `VITE_EMAILJS_*` env vars are set → it sends through [EmailJS](https://www.emailjs.com/)
- If they're not set → it opens the user's mail client with a prefilled draft to `manniboh@gmail.com`

To enable EmailJS:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service and a template (template variables: `from_name`, `from_email`, `company`, `subject`, `message`, `to_email`, `reply_to`)
3. Copy `.env.example` to `.env.local` and fill in your keys:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Restart the dev server.

---

## 📄 Replacing the resume

Drop your real resume PDF at:

```
public/Walters-Mann-Resume.pdf
```

The "Download CV" button in the Hero links to this file directly.

---

## 🚢 Deployment

This is a standard Vite app — works out of the box on:

- **Vercel** — `vercel` (point at the project root)
- **Netlify** — drag-and-drop the `dist/` folder, or connect the repo
- **GitHub Pages** — `npm run build` and serve `dist/`
- **Cloudflare Pages**, **Render**, anywhere else that hosts static sites

For SPA routing on Netlify, add a `_redirects` file in `public/` with:

```
/*  /index.html  200
```

(Vercel handles SPA fallbacks automatically.)

---

## 🧱 Project structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── Walters-Mann-Resume.pdf
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, About, Skills, Projects, Contact, ...
│   │   └── ui/             # Reveal, Button, Marquee, Magnetic, ProjectCard, ...
│   ├── data/               # ✅ EDIT HERE — single source of truth
│   ├── hooks/              # useTheme, useScrollSpy, useScrollProgress
│   ├── pages/              # Home, AllProjects, ProjectDetail, NotFound
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Design tokens & global styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Design tokens

The whole color system lives at the top of `src/index.css` as CSS variables.
Edit those and the entire site re-themes — both light and dark modes:

```css
:root {
  --bg: #0c0a09;
  --fg: #f5f1e8;
  --accent: #ff5b24;
  /* ... */
}
```

---

## 📜 License

Personal portfolio · all content © Walters Mann.
The codebase is yours to fork or take inspiration from.

---

Built in Port Harcourt, with care.
