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
| `/en/graph` | `/fi/tietograafi` |
| `/en/viewer` | `/fi/katselin` |

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
- `src/components/usv-viewer/` - Three.js 3D viewer components
- `src/pages/` - Page components (Home, Blog, Docs, etc.)
- `public/content/blog/` - Blog posts and index files
- `public/content/docs/` - Documentation pages and index files
- `public/content/usv-configs/` - USV configuration JSON files for 3D viewer

### GitHub Pages Deployment

- Deploys automatically on push to main via `.github/workflows/deploy.yml`
- Uses `base: '/DIY-Lake-USV-NMEA-Mapping/'` in vite.config.ts
- SPA routing handled by `public/404.html` redirect hack

### 3D Viewer System

The USV 3D Viewer (`/en/viewer` or `/fi/katselin`) is a parametric CAD-like viewer built with:
- **Three.js** + **React Three Fiber** (no drei dependency)
- Custom OrbitControls implementation
- JSON-based configuration system
- **Isolated model folders** for each USV variant

**Architecture:**

```
src/components/usv-viewer/
├── models/
│   ├── large/                    # Large USV (1.2m hull)
│   │   ├── Hull.tsx
│   │   ├── MotorMount.tsx
│   │   ├── SensorBracket.tsx
│   │   ├── ElectronicsHousing.tsx
│   │   ├── BatteryCompartment.tsx
│   │   ├── GNSSModule.tsx
│   │   ├── LargeUSVModel.tsx    # Assembly component
│   │   └── index.ts
│   │
│   ├── small/                    # Small USV (0.65m hull)
│   │   ├── Hull.tsx
│   │   ├── MotorMount.tsx
│   │   ├── SensorBracket.tsx
│   │   ├── ElectronicsHousing.tsx
│   │   ├── BatteryCompartment.tsx
│   │   ├── GNSSModule.tsx
│   │   ├── SmallUSVModel.tsx    # Assembly component
│   │   └── index.ts
│   │
│   └── USVModelFactory.tsx      # Selects model based on type
│
├── panels/
│   ├── ControlPanel.tsx
│   ├── ViewControls.tsx
│   ├── ComponentList.tsx
│   ├── ModelSelector.tsx        # Switch between Large/Small USV
│   └── ExportPanel.tsx
│
├── USVViewer.tsx                # Main container
├── ViewerCanvas.tsx             # Three.js canvas
└── DimensionAnnotations.tsx
```

**Key files:**
- `src/components/usv-viewer/USVViewer.tsx` - Main container, manages state
- `src/components/usv-viewer/ViewerCanvas.tsx` - Three.js canvas with custom controls
- `src/components/usv-viewer/models/USVModelFactory.tsx` - Factory to select Large or Small model
- `src/components/usv-viewer/models/large/` - Large USV components (1.2m hull)
- `src/components/usv-viewer/models/small/` - Small USV components (0.65m hull)
- `src/components/usv-viewer/panels/ModelSelector.tsx` - UI to switch models
- `src/hooks/useUSVConfig.ts` - Configuration loading hook
- `src/types/usv-config.ts` - TypeScript interfaces for config
- `public/content/usv-configs/default.json` - Large USV configuration
- `public/content/usv-configs/small.json` - Small USV configuration

**Model isolation principle:**
Each USV variant (`large/`, `small/`) has its own complete set of component files with hardcoded positions appropriate for that hull size. This avoids scaling/positioning issues when switching between models. Components are duplicated rather than shared.

**Adding a new USV variant:**
1. Create new folder under `models/` (e.g., `models/medium/`)
2. Copy all component files from an existing variant
3. Adjust positions in each component for the new hull dimensions
4. Create assembly component (e.g., `MediumUSVModel.tsx`)
5. Create `index.ts` export
6. Add case to `USVModelFactory.tsx`
7. Create config JSON in `public/content/usv-configs/`
8. Add option to `ModelSelector.tsx` and i18n files

**LLM-driven design workflow:**
1. User prompts changes (e.g., "Make the hull 20cm longer")
2. Edit the appropriate config JSON or component files in the model folder
3. Vite HMR triggers automatic reload
4. Model updates in browser

## Key Technical Context

- **NMEA Protocol**: Project documents NMEA 0183 for depth/position data capture
- **Target Environment**: Calm inland lakes (not marine/ocean conditions)
- **Hardware Philosophy**: Fishfinder remains unmodified; removable mounting

## Writing Tone & Content Style

This is an **academic hobby project**, not a product. All content must reflect this.

### Core Principles

- **Informative, not persuasive** - Report findings and document methods; never sell or hype
- **Matter-of-fact, almost dry** - Academic tone; it's acceptable to sound slightly dull
- **Document what exists** - No promises about what users will "get" or "achieve"
- **DIY spirit** - Consumer hardware, practical methods, real constraints

### Prohibited Patterns

| Type | Examples to Avoid |
|------|-------------------|
| Taglines/slogans | "Map today. Unplug and fish tomorrow." |
| CTAs | "Get Started", "Try Now", "Launch Your..." |
| Benefit selling | "Why This Project?", feature cards with benefits |
| Marketing promises | "Everything you need to...", "The ultimate..." |
| Hype words | "Revolutionary", "game-changing", "seamless" |
| Product framing | Treating documentation as a product page |

### Correct Patterns

| Type | Examples |
|------|----------|
| Project description | "This project documents the development of..." |
| Navigation | "Documentation", "Project Log" (not "Get Started", "Read the Blog") |
| Section headers | "Project Scope", "Methods", "Hardware" |
| Descriptions | "USV platform with removable fishfinder mount. Consumer sonar unit connects via NMEA 0183." |

### Blog = Project Log

The blog functions as a **project log**, not a marketing blog:
- Build notes and observations
- Test results and measurements
- Problems encountered and solutions
- Technical decisions and rationale

### Documentation = Technical Reference

Documentation is **technical reference**, not onboarding:
- How systems work, not why you should use them
- Specifications and procedures
- Calibration methods and data formats

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
