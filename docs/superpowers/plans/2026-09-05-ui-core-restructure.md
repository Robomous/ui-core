# Rediseño estructural de `@robomous/ui-core` 0.2.0 — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retirar el aparato de fidelidad con shadcn, dejar los componentes en propiedad plena, y reestructurar el paquete alrededor de lo que es en vez de su origen.

**Architecture:** Cuatro fases. Primero se borra lo muerto (snapshots, scripts, gate de canonicidad). Luego cada uno de los cuatro helpers de `src/lib/` se disuelve dentro de su componente por TDD, lo que vacía la carpeta. Después se poda `gates/` a sus ocho supervivientes, se reordenan las carpetas y los gates pasan a TypeScript bajo un solo runner. Al final, documentación, publicación y los dos PR de consumidores.

**Tech Stack:** React 19, TypeScript, Tailwind v4, Radix + Base UI, vitest + Testing Library, pnpm 11, Node por `.nvmrc`.

**Spec:** `docs/superpowers/specs/2026-09-05-ui-core-restructure-design.md`

## Global Constraints

- **Versión objetivo:** `0.2.0`. No `1.0.0`.
- **Estilo de mensajes de commit:** el del repositorio — modo imperativo, mayúscula inicial, sin prefijos tipo `feat:`/`chore:`. Ejemplos reales: *"Bump GitHub Actions off the deprecated Node 20 runtime"*, *"Paint menu, select and combobox surfaces on the page's own palette"*.
- **Idioma del código y la documentación pública:** inglés. `README.md`, `DESIGN.md`, comentarios y mensajes de commit en inglés. Solo el spec y este plan están en español.
- **Terminología prohibida** en código, comentarios y documentación a partir de la Tarea 10: "canonical", "snapshot", "primitive" (como capa), "Nova", "shadcn foundation", "SHADCN DEVIATION", y toda referencia al preset por su código (`b2iH`).
- **El especificador público de la hoja de estilos no cambia:** los consumidores siguen escribiendo `@import "@robomous/ui-core/styles.css"`. Solo cambia su ruta interna.
- **`components.json` no se modifica** salvo el alias `ui` en la Tarea 8.
- **Verificación por tarea:** `pnpm lint && pnpm build && pnpm test` en verde antes de cada commit. Hasta la Tarea 9 hay además `pnpm test:gates`.
- Los tests corren con `globals: false`: cada archivo de test importa explícitamente `describe`, `it`/`test` y `expect`.

---

## Mapa de archivos

| Archivo | Responsabilidad tras el cambio |
| --- | --- |
| `src/index.ts` | Superficie pública, listada explícitamente |
| `src/components/*.tsx` | 21 componentes de dueño pleno (antes `src/primitives/`) |
| `src/theme/styles.css` | El contrato Tailwind: `@theme`, `:root`, `.dark` |
| `src/theme/tokens.ts` | Espejo de la hoja para quien no puede leer CSS |
| `src/theme/statusTone.ts` | Vocabulario de status fuera del Badge |
| `src/gates/index.ts` | Ocho helpers de escaneo, en TypeScript |
| `src/gates/design.test.ts` | Reglas de diseño sobre el árbol propio |
| `src/gates/tokens.test.ts` | Un solo hogar para los tokens; `components.json` acotado |
| *(borrados)* | `shadcn/`, `scripts/`, `gates/` (raíz), `src/lib/` |

---

## Task 1: Retirar el aparato de fidelidad

Borra los snapshots, los scripts que los alimentaban, el gate de canonicidad y los tests que anclaban la API de un componente a la de upstream. También saca el CLI de shadcn de las dependencias de runtime.

**Files:**
- Delete: `shadcn/` (21 `.tsx` + `README.md`), `scripts/shadcn_add.sh`, `scripts/shadcn_relativize.mjs`, `gates/canonical.test.mjs`
- Modify: `gates/index.mjs`, `gates/index.d.mts`, `gates/extensions.test.mjs`, `package.json`

**Interfaces:**
- Consumes: nada.
- Produces: `gates/index.mjs` sin los símbolos de fidelidad. Las tareas 5 y 7 siguen podando el mismo archivo.

- [ ] **Step 1: Verificar el punto de partida**

```bash
pnpm install
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

Esperado: todo en verde. Si algo falla aquí, detenerse y reportar — el plan asume `main` limpio.

- [ ] **Step 2: Borrar snapshots, scripts y el gate de canonicidad**

```bash
git rm -r shadcn scripts gates/canonical.test.mjs
```

- [ ] **Step 3: Quitar de `gates/index.mjs` los símbolos de canonicidad**

Borrar estas seis definiciones exportadas y sus bloques de comentario:
`additiveOnly`, `FRAMEWORK_ADAPTERS`, `ADAPTER_REMOVED_LINES`, `withoutLines`, `checkAdapter`, `snapshotsDir`.

`snapshotsDir` es la única que usa `PKG` para apuntar a `shadcn/`; `foundationTokenNames` sigue usando `PKG` y **no se toca en esta tarea**. Si tras borrar `snapshotsDir` el import de `path` o `readFileSync` queda sin uso, el lint lo señalará: quitarlo.

- [ ] **Step 4: Quitar de `gates/index.mjs` los símbolos que anclan APIs a upstream**

Borrar: `variantKeys`, `variantClasses`, `OFFICIAL_BADGE`, `BUTTON_VARIANTS`, `BUTTON_SIZES`.

Dejar `FOUNDATION_BADGE` por ahora — la Tarea 7 decide su destino final.

- [ ] **Step 5: Borrar de `gates/extensions.test.mjs` los tests de fidelidad**

Borrar exactamente estos tres, por su nombre:
- `variantKeys reads quoted and bare keys and ignores class text`
- `Button carries shadcn's variants and sizes, and nothing else`
- `index.ts exports every canonical primitive, drops the retired pattern Combobox, and adds no *Variants beyond shadcn's own three`

Y reescribir este, que mezcla una regla propia con una de fidelidad:
- `Badge keeps shadcn's variants and adds exactly the four foundation status variants`

Sustituirlo por una aserción que solo afirme lo propio — que el vocabulario de status es exactamente esos cuatro nombres:

