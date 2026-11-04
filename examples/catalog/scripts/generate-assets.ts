/**
 * The demo assets: camera frames and portraits, drawn here instead of fetched.
 *
 * Every demo reads like a computer-vision product (cameras in a distribution
 * centre, datasets of frames, people who annotate them), so the assets are
 * stills from those cameras and the people on the team. They are SVG, so
 * they stay sharp from a 32px thumbnail to a full-width hero, ship with the
 * site and never break when a third-party photo moves.
 *
 * Frames are built from axis-aligned boxes projected through a pinhole camera,
 * shaded by face normal and fogged by distance; overhead frames are flat 2D.
 * A seeded random keeps every run identical.
 *
 * Output: `public/assets/frames/<scene>.svg` and `public/assets/people/<slug>.svg`.
 * Run with `node scripts/generate-assets.ts` (Node's type stripping, erasable syntax only).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/assets");

// ---------------------------------------------------------------- utilities

type Vec3 = [number, number, number];
type Rgb = [number, number, number];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hex = (h: string): Rgb => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const css = ([r, g, b]: Rgb) =>
  "#" +
  [r, g, b]
    .map((v) =>
      Math.round(Math.max(0, Math.min(255, v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const n = (v: number) => Math.round(v).toString();
const pick = <T>(r: () => number, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;

/** A frame: the scene, then film grain and a lens vignette over it. */
function svg(w: number, h: number, body: string, defs = "", grain = 0.5, vignette = 0.45) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>${defs}
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 ${grain} 0"/>
  </filter>
  <radialGradient id="vignette" cx="50%" cy="48%" r="75%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="${vignette}"/>
  </radialGradient>
  </defs>
  ${body}
  <rect width="${w}" height="${h}" filter="url(#grain)" style="mix-blend-mode:overlay"/>
  <rect width="${w}" height="${h}" fill="url(#vignette)"/>
