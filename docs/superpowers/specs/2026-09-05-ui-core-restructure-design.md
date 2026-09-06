# Rediseño estructural de `@robomous/ui-core` — 0.2.0

**Fecha:** 2026-09-05
**Estado:** aprobado para plan de implementación
**Alcance:** ruptura coordinada con `Robomous/VisionSet` y `Robomous/robomous-cloud`

> Documento de trabajo, en español. La documentación pública del paquete
> (`README.md`, `DESIGN.md`, comentarios de código) permanece en inglés.

---

## 1. Contexto

El repositorio se construyó sobre una premisa equivocada: que el paquete debía
**custodiar la fidelidad** de los componentes generados por el CLI de shadcn.
De ahí nacieron la carpeta `shadcn/` con 21 snapshots, un gate de canonicidad
que compara cada componente contra su snapshot, y un vocabulario de gobernanza
construido alrededor de "qué no podemos tocar".

Lo que en realidad se necesitaba era mucho más simple: **poder instalar
componentes con la configuración de `components.json`**. Los componentes van a
modificarse estéticamente, así que conservar el original no aporta nada — y el
aparato que lo custodia cuesta caro y estorba.

Este documento define la corrección.

---

## 2. Objetivos y no objetivos

### Objetivos

1. Eliminar el aparato de fidelidad con upstream (snapshots, gate de
   canonicidad, scripts de sincronización).
2. Dejar los componentes en propiedad plena: editables sin ceremonia.
3. Conservar intacta la capacidad de instalar con
   `pnpm dlx shadcn@latest add <x>` usando `components.json`.
4. Migrar `cn` al paquete publicado, eliminando dos dependencias.
5. Reestructurar carpetas alrededor de lo que el paquete *es*, no de su origen.
6. Preservar los gates que expresan **reglas de diseño propias**, y retirar los
   que expresaban fidelidad o pertenecían a la migración.
7. Purgar la terminología de fidelidad y el texto heredado de VisionSet.

### No objetivos

- **No** se restilizan componentes en esta versión. Este cambio *habilita* el
  restyling; no lo ejecuta.
- **No** se altera el contrato de tokens ni la paleta. `styles.css` conserva
  sus valores; solo cambia de ubicación interna.
- **No** se cambia el especificador público de la hoja de estilos. Los
  consumidores siguen escribiendo `@import "@robomous/ui-core/styles.css"`.
- **No** se toca `components.json`.

---

## 3. Evidencia

Auditoría del 2026-09-05 sobre el árbol en `main` (`a1214a1`).

### 3.1 `shadcn/` es duplicación

Normalizando finales de línea CRLF y la relativización de imports que aplica
`scripts/shadcn_relativize.mjs`, **19 de 21 componentes difieren de su snapshot
en una sola línea** (`../lib/cn` frente a `../lib/cn.js`). Las únicas
diferencias reales:

| Componente | Δ | Contenido |
| --- | --- | --- |
| `badge.tsx` | +8 | variantes `success`, `warning`, `info`, `quiet` |
| `sonner.tsx` | +16 | hook `useTheme` que lee `.dark` del `<html>` en vez de `next-themes` |

Son **2,191 líneas de snapshot para custodiar 24 líneas de diferencia real**.

El propio `shadcn/README.md` documenta que el gate es débil: compara como
*subsecuencia ordenada*, de modo que una línea editada cuyo texto original
reaparezca más abajo pasa sin ser reportada.

### 3.2 El aparato de fidelidad es enteramente interno

`gates/index.mjs` exporta 27 símbolos. Los dos consumidores importan **11**.
Los 16 restantes — `additiveOnly`, `checkAdapter`, `withoutLines`,
`snapshotsDir`, `FRAMEWORK_ADAPTERS`, `ADAPTER_REMOVED_LINES`, `variantKeys`,
`variantClasses`, `OFFICIAL_BADGE`, `FOUNDATION_BADGE`, `BUTTON_VARIANTS`,
`BUTTON_SIZES`, `openTagsIn`, `retiredDeclarationsIn`, `normalize`,
`SEMANTIC_NAMES` — no los usa nadie fuera de este repositorio.

**Toda la maquinaria de snapshots se puede borrar sin romper a ningún consumidor.**

