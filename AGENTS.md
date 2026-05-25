# gestor_de_respaldo_fe — AGENTS.md

## Stack
- **Vite 8** + **React 19** + **TypeScript ~6.0** + **react-router v7**
- **Bootstrap 5.3.8 via CDN** in `index.html` (not an npm dep)

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` (typecheck is built-in, no separate command) |
| `npm run lint` | `eslint .` (flat config, `eslint.config.js`) |
| `npm run preview` | Vite production preview |

No test framework is configured. There are no tests.

## Architecture
- **Atomic Design**: `src/components/atoms/` → `molecules/` → `organisms/` → `pages/`
- Every component lives in its own directory with an `index.tsx` barrel file and a `default export`
- Entrypoint: `src/main.tsx` → `App.tsx` (`RouterProvider`) → `src/routes.ts` (`createBrowserRouter`)

## Routing & Auth
- Routes defined in `src/routes.ts` using `createBrowserRouter` (react-router v7)
- Middleware pattern: `validateSession` in `src/middlewares/auth.ts` guards `/home` by checking `sessionStorage.getItem('token')`; throws `redirect('/')` on missing session
- Sign-in writes token via `sessionStorage.setItem('token', ...)`

## TypeScript gotchas
- **`verbatimModuleSyntax`**: always use `import type` for type-only imports (no runtime elision)
- **`erasableSyntaxOnly`**: no `enum`, no `namespace`, no parameter properties — use `const` objects or union types instead
- **`noUnusedLocals`** / **`noUnusedParameters`**: both enabled; dead code causes build errors

## Component conventions
- Functional components only; `useMemo` / `useCallback` used consistently for derived values and event handlers
- UI styled exclusively via Bootstrap utility classes (`className` props); no CSS modules, no CSS-in-JS
- Props typed inline with `interface` (not `type`) in the same file

## Available skills (loaded via skills-lock.json)
`.agents/skills/` contains: `accessibility`, `composition-patterns`, `frontend-design`, `nodejs-best-practices`, `react-best-practices`, `seo`, `typescript-advanced-types`, `vite`