</svg>
`.replace(/\n\s*\n/g, "\n");
}

/**
 * What each frame shows and where, in pixels of the 1600×900 frame. Not
 * shipped: `MANIFEST=<file> node scripts/generate-assets.ts` writes it out as
 * percentages, for demos that draw a detection box over a subject.
 */
let marks: { label: string; box: [number, number, number, number] }[] = [];
const mark = (label: string, x0: number, y0: number, x1: number, y1: number) =>
  marks.push({ label, box: [x0, y0, x1, y1] });

// --------------------------------------------------------- perspective scenes

interface Camera {
  h: number;
  pitch: number;
  f: number;
  cx: number;
  cy: number;
  yaw?: number;
  /** Turns the subject in front of the camera: an angle about a point on the floor. */
  spin?: { angle: number; pivot: [number, number] };
}

function turn(cam: Camera, [x, y, z]: Vec3, sign = 1): Vec3 {
  if (!cam.spin) return [x, y, z];
  const a = cam.spin.angle * sign;
  const [px, pz] = cam.spin.pivot;
  const dx = x - px;
  const dz = z - pz;
  return [px + dx * Math.cos(a) - dz * Math.sin(a), y, pz + dx * Math.sin(a) + dz * Math.cos(a)];
}

interface Scene {
  cam: Camera;
  haze: Rgb;
  fog: number;
  tone?: (c: Rgb) => Rgb;
  light: Vec3;
  items: { depth: number; svg: string }[];
  /** The canvas size, when it isn't a 1600×900 frame. */
  frame?: [number, number];
}

function project(cam: Camera, point: Vec3): [number, number, number] {
  const [x, y, z] = turn(cam, point);
  const yaw = cam.yaw ?? 0;
  const xr = x * Math.cos(yaw) - z * Math.sin(yaw);
  const zr = x * Math.sin(yaw) + z * Math.cos(yaw);
  const ry = y - cam.h;
  const s = Math.sin(cam.pitch);
  const c = Math.cos(cam.pitch);
  const zc = Math.max(0.05, -ry * s + zr * c);
  const yc = ry * c + zr * s;
  return [cam.cx + (cam.f * xr) / zc, cam.cy - (cam.f * yc) / zc, zc];
}

function surface(
  sc: Scene,
  base: Rgb,
  pts: Vec3[],
  normal: Vec3,
  opts: { emit?: boolean; alpha?: number } = {},
) {
  const proj = pts.map((p) => project(sc.cam, p));
  const depth = proj.reduce((a, p) => a + p[2], 0) / proj.length;
  let col = base;
  if (!opts.emit) {
    const [lx, ly, lz] = sc.light;
    // Light stays put while the subject turns, so turn the normal with it.
    const [nx, ny, nz] = sc.cam.spin
      ? turn({ ...sc.cam, spin: { ...sc.cam.spin, pivot: [0, 0] } }, normal)
      : normal;
    const lambert = Math.max(0, nx * lx + ny * ly + nz * lz);
    col = mix(mix(base, [0, 0, 0], 0.42), base, 0.35 + lambert * 0.65);
  }
  col = mix(col, sc.haze, 1 - Math.exp(-depth / sc.fog));
  if (sc.tone) col = sc.tone(col);
  let area = 0;
  for (let i = 0; i < proj.length; i++) {
    const a = proj[i]!;
    const b = proj[(i + 1) % proj.length]!;
    area += a[0] * b[1] - b[0] * a[1];
  }
  if (Math.abs(area) < 2) return;
  // Off the frame entirely: nothing to draw.
  const [fw, fh] = sc.frame ?? [W, H];
  if (proj.every((p) => p[0] < 0) || proj.every((p) => p[0] > fw)) return;
  if (proj.every((p) => p[1] < 0) || proj.every((p) => p[1] > fh)) return;
  const d = "M" + proj.map((p) => `${n(p[0])} ${n(p[1])}`).join("L") + "Z";
  const a = opts.alpha !== undefined ? ` fill-opacity="${opts.alpha}"` : "";
  sc.items.push({ depth, svg: `<path d="${d}" fill="${css(col)}"${a}/>` });
}

/** An axis-aligned box: only the faces turned toward the camera are drawn. */
function box(
  sc: Scene,
  color: string | Rgb,
  [x0, x1]: [number, number],
  [y0, y1]: [number, number],
  [z0, z1]: [number, number],
  emit = false,
) {
  const base = typeof color === "string" ? hex(color) : color;
  // The camera, seen from the subject's own (unturned) frame.
  const cam = turn(sc.cam, [0, sc.cam.h, 0], -1);
  const faces: [Vec3[], Vec3][] = [
    [
      [
        [x0, y0, z0],
        [x1, y0, z0],
        [x1, y1, z0],
        [x0, y1, z0],
      ],
      [0, 0, -1],
    ],
    [
      [
        [x0, y1, z0],
        [x1, y1, z0],
        [x1, y1, z1],
        [x0, y1, z1],
      ],
      [0, 1, 0],
    ],
    [
      [
        [x0, y0, z0],
        [x0, y1, z0],
        [x0, y1, z1],
        [x0, y0, z1],
      ],
      [-1, 0, 0],
    ],
    [
      [
        [x1, y0, z0],
        [x1, y1, z0],
        [x1, y1, z1],
        [x1, y0, z1],
      ],
      [1, 0, 0],
    ],
    [
      [
        [x0, y0, z1],
        [x1, y0, z1],
        [x1, y1, z1],
        [x0, y1, z1],
      ],
      [0, 0, 1],
    ],
  ];
  // One depth for the whole box keeps its faces together in the painter's sort.
  const before = sc.items.length;
  for (const [pts, nv] of faces) {
    const c = pts.reduce<Vec3>(
      (a, p) => [a[0] + p[0] / 4, a[1] + p[1] / 4, a[2] + p[2] / 4],
      [0, 0, 0],
    );
    const toCam: Vec3 = [cam[0] - c[0], cam[1] - c[1], cam[2] - c[2]];
    if (nv[0] * toCam[0] + nv[1] * toCam[1] + nv[2] * toCam[2] <= 0) continue;
    surface(sc, base, pts, nv, { emit });
  }
  const center = project(sc.cam, [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]);
  const dist = Math.hypot((x0 + x1) / 2, (y0 + y1) / 2 - sc.cam.h, (z0 + z1) / 2);
  for (let i = before; i < sc.items.length; i++) sc.items[i]!.depth = dist + center[2] * 0;
}

function render(
  sc: Scene,
  w: number,
  h: number,
  background: string,
  defs: string,
  overlay = "",
  grain = 0.5,
  vignette = 0.45,
) {
  const body = sc.items
    .sort((a, b) => b.depth - a.depth)
    .map((i) => i.svg)
    .join("\n  ");
  return svg(w, h, `${background}\n  ${body}\n  ${overlay}`, defs, grain, vignette);
}

const CARTONS = ["#c9a274", "#b98d5e", "#d4b48a", "#a87d52", "#c7a57e"];
const WRAP = "#d6dbe1";
const CRATE = "#41679c";

function load(
  sc: Scene,
  r: () => number,
  [x0, x1]: [number, number],
  y: number,
  [z0, z1]: [number, number],
  maxH: number,
) {
  // Pallet: three blocks and a deck.
  box(sc, "#a77c50", [x0, x1], [y, y + 0.14], [z0, z1]);
  const kind = r();
  const hgt = maxH * (0.62 + r() * 0.38);
  if (kind < 0.18) {
    box(sc, WRAP, [x0 + 0.02, x1 - 0.02], [y + 0.14, y + 0.14 + hgt], [z0 + 0.02, z1 - 0.02]);
  } else if (kind < 0.28) {
    box(
      sc,
      CRATE,
      [x0 + 0.04, x1 - 0.04],
      [y + 0.14, y + 0.14 + hgt * 0.7],
      [z0 + 0.04, z1 - 0.04],
    );
  } else {
    const rows = r() < 0.5 ? 2 : 3;
    const cols = r() < 0.5 ? 2 : 3;
    const layers = r() < 0.5 ? 2 : 3;
    const lh = hgt / layers;
    const dz = (z1 - z0) / cols;
    const dx = (x1 - x0) / rows;
    for (let l = 0; l < layers; l++)
      for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++) {
          if (l === layers - 1 && r() < 0.25) continue;
          box(
            sc,
            pick(r, CARTONS),
            [x0 + i * dx + 0.015, x0 + (i + 1) * dx - 0.015],
            [y + 0.14 + l * lh, y + 0.14 + (l + 1) * lh - 0.012],
            [z0 + j * dz + 0.015, z0 + (j + 1) * dz - 0.015],
          );
        }
  }
}

/** A worker in a hi-vis vest, drawn flat at their projected spot. */
function person(sc: Scene, x: number, z: number, vest = "#d7f04a", helmet = "#f4f4f2") {
  const [fx, fy, fz] = project(sc.cam, [x, 0, z]);
  const [, hy] = project(sc.cam, [x, 1.78, z]);
  const H = fy - hy;
  const w = H * 0.27;
  const tone = (c: string) => {
    let col = mix(hex(c), sc.haze, 1 - Math.exp(-fz / sc.fog));
    if (sc.tone) col = sc.tone(col);
    return css(col);
  };
  const g = `<g>
    <ellipse cx="${n(fx)}" cy="${n(fy)}" rx="${n(w * 0.75)}" ry="${n(H * 0.025)}" fill="#000" fill-opacity="0.25"/>
    <rect x="${n(fx - w * 0.42)}" y="${n(fy - H * 0.47)}" width="${n(w * 0.38)}" height="${n(H * 0.47)}" rx="${n(w * 0.12)}" fill="${tone("#2c3440")}"/>
    <rect x="${n(fx + w * 0.04)}" y="${n(fy - H * 0.47)}" width="${n(w * 0.38)}" height="${n(H * 0.47)}" rx="${n(w * 0.12)}" fill="${tone("#2c3440")}"/>
    <rect x="${n(fx - w * 0.62)}" y="${n(fy - H * 0.8)}" width="${n(w * 1.24)}" height="${n(H * 0.4)}" rx="${n(w * 0.3)}" fill="${tone("#3a4352")}"/>
    <rect x="${n(fx - w * 0.5)}" y="${n(fy - H * 0.79)}" width="${n(w)}" height="${n(H * 0.3)}" rx="${n(w * 0.22)}" fill="${tone(vest)}"/>
    <rect x="${n(fx - w * 0.5)}" y="${n(fy - H * 0.62)}" width="${n(w)}" height="${n(H * 0.035)}" fill="${tone("#e9eef2")}"/>
    <circle cx="${n(fx)}" cy="${n(fy - H * 0.88)}" r="${n(w * 0.34)}" fill="${tone("#8d6248")}"/>
    <path d="M${n(fx - w * 0.4)} ${n(fy - H * 0.88)}a${n(w * 0.4)} ${n(w * 0.4)} 0 0 1 ${n(w * 0.8)} 0z" fill="${tone(helmet)}"/>
  </g>`;
  sc.items.push({ depth: Math.hypot(x, 1 - sc.cam.h, z) - 0.6, svg: g });
  mark("person", fx - w * 0.75, fy - H, fx + w * 0.75, fy);
}

function markBox(
  sc: Scene,
  label: string,
  [x0, x1]: [number, number],
  [y0, y1]: [number, number],
  [z0, z1]: [number, number],
) {
  const pts = [x0, x1].flatMap((x) =>
    [y0, y1].flatMap((y) => [z0, z1].map((z) => project(sc.cam, [x, y, z]))),
  );
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  mark(label, Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
}

function forklift(sc: Scene, x: number, z: number, facing: 1 | -1 = -1) {
  const body = "#e8b23a";
  // Chassis, counterweight, overhead guard, mast and forks with a load.
  box(sc, body, [x - 0.55, x + 0.55], [0.15, 1.05], [z, z + 1.7]);
  box(sc, "#2a2e35", [x - 0.6, x + 0.6], [0, 0.42], [z + 0.15, z + 0.55]);
  box(sc, "#2a2e35", [x - 0.6, x + 0.6], [0, 0.42], [z + 1.15, z + 1.55]);
  box(sc, "#2f343b", [x - 0.5, x - 0.44], [1.05, 2.15], [z + 0.55, z + 0.62]);
  box(sc, "#2f343b", [x + 0.44, x + 0.5], [1.05, 2.15], [z + 0.55, z + 0.62]);
  box(sc, "#2f343b", [x - 0.5, x + 0.5], [2.1, 2.18], [z + 0.55, z + 1.5]);
  box(sc, "#c99a2e", [x - 0.5, x + 0.5], [0.4, 1.35], [z + 1.35, z + 1.7]);
  const front = facing === -1 ? z : z + 1.7;
  box(sc, "#3a3f47", [x - 0.45, x + 0.45], [0.1, 2.4], [front - 0.12, front]);
  box(sc, "#3a3f47", [x - 0.4, x - 0.3], [0.1, 0.16], [front - 1.2, front - 0.12]);
  box(sc, "#3a3f47", [x + 0.3, x + 0.4], [0.1, 0.16], [front - 1.2, front - 0.12]);
  load(sc, rng(77), [x - 0.5, x + 0.5], 0.16, [front - 1.25, front - 0.15], 1.0);
  markBox(sc, "forklift", [x - 0.6, x + 0.6], [0, 2.4], [front - 1.25, z + 1.7]);
}

// ------------------------------------------------------------------- scenes

const W = 1600;
const H = 900;
const LIGHT: Vec3 = (() => {
  const v: Vec3 = [-0.35, 0.8, -0.5];
  const l = Math.hypot(...v);
  return [v[0] / l, v[1] / l, v[2] / l];
})();

interface Shot {
  seed: number;
  yaw?: number;
  tone?: (c: Rgb) => Rgb;
  /** Where the forklift and the workers stand, as [x, z] on the floor. */
  lift?: [number, number] | null;
  people?: [number, number][];
}

function aisle({
  seed,
  yaw = -0.035,
  tone,
  lift = [-0.45, 19],
  people = [
    [0.7, 11.5],
    [-0.6, 34],
  ],
}: Shot) {
  const sc: Scene = {
    cam: { h: 1.75, pitch: 0.06, f: 1000, cx: W / 2 + 40, cy: H * 0.47, yaw },
    haze: hex("#cfd6de"),
    fog: 42,
    tone,
    light: LIGHT,
    items: [],
  };
  const r = rng(seed);
  const T = (c: string) => css(tone ? tone(hex(c)) : hex(c));

  // Floor, ceiling and the bright dock door at the end of the aisle.
  surface(
    sc,
    hex("#8e9399"),
    [
      [-30, 0, 1],
      [30, 0, 1],
      [30, 0, 70],
      [-30, 0, 70],
    ],
    [0, 1, 0],
  );
  surface(
    sc,
    hex("#5b6470"),
    [
      [-30, 11, 1],
      [30, 11, 1],
      [30, 11, 70],
      [-30, 11, 70],
    ],
    [0, -1, 0],
  );
  surface(
    sc,
    hex("#c4ccd4"),
    [
      [-30, 0, 66],
      [30, 0, 66],
      [30, 11, 66],
      [-30, 11, 66],
    ],
    [0, 0, -1],
    { emit: true },
  );
  surface(
    sc,
    hex("#fbf6ea"),
    [
      [-1.4, 0, 65.9],
      [1.4, 0, 65.9],
      [1.4, 3.6, 65.9],
      [-1.4, 3.6, 65.9],
    ],
    [0, 0, -1],
    { emit: true },
  );
  for (const d of sc.items) d.depth += 1000;

  // Lane lines and a dashed centre line.
  for (const s of [-1, 1]) {
    surface(
      sc,
      hex("#e2b33b"),
      [
        [s * 1.25, 0.002, 1.2],
        [s * 1.33, 0.002, 1.2],
        [s * 1.33, 0.002, 64],
        [s * 1.25, 0.002, 64],
      ],
      [0, 1, 0],
    );
  }
  for (let z = 2; z < 62; z += 3) {
    surface(
      sc,
      hex("#e9edf0"),
      [
        [-0.04, 0.003, z],
        [0.04, 0.003, z],
        [0.04, 0.003, z + 1.4],
        [-0.04, 0.003, z + 1.4],
      ],
      [0, 1, 0],
    );
  }
  for (const d of sc.items) d.depth = Math.max(d.depth, 900);

  // Ceiling lights with their pools on the floor.
  for (let z = 3; z < 64; z += 5) {
    box(sc, "#fffbea", [-0.12, 0.12], [9.4, 9.5], [z, z + 2.6], true);
  }

  const bay = 2.8;
  for (const s of [-1, 1] as const) {
    const inner = s * 1.7;
    const outer = s * 2.9;
    const xs = (a: number, b: number): [number, number] => (s < 0 ? [b, a] : [a, b]);
    for (let z = 1.5; z < 50; z += bay) {
      // Uprights at the bay boundary, front and back.
      box(sc, "#35577f", xs(inner, inner + s * 0.1), [0, 8.1], [z - 0.05, z + 0.05]);
      box(sc, "#35577f", xs(outer - s * 0.1, outer), [0, 8.1], [z - 0.05, z + 0.05]);
      for (const level of [0, 1.7, 3.4, 5.1, 6.8]) {
        if (level > 0)
          box(
            sc,
            "#e2682c",
            xs(inner, inner + s * 0.08),
            [level - 0.15, level],
            [z + 0.05, z + bay - 0.05],
          );
        if (level > 6) continue;
        const free = r();
        if (free < 0.12) continue;
        const half = r() < 0.25;
        const zz: [number, number] = half
          ? [z + 0.25, z + bay / 2 - 0.05]
          : [z + 0.2, z + bay - 0.2];
        load(sc, r, xs(inner + s * 0.15, outer - s * 0.05), level, zz, 1.35);
        if (half && r() < 0.7)
          load(
            sc,
            r,
            xs(inner + s * 0.15, outer - s * 0.05),
            level,
            [z + bay / 2 + 0.05, z + bay - 0.25],
            1.35,
          );
      }
    }
  }

  if (lift) forklift(sc, lift[0], lift[1], -1);
  people.forEach(([x, z], i) => person(sc, x, z, i % 2 ? "#ff8a3d" : "#d7f04a"));

  const defs = `
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T("#3f4650")}"/>
    <stop offset="1" stop-color="${T("#8d96a1")}"/>
  </linearGradient>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#fffbe8" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#fffbe8" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0.08"/>
  </linearGradient>`;
  const [ex, ey] = project(sc.cam, [0, 1.8, 65.9]);
  for (const z of [5, 10, 15, 20, 25, 30, 40]) {
    const [px, py] = project(sc.cam, [0, 0, z + 1.3]);
    const [qx] = project(sc.cam, [1.2, 0, z + 1.3]);
    const [, ty] = project(sc.cam, [0, 0, z + 2.8]);
    sc.items.push({
      depth: 850,
      svg: `<ellipse cx="${n(px)}" cy="${n(py)}" rx="${n(qx - px)}" ry="${n(Math.max(2, py - ty))}" fill="url(#glow)" opacity="0.6"/>`,
    });
  }
  const overlay = `<ellipse cx="${n(ex)}" cy="${n(ey)}" rx="260" ry="200" fill="url(#glow)"/>
  <rect y="${H / 2}" width="${W}" height="${H / 2}" fill="url(#sheen)"/>`;
  return render(
    sc,
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>`,
    defs,
    overlay,
    tone ? 0.9 : 0.45,
  );
}