```js
test("Badge's status vocabulary is exactly the four owned names", () => {
  const source = read("src/primitives/badge.tsx");
  for (const name of FOUNDATION_BADGE) {
    assert.ok(source.includes(`${name}:`), `badge.tsx is missing the ${name} variant`);
  }
});
```

`read(rel)` ya existe en la cabecera del archivo; no redefinirlo. Ajustar también el bloque de import desde `./index.mjs`, quitando los símbolos borrados en los pasos 3 y 4.

Conservar intactos los demás tests del archivo.

- [ ] **Step 6: Actualizar `gates/index.d.mts`**

Borrar las declaraciones de los once símbolos eliminados en los pasos 3 y 4.

- [ ] **Step 7: Limpiar `package.json`**

Tres cambios:
1. En `dependencies`, borrar `"shadcn": "^4.19.0"`. Es el CLI; no se importa desde `src/` y hoy entra al árbol de producción de cada consumidor. Se obtiene bajo demanda con `pnpm dlx`, así que tampoco va a `devDependencies`.
2. En `scripts`, borrar `"shadcn:add": "bash scripts/shadcn_add.sh"`.
3. En `files`, borrar `"shadcn"`. El array queda `["dist", "src", "gates", "components.json"]`.

- [ ] **Step 8: Reinstalar y verificar**

```bash
pnpm install
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

Esperado: verde. `pnpm test:gates` ya no encuentra `canonical.test.mjs` y corre solo `extensions` y `tokens`.

- [ ] **Step 9: Confirmar que el CLI sigue funcionando sin el paquete instalado**

```bash
pnpm dlx shadcn@latest add --help
```

Esperado: el CLI responde. Esto valida que quitarlo de `dependencies` no rompe el flujo de instalación de componentes.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Retire the upstream-fidelity apparatus

The snapshots under shadcn/ duplicated src/primitives/ almost byte for
byte: 19 of 21 components differed by a single import line. What they
guarded was a fidelity this package no longer wants, since the
components are going to be restyled.

Also drops the shadcn CLI from dependencies, where it was never
imported and reached every consumer's production tree."
```

---

## Task 2: `Progress` reporta su valor sin ayuda del llamador

`src/primitives/progress.tsx` desestructura `value` fuera de `props` para calcular el `translateX` y nunca se lo pasa a `ProgressPrimitive.Root`, que es quien deriva `aria-valuenow`. `progressAria` obligaba a cada llamador a repetir el valor, y ningún gate detectaba a quien lo olvidara.

**Files:**
- Modify: `src/primitives/progress.tsx:6-19`, `src/primitives/primitives.test.tsx:325-334`, `src/index.ts:25`
- Delete: `src/lib/progress.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `<Progress value={n} />` emite `aria-valuenow`. `progressAria` deja de existir.

- [ ] **Step 1: Escribir el test que falla**

En `src/primitives/primitives.test.tsx`, reemplazar el test `reports its value to assistive technology, not only as a width` por:

```tsx
it("reports its value to assistive technology without help from the caller", () => {
  render(<Progress value={42} aria-label="Ingest" />);
  const bar = screen.getByRole("progressbar", { name: "Ingest" });
  expect(bar.getAttribute("aria-valuenow")).toBe("42");
  expect(bar.getAttribute("data-state")).not.toBe("indeterminate");
});
```

Y quitar `import { progressAria } from "../lib/progress";` de la cabecera del archivo.

- [ ] **Step 2: Correr el test para verificar que falla**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "without help from the caller"
```

Esperado: FALLA. `aria-valuenow` es `null` porque `Root` nunca recibe `value`.

- [ ] **Step 3: Pasarle `value` a `Root`**

En `src/primitives/progress.tsx`, añadir `value={value}` al `ProgressPrimitive.Root`:

```tsx
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
```

`value` sigue desestructurado porque el `translateX` del indicador lo necesita; lo que cambia es que ya no se retiene.

- [ ] **Step 4: Correr el test para verificar que pasa**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "without help from the caller"
```

Esperado: PASA.

- [ ] **Step 5: Eliminar el helper**

```bash
git rm src/lib/progress.ts
```

Y borrar de `src/index.ts` la línea 25:

```ts
export { progressAria } from "./lib/progress.js";
```

- [ ] **Step 6: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Let Progress report its own value

Progress read value only to size the indicator and never forwarded it
to Radix's Root, which is what derives aria-valuenow. progressAria made
every caller repeat the number, and nothing caught the ones that
forgot — opt-in accessibility."
```

---

## Task 3: `Button` gana `size="inline"`

`inlineLink` (`"h-auto p-0"`) existía porque no se podía añadir un tamaño al componente. Ahora sí.