### 3.3 Los cuatro helpers de `src/lib/` son el mismo síntoma

Ninguno describe una decisión del llamador. Los cuatro describen la
imposibilidad de editar el componente:

| Helper | Existe porque… |
| --- | --- |
| `menuSurface` | no se podía cambiar las clases base de `DropdownMenuContent` |
| `twoLineTrigger` | no se podía añadir una variante a `SelectTrigger` |
| `inlineLink` | no se podía añadir un `size` a `Button` |
| `progressAria` | no se podía arreglar `Progress` |

El caso de `progressAria` es un defecto de accesibilidad, no un ajuste
estético. En `src/primitives/progress.tsx:6-19`, `value` se desestructura
fuera de `props` para calcular el `translateX` del indicador y **nunca se le
pasa a `ProgressPrimitive.Root`** — que es quien deriva `aria-valuenow`. El
helper hace que cada llamador repita el valor a mano, y **no existe ningún gate
que detecte a quien lo olvide**: es accesibilidad opcional.

### 3.4 Texto heredado ya inválido

- `vitest.config.ts` justifica su configuración hablando de
  `@visionset/annotator`, "the schema editor", un cliente de TanStack Query,
  `scripts/check.sh` y el issue `#555`. Nada de eso existe en este repositorio.
- `src/primitives/sonner.tsx` afirma "VisionSet is Vite" y referencia
  `frontend/ui-core/shadcn/sonner.tsx`.
- `shadcn/README.md` manda regenerar con `pnpm --filter @visionset/ui-core
  shadcn:add` y cita `tests/scripts/shadcn_canonical.test.mjs`, ruta que no
  existe.

### 3.5 El paquete `cn`

`cn` en npm es `shadcn-ui/cn` v0.2.5: *"Fast, small, compiled class-name merging
for Tailwind CSS. Drop-in replacement for clsx + tailwind-merge."* La migración
es viable y permite eliminar `clsx` y `tailwind-merge` de `dependencies`.

### 3.6 El CLI de shadcn es una dependencia de runtime

> **CORREGIDO durante la implementación — este hallazgo era falso.**
> Ver §3.6-bis. Se conserva el texto original porque el plan y varios
> fallos se apoyaron en él antes de que se refutara.

`package.json` declara `"shadcn": "^4.19.0"` en `dependencies`, y **no se
importa desde ningún archivo de `src/`**. Es la herramienta de línea de
comandos: todo consumidor que instala `@robomous/ui-core` arrastra el CLI
completo a su árbol de producción.

Las demás dependencias sí se usan: `@base-ui/react` en `combobox.tsx`,
`tw-animate-css` y `@fontsource-variable/geist` en `styles.css`,
`class-variance-authority`, `lucide-react`, `radix-ui` y `sonner` en los
componentes.

### 3.6-bis Refutación: `shadcn` sí es una dependencia real

La afirmación de §3.6 se apoyaba en un grep que solo cubría sintaxis de
import de JavaScript (`from "shadcn"`). La hoja de estilos hace
`@import "shadcn/tailwind.css"`, y el paquete publica
`"./tailwind.css": "./dist/tailwind.css"` en su mapa de exports: el import
es válido y resuelve **solo mientras el paquete esté instalado**.

Quitarlo dejó el paquete roto para cualquier consumidor, sin que nada aquí
lo notara: en este repositorio no se compila Tailwind — la hoja se publica
como fuente y la compila el consumidor — así que `lint`, `build` y `test`
siguen en verde con el paquete inservible. Habría fallado en los dos PRs
de consumidores.

`shadcn` vuelve a `dependencies`. **Las dependencias de runtime pasan de
10 a 9**, no a 8: salen `clsx` y `tailwind-merge`, entra `cn`.

La lección estructural: no había nada verificando que los `@import` de la
hoja resolvieran. Se añade un guard que lo comprueba, por el mismo
principio que gobierna al resto del paquete — una regla que nada verifica
es una preferencia.

---

## 4. Diseño

### 4.1 Eliminaciones