function dock({ seed, yaw = 0.06 }: Shot) {
  const sc: Scene = {
    cam: { h: 3.1, pitch: 0.17, f: 1050, cx: W / 2, cy: H * 0.42, yaw },
    haze: hex("#d8dde2"),
    fog: 70,
    light: LIGHT,
    items: [],
  };
  const r = rng(seed);
  const wallZ = 15;

  surface(
    sc,
    hex("#a3a9ae"),
    [
      [-30, 0, 0.5],
      [30, 0, 0.5],
      [30, 0, wallZ],
      [-30, 0, wallZ],
    ],
    [0, 1, 0],
  );
  surface(
    sc,
    hex("#c3c8cc"),
    [
      [-30, 0, wallZ],
      [30, 0, wallZ],
      [30, 12, wallZ],
      [-30, 12, wallZ],
    ],
    [0, 0, -1],
  );
  // Corrugated panels.
  for (let x = -30; x < 30; x += 0.5) {
    surface(
      sc,
      hex("#b2b8bd"),
      [
        [x, 0.9, wallZ - 0.01],
        [x + 0.2, 0.9, wallZ - 0.01],
        [x + 0.2, 12, wallZ - 0.01],
        [x, 12, wallZ - 0.01],
      ],
      [0, 0, -1],
    );
  }
  // Painted base band.
  surface(
    sc,
    hex("#4b5562"),
    [
      [-30, 0, wallZ - 0.02],
      [30, 0, wallZ - 0.02],
      [30, 0.9, wallZ - 0.02],
      [-30, 0.9, wallZ - 0.02],
    ],
    [0, 0, -1],
  );
  for (const d of sc.items) d.depth += 1000;

  const doors = [-7.2, -2.4, 2.4, 7.2];
  const states = ["closed", "open", "half", "closed"] as const;
  const front = wallZ - 0.03;
  doors.forEach((cx, i) => {
    const x0 = cx - 1.55;
    const x1 = cx + 1.55;
    const state = states[i]!;
    // Frame, dark opening, and the roller door at its height.
    surface(
      sc,
      hex("#2b2f35"),
      [
        [x0 - 0.18, 0, front],
        [x1 + 0.18, 0, front],
        [x1 + 0.18, 3.75, front],
        [x0 - 0.18, 3.75, front],
      ],
      [0, 0, -1],
    );
    surface(
      sc,
      hex("#15181c"),
      [
        [x0, 0, front - 0.01],
        [x1, 0, front - 0.01],
        [x1, 3.5, front - 0.01],
        [x0, 3.5, front - 0.01],
      ],
      [0, 0, -1],
      { emit: true },
    );
    const top = state === "closed" ? 0 : state === "half" ? 1.8 : 3.3;
    if (state === "open") {
      // The trailer inside: walls in perspective and a few loads.
      const tz = front + 0.01;
      surface(
        sc,
        hex("#5e6670"),
        [
          [x0 + 0.2, 0.2, tz],
          [x0 + 0.2, 0.2, tz + 12],
          [x0 + 0.2, 3.1, tz + 12],
          [x0 + 0.2, 3.1, tz],
        ],
        [1, 0, 0],
      );
      surface(
        sc,
        hex("#4f5760"),
        [
          [x1 - 0.2, 0.2, tz],
          [x1 - 0.2, 0.2, tz + 12],
          [x1 - 0.2, 3.1, tz + 12],
          [x1 - 0.2, 3.1, tz],
        ],
        [-1, 0, 0],
      );
      surface(
        sc,
        hex("#7a8189"),
        [
          [x0 + 0.2, 0.2, tz],
          [x1 - 0.2, 0.2, tz],
          [x1 - 0.2, 0.2, tz + 12],
          [x0 + 0.2, 0.2, tz + 12],
        ],
        [0, 1, 0],
      );
      surface(
        sc,
        hex("#3b4249"),
        [
          [x0 + 0.2, 0.2, tz + 12],
          [x1 - 0.2, 0.2, tz + 12],
          [x1 - 0.2, 3.1, tz + 12],
          [x0 + 0.2, 3.1, tz + 12],
        ],
        [0, 0, -1],
      );
      for (const d of sc.items.slice(-4)) d.depth = 600;
      const inside: { depth: number; svg: string }[] = [];
      const keep = sc.items;
      sc.items = inside;
      for (let k = 0; k < 4; k++)
        load(sc, r, [x0 + 0.4, x0 + 1.5], 0.2, [tz + 4 + k * 1.3, tz + 5.1 + k * 1.3], 1.6);
      for (let k = 0; k < 3; k++)
        load(sc, r, [x0 + 1.65, x1 - 0.35], 0.2, [tz + 5.5 + k * 1.3, tz + 6.6 + k * 1.3], 1.6);
      for (const d of inside) d.depth = 400 + d.depth;
      sc.items = keep.concat(inside);
    }
    if (top < 3.4) {
      const t0 = top;
      const zz = front - 0.02;
      surface(
        sc,
        hex("#8b98a8"),
        [
          [x0, t0, zz],
          [x1, t0, zz],
          [x1, 3.5, zz],
          [x0, 3.5, zz],
        ],
        [0, 0, -1],
      );
      for (let y = t0 + 0.12; y < 3.5; y += 0.24) {
        surface(
          sc,
          hex("#76838f"),
          [
            [x0, y, zz - 0.005],
            [x1, y, zz - 0.005],
            [x1, y + 0.03, zz - 0.005],
            [x0, y + 0.03, zz - 0.005],
          ],
          [0, 0, -1],
        );
      }
      if (state === "half") {
        surface(
          sc,
          hex("#fff2cc"),
          [
            [x0, 0.002, front - 0.05],
            [x1, 0.002, front - 0.05],
            [x1 + 0.6, 0.002, front - 2.6],
            [x0 - 0.6, 0.002, front - 2.6],
          ],
          [0, 1, 0],
          { emit: true, alpha: 0.18 },
        );
      }
    } else {
      surface(
        sc,
        hex("#8b98a8"),
        [
          [x0, 3.3, front - 0.02],
          [x1, 3.3, front - 0.02],
          [x1, 3.5, front - 0.02],
          [x0, 3.5, front - 0.02],
        ],
        [0, 0, -1],
      );
    }
    for (const d of sc.items) if (d.depth < 400) d.depth = Math.max(d.depth, 800);
    // Bumpers and a leveler plate.
    box(sc, "#1f2226", [x0 - 0.1, x0 + 0.25], [0.0, 0.55], [front - 0.25, front]);
    box(sc, "#1f2226", [x1 - 0.25, x1 + 0.1], [0.0, 0.55], [front - 0.25, front]);
    surface(
      sc,
      hex("#6f777f"),
      [
        [x0 + 0.3, 0.004, front - 1.3],
        [x1 - 0.3, 0.004, front - 1.3],
        [x1 - 0.3, 0.004, front],
        [x0 + 0.3, 0.004, front],
      ],
      [0, 1, 0],
    );
    // Signal light.
    box(
      sc,
      state === "open" ? "#41d17a" : "#ef5a4b",
      [x1 + 0.35, x1 + 0.6],
      [2.6, 2.85],
      [front - 0.1, front],
      true,
    );
    // Hazard zone: yellow outline and diagonal hatch.
    const hz0 = front - 4.2;
    const hz1 = front - 1.5;
    const Y = hex("#e3b23c");
    surface(
      sc,
      Y,
      [
        [x0, 0.004, hz0],
        [x0 + 0.1, 0.004, hz0],
        [x0 + 0.1, 0.004, hz1],
        [x0, 0.004, hz1],
      ],
      [0, 1, 0],
    );
    surface(
      sc,
      Y,
      [
        [x1 - 0.1, 0.004, hz0],
        [x1, 0.004, hz0],
        [x1, 0.004, hz1],
        [x1 - 0.1, 0.004, hz1],
      ],
      [0, 1, 0],
    );
    surface(
      sc,
      Y,
      [
        [x0, 0.004, hz0],
        [x1, 0.004, hz0],
        [x1, 0.004, hz0 + 0.1],
        [x0, 0.004, hz0 + 0.1],
      ],
      [0, 1, 0],
    );
    for (let k = 0; k < 7; k++) {
      const a = x0 + 0.25 + k * 0.42;
      surface(
        sc,
        Y,
        [
          [a, 0.004, hz0 + 0.25],
          [a + 0.12, 0.004, hz0 + 0.25],
          [Math.min(a + 0.62, x1 - 0.2), 0.004, hz1 - 0.1],
          [Math.min(a + 0.5, x1 - 0.32), 0.004, hz1 - 0.1],
        ],
        [0, 1, 0],
      );
    }
    for (const d of sc.items) if (d.depth < 400) d.depth = Math.max(d.depth, 700);
    // Door number plate.
    const [px, py] = project(sc.cam, [cx, 4.3, front]);
    sc.items.push({
      depth: 650,
      svg: `<g><rect x="${n(px - 34)}" y="${n(py - 20)}" width="68" height="40" rx="4" fill="#20252c"/><text x="${n(px)}" y="${n(py + 10)}" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" font-size="27" fill="#f2f2f0">A${i + 1}</text></g>`,
    });
  });

  // Floor walkway band in front of the doors.
  surface(
    sc,
    hex("#e9edf0"),
    [
      [-30, 0.005, 9.4],
      [30, 0.005, 9.4],
      [30, 0.005, 9.55],
      [-30, 0.005, 9.55],
    ],
    [0, 1, 0],
  );
  for (const d of sc.items) if (d.depth < 400) d.depth = Math.max(d.depth, 700);

  // Staged loads, a pallet jack and the people.
  const stage: [number, number, number][] = [
    [-8.6, -7.4, 6.2],
    [-7.1, -5.9, 6.2],
    [-8.6, -7.4, 4.6],
    [-3.6, -2.4, 7.2],
    [3.6, 4.8, 5.4],
    [5.1, 6.3, 5.4],
    [7.4, 8.6, 7.0],
  ];
  for (const [a, b, z] of stage) {
    load(sc, r, [a, b], 0, [z, z + 1.2], 1.5);
    markBox(sc, "pallet", [a, b], [0, 1.64], [z, z + 1.2]);
  }
  // A pallet jack under a load, its handle raised toward the camera.
  box(sc, "#d4472f", [0.05, 0.3], [0.02, 0.1], [5.3, 6.6]);
  box(sc, "#d4472f", [0.8, 1.05], [0.02, 0.1], [5.3, 6.6]);
  load(sc, rng(31), [0, 1.1], 0.1, [5.4, 6.6], 1.2);
  markBox(sc, "pallet jack", [0, 1.1], [0, 1.34], [4.72, 6.6]);
  box(sc, "#d4472f", [0.25, 0.85], [0.02, 0.55], [5.0, 5.3]);
  box(sc, "#2a2e35", [0.52, 0.58], [0.55, 1.3], [4.75, 4.81]);
  box(sc, "#2a2e35", [0.38, 0.72], [1.28, 1.34], [4.72, 4.84]);
  person(sc, -1.2, 6.4);
  person(sc, 6.1, 9.0, "#ff8a3d");

  const defs = `
  <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0.55" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0.07"/>
  </linearGradient>`;
  return render(
    sc,
    W,
    H,
    `<rect width="${W}" height="${H}" fill="#b9bfc5"/>`,
    defs,
    `<rect width="${W}" height="${H}" fill="url(#sheen)"/>`,
    0.45,
    0.4,
  );
}

