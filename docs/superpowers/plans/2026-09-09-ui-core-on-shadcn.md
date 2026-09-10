# @robomous/ui-core 0.4.0 — construido sobre shadcn/ui

## Contexto

El paquete es un design system de 21 componentes propios sobre Radix y Base UI. En 0.3.0 se quitó
toda relación con shadcn: `components.json`, la dependencia `shadcn` y la capa de variantes
`data-*` que `styles.css` importaba. El usuario quiere ahora declarar que el sistema está
**construido encima de shadcn/ui** (no es una extensión): poder instalar componentes nuevos con
`pnpm dlx shadcn@latest add <x>`, y tener disponibles las utilities de `shadcn/tailwind.css`.
Los 21 componentes existentes y todo lo arreglado en la sesión anterior quedan como están.

El usuario ya añadió, sin commit: `src/components/sidebar.tsx` (salida del registro `radix-nova`),
`src/hooks/use-mobile.tsx` y `paths` en `tsconfig.json` (`@/*` → `src/*`, y una entrada `react`).
Typecheck y ESLint pasan con ese árbol.

Hallazgos que fijan el diseño:

- `shadcn/tailwind.css` (shadcn 4.21.0, 629 líneas) define las variantes `data-open`, `data-closed`,
  `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`, `data-active`,
  `data-horizontal`, `data-vertical` (casan `[data-state="x"]` y el atributo desnudo, excluyendo
  `="false"`), `no-scrollbar`, la familia `scroll-fade-*`, la familia `shimmer-*` y los keyframes
  de accordion. No contiene `:focus-visible` ni `--color-*`. **No define `cn-rtl-flip`**, que el
  sidebar usa.
- El sidebar **depende** de esa capa: `data-active={isActive}` renderiza `data-active="false"` y la
  variante nativa de Tailwind casa por presencia. Los componentes existentes escriben
  `data-[state=open]` explícito y funcionan igual con la capa presente.
- Importar `shadcn/tailwind.css` desde la hoja (que se publica como fuente) haría de `shadcn`, el
  CLI completo con 33 dependencias, una dependencia de runtime de cada consumidor.
- El build es `tsc` puro: emitiría `@/hooks/use-mobile` tal cual en `dist`. El CLI de shadcn
  siempre escribe imports con alias.

## Decisiones del usuario

1. **Copia local** de la hoja: `src/theme/shadcn.css`, importada desde `styles.css`; `shadcn` en
   `devDependencies`; un test falla si la copia difiere del paquete instalado. Hay precedente: hasta
   `6f3862a` existía `src/theme/tailwind.css` con `tests/theme/imports.test.ts` custodiándola.
2. **Alias `@/` en `src`**, reescritos en `dist` por `tsc-alias` tras `tsc`; vitest gana un alias.
3. **Sidebar y `use-mobile` integrados por completo**: export, catálogo, docs, test, y la utility
   `cn-rtl-flip` definida en `styles.css`.
4. La entrada `paths.react` del tsconfig se **elimina si typecheck pasa sin ella**.

Reglas transversales: los 21 componentes no se reescriben ni se reinstalan; `sidebar.tsx` y
`use-mobile.tsx` quedan como los escribió el usuario; el CLI es para componentes **nuevos**.

## Tareas

### 0. Commit de los cambios pendientes del usuario

Primer paso, antes de tocar nada:

```
git add tsconfig.json src/components/sidebar.tsx src/hooks/use-mobile.tsx
git commit -m "feat: Sidebar and useIsMobile from the shadcn registry; @/ alias in tsconfig"
```

### 1. La capa de shadcn, vendorizada

- `pnpm add -D shadcn@^4.21.0`.
- Copiar `node_modules/shadcn/dist/tailwind.css` → `src/theme/shadcn.css` **byte a byte**, sin
  cabecera propia (la explicación vive en `styles.css` y en el test). Añadir `src/theme/shadcn.css`
  a `.prettierignore` con una nota de una línea (archivo vendorizado, comparado byte a byte).
- `src/theme/styles.css`:
  - `@import "./shadcn.css";` después de `@import "tw-animate-css";`.
  - Nueva utility propia, junto al bloque `@theme inline` y antes de `@layer base`:
    ```css
    /* Icons that point somewhere flip with the writing direction. The registry's
       components name this class; shadcn defines it nowhere, so it lives here. */
    @utility cn-rtl-flip {
      &:where([dir="rtl"], [dir="rtl"] *) {
        transform: scaleX(-1);
      }
    }
    ```
  - Reescribir el comentario de cabecera: la hoja importa la capa de utilities y variantes de
    shadcn, vendorizada; los tokens siguen teniendo un solo hogar aquí.