| Ruta | Líneas | Razón |
| --- | --- | --- |
| `shadcn/` (21 `.tsx` + `README.md`) | 2,204 | §3.1 |
| `scripts/shadcn_add.sh` | 13 | solo alimentaba `shadcn/` |
| `scripts/shadcn_relativize.mjs` | 19 | solo relativizaba tras copiar el snapshot |
| `gates/canonical.test.mjs` | 71 | gate de fidelidad |
| `gates/index.d.mts` | 51 | lo genera `tsc` tras §4.4 |
| 16 exports de `gates/index.mjs` | ~250 | §3.2 |

`scripts/` queda vacío y desaparece. El script `shadcn:add` de `package.json`
se elimina; instalar un componente vuelve a ser el comando directo del CLI:

```
pnpm dlx shadcn@latest add <componente>
```

Y con `pnpm dlx` obteniendo el CLI bajo demanda, **`shadcn` sale de
`dependencies`** (§3.6). No se mueve a `devDependencies`: no hace falta
instalarlo para nada.

`components.json` **no se toca**. Es lo único que esa maquinaria necesitaba
proteger, y se protege solo: el gate de tokens que verifica que el archivo se
limita a los campos que el esquema admite **sobrevive** (§4.4).

### 4.2 Los cuatro helpers se disuelven

| Helper | Destino | API resultante |
| --- | --- | --- |
| `menuSurface` | clases base de `DropdownMenuContent` | sin prop; es el default |
| `twoLineTrigger` | prop de `SelectTrigger` | `<SelectTrigger multiline>` |
| `inlineLink` | variante de tamaño de `Button` | `<Button variant="link" size="inline">` |
| `progressAria` | **arreglo** en `Progress` | `<Progress value={n} />` basta |

**`DropdownMenuContent`.** Las dos reglas de `menuSurface` pasan a las clases
base. El helper corregía con `data-closed:animate-none!` que un menú siguiera
montado durante su animación de salida y se tragara la pulsación que debía
abrir el siguiente.

> **Refinado en el plan de implementación:** en vez de neutralizar la animación
> con `animate-none!`, se **borran** las tres utilidades `data-closed:*` de la
> cadena base. Sobrescribir una utilidad tenía sentido cuando la corrección
> llegaba desde fuera; siendo el componente propio, quitarla es más claro.
> El efecto es el mismo y `DESIGN.md` documenta la implementación real.
`w-auto` reemplaza `w-(--radix-dropdown-menu-trigger-width)`, que ancla la
superficie al ancho del disparador — detrás de un botón de icono eso son 128px
y todo ítem más largo se parte. `min-w-32` permanece como piso.

Con el default horneado, el gate `menuSurfaceGapsIn` —que existía para vigilar
que ningún call site lo olvidara— **deja de tener objeto y se retira**.

**`SelectTrigger`.** `multiline` es un booleano, ortogonal al tamaño. Las
clases dejan de calificar sobre `data-[size=default]` y se aplican cuando la
prop está activa: `h-auto min-h-8 *:data-[slot=select-value]:line-clamp-none`.

**`Button`.** `size="inline"` (`h-auto p-0`), para el botón que vive dentro de
una frase o una celda de tabla.

**`Progress`.** Se le pasa `value={value}` a `ProgressPrimitive.Root`. Radix
emite entonces `aria-valuenow`, `aria-valuemin`, `aria-valuemax` y el
`data-state` correcto. El componente sigue leyendo `value` para el
`translateX`; simplemente deja de retenerlo.

**Consecuencia:** con `cn` migrado (§4.5), los seis archivos de `src/lib/`
quedan resueltos y **la carpeta desaparece**.

### 4.3 Estructura de carpetas

```
src/
  index.ts              superficie pública
  components/           21 componentes, en propiedad plena
    button.tsx
    …
    components.test.tsx   (antes primitives.test.tsx)
    combobox.test.tsx
    sonner.test.tsx
  theme/                el contrato visual, junto
    styles.css
    tokens.ts
    tokens.test.ts
    statusTone.ts
    statusTone.test.ts
  gates/                TypeScript, compilado con el resto
    index.ts
    design.test.ts
    tokens.test.ts
```

Desaparecen de la raíz: `shadcn/`, `scripts/`, `gates/`. Desaparece
`src/lib/`. `src/primitives/` se renombra a `src/components/`: el nombre
"primitive" cargaba la idea de una capa intocable bajo otra capa, que es
justamente la premisa que se retira.