// ------------------------------------------------------------ overhead scenes

function parcel(
  r: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
  angle: number,
  frame: number,
) {
  const a = (frame * Math.PI) / 180;
  const cx = W / 2 + x * Math.cos(a) - y * Math.sin(a);
  const cy = H / 2 + x * Math.sin(a) + y * Math.cos(a);
  const half = Math.max(w, h) / 2;
  if (cx > half && cx < W - half && cy > half && cy < H - half)
    mark("parcel", cx - half, cy - half, cx + half, cy + half);
  const c = pick(r, ["#cfa877", "#c39a69", "#d8b88f", "#b98f5f", "#e2e4e7", "#cfa877"]);
  const white = c === "#e2e4e7";
  const tape = white ? "#5d8fcf" : "#e7d3ae";
  const label = r() < 0.75;
  const lx = (r() - 0.5) * w * 0.3;
  const ly = (r() - 0.5) * h * 0.3;
  const bars = Array.from({ length: 9 }, (_, i) => {
    const bw = 0.8 + r() * 1.6;
    return `<rect x="${n(lx - w * 0.14 + i * w * 0.032)}" y="${n(ly + h * 0.02)}" width="${n(bw)}" height="${n(h * 0.09)}" fill="#2a2d31"/>`;
  }).join("");
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(angle)})">
    <rect x="${n(-w / 2 + 6)}" y="${n(-h / 2 + 9)}" width="${n(w)}" height="${n(h)}" rx="3" fill="#000" fill-opacity="0.28" filter="url(#soft)"/>
    <rect x="${n(-w / 2)}" y="${n(-h / 2)}" width="${n(w)}" height="${n(h)}" rx="3" fill="${c}"/>
    <rect x="${n(-w / 2)}" y="${n(-h / 2)}" width="${n(w)}" height="${n(h)}" rx="3" fill="url(#boxlight)"/>
    <rect x="${n(-w / 2)}" y="${n(-h * 0.06)}" width="${n(w)}" height="${n(h * 0.12)}" fill="${tape}" fill-opacity="0.85"/>
    ${
      label
        ? `<rect x="${n(lx - w * 0.17)}" y="${n(ly - h * 0.14)}" width="${n(w * 0.34)}" height="${n(h * 0.28)}" rx="2" fill="#f7f7f4"/>
    <rect x="${n(lx - w * 0.14)}" y="${n(ly - h * 0.1)}" width="${n(w * 0.16)}" height="${n(h * 0.04)}" fill="#2a2d31" fill-opacity="0.7"/>${bars}`
        : ""
    }
  </g>`;
}

function conveyor({ seed, yaw = -14 }: Shot) {
  const r = rng(seed);
  const belts: string[] = [];
  const parcels: string[] = [];
  // Two belts merging, drawn in a rotated frame.
  const belt = (y: number, w: number, len: number) => {
    let ribs = "";
    for (let x = -len / 2; x < len / 2; x += 26)
      ribs += `<rect x="${x}" y="${y - w / 2}" width="2" height="${w}" fill="#000" fill-opacity="0.18"/>`;
    return `<rect x="${-len / 2 - 20}" y="${y - w / 2 - 26}" width="${len + 40}" height="${w + 52}" fill="#7b838c"/>
      <rect x="${-len / 2 - 20}" y="${y - w / 2 - 26}" width="${len + 40}" height="8" fill="#e3b23c"/>
      <rect x="${-len / 2 - 20}" y="${y + w / 2 + 18}" width="${len + 40}" height="8" fill="#e3b23c"/>
      <rect x="${-len / 2}" y="${y - w / 2 - 14}" width="${len}" height="${w + 28}" fill="#4a5059"/>
      <rect x="${-len / 2}" y="${y - w / 2}" width="${len}" height="${w}" fill="#2b2f35"/>${ribs}`;
  };
  belts.push(belt(-150, 260, 2600));
  belts.push(belt(230, 220, 2600));
  let x = -1100;
  while (x < 1100) {
    const w = 110 + r() * 120;
    const h = 90 + r() * 120;
    parcels.push(
      parcel(r, x + w / 2, -150 + (r() - 0.5) * 60, w, Math.min(h, 220), (r() - 0.5) * 24, yaw),
    );
    x += w + 40 + r() * 140;
  }
  x = -1150;
  while (x < 1100) {
    const w = 90 + r() * 110;
    const h = 80 + r() * 100;
    parcels.push(
      parcel(r, x + w / 2, 230 + (r() - 0.5) * 50, w, Math.min(h, 180), (r() - 0.5) * 30, yaw),
    );
    x += w + 60 + r() * 160;
  }
  // A scanner gantry across the top belt.
  const gantry = `<rect x="190" y="-316" width="70" height="380" rx="6" fill="#000" fill-opacity="0.3" filter="url(#soft)"/>
    <rect x="180" y="-330" width="70" height="380" rx="6" fill="#2e333a"/>`;
  const scan = `<rect x="208" y="-300" width="14" height="320" fill="#ff5a3c" fill-opacity="0.65"/>
    <rect x="200" y="-300" width="30" height="320" fill="#ff5a3c" fill-opacity="0.12"/>`;
  const defs = `
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
  <linearGradient id="boxlight" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.12"/>
  </linearGradient>`;
  const body = `<rect width="${W}" height="${H}" fill="#9ca3a9"/>
  <g transform="translate(${W / 2} ${H / 2}) rotate(${yaw})">
    ${belts.join("\n")}
    ${parcels.join("\n")}
    ${gantry}${scan}
  </g>`;
  return svg(W, H, body, defs, 0.45, 0.4);
}

function vehicle(
  r: () => number,
  x: number,
  y: number,
  angle: number,
  kind: "truck" | "van" | "car",
) {
  const len = kind === "truck" ? 330 : kind === "van" ? 120 : 92;
  const wid = kind === "truck" ? 66 : kind === "van" ? 50 : 44;
  const colors =
    kind === "car"
      ? ["#e9ecef", "#2f3640", "#8a96a3", "#b23a2f", "#e9ecef", "#3d5f8f"]
      : ["#f3f4f2", "#e46a2e", "#3d5f8f", "#d8dcdf", "#47705a"];
  const across = Math.abs(Math.sin((angle * Math.PI) / 180)) > 0.7;
  const [bw, bh] = across ? [wid, len] : [len, wid];
  mark(kind, x - bw / 2, y - bh / 2, x + bw / 2, y + bh / 2);
  const body = pick(r, colors);
  const cab = pick(r, ["#e9ecef", "#2f3640", "#b23a2f", "#3d5f8f"]);
  let shape: string;
  if (kind === "truck") {
    const ribs = Array.from(
      { length: 12 },
      (_, i) =>
        `<rect x="${n(-len / 2 + 20 + i * 22)}" y="${-wid / 2 + 4}" width="1.5" height="${wid - 8}" fill="#000" fill-opacity="0.08"/>`,
    ).join("");
    shape = `<rect x="${-len / 2}" y="${-wid / 2}" width="${len - 70}" height="${wid}" rx="3" fill="${body}"/>${ribs}
      <rect x="${len / 2 - 62}" y="${-wid / 2 + 4}" width="62" height="${wid - 8}" rx="8" fill="${cab}"/>
      <rect x="${len / 2 - 22}" y="${-wid / 2 + 9}" width="14" height="${wid - 18}" rx="3" fill="#20262d" fill-opacity="0.85"/>`;
  } else {
    shape = `<rect x="${-len / 2}" y="${-wid / 2}" width="${len}" height="${wid}" rx="${kind === "car" ? 14 : 8}" fill="${body}"/>
      <rect x="${n(len * 0.12)}" y="${-wid / 2 + 6}" width="${n(len * 0.16)}" height="${wid - 12}" rx="4" fill="#20262d" fill-opacity="0.85"/>
      ${kind === "car" ? `<rect x="${n(-len * 0.36)}" y="${-wid / 2 + 7}" width="${n(len * 0.12)}" height="${wid - 14}" rx="3" fill="#20262d" fill-opacity="0.7"/>` : ""}`;
  }
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(angle)})">
    <rect x="${-len / 2 + 10}" y="${-wid / 2 + 14}" width="${len}" height="${wid}" rx="8" fill="#000" fill-opacity="0.32" filter="url(#soft)"/>
    ${shape}
    <rect x="${-len / 2}" y="${-wid / 2}" width="${len}" height="${wid}" rx="6" fill="url(#roof)"/>
  </g>`;
}