- `tests/theme/shadcn.test.ts` (node), tres aserciones:
  1. `src/theme/shadcn.css` es idéntico a `node_modules/shadcn/dist/tailwind.css` (normalizando
     `\r\n` → `\n` antes de comparar). Mensaje de fallo: "shadcn changed its stylesheet; copy it
     over and review the diff".
  2. El archivo está trackeado por git (`git ls-files --error-unmatch`, copiado de
     `git show 6f3862a^:tests/theme/imports.test.ts`), y `styles.css` lo importa.
  3. `package.json`: `shadcn` está en `devDependencies` y **no** en `dependencies`.
- `tests/package/consumer.test.ts`:
  - `files` publicados incluyen `src/theme/shadcn.css`; `shipped.dependencies` no contiene `shadcn`.
  - El CSS compilado contiene `.no-scrollbar`, `.cn-rtl-flip`, y la variante de shadcn en su forma
    real: `[data-active]:not([data-active="false"])`.

### 2. Alias `@/` que sobreviven al build

- `pnpm add -D tsc-alias@^1.9.4`.
- `package.json#scripts.build`: `… && tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json --resolveFullPaths`.
  `--resolveFullPaths` añade `.js` a los imports relativos sin extensión que el CLI escribe
  (`@/components/button` → `./button.js`), necesario porque el entry se importa bajo Node en el
  test de paquete. Reescribe `.js` y `.d.ts`.
- `vitest.config.ts`, proyecto `unit`: `resolve: { alias: { "@": path.resolve("src") } }`.
- `tsconfig.json`: quitar `"react": ["./node_modules/@types/react"]` y correr `pnpm typecheck`.
  Si pasa, queda fuera; si falla, se conserva con un comentario que cite el error. Añadir un
  comentario sobre `@/*`: es el alias que `components.json` declara y el que el CLI escribe.
- `tests/package/consumer.test.ts`: ningún archivo de `dist/` contiene `"@/`; `render.mjs` renderiza
  `SidebarProvider` + `Sidebar collapsible="none"` y la salida contiene `data-slot="sidebar"` (prueba
  en runtime que el alias se reescribió y que la cadena de imports resuelve bajo Node).

### 3. `components.json` de vuelta

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/theme/styles.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "ui": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

`utils` no se usa: el estilo `radix-nova` importa `cn` del paquete `cn` (ya en `dependencies`).
Verificación en la tarea 7. Riesgo: si el CLI exige `@import "shadcn/tailwind.css"` en la hoja,
se documenta y se decide con el usuario; no se cambia la decisión 1 en silencio.

### 4. Sidebar integrado

- `src/index.ts`: exportar las 23 piezas de `sidebar.tsx` (`Sidebar` … `useSidebar`) y
  `useIsMobile` desde `./hooks/use-mobile.js`, con el comentario de cabecera actualizado a
  veintidós componentes. `sidebar.tsx` y `use-mobile.tsx` **no se editan**.
- `tests/setup.ts`: stub de `window.matchMedia` (jsdom no lo implementa; `useIsMobile` lo llama en
  un efecto), nombrando `tests/components/sidebar.test.tsx` como el test que lo necesita, al estilo
  del bloque `hasPointerCapture`. `matches` responde una consulta `max-width` leyendo
  `window.innerWidth`; el test que necesite móvil fija `window.innerWidth = 500` antes de montar.
- `tests/components/sidebar.test.tsx`, comportamiento observable:
  - `useSidebar` fuera del provider lanza.
  - `SidebarTrigger` alterna `data-state` de `expanded` a `collapsed` en `[data-slot="sidebar"]`
    y `onOpenChange` recibe el valor cuando es controlado.
  - `Ctrl+B` / `Meta+B` alternan.
  - `SidebarMenuButton isActive` renderiza `data-active="true"`; sin `isActive`, `"false"` (la razón
    de que la capa de shadcn sea necesaria queda escrita en el test).
  - Con `innerWidth < 768` y `openMobile`, el sidebar es un `Sheet`: `screen.getByRole("dialog")`
    con el título "Sidebar" accesible.
- `examples/catalog/src/sections/Components.tsx`: `Specimen` "Sidebar" con
  `SidebarProvider className="min-h-0 w-auto"` y `Sidebar collapsible="none" className="h-96 rounded-lg ring-1 ring-sidebar-border"`,
  mostrando header con `SidebarInput`, dos `SidebarGroup` (label, action), `SidebarMenu` con un botón
  activo, uno con `SidebarMenuBadge`, uno con `SidebarMenuAction showOnHover`, un `SidebarMenuSub`,
  `SidebarMenuSkeleton showIcon`, `SidebarSeparator` y footer. Sin variante `fixed` en el catálogo:
  las variantes `offcanvas`/`icon` posicionan `fixed` y no caben en una página.
- `docs/components/README.md`: fila Sidebar (anatomía exportada; comportamiento: Radix Slot, Sheet
  en móvil vía Radix Dialog, Tooltip en `SidebarMenuButton`; notas: `side`, `variant`,
  `collapsible`, atajo `⌘/Ctrl+B`, cookie `sidebar_state`, `useSidebar`, `useIsMobile` a 768px).
  "Twenty-one" → "Twenty-two" en README.md, DESIGN.md, `docs/components/README.md`, `src/index.ts`.

