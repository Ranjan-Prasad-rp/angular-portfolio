# Project Structure

```
src/app/
├── app.component.*        # Root shell — renders <app-header>, <router-outlet>, <app-footer>
├── app.config.ts          # provideRouter, provideZoneChangeDetection
├── app.routes.ts          # Lazy-loaded routes via loadComponent()
│
├── core/                  # Singleton services (providedIn: 'root')
│   ├── skill.service.ts
│   └── project-service.service.ts
│
├── models/                # TypeScript interfaces only — no logic
│   ├── skill.model.ts
│   └── project.model.ts
│
├── features/              # Page-level feature components (one folder per route)
│   ├── home/
│   │   ├── home.component.*       # Composes hero + skill sub-components
│   │   ├── hero/                  # Hero section sub-component
│   │   └── skill/                 # Skills grid sub-component
│   ├── projects/
│   │   ├── projects.component.*
│   │   └── project-card/          # Reusable card sub-component
│   └── contact/
│       └── contact.component.*    # Reactive form
│
├── layout/                # Persistent UI chrome
│   ├── header/header/     # Nav bar with RouterLink/RouterLinkActive
│   └── footer/
│
├── shared/                # (empty — reserved for shared components/pipes/directives)
└── pages/                 # (empty — reserved for future page wrappers)
```

## Conventions

- **All components are standalone** (`standalone: true`). Never use NgModules.
- **Lazy loading** — every route uses `loadComponent()`. Do not eagerly import page components in routes.
- **Dependency injection** — use `inject()` function, not constructor injection.
- **Services** — data lives in `core/` services as private arrays. Services are `providedIn: 'root'`.
- **Models** — plain TypeScript interfaces in `models/`. No classes.
- **Styling** — SCSS per component (`styleUrl`). Use CSS custom properties from `styles.scss` for colors (`--brand-color`, `--card-bg`, etc.). Bootstrap utility classes are available globally.
- **Component selector prefix** — `app-` (enforced by Angular CLI config).
- **File naming** — Angular CLI convention: `feature-name.component.ts`, `feature-name.service.ts`, `feature-name.model.ts`.
- New shared UI pieces go in `shared/`; new singleton services go in `core/`.