function yard({ seed }: Shot) {
  const r = rng(seed);
  const parts: string[] = [];
  // Asphalt, the building edge with docks, painted stalls.
  parts.push(`<rect width="${W}" height="${H}" fill="#5d6268"/>`);
  for (let i = 0; i < 260; i++) {
    parts.push(
      `<circle cx="${n(r() * W)}" cy="${n(r() * H)}" r="${n(10 + r() * 50)}" fill="${r() < 0.5 ? "#000" : "#fff"}" fill-opacity="${n(0.015 + r() * 0.03)}"/>`,
    );
  }
  parts.push(
    `<rect width="${W}" height="150" fill="#c9ced3"/><rect y="150" width="${W}" height="10" fill="#8e959c"/>`,
  );
  for (let x = 40; x < W; x += 90)
    parts.push(`<rect x="${x}" y="20" width="44" height="44" rx="4" fill="#b7bdc3"/>`);
  for (let i = 0; i < 12; i++) {
    const x = 70 + i * 128;
    parts.push(`<rect x="${x}" y="160" width="86" height="16" fill="#25292e"/>`);
    parts.push(
      `<text x="${x + 43}" y="140" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" font-size="22" fill="#5d6268">D${String(i + 1).padStart(2, "0")}</text>`,
    );
    parts.push(
      `<rect x="${x - 21}" y="176" width="4" height="380" fill="#eef0f1" fill-opacity="0.85"/>`,
    );
  }
  parts.push(
    `<rect x="0" y="600" width="${W}" height="6" fill="#e3b23c"/><rect x="0" y="614" width="${W}" height="6" fill="#e3b23c"/>`,
  );
  for (let x = 20; x < W; x += 120)
    parts.push(`<rect x="${x}" y="752" width="60" height="6" fill="#eef0f1" fill-opacity="0.8"/>`);
  // Car stalls at the bottom.
  for (let x = 30; x < W; x += 74)
    parts.push(`<rect x="${x}" y="806" width="4" height="94" fill="#eef0f1" fill-opacity="0.8"/>`);
  // Trucks backed into docks, one pulling out, a van, parked cars.
  const docked = [0, 1, 3, 4, 6, 7, 8, 10];
  for (const i of docked) parts.push(vehicle(r, 113 + i * 128, 350 + r() * 14, 90, "truck"));
  parts.push(vehicle(r, 1030, 690, 178, "truck"));
  parts.push(vehicle(r, 330, 700, 4, "van"));
  for (let x = 67; x < W; x += 74)
    if (r() < 0.62) parts.push(vehicle(r, x, 856, 90 + (r() - 0.5) * 6, "car"));
  // Two people walking the apron.
  for (const [px, py, c] of [
    [598, 560, "#d7f04a"],
    [1312, 600, "#ff8a3d"],
  ] as const) {
    mark("person", px - 14, py - 14, px + 14, py + 14);
    parts.push(
      `<circle cx="${px + 4}" cy="${py + 6}" r="12" fill="#000" fill-opacity="0.3" filter="url(#soft)"/><circle cx="${px}" cy="${py}" r="11" fill="${c}"/><circle cx="${px}" cy="${py}" r="6" fill="#f4f4f2"/>`,
    );
  }
  const defs = `
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
  <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.2"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.1"/>
  </linearGradient>`;
  return svg(W, H, parts.join("\n  "), defs, 0.5, 0.35);
}