### 5. Documentación: construido sobre shadcn/ui

- `package.json`: `description` → "Robomous design system, built on top of shadcn/ui: owned React
  components over Radix and Base UI, and the one stylesheet they resolve through."; `version` →
  `0.4.0`.
- `README.md`: párrafo bajo el título y sección nueva **Built on shadcn/ui**: los componentes
  entran desde el registro de shadcn con `components.json` y se adaptan y poseen aquí; la capa de
  utilities y variantes de shadcn viene vendorizada en `src/theme/shadcn.css`; instalar uno nuevo es
  `pnpm dlx shadcn@latest add <name>` seguido del checklist de DESIGN.md. Árbol del repo con
  `src/hooks/` y `components.json`.
- `docs/DESIGN.md`:
  - *Purpose and ownership*: "built on top of shadcn/ui" y qué significa (origen de los componentes,
    no una extensión; lo que shadcn aporta y lo que Robomous posee).
  - *The shape of the package*: `src/theme/shadcn.css`, `src/hooks/`, `components.json`.
  - *State attributes* reescrita: la capa vendorizada define las variantes de shadcn (`data-open:`
    casa ambas grafías, excluye `"false"`); los componentes existentes conservan la grafía explícita
    de su librería y no se reescriben; un componente instalado puede usar la grafía de shadcn; ambas
    son válidas. `shadcn.css` no se edita nunca: lo propio va en `styles.css` (`cn-rtl-flip` es el
    ejemplo).
  - *Adding a component*: dos rutas. **Instalar del registro**: `pnpm dlx shadcn@latest add <x>`,
    revisar el diff (el CLI puede escribir en `styles.css` si el item trae `cssVars`), y pasar el
    checklist de adaptación: colores solo por roles (lint lo exige), `type="button"` si es un
    botón, sin animación de salida en menús, geometría en la escala, imports `@/` se quedan, export
    por nombre, test, catálogo, fila en docs. **Escribir a mano** sobre Radix/Base UI: la lista
    actual. Nunca reinstalar uno existente con `--overwrite`.
  - *Verification*: filas nuevas para `tests/theme/shadcn.test.ts` y las aserciones nuevas del test
    de paquete.
- `docs/CONTRIBUTING.md`: `build` incluye `tsc-alias`; sección *Updating the shadcn layer*
  (`pnpm up shadcn`, copiar `dist/tailwind.css` a `src/theme/shadcn.css`, el test lo exige);
  sección *Installing a component from the registry* apuntando a DESIGN.md; nota de que los
  imports internos usan `@/` y `tsc-alias` los resuelve.
- No hay `MIGRATION-0.4.md`: 0.4.0 es aditiva (exports nuevos, ninguna ruptura).

### 6. Registro del plan

Copiar este plan a `docs/superpowers/plans/2026-09-09-ui-core-on-shadcn.md` (Prettier lo ignora)
y commitearlo con la tarea 1.

### 7. Verificación end-to-end

1. `pnpm verify` completo (format, lint + typecheck, unit, build, catálogo, test de paquete).
2. `grep -r '"@/' dist/` no devuelve nada; `dist/components/sidebar.js` importa `./button.js`.
3. Flujo del CLI, sin residuo: `pnpm dlx shadcn@latest add kbd` escribe `src/components/kbd.tsx`
   con imports `@/…` y `cn` desde `"cn"`, y `git status` no muestra otro cambio (en particular,
   `styles.css` intacto). Luego `git clean -f src/components/kbd.tsx`. Si el CLI pide o inyecta
   algo en `styles.css`, anotarlo en el reporte final.
4. `pnpm catalog` y revisar el Specimen de Sidebar en claro y oscuro (visual, en el navegador).
5. Commits por tarea, mensajes en el estilo del repo (`feat:`, `test:`, `docs:`, `build:`).

## Archivos críticos

- `src/theme/styles.css`, nuevo `src/theme/shadcn.css`, `.prettierignore`
- `package.json`, `tsconfig.json`, `tsconfig.build.json`, `vitest.config.ts`, nuevo `components.json`
- `src/index.ts`, `src/components/sidebar.tsx` (solo lectura), `src/hooks/use-mobile.tsx` (solo lectura)
- `tests/setup.ts`, nuevo `tests/theme/shadcn.test.ts`, nuevo `tests/components/sidebar.test.tsx`,
  `tests/package/consumer.test.ts`
- `examples/catalog/src/sections/Components.tsx`
- `README.md`, `docs/DESIGN.md`, `docs/CONTRIBUTING.md`, `docs/components/README.md`

Reutilizar: la lógica de `git ls-files` de `git show 6f3862a^:tests/theme/imports.test.ts`; el
patrón de `run()` y las aserciones de CSS de `tests/package/consumer.test.ts`; `Section`/`Specimen`
de `examples/catalog/src/App.tsx`; el estilo de los stubs de `tests/setup.ts`.
