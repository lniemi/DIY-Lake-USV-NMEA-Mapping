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