function floor({ seed }: Shot) {
  const r = rng(seed);
  const parts: string[] = [];
  parts.push(`<rect width="${W}" height="${H}" fill="#b4b9bd"/>`);
  for (let i = 0; i < 140; i++) {
    parts.push(
      `<circle cx="${n(r() * W)}" cy="${n(r() * H)}" r="${n(20 + r() * 70)}" fill="${r() < 0.5 ? "#000" : "#fff"}" fill-opacity="${n(0.012 + r() * 0.025)}"/>`,
    );
  }
  // Slab joints.
  for (let x = 0; x < W; x += 200)
    parts.push(`<rect x="${x}" y="0" width="2" height="${H}" fill="#000" fill-opacity="0.08"/>`);
  for (let y = 0; y < H; y += 200)
    parts.push(`<rect x="0" y="${y}" width="${W}" height="2" fill="#000" fill-opacity="0.08"/>`);
  // Two storage bays with floor-marked slots.
  const slot = 150;
  const bays = [
    { x: 90, y: 90, cols: 4, rows: 2, id: "B11" },
    { x: 90, y: 520, cols: 4, rows: 2, id: "B12" },
  ];
  for (const b of bays) {
    parts.push(
      `<text x="${b.x}" y="${b.y - 22}" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" font-size="26" fill="#40464d" fill-opacity="0.75">${b.id}</text>`,
    );
    for (let i = 0; i < b.cols; i++)
      for (let j = 0; j < b.rows; j++) {
        const sx = b.x + i * (slot + 20);
        const sy = b.y + j * (slot + 20);
        parts.push(
          `<rect x="${sx}" y="${sy}" width="${slot}" height="${slot}" fill="none" stroke="#e3b23c" stroke-width="5"/>`,
        );
        if (r() < 0.2) continue;
        // Pallet from above: deck boards, then a carton grid on top.
        const p = 10;
        parts.push(
          `<rect x="${sx + p + 6}" y="${sy + p + 10}" width="${slot - p * 2}" height="${slot - p * 2}" rx="3" fill="#000" fill-opacity="0.3" filter="url(#soft)"/>`,
        );
        parts.push(
          `<rect x="${sx + p}" y="${sy + p}" width="${slot - p * 2}" height="${slot - p * 2}" fill="#a77c50"/>`,
        );
        for (let k = 0; k < 5; k++)
          parts.push(
            `<rect x="${sx + p}" y="${n(sy + p + 4 + k * 26)}" width="${slot - p * 2}" height="18" fill="#bd9264"/>`,
          );
        if (r() < 0.15) continue;
        const wrap = r() < 0.25;
        const n2 = r() < 0.5 ? 2 : 3;
        const cw = (slot - p * 2 - 8) / n2;
        for (let a = 0; a < n2; a++)
          for (let c = 0; c < n2; c++) {
            const col = wrap ? "#dfe3e7" : pick(r, CARTONS);
            parts.push(
              `<rect x="${n(sx + p + 4 + a * cw + 1.5)}" y="${n(sy + p + 4 + c * cw + 1.5)}" width="${n(cw - 3)}" height="${n(cw - 3)}" rx="2" fill="${col}"/>`,
            );
            if (!wrap)
              parts.push(
                `<rect x="${n(sx + p + 4 + a * cw + 1.5)}" y="${n(sy + p + 4 + c * cw + cw / 2 - 3)}" width="${n(cw - 3)}" height="6" fill="#e7d3ae" fill-opacity="0.8"/>`,
              );
          }
        if (wrap)
          parts.push(
            `<rect x="${sx + p + 2}" y="${sy + p + 2}" width="${slot - p * 2 - 4}" height="${slot - p * 2 - 4}" rx="4" fill="#fff" fill-opacity="0.35"/>`,
          );
      }
  }
  // Travel lane with arrows.
  parts.push(
    `<rect x="830" y="0" width="6" height="${H}" fill="#e3b23c"/><rect x="1080" y="0" width="6" height="${H}" fill="#e3b23c"/>`,
  );
  for (let y = 60; y < H; y += 220)
    parts.push(
      `<path d="M945 ${y + 70}l12 0 0 -40 18 0 -24 -30 -24 30 18 0z" fill="#eef0f1" fill-opacity="0.85"/>`,
    );
  // A forklift from above, carrying a pallet.
  mark("forklift", 910, 338, 1020, 622);
  parts.push(`<g transform="translate(960 470) rotate(-90)">
    <rect x="-70" y="-48" width="200" height="106" rx="14" fill="#000" fill-opacity="0.3" filter="url(#soft)" transform="translate(8 12)"/>
    <rect x="-150" y="-40" width="100" height="80" fill="#a77c50"/><rect x="-148" y="-38" width="96" height="76" fill="#cfa877"/><rect x="-148" y="-4" width="96" height="8" fill="#e7d3ae"/>
    <rect x="-58" y="-46" width="12" height="92" fill="#2f343b"/>
    <rect x="-46" y="-44" width="170" height="88" rx="14" fill="#e8b23a"/>
    <rect x="-20" y="-38" width="90" height="76" rx="8" fill="#2f343b"/>
    <rect x="-14" y="-32" width="78" height="64" rx="6" fill="url(#roof)"/>
    <rect x="86" y="-40" width="34" height="80" rx="10" fill="#c99a2e"/>
  </g>`);
  // People.
  for (const [px, py, c] of [
    [1130, 250, "#d7f04a"],
    [300, 468, "#ff8a3d"],
    [720, 420, "#d7f04a"],
  ] as const) {
    mark("person", px - 26, py - 26, px + 26, py + 26);
    parts.push(
      `<circle cx="${px + 5}" cy="${py + 8}" r="20" fill="#000" fill-opacity="0.3" filter="url(#soft)"/><ellipse cx="${px}" cy="${py}" rx="24" ry="15" fill="${c}"/><circle cx="${px}" cy="${py}" r="11" fill="#f4f4f2"/>`,
    );
  }
  // Racking along the right edge.
  for (let y = 0; y < H; y += 150) {
    parts.push(`<rect x="1180" y="${y}" width="330" height="140" fill="#3b4048"/>`);
    parts.push(
      `<rect x="1180" y="${y}" width="330" height="10" fill="#e2682c"/><rect x="1180" y="${y + 130}" width="330" height="10" fill="#e2682c"/>`,
    );
    for (let k = 0; k < 3; k++) {
      const col = pick(r, CARTONS);
      parts.push(
        `<rect x="${1192 + k * 106}" y="${y + 18}" width="98" height="104" rx="2" fill="${col}"/><rect x="${1192 + k * 106}" y="${y + 66}" width="98" height="7" fill="#e7d3ae" fill-opacity="0.8"/>`,
      );
    }
  }
  parts.push(`<rect x="1510" y="0" width="90" height="${H}" fill="#9aa1a7"/>`);
  const defs = `
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
  <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.2"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.1"/>
  </linearGradient>`;
  return svg(W, H, parts.join("\n  "), defs, 0.45, 0.35);
}

/** Night infrared: luminance only, a green-grey cast, lifted blacks. */
const infrared = (c: Rgb): Rgb => {
  const l = (0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]) / 255;
  const v = 0.08 + Math.pow(l, 1.25) * 0.86;
  return [v * 205, v * 228, v * 210];
};

// --------------------------------------------------------------------- robots

/** A flat disc (a wheel hub, a lidar puck) as a polygon around a vertical axis. */
function disc(
  sc: Scene,
  color: string,
  [x, z]: [number, number],
  y: number,
  r: number,
  emit = false,
) {
  const pts: Vec3[] = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return [x + Math.cos(a) * r, y, z + Math.sin(a) * r];
  });
  surface(sc, hex(color), pts, [0, 1, 0], { emit });
  const before = sc.items.length - 1;
  if (before >= 0) sc.items[before]!.depth = Math.hypot(x, y - sc.cam.h, z) - 0.01;
}

/** A puck standing on the floor: a stack of thin discs reads as a cylinder in flat shading. */
function puck(
  sc: Scene,
  color: string,
  [x, z]: [number, number],
  [y0, y1]: [number, number],
  r: number,
) {
  const side = mix(hex(color), [0, 0, 0], 0.3);
  for (let y = y0; y < y1; y += (y1 - y0) / 6) disc(sc, css(side), [x, z], y, r);
  disc(sc, color, [x, z], y1, r);
}

interface Robot {
  slug: string;
  bg: string;
  /** The point the camera centres on: [height, depth] of the subject's middle. */
  aim: [number, number];
  /** Focal length: how tightly the subject fills the square. */
  f: number;
  draw: (sc: Scene) => void;
}

const SHELL = "#eceef0";
const GRAPHITE = "#2c3138";
const RUBBER = "#1f2328";

/** Four wheels tucked under a chassis footprint. */
function wheels(sc: Scene, [x0, x1]: [number, number], [z0, z1]: [number, number], r = 0.09) {
  for (const x of [x0 + 0.04, x1 - 0.12])
    for (const z of [z0 + 0.1, z1 - 0.28])
      box(sc, RUBBER, [x, x + 0.08], [0, r * 2], [z, z + r * 2]);
}

