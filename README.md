# Xai Intelligence Workspace

High-fidelity interactive product experience for turning raw data into structured intelligence and actionable insight.

## What this is

This is a single-page Next.js App Router experience built to feel like a real AI product workspace rather than a landing page. It combines a narrative hero, an interactive insight flow, a product-style dashboard shell, motion-driven state changes, and a single 3D signature interaction.

## Technical Approach

The experience is built as a modular single-page application using the Next.js App Router. Each section is implemented as an isolated UI component to keep layouts and interactions reusable. Framer Motion is used for component-level transitions and micro-interactions. GSAP ScrollTrigger can be used for scroll-driven storytelling and section transitions. React Three Fiber renders an interactive 3D intelligence object that responds to user input and reinforces the product narrative. The interface follows an 8px spacing system, reusable design primitives, and a consistent visual hierarchy to maintain clarity throughout the experience.

## Animation & Interaction Decisions

The motion system is designed to support the story rather than decorate the interface.

- Hero particles transform into structured geometry to represent intelligence formation.
- Scroll-driven transitions reveal each product stage progressively.
- Dashboard components animate into place with subtle timing to emphasize hierarchy.
- Cursor movement creates depth through parallax and 3D object rotation.
- Hover states provide immediate feedback while preserving a calm visual experience.

Animations prioritize performance using GPU-friendly transforms and lightweight motion patterns.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Framer Motion
- GSAP available for timeline or scroll work
- React Three Fiber / Three.js for the signature visual
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## Quality checks

```bash
npm run lint
npm run build
```

## Page structure

- Hero: Data -> Intelligence narrative with a cursor-reactive 3D core
- Insight flow: three-stage transformation sequence with motion and state changes
- Workspace shell: sidebar navigation, main content panel, charts, tables, and automation preview
- Signature interaction: the 3D signal object in the hero and stage panel

## Component structure

- `app/page.tsx`: page composition and reusable UI sections
- `app/layout.tsx`: metadata and root shell
- `app/globals.css`: global theme, background treatment, and typography

## Project Structure

- `app/`
- `app/components/`
- `app/hooks/`
- `app/lib/`
- `public/`
- `styles/`

## Features

- Interactive Hero Experience
- Scroll-driven Storytelling
- AI Insight Flow
- Product Dashboard UI
- Reusable UI Components
- Responsive Layout
- 3D Interactive Scene
- Smooth Motion System

## Preview

(Add screenshots here)

- Hero
- Dashboard
- Insight Flow

## Deliverables

- Product documentation: [docs/product-documentation.md](docs/product-documentation.md)
- Figma file link: add your public Figma URL here
- Public repository link: add your public GitHub URL here
- Live deployment link: host on Vercel or Netlify and add your public URL here

## Demo Video

- Google Drive: (Add link)
- YouTube: (Add link)

## Submission Links

- Figma: replace the placeholder with your public Figma URL
- GitHub: replace the placeholder with your public repository URL
- Live URL: replace the placeholder with your deployed Vercel or Netlify URL

## Evaluation criteria

This submission is organized to perform well against the stated review areas:

- UI / UX: clear hierarchy, restrained typography, and spacious layout rhythm
- Motion / Interaction: purposeful animation, smooth state transitions, and timing that supports the story
- Engineering quality: reusable sections, simple data-driven composition, and clean motion architecture
- Product thinking: the interface explains how Xai turns raw data into actionable intelligence

## Notes

- The design is intentionally single-page and desktop-first, with responsive behavior for smaller screens.
- All data is mocked on the client; no backend is required.
- Motion is implemented with Framer Motion, with React Three Fiber providing the 3D interaction layer.
