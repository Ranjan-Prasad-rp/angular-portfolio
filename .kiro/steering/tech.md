# Tech Stack

## Core
- **Angular 19** (standalone components API — no NgModules)
- **TypeScript 5.7**
- **RxJS 7.8**
- **Bootstrap 5.3** (CSS via global styles + JS bundle via scripts in angular.json)
- **SCSS** for all component and global styles

## Build System
- **Angular CLI 19 / `@angular-devkit/build-angular`** using the `application` builder (Vite-based)
- Output: `dist/portfolio`

## Testing
- **Karma + Jasmine** (unit tests, `.spec.ts` files alongside source)

## Common Commands

```bash
# Development server (run manually — do not use in automated tasks)
npm start          # ng serve — http://localhost:4200

# Production build
npm run build      # ng build

# Run tests (single run)
ng test --watch=false

# Watch build (dev)
npm run watch
```

## Key Configuration
- `angular.json` — build targets, style/script includes, budget limits
- `src/styles.scss` — global CSS custom properties (design tokens)
- Bootstrap is loaded globally; do not import it per-component
- `provideRouter` uses `withInMemoryScrolling` with `anchorScrolling: 'enabled'` and `scrollPositionRestoration: 'top'`