const ROBOTS: Robot[] = [
  {
    // Mobile manipulator: a base, a column and an arm that reaches for a tote.
    slug: "atlas",
    aim: [0.8, 4],
    f: 760,
    bg: "#f3dccd",
    draw(sc) {
      wheels(sc, [-0.45, 0.45], [3.4, 4.6]);
      // Stacked, never nested, so the painter's sort keeps each band in place.
      box(sc, GRAPHITE, [-0.46, 0.46], [0.08, 0.16], [3.39, 4.61]);
      box(sc, SHELL, [-0.45, 0.45], [0.16, 0.32], [3.4, 4.6]);
      box(sc, "#e2682c", [-0.46, 0.46], [0.32, 0.36], [3.39, 4.61]);
      box(sc, SHELL, [-0.45, 0.45], [0.36, 0.42], [3.4, 4.6]);
      box(sc, "#4fd1c5", [-0.3, 0.3], [0.2, 0.25], [3.38, 3.4], true);
      puck(sc, GRAPHITE, [0, 3.62], [0.42, 0.52], 0.1);
      box(sc, SHELL, [-0.14, 0.14], [0.42, 1.45], [4.2, 4.48]);
      box(sc, GRAPHITE, [-0.15, 0.15], [1.2, 1.26], [4.19, 4.49]);
      box(sc, SHELL, [-0.1, 0.1], [1.45, 1.62], [3.7, 4.42]);
      box(sc, GRAPHITE, [-0.11, 0.11], [1.47, 1.6], [3.68, 3.82]);
      box(sc, SHELL, [-0.08, 0.08], [1.1, 1.5], [3.62, 3.78]);
      box(sc, GRAPHITE, [-0.14, 0.14], [1.02, 1.1], [3.58, 3.82]);
      box(sc, "#3d6fb0", [-0.22, 0.22], [0.52, 0.78], [3.48, 3.96]);
      box(sc, "#5585c4", [-0.2, 0.2], [0.78, 0.8], [3.5, 3.94]);
    },
  },
  {
    // Tugger: a low yellow tractor towing a cart of blue totes.
    slug: "kestrel",
    aim: [0.45, 4.05],
    f: 640,
    bg: "#f1e5c4",
    draw(sc) {
      wheels(sc, [-0.32, 0.32], [3.0, 3.8]);
      box(sc, GRAPHITE, [-0.33, 0.33], [0.08, 0.15], [2.99, 3.81]);
      box(sc, "#e8b23a", [-0.32, 0.32], [0.15, 0.4], [3.0, 3.8]);
      box(sc, GRAPHITE, [-0.2, 0.2], [0.4, 0.62], [3.45, 3.75]);
      box(sc, "#4fd1c5", [-0.16, 0.16], [0.5, 0.54], [3.44, 3.45], true);
      puck(sc, GRAPHITE, [0, 3.18], [0.4, 0.48], 0.08);
      box(sc, GRAPHITE, [-0.04, 0.04], [0.2, 0.26], [3.8, 4.05]);
      wheels(sc, [-0.36, 0.36], [4.05, 5.1], 0.07);
      box(sc, "#9aa3ad", [-0.36, 0.36], [0.14, 0.2], [4.05, 5.1]);
      for (const y of [0.2, 0.52])
        for (const z of [4.1, 4.6]) box(sc, "#3d6fb0", [-0.33, 0.33], [y, y + 0.3], [z, z + 0.45]);
      box(sc, "#9aa3ad", [-0.36, -0.33], [0.2, 0.9], [4.05, 4.08]);
      box(sc, "#9aa3ad", [0.33, 0.36], [0.2, 0.9], [4.05, 4.08]);
    },
  },
  {
    // Pallet mover: a wide graphite platform carrying a loaded pallet.
    slug: "orca",
    aim: [0.6, 4],
    f: 820,
    bg: "#cfe3e3",
    draw(sc) {
      wheels(sc, [-0.55, 0.55], [3.3, 4.7], 0.07);
      box(sc, GRAPHITE, [-0.55, 0.55], [0.08, 0.24], [3.3, 4.7]);
      box(sc, "#2fb3a5", [-0.56, 0.56], [0.24, 0.27], [3.29, 4.71]);
      box(sc, GRAPHITE, [-0.55, 0.55], [0.27, 0.34], [3.3, 4.7]);
      box(sc, "#4fd1c5", [-0.4, 0.4], [0.14, 0.18], [3.28, 3.3], true);
      load(sc, rng(91), [-0.52, 0.52], 0.34, [3.4, 4.6], 0.9);
    },
  },
  {
    // Inventory scanner: a slim base with a mast of cameras that reads rack labels.
    slug: "heron",
    aim: [1.0, 4],
    f: 600,
    bg: "#dbe2f1",
    draw(sc) {
      wheels(sc, [-0.3, 0.3], [3.6, 4.4]);
      box(sc, GRAPHITE, [-0.31, 0.31], [0.08, 0.15], [3.59, 4.41]);
      box(sc, SHELL, [-0.3, 0.3], [0.15, 0.3], [3.6, 4.4]);
      box(sc, "#3d6fb0", [-0.31, 0.31], [0.3, 0.33], [3.59, 4.41]);
      box(sc, SHELL, [-0.3, 0.3], [0.33, 0.4], [3.6, 4.4]);
      box(sc, SHELL, [-0.07, 0.07], [0.4, 2.0], [3.95, 4.09]);
      for (const y of [0.75, 1.2, 1.65]) {
        box(sc, GRAPHITE, [-0.16, 0.16], [y, y + 0.14], [3.86, 3.96]);
        box(sc, "#4fd1c5", [-0.1, -0.04], [y + 0.05, y + 0.09], [3.85, 3.86], true);
        box(sc, "#4fd1c5", [0.04, 0.1], [y + 0.05, y + 0.09], [3.85, 3.86], true);
      }
      box(sc, "#e2682c", [-0.05, 0.05], [2.0, 2.06], [3.97, 4.07], true);
    },
  },
];

function robot({ bg, draw, aim, f }: Robot) {
  const S = 512;
  const sc: Scene = {
    cam: {
      h: 2.4,
      pitch: 0.42,
      f,
      cx: S / 2,
      cy: S / 2,
      spin: { angle: -0.62, pivot: [0, 4] },
    },
    haze: hex(bg),
    fog: 400,
    frame: [S, S],
    light: LIGHT,
    items: [],
  };
  // Centre the aim point, then draw.
  const [ax, ay] = project(sc.cam, [0, aim[0], aim[1]]);
  sc.cam.cx += S / 2 - ax;
  sc.cam.cy += S / 2 - ay;
  draw(sc);
  const [gx, gy] = project(sc.cam, [0, 0, aim[1]]);
  const body = sc.items
    .sort((a, b) => b.depth - a.depth)
    .map((i) => i.svg)
    .join("\n  ");
  return svg(
    S,
    S,
    `<rect width="${S}" height="${S}" fill="${bg}"/>
  <circle cx="${S * 0.78}" cy="${S * 0.16}" r="${S * 0.42}" fill="#fff" fill-opacity="0.28"/>
  <ellipse cx="${n(gx)}" cy="${n(gy + 6)}" rx="${S * 0.36}" ry="${S * 0.1}" fill="#000" fill-opacity="0.12" filter="url(#soft)"/>
  ${body}`,
    `<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>`,
    0.2,
    0,
  );
}

// ------------------------------------------------------------------ portraits

interface Person {
  slug: string;
  bg: string;
  skin: string;
  hair: string;
  style: "short" | "long" | "bun" | "curly" | "buzz" | "wave" | "bob" | "cover";
  top: string;
  beard?: boolean;
  glasses?: boolean;
}

const PEOPLE: Person[] = [
  {
    slug: "sofia-brennan",
    bg: "#f4d9c6",
    skin: "#f0c7a6",
    hair: "#6b3b24",
    style: "long",
    top: "#3d5f8f",
  },
  {
    slug: "daniel-okafor",
    bg: "#cfe0d4",
    skin: "#7a4b30",
    hair: "#1e1714",
    style: "buzz",
    top: "#e46a2e",
    beard: true,
  },
  {
    slug: "tom-becker",
    bg: "#d6dcef",
    skin: "#f1cbb0",
    hair: "#c49a5c",
    style: "short",
    top: "#2f3640",
    glasses: true,
  },
  {
    slug: "mei-tanaka",
    bg: "#f2dfe6",
    skin: "#f1d1b5",
    hair: "#1f1a19",
    style: "bob",
    top: "#47705a",
  },
  {
    slug: "lucas-moreau",
    bg: "#e7e2d2",
    skin: "#e3b48f",
    hair: "#3a2a20",
    style: "wave",
    top: "#8a96a3",
    beard: true,
  },
  {
    slug: "lena-fischer",
    bg: "#dbe6ef",
    skin: "#f6d6c0",
    hair: "#d3a85f",
    style: "bun",
    top: "#b23a2f",
  },
  {
    slug: "jonas-weber",
    bg: "#e9dccb",
    skin: "#eec3a3",
    hair: "#7a4a2a",
    style: "short",
    top: "#3d5f8f",
  },
  {
    slug: "hannah-kim",
    bg: "#e4def2",
    skin: "#efcdb0",
    hair: "#231c1a",
    style: "long",
    top: "#e9ecef",
    glasses: true,
  },
  {
    slug: "aisha-bello",
    bg: "#f1e2c8",
    skin: "#6d4129",
    hair: "#2a6f6a",
    style: "cover",
    top: "#2f3640",
  },
  {
    slug: "ravi-shah",
    bg: "#d3e5e8",
    skin: "#a86d47",
    hair: "#191413",
    style: "wave",
    top: "#e3b23c",
  },
  {
    slug: "amara-diallo",
    bg: "#f3d7cf",
    skin: "#5a3422",
    hair: "#1a1312",
    style: "curly",
    top: "#47705a",
  },
  {
    slug: "mateo-ruiz",
    bg: "#d9e4d2",
    skin: "#c88d64",
    hair: "#2a1c15",
    style: "short",
    top: "#e46a2e",
    beard: true,
    glasses: true,
  },
];