`harness.test.tsx` se conserva — verifica la propiedad del `setup` de vitest
sobre el drenado de macrotareas, que sigue siendo real.

### 4.4 Los gates

Pasan de `.mjs` con declaraciones escritas a mano, a TypeScript compilado:

- `tsc` genera los tipos; se borran las 51 líneas de `gates/index.d.mts`.
- Corren bajo vitest como el resto. **`pnpm test:gates` y su paso en CI
  desaparecen**; `pnpm test` los cubre. Los que escanean el árbol declaran
  `// @vitest-environment node`.
- El export queda `"./gates": { "types": "./dist/gates/index.d.ts", "import":
  "./dist/gates/index.js" }`.

**Superficie pública: de 27 exports a 8.**

| Superviviente | Regla que sostiene |
| --- | --- |
| `colouredClassesIn` | ningún color dentro de un class string |
| `brandUsagesIn` | el color de marca es identidad, no pintura |
| `statusPaletteIn` | la paleta de status vive solo en `Badge` y `statusTone` |
| `competingStatusPaletteIn` | ninguna familia de color rival la sustituye |
| `blockBody` | lectura de bloques CSS |
| `rawDeclarations` | lectura de declaraciones sin normalizar |
| `declarations` | lectura de declaraciones normalizadas |
| `foundationTokenNames` | los tokens tienen un solo hogar: la hoja de estilos |

Se retiran, además de los 16 internos: `legacyVocabularyIn`,
`statusTokenUtilitiesIn` y `retiredDeclarationsIn` — vigilaban vocabulario de
la migración desde la v1, que ya no existe en ninguno de los tres
repositorios — y `menuSurfaceGapsIn` (§4.2).

`normalize` y `FOUNDATION_BADGE` dejan de exportarse y quedan internos.

**Gates que sobreviven como pruebas de este repositorio:** sin color en class
strings; la marca no pinta nada aquí; los tokens tienen un solo hogar;
`components.json` se limita a los campos del esquema; ningún segundo set de
iconos; la paleta de status solo en `Badge` y `statusTone`; ninguna paleta
rival.

**Gates que mueren:** todo `canonical.test.mjs`; "Button carries shadcn's
variants and nothing else"; "Badge keeps shadcn's variants and adds exactly the
four"; "index.ts adds no `*Variants` beyond shadcn's own three".

Los tres últimos anclaban la API de un componente a la de upstream —
exactamente lo que se quiere poder cambiar.

### 4.5 `cn`

Se ejecuta la migración oficial y **se verifica su salida** en vez de editar a
mano:

```
pnpm dlx shadcn@latest migrate cn
```

Resultado esperado: `src/lib/cn.ts` y `src/lib/cn.test.ts` se borran,
`src/index.ts` reexporta `cn` desde el paquete, y `clsx` y `tailwind-merge`
salen de `dependencies`. `cn` se añade como dependencia.

El nombre y la firma que ven los consumidores no cambian: `import { cn } from
"@robomous/ui-core"` sigue funcionando igual. **No es una ruptura.**

Si la migración toca `components.json` (el alias `utils` apunta hoy a
`@/lib/cn`), se revisa que el resultado siga siendo un archivo que el CLI
acepte — el gate de `components.json` lo verifica.

### 4.6 Documentación y terminología

**`DESIGN.md`** (401 líneas) se reescribe. Hoy su eje es "qué capa decide qué, y
qué no podemos tocar de upstream". El eje nuevo es el conjunto de reglas
propias: un solo hogar para los tokens, ningún color dentro de un class string,
la marca como identidad, una sola paleta de status, un solo set de iconos, y el
contrato de extensiones por consumidor — que sigue vigente y sigue siendo el
que gobierna a VisionSet y a robomous-cloud.

Se documenta además el patrón que este cambio revela: **los cuatro helpers
eran el mismo síntoma**, el costo de no poder editar el componente. Es la
justificación de por qué la capa de parches desapareció.

**Purga de texto heredado** (§3.4): la cabecera de `vitest.config.ts`, el
comentario de `sonner.tsx`, y toda mención a snapshots, canonicidad, fidelidad
con upstream o al preset por su código.

