"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import styles from "./HeroCanvas.module.css";

interface HeroCanvasProps {
  variant: "mesh" | "orb";
}

/* ── Mesh helpers ──────────────────────────────────────────────── */
interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function buildMesh(w: number, h: number, dpr: number): Point[] {
  const area = (w / dpr) * (h / dpr);
  const n = Math.round(Math.min(Math.max(area / 8000, 36), 120));
  return Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }));
}

function drawMesh(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  pts: Point[],
  mx: number,
  my: number
) {
  ctx.clearRect(0, 0, w, h);
  const LINK = 155 * dpr;
  const REP = 130 * dpr;

  for (const p of pts) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REP && dist > 0) {
      const force = (1 - dist / REP) * 0.8;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) { p.x = 0; p.vx *= -1; }
    if (p.x > w) { p.x = w; p.vx *= -1; }
    if (p.y < 0) { p.y = 0; p.vy *= -1; }
    if (p.y > h) { p.y = h; p.vy *= -1; }
  }

  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < LINK) {
        const a = (1 - d / LINK) * 0.35;
        ctx.strokeStyle = `rgba(86,190,235,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
  }

  for (const p of pts) {
    ctx.fillStyle = "rgba(150,170,200,0.9)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ── Orb helpers ───────────────────────────────────────────────── */
interface OrbPoint {
  x: number;
  y: number;
  z: number;
}

function buildOrb(): OrbPoint[] {
  const n = 440;
  const phi = Math.PI * (Math.sqrt(5) - 1);
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

function drawOrb(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  pts: OrbPoint[],
  angle: number
) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const fov = 2.4;
  const scale = Math.min(w, h) * 0.4;
  const tilt = 0.42;
  const LINK = 44 * dpr;

  const projected = pts.map((p) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const x1 = p.x * cosA - p.z * sinA;
    const z1 = p.x * sinA + p.z * cosA;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const y1 = p.y * cosT - z1 * sinT;
    const z2 = p.y * sinT + z1 * cosT;
    const depth = (z2 + 1) / 2;
    const fovScale = fov / (fov + z2 + 1);
    return {
      sx: cx + x1 * scale * fovScale,
      sy: cy + y1 * scale * fovScale,
      depth,
    };
  });

  const sorted = [...projected].sort((a, b) => a.depth - b.depth);

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const dx = sorted[i].sx - sorted[j].sx;
      const dy = sorted[i].sy - sorted[j].sy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < LINK) {
        const a = ((sorted[i].depth + sorted[j].depth) / 2) * (1 - d / LINK) * 0.6;
        ctx.strokeStyle = `rgba(86,190,235,${a.toFixed(2)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(sorted[i].sx, sorted[i].sy);
        ctx.lineTo(sorted[j].sx, sorted[j].sy);
        ctx.stroke();
      }
    }
  }

  for (const p of sorted) {
    const r = (1 + p.depth * 2) * dpr;
    const hue = 198 + p.depth * 72;
    const a = 0.3 + p.depth * 0.6;
    ctx.fillStyle = `hsla(${hue}, 88%, 70%, ${a.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ── Component ─────────────────────────────────────────────────── */
export default function HeroCanvas({ variant }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId: number;
    let angle = 0;
    let mx = -9999;
    let my = -9999;
    let meshPoints: Point[] = [];
    let orbPoints: OrbPoint[] = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      if (variant === "mesh") {
        meshPoints = buildMesh(canvas.width, canvas.height, dpr);
      } else {
        orbPoints = buildOrb();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) * dpr;
      my = (e.clientY - rect.top) * dpr;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);

    if (reduced) {
      if (variant === "mesh") {
        drawMesh(ctx, canvas.width, canvas.height, dpr, meshPoints, mx, my);
      } else {
        drawOrb(ctx, canvas.width, canvas.height, dpr, orbPoints, angle);
      }
      return () => {
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousemove", onMouseMove);
      };
    }

    const loop = () => {
      if (variant === "mesh") {
        drawMesh(ctx, canvas.width, canvas.height, dpr, meshPoints, mx, my);
      } else {
        angle += 0.0034;
        drawOrb(ctx, canvas.width, canvas.height, dpr, orbPoints, angle);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [variant, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
