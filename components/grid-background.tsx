"use client";

import React, { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

const SPACING = 60;

interface GridBackgroundProps {
  color?: string; // hex color like "#2997ff"
}

export default function GridBackground({ color = "#2997ff" }: GridBackgroundProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 41, g: 151, b: 255 }; // default blue
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = hexToRgb(color);
    
    let animationFrame = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let isPointerInside = false;

    const maxMouseInfluence = 160;
    const neighborDistance = SPACING * 1.35;
    const lineDistance = SPACING * 1.6;

    const buildGrid = () => {
      points = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * SPACING - SPACING / 2;
          const py = y * SPACING - SPACING / 2;
          points.push({ x: px, y: py, baseX: px, baseY: py, vx: 0, vy: 0 });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const handlePointerMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isPointerInside = true;
    };

    const handlePointerLeave = () => {
      isPointerInside = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const updatePoints = () => {
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let fx = (p.baseX - p.x) * 0.035;
        let fy = (p.baseY - p.y) * 0.035;

        if (isPointerInside) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxMouseInfluence && dist > 0) {
            const force = (1 - dist / maxMouseInfluence) * 1.8;
            const angle = Math.atan2(dy, dx);
            fx += Math.cos(angle) * force * 0.9;
            fy += Math.sin(angle) * force * 0.9;
          }
        }

        p.vx += fx;
        p.vy += fy;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        if (a.x < -SPACING || a.x > width + SPACING || a.y < -SPACING || a.y > height + SPACING) continue;

        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          if (Math.abs(dx) > neighborDistance || Math.abs(dy) > neighborDistance) continue;

          const dist = Math.hypot(dx, dy);
          if (dist > lineDistance) continue;

          const alpha = Math.max(0, 1 - dist / lineDistance) * 0.22;
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.x < -SPACING || p.x > width + SPACING || p.y < -SPACING || p.y > height + SPACING) continue;

        const md = isPointerInside ? Math.hypot(mouseX - p.x, mouseY - p.y) : Infinity;
        const glow = md < maxMouseInfluence ? (1 - md / maxMouseInfluence) * 0.9 : 0.12;
        const radius = md < maxMouseInfluence ? 1.8 : 1.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.2 + glow * 0.65})`;
        ctx.fill();
      }
    };

    const animate = () => {
      updatePoints();
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointerMove);
    document.body.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      document.body.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ 
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
}