**`README.md`** se actualiza en su descripción del paquete y en la sección
"The gates".

---

## 5. Superficie pública: el diff

### 5.1 Runtime (`@robomous/ui-core`)

| Símbolo | Cambio |
| --- | --- |
| `inlineLink` | **eliminado** → `<Button size="inline">` |
| `menuSurface` | **eliminado** → default de `DropdownMenuContent` |
| `twoLineTrigger` | **eliminado** → `<SelectTrigger multiline>` |
| `progressAria` | **eliminado** → `Progress` lo emite solo |
| `cn` | sin cambio de nombre ni firma (cambia su origen) |
| `Button` | **añade** `size="inline"` |
| `SelectTrigger` | **añade** prop `multiline` |
| `DropdownMenuContent` | cambian sus clases base |
| `Progress` | corrige `aria-valuenow` / `data-state` |
| resto de componentes | sin cambios |

### 5.2 Gates (`@robomous/ui-core/gates`)

27 exports → 8 (§4.4). Retirados que **sí** usa algún consumidor:
`legacyVocabularyIn`, `menuSurfaceGapsIn`, `statusTokenUtilitiesIn`.

### 5.3 Sin cambio

- `@robomous/ui-core/styles.css` — mismo especificador, mismo contenido.
- `components.json` — intacto.
- Todos los componentes y sus subcomponentes exportados.
- `cssVar`, `DARK_THEME`, `LIGHT_THEME`, `THEME`, `STATUS_INK`, `TONE_BORDER`,
  `TONE_FILL`, `StatusTone`, `toast`.

---

## 6. Migración de consumidores

Dos PR, uno por repositorio, contra `@robomous/ui-core@0.2.0`.

### 6.1 `Robomous/robomous-cloud`

Impacto pequeño.

- `web/package.json` — bump `0.1.1` → `0.2.0` (pin exacto, se conserva).
- `web/src/platform/user-menu/UserMenu.tsx` — quitar el import y el uso de
  `menuSurface`; el comportamiento ahora es el default.
- `web/tests/gates.test.ts` — quitar `legacyVocabularyIn`, `menuSurfaceGapsIn`
  y `statusTokenUtilitiesIn` del import y sus tres aserciones. Los otros siete
  helpers siguen igual.
- Registrar un ADR que suceda a `adr-0021` y `adr-0030`: el sistema pasa a
  propiedad plena y los gates de fidelidad se retiran.

### 6.2 `Robomous/VisionSet`

Impacto mecánico pero amplio: ~25 archivos.

- `package.json` y `frontend/ui-core/package.json` — `^0.1.0` → `^0.2.0`.
- `inlineLink` — 12 archivos. Atención: varios call sites lo componen con
  `cn(inlineLink, "…")`; la migración a `size="inline"` debe preservar el resto
  de las clases.
- `menuSurface` — 7 archivos; se elimina import y uso.
- `twoLineTrigger` — 6 archivos → `multiline`.
- `progressAria` — 5 archivos; se elimina `{...progressAria(x)}`, `value` ya
  basta.
- `tests/scripts/design_system.test.mjs` — quitar los tres helpers retirados.
  Quedan `statusPaletteIn` y `competingStatusPaletteIn`.
- `frontend/ui-core/src/tokens.test.ts` — **sin cambios**; sus cuatro helpers
  sobreviven.
- `DESIGN.md` — actualizar la mención a `menuSurface`.

**Orden:** publicar `0.2.0` primero; los dos PR consumen la versión publicada.

---

## 7. Pruebas

- **Cobertura de componentes:** los tres archivos actuales se conservan tal
  como están agrupados (`primitives.test.tsx` solo se renombra a
  `components.test.tsx`). Partirlos en 21 archivos es churn sin beneficio en
  esta versión. Lo que sí cambia: los tests que asertaban fidelidad con
  upstream se reescriben como aserciones de comportamiento propio.
- **Los cuatro cambios de API llevan test nuevo:**
  - `Progress` con solo `value={42}` anuncia `aria-valuenow="42"` y no queda en
    estado indeterminado. Es una prueba de regresión de un defecto reproducido.
  - `Button size="inline"` no tiene alto ni padding de control.
  - `SelectTrigger multiline` crece y no recorta su valor.
  - `DropdownMenuContent` trae por default el ancho automático y no anima al
    cerrarse.
