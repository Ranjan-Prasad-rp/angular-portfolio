# AGENTS.md — Portfolio

Angular 19 standalone portfolio site (no NgModules). Lazy-loaded routes via `loadComponent`.

## Commands

| Command | Purpose |
|---------|---------|
| `npm start` / `ng serve` | Dev server at `http://localhost:4200/` with HMR |
| `npm test` / `ng test` | Karma + Jasmine (Chrome headless) — no Jest, no Playwright |
| `npm run build` / `ng build` | Prod build to `dist/portfolio` |
| `ng generate component foo` | Scaffold a component (SCSS style, standalone) |

No lint or typecheck scripts exist (`ng build` acts as typecheck).

## Architecture

- **Entry:** `src/main.ts` bootstraps `AppComponent` standalone
- **Routing:** `src/app/app.routes.ts` — 3 routes (home, contact, projects), all lazy-loaded. Catch-all redirects to `/`. Anchor scrolling enabled via `withInMemoryScrolling` fragment support.
- **Layout:** Header/Footer rendered in `AppComponent` template, outside `<router-outlet>`
- **Services:** `src/app/core/` — `GithubserviceService` (fetches public repos via GitHub API), `ProjectServiceService` (hardcoded project list), `SkillService` (hardcoded skill list). All `providedIn: 'root'`.
- **Models:** `src/app/models/` — `Githubrepo`, `ProjectModel`, `SkillModel`, `IndustryProject`
- **Shared:** `src/app/shared/` — `loading-screen`, `spider-cursor`, `animated-input`, `animated-text`
- **Static assets:** `public/` contains `favicon.ico`, resume PDF, profile image
- `src/app/pages/` is empty (unused)

## Conventions

- **SCSS** for component styles (configured in `angular.json`)
- **2-space indent, single quotes** for TS (`.editorconfig`)
- **Strict TypeScript** (`strict: true`, `strictTemplates: true`, etc.)
- **Bootstrap 5.3** is imported globally: CSS via `angular.json` styles, JS bundle via `import 'bootstrap/...'` in `main.ts` (needed for navbar toggler)
- **Cursor spotlight** effect: `AppComponent.onMouseMove()` sets `--cx`/`--cy` CSS custom properties on `<html>`
- **Loading screen** blocks app render until `(done)` event fires
- **Reveal animations** via `.reveal` CSS class (opacity + translateY). Staggered children via `.reveal-stagger > *`

## Tests

- Karma + Jasmine (`tsconfig.spec.json` includes `jasmine` types)
- Spec files alongside components (`*.spec.ts`)
- No e2e framework configured (`ng e2e` not wired)

## Auto-Commit

After every file edit or creation, commit changes with a descriptive message:
```
git add -A && git commit -m "auto: <brief description of changes>"
```
Multiple files changed in one logical step → one commit with a summary message.

## Notable

- No linter or formatter configured beyond `.editorconfig` (no ESLint, Prettier, stylelint)
- Distinct `outputPath: dist/portfolio` — not `dist/`
- Budget warnings: 500kB initial, 4kB per component style