function portrait(p: Person) {
  const S = 256;
  const skin = hex(p.skin);
  const shadow = css(mix(skin, [40, 20, 10], 0.22));
  const hair = p.hair;
  const hairDark = css(mix(hex(hair), [0, 0, 0], 0.25));
  const cx = 128;
  const cy = 112;
  const behind: string[] = [];
  const front: string[] = [];
  switch (p.style) {
    case "long":
      behind.push(
        `<path d="M70 110c0-44 26-70 58-70s58 26 58 70v86c0 10-8 16-18 16H88c-10 0-18-6-18-16z" fill="${hairDark}"/>`,
      );
      front.push(
        `<path d="M76 112c0-42 22-64 52-64 32 0 54 24 52 62-16-8-30-26-36-42-14 22-42 38-68 44z" fill="${hair}"/>`,
      );
      break;
    case "bob":
      behind.push(
        `<path d="M74 108c0-40 24-64 54-64s54 24 54 64v42c0 8-6 12-14 12H88c-8 0-14-4-14-12z" fill="${hairDark}"/>`,
      );
      front.push(
        `<path d="M78 112c0-40 20-62 50-62s50 22 50 62c-10 0-26-2-36-26-4 18-40 28-64 26z" fill="${hair}"/><path d="M80 96h96v-6c-12-20-30-30-48-30s-36 10-48 30z" fill="${hair}"/>`,
      );
      break;
    case "bun":
      behind.push(`<circle cx="128" cy="44" r="24" fill="${hairDark}"/>`);
      front.push(
        `<path d="M78 112c-2-40 20-64 50-64s52 24 50 64c-6-20-24-38-50-40-26 2-44 20-50 40z" fill="${hair}"/><circle cx="128" cy="44" r="20" fill="${hair}"/>`,
      );
      break;
    case "curly": {
      const curls = [
        [90, 80, 22],
        [108, 60, 24],
        [132, 54, 25],
        [156, 64, 23],
        [172, 86, 20],
        [84, 104, 16],
        [176, 108, 15],
        [120, 72, 20],
        [146, 76, 20],
      ];
      behind.push(
        curls
          .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r! + 3}" fill="${hairDark}"/>`)
          .join(""),
      );
      front.push(
        curls
          .map(([x, y, r]) => `<circle cx="${x}" cy="${y! - 2}" r="${r}" fill="${hair}"/>`)
          .join(""),
      );
      break;
    }
    case "buzz":
      front.push(
        `<path d="M80 104c0-36 22-56 48-56s48 20 48 56c-8-14-26-24-48-24s-40 10-48 24z" fill="${hair}" fill-opacity="0.9"/>`,
      );
      break;
    case "wave":
      front.push(
        `<path d="M76 108c-4-42 22-66 54-64 30 2 50 24 48 58-8-8-12-22-14-30-14 14-40 18-62 12-8 6-16 14-26 24z" fill="${hair}"/>`,
      );
      break;
    case "cover":
      behind.push(
        `<path d="M66 116c0-50 28-78 62-78s62 28 62 78v40c0 30-26 52-62 52s-62-22-62-52z" fill="${hairDark}"/>`,
      );
      front.push(
        `<path d="M74 112c0-44 24-68 54-68s54 24 54 68c-8-26-28-46-54-46s-46 20-54 46z" fill="${hair}"/>`,
      );
      break;
    default:
      front.push(
        `<path d="M78 108c-2-38 20-60 50-60 32 0 52 22 50 56-6-10-16-18-26-20-18 4-48 4-74 24z" fill="${hair}"/><path d="M78 108c2-10 6-18 12-24" stroke="${hairDark}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      );
  }
  const beard = p.beard
    ? `<path d="M88 118c2 32 18 50 40 50s38-18 40-50c-6 10-14 16-22 16h-36c-8 0-16-6-22-16z" fill="${p.hair}" fill-opacity="0.92"/>`
    : "";
  const glasses = p.glasses
    ? `<g fill="#fff" fill-opacity="0.18" stroke="#1d2025" stroke-width="3.5"><rect x="94" y="104" width="30" height="22" rx="8"/><rect x="132" y="104" width="30" height="22" rx="8"/></g><path d="M124 113h8" stroke="#1d2025" stroke-width="3.5"/>`
    : "";
  const top = hex(p.top);
  const body = `
  <rect width="${S}" height="${S}" fill="${p.bg}"/>
  <circle cx="200" cy="40" r="90" fill="#fff" fill-opacity="0.25"/>
  ${behind.join("")}
  <path d="M40 256c0-50 38-80 88-80s88 30 88 80z" fill="${p.top}"/>
  <path d="M40 256c0-50 38-80 88-80 20 0 38 5 52 14-36 4-74 30-84 66z" fill="#fff" fill-opacity="0.12"/>
  <path d="M106 184c6 12 14 18 22 18s16-6 22-18" fill="none" stroke="${css(mix(top, [0, 0, 0], 0.25))}" stroke-width="4" stroke-linecap="round"/>
  <path d="M110 150h36v32c0 10-8 16-18 16s-18-6-18-16z" fill="${shadow}"/>
  <circle cx="81" cy="${cy + 4}" r="10" fill="${shadow}"/>
  <circle cx="175" cy="${cy + 4}" r="10" fill="${shadow}"/>
  <ellipse cx="${cx}" cy="${cy}" rx="47" ry="55" fill="${p.skin}"/>
  <ellipse cx="${cx + 16}" cy="${cy + 10}" rx="30" ry="40" fill="${shadow}" fill-opacity="0.18"/>
  ${beard}
  ${front.join("")}
  ${glasses}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="28 14 200 200" width="${S}" height="${S}">${body}
</svg>
`;
}

// ---------------------------------------------------------------------- write

function write(rel: string, content: string) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`${rel}  ${(content.length / 1024).toFixed(0)} KB`);
}

// One hero per scene, then a few more shots of it for galleries and datasets.
const shot = (draw: () => string) => {
  marks = [];
  const content = draw();
  return { content, marks };
};
const frames: Record<string, { content: string; marks: typeof marks }> = {
  aisle: shot(() => aisle({ seed: 3 })),
  "aisle-2": shot(() =>
    aisle({
      seed: 14,
      yaw: 0.05,
      lift: [0.5, 26],
      people: [
        [-0.7, 8.5],
        [0.4, 15],
      ],
    }),
  ),
  "aisle-3": shot(() => aisle({ seed: 27, yaw: -0.09, lift: null, people: [[0.2, 6.5]] })),
  "aisle-night": shot(() => aisle({ seed: 8, tone: infrared })),
  dock: shot(() => dock({ seed: 11 })),
  "dock-2": shot(() => dock({ seed: 19, yaw: -0.12 })),
  conveyor: shot(() => conveyor({ seed: 5 })),
  "conveyor-2": shot(() => conveyor({ seed: 9, yaw: 9 })),
  yard: shot(() => yard({ seed: 23 })),
  floor: shot(() => floor({ seed: 41 })),
  "floor-2": shot(() => floor({ seed: 52 })),
};
for (const [name, { content }] of Object.entries(frames)) write(`frames/${name}.svg`, content);
if (process.env.MANIFEST) {
  const pct = (v: number, of: number) =>
    Math.round((Math.max(0, Math.min(of, v)) / of) * 1000) / 10;
  const manifest = Object.fromEntries(
    Object.entries(frames).map(([name, f]) => [
      name,
      f.marks.map(({ label, box: [x0, y0, x1, y1] }) => ({
        label,
        left: pct(x0, W),
        top: pct(y0, H),
        width: Math.round((pct(x1, W) - pct(x0, W)) * 10) / 10,
        height: Math.round((pct(y1, H) - pct(y0, H)) * 10) / 10,
      })),
    ]),
  );
  fs.writeFileSync(process.env.MANIFEST, JSON.stringify(manifest, null, 1));
}
for (const p of PEOPLE) write(`people/${p.slug}.svg`, portrait(p));
for (const r of ROBOTS) write(`robots/${r.slug}.svg`, robot(r));
