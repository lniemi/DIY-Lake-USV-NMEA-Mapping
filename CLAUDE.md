# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DIY lake bathymetry mapping project documentation site. This is a bilingual (Finnish/English) React + Vite web application deployed to GitHub Pages. The project documents how to build an unmanned surface vehicle (USV) with standard NMEA-compatible fishfinder equipment to create depth maps of inland lakes.

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build locally
```

## Architecture

### Bilingual Routing

The app uses path-based locale prefixes with localized route names:

| English | Finnish |
|---------|---------|
| `/en` | `/fi` |
| `/en/blog` | `/fi/blogi` |
| `/en/blog/:slug` | `/fi/blogi/:slug` |
| `/en/docs` | `/fi/dokumentaatio` |
| `/en/docs/*` | `/fi/dokumentaatio/*` |

Root `/` auto-redirects based on browser language. Routing is configured in [src/App.tsx](src/App.tsx).

### Content System

Blog posts and documentation are markdown files in `public/content/`:
- Files use locale suffix: `filename.en.md` and `filename.fi.md`
- Index files (`index.en.json`, `index.fi.json`) define metadata and navigation structure
- Content is fetched at runtime via hooks in `src/hooks/`

### i18n

UI strings use react-i18next with translations in:
- `src/i18n/locales/en.json`
- `src/i18n/locales/fi.json`

The `useLocale` hook handles language switching while preserving the current page.

### Key Directories

- `src/components/layout/` - Header, Footer, Layout with locale context
- `src/components/content/` - MarkdownRenderer, BlogPost, DocNav
- `src/pages/` - Page components (Home, Blog, Docs, etc.)
- `public/content/blog/` - Blog posts and index files
- `public/content/docs/` - Documentation pages and index files

### GitHub Pages Deployment

- Deploys automatically on push to main via `.github/workflows/deploy.yml`
- Uses `base: '/DIY-Lake-USV-NMEA-Mapping/'` in vite.config.ts
- SPA routing handled by `public/404.html` redirect hack

## Key Technical Context

- **NMEA Protocol**: Project documents NMEA 0183 for depth/position data capture
- **Target Environment**: Calm inland lakes (not marine/ocean conditions)
- **Hardware Philosophy**: Fishfinder remains unmodified; removable mounting

## UI/UX Design Standards

When generating or modifying UI components, follow these rules to ensure professional, intentional design. Avoid "vibe coded" patterns that signal rushed, unpolished work.

### Spacing and Layout

- Use a strict 4pt or 8pt spacing scale for all margins, padding, and gaps
- Maintain consistent component placement across pages (button sizes, padding, text alignment)
- Align all elements to a proper grid; nothing should drift or wobble
- Containers must have predictable, consistent widths
- Fix responsiveness before polishing desktop views

### Typography

- Use a single heading font and single body font consistently
- Define a type scale with consistent sizes and line heights
- Heading weight should not be too thick; body text should not be too light
- Maintain consistent line height and spacing rhythm throughout
- Avoid defaulting to Inter/Poppins/Montserrat without intentional usage

### Color and Visual Style

- Choose a small, disciplined color palette and stick to it
- Avoid purple gradients unless explicitly part of brand identity
- Avoid neon effects and colors that exist for novelty rather than purpose
- Ensure high contrast and readability at all times
- Use one consistent shadow/elevation style throughout

### Components

- All components must share the same border radius, shadow style, and padding logic
- Standardize border radiuses (do not mix 4px, 12px, 32px randomly)
- Buttons, cards, inputs, modals must look like they belong together
- Icons should be proportional to accompanying text (avoid massive icons with tiny text)
- Headers with transparency must maintain readability during scroll

### Animations and Interactions

- Keep hover effects subtle; never distort layout or jump aggressively
- Use natural animation timing with proper easing
- Never add movement purely for decoration
- Every interactive element must function: buttons respond, tabs switch, accordions open/close, carousels slide
- Avoid: aggressive card lifting, rotation on hover, bounce overshoot, wiggle effects

### Loading States

- Every async action needs a loading state
- Buttons must visually indicate loading during async operations
- Use skeleton screens for data-heavy areas
- Never leave empty white gaps while data loads
- Content should transition smoothly, not appear suddenly

### Content and Copy

- Write specific, grounded copy; avoid generic taglines like "build your dreams" or "launch faster"
- Testimonials must feel authentic (real names, titles, specific quotes)
- Footer and copyright text must be correct and professional
- Do not use emojis as UI elements or in headings
- Limit sparkle emoji usage; one is acceptable, many signals rushed work

### Technical Requirements

- Include proper page titles, meta descriptions, and OG images
- Ensure favicon is present
- All social links must be functional (no "#" or 404 links)
- Mobile layout must work as well as desktop
- Never leave placeholder text in final output
- Remove any test content before shipping

### Red Flags to Actively Avoid

- Purple gradients without brand justification
- Sparkle/emoji overload
- Fake-looking testimonials with AI-generated avatars
- Semi-transparent headers that interact poorly with content
- Inconsistent border radiuses across components
- Missing loading states on async actions
- Non-functional interactive elements
- Generic buzzword-heavy hero sections
- Misaligned grids and uneven spacing