**Files:**
- Modify: `src/primitives/button.tsx:23-35`, `src/primitives/primitives.test.tsx`, `src/index.ts:21`
- Delete: `src/lib/button.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `<Button variant="link" size="inline">`. `inlineLink` deja de existir.

- [ ] **Step 1: Escribir el test que falla**

Añadir al `describe("Button")` de `src/primitives/primitives.test.tsx`:

```tsx
it("has an inline size that keeps a link button inside a sentence", () => {
  render(<Button variant="link" size="inline">Read the docs</Button>);
  const button = screen.getByRole("button", { name: "Read the docs" });
  expect(button.getAttribute("data-size")).toBe("inline");
  expect(button.className).toContain("h-auto");
  expect(button.className).toContain("p-0");
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "inline size"
```

Esperado: FALLA. TypeScript rechaza `size="inline"` y las clases no aparecen.

- [ ] **Step 3: Añadir la variante de tamaño**

En `src/primitives/button.tsx`, dentro del bloque `size` de `buttonVariants` (tras `"icon-lg"`, línea 34), añadir:

```ts
        inline: "h-auto p-0",
```

El comentario que justifica la variante va sobre la línea:

```ts
        // A link button is inline prose, not a boxed control: no height of its
        // own and no padding, so it sits inside a sentence or a table cell.
        inline: "h-auto p-0",
```

- [ ] **Step 4: Correr el test para verificar que pasa**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "inline size"
```

Esperado: PASA.

- [ ] **Step 5: Migrar el test existente que usaba el helper**

`src/primitives/primitives.test.tsx:100` renderiza hoy `<Button variant="link" className={inlineLink}>`. Cambiarlo a la API nueva:

```tsx
      <Button variant="link" size="inline">
```

Borrar además el import de la línea 25 (`import { inlineLink } from "../lib/button";`) y quitar la mención a `inlineLink` en el comentario de cabecera del archivo (línea 7).

- [ ] **Step 6: Eliminar el helper**

```bash
git rm src/lib/button.ts
```

Y borrar de `src/index.ts` la línea 21:

```ts
export { inlineLink } from "./lib/button.js";
```

- [ ] **Step 7: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Give Button an inline size

inlineLink was a class string a caller had to remember because the
component could not carry the size itself. It can now."
```

---

## Task 4: `SelectTrigger` gana la prop `multiline`

`twoLineTrigger` calificaba sobre `data-[size=default]` porque llegaba desde fuera y tenía que ganarle a la clase base. Como prop no necesita calificar nada.

**Files:**
- Modify: `src/primitives/select.tsx:34-58`, `src/primitives/primitives.test.tsx`, `src/index.ts:24`
- Delete: `src/lib/select.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `<SelectTrigger multiline>`. `twoLineTrigger` deja de existir.

- [ ] **Step 1: Escribir el test que falla**

Añadir al `describe("Select")` de `src/primitives/primitives.test.tsx`:

```tsx
it("grows and stops clamping its value when multiline", () => {
  render(
    <Select>
      <SelectTrigger multiline aria-label="Export target">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
    </Select>,
  );
  const trigger = screen.getByRole("combobox", { name: "Export target" });
  expect(trigger.className).toContain("data-[size=default]:h-auto");
  expect(trigger.className).not.toContain("data-[size=default]:h-8");
  expect(trigger.className).toContain("line-clamp-none");
  expect(trigger.className).not.toContain("line-clamp-1");
});
```

Las dos aserciones negativas son el punto del test. `cn` (tailwind-merge)
reemplaza una utilidad por otra **solo cuando comparten grupo y
modificadores**. Un `h-auto` pelado no desplazaría a
`data-[size=default]:h-8`: quedarían las dos en la lista y ganaría la del
selector de atributo, más específico. Por eso las clases de `multiline`
conservan el modificador.

Verificar que `Select`, `SelectTrigger` y `SelectValue` estén en los imports del archivo; si falta alguno, añadirlo.

- [ ] **Step 2: Correr el test para verificar que falla**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "multiline"
```

Esperado: FALLA. TypeScript rechaza la prop.

- [ ] **Step 3: Añadir la prop**

En `src/primitives/select.tsx`, reemplazar la firma y el `className` de `SelectTrigger`:

```tsx
function SelectTrigger({
  className,
  size = "default",
  multiline = false,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  /** Let the closed trigger grow to its value instead of clamping it to one line. */
  multiline?: boolean
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        multiline &&
          "data-[size=default]:h-auto min-h-8 *:data-[slot=select-value]:line-clamp-none",
        className
      )}
      {...props}
    >
```

Las clases conservan los modificadores de la cadena base (`data-[size=default]:`, `*:data-[slot=select-value]:`) porque tailwind-merge reemplaza dentro de un grupo **solo si los modificadores coinciden**. Con `h-auto` pelado, `data-[size=default]:h-8` sobreviviría y ganaría por especificidad. `min-h-8` conserva el piso de altura.

- [ ] **Step 4: Correr el test para verificar que pasa**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "multiline"
```

Esperado: PASA.

- [ ] **Step 5: Migrar el test existente que usaba el helper**

`src/primitives/primitives.test.tsx:175` renderiza hoy `<SelectTrigger data-testid="model" className={twoLineTrigger}>`. Cambiarlo a:

```tsx
        <SelectTrigger data-testid="model" multiline>
```

Borrar el import de la línea 28 (`import { twoLineTrigger } from "../lib/select";`) y reescribir el comentario de la línea 211, que explica que el helper nombraba las cadenas de modificadores de upstream para que `cn` las reemplazara. Como prop ya no compite con nada; el comentario debe decir eso o desaparecer.

- [ ] **Step 6: Eliminar el helper**

```bash
git rm src/lib/select.ts
```

Y borrar de `src/index.ts` la línea 24:

```ts
export { twoLineTrigger } from "./lib/select.js";
```

- [ ] **Step 7: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Give SelectTrigger a multiline prop

twoLineTrigger had to qualify on data-[size=default] because it arrived
from outside and had to outrank the base class. As a prop it qualifies
on nothing."
```

---

## Task 5: `DropdownMenuContent` trae su superficie por default

`menuSurface` corregía dos cosas desde fuera en cada call site: que el menú siguiera montado durante su animación de salida (tragándose la pulsación que debía abrir el siguiente), y que se anclara al ancho del disparador. Ambas son mejores defaults.

**Files:**
- Modify: `src/primitives/dropdown-menu.tsx:32-48`, `src/primitives/primitives.test.tsx`, `src/index.ts:23`, `gates/index.mjs`, `gates/index.d.mts`, `gates/extensions.test.mjs`
- Delete: `src/lib/menu.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `DropdownMenuContent` sin prop nueva. `menuSurface` y `menuSurfaceGapsIn` dejan de existir.

- [ ] **Step 1: Escribir el test que falla**

Añadir al `describe("DropdownMenu")` de `src/primitives/primitives.test.tsx`:

```tsx
it("sizes to its items and leaves on the frame it is dismissed", async () => {
  const user = userEvent.setup();
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Duplicate this model</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  await user.click(screen.getByRole("button", { name: "Actions" }));
  const menu = await screen.findByRole("menu");
  expect(menu.className).toContain("w-auto");
  expect(menu.className).not.toContain("--radix-dropdown-menu-trigger-width");
  expect(menu.className).not.toContain("data-closed:animate-out");
});
```

Verificar que `userEvent` y los cuatro componentes de menú estén importados en el archivo; si falta alguno, añadirlo.

- [ ] **Step 2: Correr el test para verificar que falla**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "sizes to its items"
```

Esperado: FALLA. La clase base ancla al ancho del disparador y anima al cerrarse.

- [ ] **Step 3: Hornear la superficie en la clase base**

En `src/primitives/dropdown-menu.tsx`, dentro del `cn(...)` de `DropdownMenuContent`, hacer dos cambios sobre la cadena base:

1. Reemplazar `w-(--radix-dropdown-menu-trigger-width) min-w-32` por `w-auto min-w-32`.
2. Borrar `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95`.

Se borran en vez de neutralizarse con `animate-none!` porque el componente es propio: quitar la utilidad es más claro que sobrescribirla. `data-[state=closed]:overflow-hidden` y las tres utilidades `data-open:*` permanecen.

Añadir sobre la función el comentario que preserva el porqué:

```tsx
// A menu sizes to its items, not to its trigger — behind an icon-sized button
// the trigger width is a 128px ceiling that wraps every longer item; min-w-32
// survives as the floor it was meant to be. And it leaves on the frame it is
// dismissed: while an exit animation runs, the dismissable layer stays mounted
// and swallows the press that should open the next menu.
```

- [ ] **Step 4: Correr el test para verificar que pasa**

```bash
pnpm vitest run src/primitives/primitives.test.tsx -t "sizes to its items"
```

Esperado: PASA.

- [ ] **Step 5: Migrar el test existente que usaba el helper**

`src/primitives/primitives.test.tsx:421` renderiza hoy `<DropdownMenuContent className={menuSurface}>`. Quitar la prop entera:

```tsx
        <DropdownMenuContent>
```

Borrar el import de la línea 26 (`import { menuSurface } from "../lib/menu";`), la mención en el comentario de cabecera (línea 7) y reescribir el de la línea 430, que explica el piso de 128px — el hecho sigue siendo cierto, pero ya no lo corrige un helper desde fuera.

Tras este paso, `src/primitives/primitives.test.tsx` no debe importar nada de `../lib/`. Confirmar:

```bash
grep -n "\.\./lib/" src/primitives/primitives.test.tsx
```

Esperado: sin resultados.

- [ ] **Step 6: Eliminar el helper y su gate**

```bash
git rm src/lib/menu.ts
```

Borrar de `src/index.ts` la línea 23:

```ts
export { menuSurface } from "./lib/menu.js";
```

Borrar de `gates/index.mjs` la función `menuSurfaceGapsIn` y su bloque de comentario, y su declaración en `gates/index.d.mts`.

Borrar de `gates/extensions.test.mjs` estos dos tests por su nombre:
- `menuSurfaceGapsIn flags a DropdownMenuContent missing menuSurface, and stays silent when it carries it`
- `every DropdownMenuContent call site outside the shadcn snapshot carries menuSurface`

El gate existía para vigilar que ningún call site olvidara el helper. Con el default horneado no hay nada que olvidar.

- [ ] **Step 7: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Bake the menu surface into DropdownMenuContent

menuSurface fixed two things from the outside at every call site, and a
gate existed to catch the sites that forgot it. Both are defaults now,
so there is nothing left to forget."
```

---

## Task 6: Migrar `cn` al paquete publicado

`src/lib/cn.ts` reimplementa lo que `cn` (shadcn-ui/cn v0.2.5) publica compilado. Migrar elimina `clsx` y `tailwind-merge`, y vacía `src/lib/`.

**Files:**
- Delete: `src/lib/cn.ts`, `src/lib/cn.test.ts`, y con ellos el directorio `src/lib/`
- Modify: `src/index.ts:22`, los 21 archivos de `src/primitives/`, `package.json`

**Interfaces:**
- Consumes: las tareas 2–5 ya vaciaron el resto de `src/lib/`.
- Produces: `cn` reexportado desde el paquete. Nombre y firma sin cambios para el consumidor.

- [ ] **Step 1: Confirmar que `src/lib/` solo conserva `cn`**

```bash
ls src/lib
```

Esperado: exactamente `cn.ts` y `cn.test.ts`. Si aparece otro archivo, alguna de las tareas 2–5 quedó incompleta: detenerse.

- [ ] **Step 2: Correr la migración oficial**

```bash
pnpm dlx shadcn@latest migrate cn
```

- [ ] **Step 3: Revisar la salida antes de aceptarla**

```bash
git diff --stat
git diff package.json components.json
```

Revisar a mano, sin aceptar a ciegas. Lo esperado: los imports de los 21 componentes pasan de `../lib/cn.js` al paquete, y `package.json` gana `cn`. Si la herramienta toca `components.json` —hoy su alias `utils` apunta a `@/lib/cn`— verificar que el archivo resultante sigue siendo válido para el CLI; el gate `components.json holds the schema-supported preset fields, and no others` lo comprueba en el paso 6.

Si la migración no corre o deja el árbol a medias, hacerlo a mano: `pnpm add cn`, y en los 21 componentes reemplazar `import { cn } from "../lib/cn.js"` por `import { cn } from "cn"`.

- [ ] **Step 4: Borrar el módulo local y reexportar desde el paquete**

```bash
git rm src/lib/cn.ts src/lib/cn.test.ts
```

En `src/index.ts`, reemplazar la línea 22:

```ts
export { cn } from "cn";
```

- [ ] **Step 5: Quitar las dependencias que sustituye**

En `package.json`, borrar de `dependencies`:

```json
"clsx": "^2.1.1",
"tailwind-merge": "^3.6.0",
```

Después:

```bash
pnpm install
```

- [ ] **Step 6: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

Esperado: verde. Los tests de componentes son la red de seguridad: cualquier regresión en la resolución de clases aparece ahí. `src/lib/` ya no existe.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Move cn to the published package

The local module reimplemented what shadcn-ui/cn ships compiled. The
name and signature a consumer sees are unchanged; clsx and
tailwind-merge leave dependencies, and src/lib is now empty."
```

---

## Task 7: Podar los gates a sus ocho supervivientes

Quedan por retirar los gates de la época de la migración desde la v1 — vocabulario que ya no existe en ninguno de los tres repositorios.

**Files:**
- Modify: `gates/index.mjs`, `gates/index.d.mts`, `gates/extensions.test.mjs`, `gates/tokens.test.mjs`

**Interfaces:**
- Consumes: la Tarea 5 ya retiró `menuSurfaceGapsIn`.
- Produces: la superficie pública final de `/gates` — ocho funciones. La Tarea 9 la traduce a TypeScript sin cambiarla.

- [ ] **Step 1: Borrar los helpers de época-migración**

De `gates/index.mjs`, borrar con sus bloques de comentario: `legacyVocabularyIn`, `statusTokenUtilitiesIn`, `retiredDeclarationsIn`.

- [ ] **Step 2: Borrar `openTagsIn` y `SEMANTIC_NAMES`**

`openTagsIn` solo lo usaban `legacyVocabularyIn` y `menuSurfaceGapsIn`, ambos ya borrados. `SEMANTIC_NAMES` no lo usa nada dentro del módulo ni ningún consumidor. Confirmar antes de borrar:

```bash
grep -n "openTagsIn\|SEMANTIC_NAMES" gates/*.mjs gates/*.d.mts
```

Esperado: solo sus propias definiciones. Si aparece otro uso, resolverlo antes de borrar.

- [ ] **Step 3: Volver internos `normalize` y `FOUNDATION_BADGE`**

Quitarles la palabra `export` en `gates/index.mjs` y borrar sus declaraciones de `gates/index.d.mts`. Siguen usándose dentro del módulo y del test de Badge, pero ningún consumidor los importa.

- [ ] **Step 4: Borrar los tests correspondientes**

De `gates/extensions.test.mjs`:
- `legacyVocabularyIn flags v1's shapes and stays silent on the shadcn contract`
- `no package source reaches for a name the extension contract retired`
- `statusTokenUtilitiesIn finds the retired success/warning utility, and not the emerald/amber tokens that replaced it`
- `no package source reaches for the retired success/warning token utility`

De `gates/tokens.test.mjs`:
- `the scan finds a retired declaration, and not a comment or a longer name that merely contains it`
- `the retired foundation vocabulary is absent from the stylesheet`

- [ ] **Step 5: Verificar la superficie final**

```bash
grep -c "^export" gates/index.mjs
grep "^export" gates/index.mjs
```

Esperado: exactamente **8** — `colouredClassesIn`, `brandUsagesIn`, `statusPaletteIn`, `competingStatusPaletteIn`, `blockBody`, `rawDeclarations`, `declarations`, `foundationTokenNames`. Si el número no es 8, revisar contra esta lista antes de continuar.

- [ ] **Step 6: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Prune the gates to the rules this package still owns

What is left scans for design rules: no colour inside a class string,
brand as identity only, one home for the tokens, one status palette,
one icon set. The rest guarded a v1 vocabulary that no repository
still speaks."
```

---

## Task 8: Reestructurar `src/`

`primitives/` cargaba la idea de una capa intocable bajo otra capa, que es la premisa retirada. `theme/` junta la hoja de estilos con su espejo y con el vocabulario de status.

**Files:**
- Rename: `src/primitives/` → `src/components/`; `src/styles.css`, `src/tokens.ts`, `src/tokens.test.ts`, `src/statusTone.ts`, `src/statusTone.test.ts` → `src/theme/`; `src/primitives/primitives.test.tsx` → `src/components/components.test.tsx`
- Modify: `src/index.ts`, los 21 componentes, `package.json`, `components.json`, `gates/index.mjs`, `gates/extensions.test.mjs`, `gates/tokens.test.mjs`

**Interfaces:**
- Consumes: la superficie de la Tarea 7.
- Produces: el árbol final de `src/`. La Tarea 9 mueve `gates/` dentro de él.

- [ ] **Step 1: Mover los archivos con `git mv`**

```bash
git mv src/primitives src/components
git mv src/components/primitives.test.tsx src/components/components.test.tsx
mkdir src/theme
git mv src/styles.css src/theme/styles.css
git mv src/tokens.ts src/theme/tokens.ts
git mv src/tokens.test.ts src/theme/tokens.test.ts
git mv src/statusTone.ts src/theme/statusTone.ts
git mv src/statusTone.test.ts src/theme/statusTone.test.ts
```

`git mv` preserva el historial; no borrar y recrear.

- [ ] **Step 2: Corregir las rutas en `src/index.ts`**

Reemplazar `./primitives/` por `./components/` en las 21 líneas de export, y repuntar las tres primeras:

```ts
export { cssVar, DARK_THEME, LIGHT_THEME, THEME } from "./theme/tokens.js";
export { STATUS_INK, TONE_BORDER, TONE_FILL, type StatusTone } from "./theme/statusTone.js";
```

- [ ] **Step 3: Corregir las rutas dentro de `src/`**

```bash
grep -rn "\.\./tokens\|\.\./statusTone\|\./tokens\|\./statusTone\|primitives/" src/
```

Ajustar cada resultado. Los componentes que importan `statusTone` pasan a `../theme/statusTone.js`; los tests dentro de `src/theme/` pasan a rutas hermanas.

- [ ] **Step 4: Repuntar `package.json`**

En `exports`, la hoja de estilos cambia de ruta interna **conservando el especificador público**:

```json
"./styles.css": "./src/theme/styles.css",
```

Un error aquí rompe el `@import` de los dos consumidores. Verificar que `"src"` sigue en `files`.

- [ ] **Step 5: Repuntar `components.json`**

El alias `ui` apunta a `@/primitives`. Sin este cambio, el próximo `shadcn add` escribiría en la carpeta vieja:

```json
"aliases": { "components": "@/components", "utils": "@/lib/cn", "ui": "@/components", "lib": "@/lib", "hooks": "@/hooks" },
```

Dejar `utils` como lo haya dejado la Tarea 6.

- [ ] **Step 6: Repuntar las rutas que los gates escanean**

```bash
grep -rn "src/styles.css\|src/primitives\|src/tokens" gates/
```

En `gates/index.mjs`, `foundationTokenNames()` lee `path.join(PKG, "src/styles.css")` → pasa a `"src/theme/styles.css"`. En los tests de gates, las rutas de escaneo pasan de `src/primitives` a `src/components`.

- [ ] **Step 7: Verificar**

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:gates
```

Esperado: verde. Revisar además que `dist/` contenga `components/` y `theme/`:

```bash
ls dist dist/components dist/theme
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Restructure src around what the package is

primitives/ carried the idea of an untouchable layer beneath another
layer, which is the premise this release retires. theme/ puts the
stylesheet next to the token mirror and the status vocabulary."
```

---

## Task 9: Los gates pasan a TypeScript y a un solo runner

Hoy son `.mjs` con declaraciones escritas a mano, y corren en un comando aparte. En TypeScript los tipos los genera `tsc` y vitest los cubre.

**Files:**
- Create: `src/gates/index.ts`, `src/gates/design.test.ts`, `src/gates/tokens.test.ts`
- Delete: `gates/` (raíz), incluido `index.d.mts`
- Modify: `package.json`, `.github/workflows/ci.yml`, `vitest.config.ts`

**Interfaces:**
- Consumes: los ocho helpers de la Tarea 7 y las rutas de la Tarea 8.
- Produces: `@robomous/ui-core/gates` servido desde `dist/gates/index.js`, con las mismas ocho firmas.

- [ ] **Step 1: Escribir el test que protege la trampa de rutas**

Es el riesgo central de la tarea: `foundationTokenNames()` resuelve contra la raíz del paquete, y al compilar a `dist/gates/` esa cuenta cambia. Ambos consumidores la llaman contra el paquete instalado, así que un error aquí rompe fuera de este repositorio.

Crear `src/gates/index.test.ts`:

```ts
// @vitest-environment node
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

test("foundationTokenNames resolves the stylesheet from the built package", () => {
  const script = `import("./dist/gates/index.js").then((m) => { const n = m.foundationTokenNames(); if (!n.includes("background")) { throw new Error("missing token: " + n.join(",")); } console.log("ok"); });`;
  const out = execFileSync(process.execPath, ["--input-type=module", "-e", script], {
    encoding: "utf8",
  });
  expect(out.trim()).toBe("ok");
});
```

Corre el módulo **compilado**, no la fuente: es la única forma de reproducir la resolución que ven los consumidores.

- [ ] **Step 2: Correr el test para verificar que falla**

```bash
pnpm build && pnpm vitest run src/gates/index.test.ts
```

Esperado: FALLA — `dist/gates/index.js` todavía no existe.

- [ ] **Step 3: Trasladar el módulo a TypeScript**

```bash
mkdir src/gates
git mv gates/index.mjs src/gates/index.ts
git mv gates/extensions.test.mjs src/gates/design.test.ts
git mv gates/tokens.test.mjs src/gates/tokens.test.ts
git rm gates/index.d.mts
```

En `src/gates/index.ts`, tipar las ocho firmas públicas copiándolas de `gates/index.d.mts` antes de borrarlo. Las siete de escaneo comparten forma:

```ts
export function colouredClassesIn(file: string, text: string): string[]
export function statusPaletteIn(file: string, text: string): string[]
export function competingStatusPaletteIn(file: string, text: string): string[]
export function brandUsagesIn(file: string, text: string): { file: string; at: number; text: string }[]
export function blockBody(css: string, header: string): string
export function rawDeclarations(block: string): Map<string, string>
export function declarations(block: string): Map<string, string>
export function foundationTokenNames(): string[]
```

- [ ] **Step 4: Corregir la resolución de `PKG`**

En `src/gates/index.ts`, `PKG` se calcula hoy como `dirname(import.meta.url)/..`, que era la raíz cuando el archivo vivía en `gates/`. Compilado queda en `dist/gates/`, así que la raíz está **dos** niveles arriba:

```ts
const PKG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
```

Y la hoja se lee de `src/theme/styles.css` (Tarea 8). El test del paso 1 es lo que confirma que la cuenta quedó bien.

- [ ] **Step 5: Convertir los dos archivos de test a vitest**

Ambos usan `node:test` y `node:assert/strict`. Cambiar la cabecera de cada uno:

```ts
// @vitest-environment node
import { expect, test } from "vitest";
```

Y traducir las aserciones: `assert.equal(a, b)` → `expect(a).toBe(b)`; `assert.deepEqual(a, b)` → `expect(a).toEqual(b)`; `assert.ok(x, msg)` → `expect(x, msg).toBeTruthy()`. Las rutas relativas a `./index.mjs` pasan a `./index.js`.

- [ ] **Step 6: Repuntar `package.json`**

En `exports`:

```json
"./gates": { "types": "./dist/gates/index.d.ts", "import": "./dist/gates/index.js" },
```

En `files`, borrar `"gates"`: ahora viaja dentro de `dist`. El array queda `["dist", "src", "components.json"]`.

En `scripts`, borrar `"test:gates": "node --test gates/*.test.mjs"`.

- [ ] **Step 7: Quitar el paso de CI**

En `.github/workflows/ci.yml`, borrar la última línea:

```yaml
      - run: pnpm test:gates
```

- [ ] **Step 8: Correr todo y verificar que pasa**

```bash
pnpm lint && pnpm build && pnpm test
```

Esperado: verde, incluido el test del paso 1. Ya no existe `pnpm test:gates`.

- [ ] **Step 9: Verificar la superficie compilada**

```bash
ls dist/gates
node -e "import('./dist/gates/index.js').then(m => console.log(Object.keys(m).sort().join('\n')))"
```

Esperado: `index.js` y `index.d.ts` presentes, y exactamente los ocho nombres.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Compile the gates with the rest of the package

They were .mjs with hand-written declarations and a test command of
their own. tsc now emits the types and vitest covers them, so
test:gates and its CI step are gone."
```

---

## Task 10: Documentación

`DESIGN.md` está construido sobre "qué no podemos tocar de upstream". El eje nuevo son las reglas propias. Se purga además el texto heredado de VisionSet.

**Files:**
- Modify: `DESIGN.md`, `README.md`, `vitest.config.ts:1-12`, `src/components/sonner.tsx`, `src/index.ts:1-16`

**Interfaces:**
- Consumes: el estado final de las tareas 1–9.
- Produces: documentación que describe el paquete tal como quedó.

- [ ] **Step 1: Reescribir `DESIGN.md`**

Estructura nueva, reemplazando las secciones *Source of Truth*, *shadcn Foundation* y *Primitive Governance*:

1. **Purpose and Ownership** — el paquete es dueño de sus componentes; los consumidores son dueños de sus extensiones. El contrato de extensiones por consumidor **se conserva**: es lo que gobierna a VisionSet y a robomous-cloud.
2. **The rules, and the gate that holds each** — las siete reglas supervivientes, cada una con su gate nombrado. Una regla que nada verifica es una preferencia.
3. **Tokens** — un solo hogar, la hoja de estilos; `theme/tokens.ts` la espeja para quien no puede leer CSS.
4. **Status vocabulary** — los cuatro nombres, y por qué viven solo en `Badge` y `statusTone`.
5. **Installing a component** — `pnpm dlx shadcn@latest add <x>` usa `components.json`. Lo que llega es un punto de partida, no un contrato: se edita libremente.
6. **Why the patch layer is gone** — los cuatro helpers eran el mismo síntoma, el costo de no poder editar el componente. Ninguno describía una decisión del llamador. Es la justificación del diseño y conviene que quede escrita.

Aplicar la terminología prohibida de *Global Constraints*.

- [ ] **Step 2: Actualizar `README.md`**

Reescribir la descripción del paquete y la sección *The gates* — hoy promete "canonical-plus-additive primitives", que ya no es cierto. La sección *Install*, *Usage* y *Release* no cambian.

- [ ] **Step 3: Purgar el texto heredado**

- `vitest.config.ts`, cabecera: justifica la configuración hablando de `@visionset/annotator`, "the schema editor", un cliente de TanStack Query, `scripts/check.sh` y el issue `#555`. Nada existe aquí. Reescribirla explicando solo lo que sigue siendo cierto: por qué el pool se limita a un cuarto de los cores.
- `src/components/sonner.tsx`: quitar el marcador `SHADCN FRAMEWORK ADAPTER` y la referencia a `frontend/ui-core/shadcn/sonner.tsx`. **Conservar el hook** — su razón técnica (una sola fuente de tema, `.dark` en `<html>`) sigue vigente. Reescribir el comentario en esos términos.
- `src/index.ts`, cabecera: menciona el estilo de upstream y promete gates "que mantienen canónicos los primitivos".

- [ ] **Step 4: Barrido final de terminología**

```bash
grep -rni "canonical\|snapshot\|nova\|b2iH\|visionset\|primitive" src/ README.md DESIGN.md components.json
```

Revisar cada resultado. Legítimo que sobreviva: la mención a VisionSet como origen histórico en `README.md`. Todo lo demás debe caer.

- [ ] **Step 5: Verificar**

```bash
pnpm lint && pnpm build && pnpm test
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Rewrite the design docs around the rules this package owns

DESIGN.md argued from what upstream would not let us change. It now
argues from the rules we hold ourselves to, and names the gate behind
each one. Also drops the inherited VisionSet narrative that no longer
describes anything here."
```

---

## Task 11: Publicar 0.2.0

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verificación completa antes de publicar**

```bash
pnpm install --frozen-lockfile
pnpm lint && pnpm build && pnpm test
```

- [ ] **Step 2: Revisar qué se va a publicar**

```bash
pnpm pack --dry-run
```

Confirmar: **no** aparece `shadcn/`, **no** aparece `scripts/`, **sí** aparecen `dist/`, `src/theme/styles.css`, `components.json`, y `dist/gates/index.js` con su `.d.ts`.

- [ ] **Step 3: Subir la versión**

En `package.json`: `"version": "0.2.0"`.

- [ ] **Step 4: Commit y etiqueta**

```bash
git add package.json
git commit -m "Release 0.2.0"
git tag v0.2.0
```

- [ ] **Step 5: Empujar — requiere confirmación del usuario**

Publicar es irreversible: una versión en npm no se despublica. **Pedir confirmación explícita antes de correr esto.**

```bash
git push origin main
git push origin v0.2.0
```

- [ ] **Step 6: Verificar la publicación**

```bash
npm view @robomous/ui-core version
```

Esperado: `0.2.0`. CI publica por OIDC y rechaza una etiqueta que no coincida con `package.json`.

---

## Task 12: PR en `Robomous/robomous-cloud`

Repositorio distinto. Clonar aparte; no trabajar dentro de este árbol.

**Files:**
- Modify: `web/package.json`, `web/src/platform/user-menu/UserMenu.tsx`, `web/tests/gates.test.ts`
- Create: un ADR en `docs/src/content/docs/decisions/`

- [ ] **Step 1: Clonar y ramificar**

```bash
gh repo clone Robomous/robomous-cloud
cd robomous-cloud
git checkout -b adopt-ui-core-0.2.0
```

- [ ] **Step 2: Subir la dependencia**

En `web/package.json`: `"@robomous/ui-core": "0.2.0"` (pin exacto; el repositorio ya lo fija así).

- [ ] **Step 3: Quitar `menuSurface`**

En `web/src/platform/user-menu/UserMenu.tsx`, borrar `menuSurface` del import desde `@robomous/ui-core` y su uso en el `className` del `DropdownMenuContent`. El comportamiento es ahora el default. Si el `className` queda vacío, quitar la prop.

- [ ] **Step 4: Quitar los tres gates retirados**

En `web/tests/gates.test.ts`, borrar del import `legacyVocabularyIn`, `menuSurfaceGapsIn` y `statusTokenUtilitiesIn`, y las aserciones que los usan. Los otros siete helpers siguen igual.

- [ ] **Step 5: Escribir el ADR**

Sucede a `adr-0021` (que publicó el sistema en npm) y a `adr-0030` (que fijó `0.1.1` por el arreglo de menu/select). Contenido: el sistema pasa a propiedad plena, los gates de fidelidad se retiran, y `menuSurface` deja de ser algo que un call site deba recordar.

- [ ] **Step 6: Verificar**

```bash
cd web && pnpm install && pnpm lint && pnpm build && pnpm test
```

- [ ] **Step 7: Abrir el PR — requiere confirmación del usuario**

```bash
gh pr create --title "Adopt @robomous/ui-core 0.2.0" --body "$(cat <<'EOF'
## Summary
- Bumps `@robomous/ui-core` to 0.2.0, which retires the upstream-fidelity
  apparatus and takes full ownership of the components.
- Drops `menuSurface` from `UserMenu`: the menu surface is now the
  component's default, so there is nothing left for a call site to remember.
- Drops `legacyVocabularyIn`, `menuSurfaceGapsIn` and
  `statusTokenUtilitiesIn` from the console's gates. The first and third
  guarded a v1 vocabulary no repository still speaks; the second guarded a
  helper that no longer exists. The other seven helpers are unchanged.
- Adds an ADR succeeding adr-0021 and adr-0030.

## Test plan
- [ ] `pnpm lint && pnpm build && pnpm test` in `web/`
- [ ] The user menu opens, sizes to its items, and a second menu opens on
      the first press after dismissing the first
EOF
)"
```

---

## Task 13: PR en `Robomous/VisionSet`

Impacto mecánico pero amplio: ~25 archivos.

**Files:**
- Modify: `package.json`, `frontend/ui-core/package.json`, ~25 archivos de `frontend/`, `tests/scripts/design_system.test.mjs`, `DESIGN.md`

- [ ] **Step 1: Clonar y ramificar**

```bash
gh repo clone Robomous/VisionSet
cd VisionSet
git checkout -b adopt-ui-core-0.2.0
```

- [ ] **Step 2: Subir la dependencia**

`^0.1.0` → `^0.2.0` en `package.json` y en `frontend/ui-core/package.json`.

- [ ] **Step 3: Migrar `progressAria` — 5 archivos**

`JobPanels.tsx`, `BatchLifecycle.tsx`, `IngestScreen.tsx`, `ModelsScreen.tsx`, `frontend/app/src/styleguide/Styleguide.tsx`. Borrar `{...progressAria(x)}` y el símbolo del import. `value` ya basta.

- [ ] **Step 4: Migrar `menuSurface` — 7 archivos**

`AnnotationPage.tsx`, `ReassignMenu.tsx`, `ProjectNav.tsx`, `DeleteBatch.tsx`, `ModelsScreen.tsx`, `Styleguide.tsx`, y la mención en `DESIGN.md`. Borrar el símbolo y su uso; el comportamiento es el default.

- [ ] **Step 5: Migrar `twoLineTrigger` — 6 archivos**

`SuggestPanel.tsx`, `ExportTargetSelect.tsx`, `DatasetScreen.tsx`, `ModelsScreen.tsx`, `PreLabelDialog.tsx`, `Styleguide.tsx`. `className={twoLineTrigger}` → prop `multiline` en el `SelectTrigger`.

- [ ] **Step 6: Migrar `inlineLink` — 12 archivos, uno a uno**

`AnnotationPage.tsx`, `BatchLifecycle.tsx`, `BatchesScreen.tsx`, `CorrectionBatch.tsx`, `OverviewPanel.tsx`, `ProjectPreLabelDialog.tsx`, `ProjectScreen.tsx`, `ProjectsScreen.tsx`, `PromoteButton.tsx`, `SchemaEditor.tsx`, `SchemaForeshadow.tsx`, `Styleguide.tsx`.

**Sin reemplazo automático.** Varios call sites componen `cn(inlineLink, "…")`; la migración a `size="inline"` debe preservar las demás clases. Patrón:

```tsx
// antes
<Button variant="link" className={cn(inlineLink, "text-muted-foreground")}>
// después
<Button variant="link" size="inline" className="text-muted-foreground">
```

- [ ] **Step 7: Quitar los tres gates retirados**

En `tests/scripts/design_system.test.mjs`, borrar `legacyVocabularyIn`, `menuSurfaceGapsIn` y `statusTokenUtilitiesIn` del import y sus aserciones. Quedan `statusPaletteIn` y `competingStatusPaletteIn`.

`frontend/ui-core/src/tokens.test.ts` **no cambia**: sus cuatro helpers sobreviven.

- [ ] **Step 8: Verificar**

```bash
pnpm install && pnpm lint && pnpm build && pnpm test
```

- [ ] **Step 9: Revisar el styleguide en navegador**

Los cuatro cambios tocan geometría. Levantar la app y revisar el styleguide: botones inline dentro de prosa, triggers de select de dos líneas, menús desplegables, y barras de progreso. Es la única verificación que los tests no dan.

- [ ] **Step 10: Abrir el PR — requiere confirmación del usuario**

```bash
gh pr create --title "Adopt @robomous/ui-core 0.2.0" --body "$(cat <<'EOF'
## Summary
- Bumps `@robomous/ui-core` to ^0.2.0, which takes full ownership of the
  components and dissolves the four patch helpers into them.
- `progressAria` is gone: `Progress` now reports its own value, so the
  five call sites that repeated the number no longer have to.
- `menuSurface` is gone: it is the `DropdownMenuContent` default.
- `twoLineTrigger` is gone: `SelectTrigger` takes a `multiline` prop.
- `inlineLink` is gone: `Button` takes `size="inline"`.
- Drops the three retired helpers from the frontend gates.
  `frontend/ui-core/src/tokens.test.ts` is untouched.

## Test plan
- [ ] `pnpm lint && pnpm build && pnpm test`
- [ ] Styleguide reviewed in a browser — all four changes touch geometry:
      inline link buttons in prose, two-line select triggers, dropdown
      menus, and progress bars
EOF
)"
```

---

## Auto-revisión del plan

**Cobertura del spec:**

| Sección del spec | Tarea |
| --- | --- |
| §4.1 Eliminaciones | 1 |
| §3.6 / §4.1 CLI fuera de dependencias | 1 |
| §4.2 Los cuatro helpers | 2, 3, 4, 5 |
| §4.3 Estructura de carpetas | 8 |
| §4.4 Gates a TypeScript, un runner | 7, 9 |
| §4.5 `cn` | 6 |
| §4.6 Documentación y terminología | 10 |
| §5 Superficie pública | 2–7 |
| §6 Migración de consumidores | 12, 13 |
| §7 Pruebas | dentro de cada tarea |
| §8.1 Trampa de rutas | 9, paso 1 |
| §8.2–8.6 Trampas restantes | 1, 8, 6, 10 |
| §9 Versionado | 11 |

**Consistencia de nombres:** `size="inline"` (T3, T13-6), `multiline` (T4, T13-5), `foundationTokenNames` (T7, T8-6, T9-1/4), `PKG` (T1-3, T9-4), `src/theme/styles.css` (T8-4/6, T9-4). Sin discrepancias.

**Sin marcadores de posición:** cada paso de código lleva el código; cada borrado nombra los símbolos y los tests exactos.
