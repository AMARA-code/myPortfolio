# Premium React + TypeScript Portfolio

This is a modern, production-ready portfolio built with **React**, **TypeScript**, **Vite**, **Sass**, **React Router**, **Framer Motion**, and **Axios**.  
It is fully responsive and ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The build output is generated in the `dist` folder and can be deployed to any static hosting provider.

## Key features

- Multi-page portfolio (Home, About, Projects, Skills, Contact) using `react-router-dom`
- Premium dark UI with gradients, glassmorphism, and careful typography
- Smooth enter/scroll animations powered by **Framer Motion**
- Fully responsive layout with modern card-based design
- Reusable components: `Navbar`, `Footer`, `ProjectCard`, `SkillBar`, `ContactForm`, `Button`
- Axios-powered contact form wired for **Formspree** integration

## Formspree configuration

The contact form posts to a Formspree endpoint defined in `src/components/contact/ContactForm.tsx`:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/yourFormId";
```

1. Create a form at [Formspree](https://formspree.io/).
2. Copy your form ID and replace `yourFormId` with the actual ID.
3. Deploy — submissions will go directly to your email as configured in Formspree.

## Updating social links

In `src/pages/Contact.tsx`, update:

- GitHub URL and username
- LinkedIn profile URL
- Email address used in the `mailto:` link

## Deployment notes

- **Netlify**: `netlify.toml` is provided with the correct build command and SPA redirect.
- **Vercel**: `vercel.json` rewrites all routes to `index.html` for client-side routing.
- **GitHub Pages**: `vite.config.ts` sets `base: "./"` so the app works when served from a subpath.