- **Gates:** cada helper superviviente conserva su test de unidad (el que
  verifica que el escáner encuentra el caso real y calla ante el falso
  positivo) y su test de árbol.
- **Verificación de no-regresión visual:** `pnpm build && pnpm lint && pnpm
  test` en verde, y el `styleguide` de VisionSet revisado en navegador tras su
  PR — los cuatro cambios tocan geometría.

---

## 8. Trampas de implementación

1. **`foundationTokenNames()` resuelve rutas contra la raíz del paquete.**
   Hoy `gates/index.mjs` se publica como fuente cruda (`files` incluye
   `"gates"`), así que `PKG = dirname(import.meta.url)/..` es la raíz del
   paquete instalado y `src/styles.css` resuelve dentro de él. Al compilar los
   gates a `dist/gates/index.js`, **esa cuenta cambia** y además el archivo se
   mueve a `src/theme/styles.css`. Ambos consumidores llaman a esta función en
   sus tests contra el paquete instalado: si la ruta queda mal, rompe fuera de
   este repositorio y no lo detecta el CI de aquí. Debe cubrirse con un test
   que la ejecute resolviendo desde `dist/`.

2. **`package.json` → `files`.** Quitar `"shadcn"`. Verificar que `"src"` sigue
   presente: la hoja de estilos se publica como fuente.

3. **`exports["./styles.css"]`** debe repuntar a `./src/theme/styles.css`
   manteniendo el especificador público. Un error aquí rompe el `@import` de
   ambos consumidores.

4. **Renombrar `src/primitives/` → `src/components/`** cambia rutas de import
   internas en 21 archivos y en `src/index.ts`. El alias `ui` de
   `components.json` apunta a `@/primitives`; debe actualizarse a
   `@/components` o el siguiente `shadcn add` escribirá en la carpeta vieja.

5. **La migración de `cn`** puede reescribir imports en los 21 componentes. Su
   salida se revisa con `git diff` antes de confirmar, no se acepta a ciegas.

6. **`sonner.tsx`** pierde el marcador `SHADCN FRAMEWORK ADAPTER` y su
   comentario heredado, pero **conserva el hook**: la razón técnica (una sola
   fuente de tema, `.dark` en `<html>`) sigue siendo cierta.

---

## 9. Versionado y entrega

**`0.2.0`**, no `1.0.0`. Es una ruptura real, pero `1.0.0` prometería una
estabilidad que el paquete todavía no puede sostener: el restyling de los
componentes viene justo después de este cambio y volverá a mover la superficie.

Publicación por el flujo existente: subir `version` en `package.json`,
confirmar, etiquetar `v0.2.0` y empujar la etiqueta. CI publica por OIDC y
rechaza una etiqueta que no coincida con `package.json`.

---

## 10. Riesgos

| Riesgo | Mitigación |
| --- | --- |
| La ruta de `foundationTokenNames` rompe solo en los consumidores | Test que la ejecute desde `dist/`; §8.1 |
| La migración de `inlineLink` pierde clases compuestas con `cn` | Revisar los 12 call sites uno a uno; no hacer reemplazo automático |
| `pnpm dlx shadcn@latest migrate cn` produce un cambio inesperado | Revisar `git diff` antes de confirmar |
| Al perder el gate de canonicidad se pierde también la señal de deriva | Era una señal débil por diseño (§3.1). La sustituye la propiedad plena: ya no hay deriva que medir |
| Los dos PR de consumidores se desincronizan de la publicación | Publicar `0.2.0` primero; ambos PR consumen la versión ya publicada |

---

## 11. Resumen cuantitativo

| Métrica | Antes | Después |
| --- | --- | --- |
| Líneas eliminadas | — | ~2,600 |
| Exports de `/gates` | 27 | 8 |
| Dependencias de runtime | 10 | 9 (−`clsx`, −`tailwind-merge`, +`cn`) |
| Comandos de test | 2 (`test`, `test:gates`) | 1 |
| Pasos de CI | 4 | 3 |
| Carpetas de código en la raíz | `src`, `gates`, `shadcn`, `scripts` | `src` |
| Archivos en `src/lib/` | 6 | 0 |
