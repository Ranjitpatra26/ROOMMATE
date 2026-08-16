import React, { useRef, useEffect } from 'react';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  life: number;
  maxLife: number;
  wobbleSpeed: number;
  wobblePhase: number;
  wobbleAmp: number;
  colorHue: number; // Subtle iridescent hue shift (cyan/sky/coral/violet)
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const WaterBubbleClickEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const bubbles: Bubble[] = [];
    const ripples: Ripple[] = [];
    let rafId: number | null = null;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const spawnBubbleBurst = (originX: number, originY: number) => {
      // 1. Spawn Expanding Delicate Water Ripple
      ripples.push({
        x: originX,
        y: originY,
        radius: 3,
        maxRadius: rand(30, 48),
        opacity: 0.7,
        life: 0,
        maxLife: 28,
      });

      // 2. Spawn 8-14 Tiny Glassy Water Bubbles
      const bubbleCount = Math.floor(rand(8, 14));
      for (let i = 0; i < bubbleCount; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1.2, 3.8);
        const baseRadius = rand(3, 8.5);

        bubbles.push({
          x: originX + Math.cos(angle) * rand(2, 8),
          y: originY + Math.sin(angle) * rand(2, 8),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(0.5, 2.0), // Initial upward bias
          radius: baseRadius * 0.4,
          maxRadius: baseRadius,
          opacity: rand(0.85, 1.0),
          life: 0,
          maxLife: rand(35, 65),
          wobbleSpeed: rand(0.08, 0.18),
          wobblePhase: rand(0, Math.PI * 2),
          wobbleAmp: rand(0.4, 1.2),
          colorHue: rand(185, 215), // Iridescent water sky/cyan tones
        });
      }

      // Start animation loop if not already running
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (bubbles.length === 0 && ripples.length === 0) {
        ctx.clearRect(0, 0, width, height);
        rafId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // --- Draw & Update Water Ripples ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.life++;
        const progress = r.life / r.maxLife;
        r.radius += (r.maxRadius - r.radius) * 0.12;
        r.opacity = Math.max(0, 0.65 * (1 - progress));

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 225, 255, ${r.opacity})`;
        ctx.lineWidth = Math.max(0.6, 1.8 * (1 - progress));
        ctx.stroke();
        ctx.restore();

        if (r.life >= r.maxLife) {
          ripples.splice(i, 1);
        }
      }

      // --- Draw & Update Tiny Glassy Water Bubbles ---
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life++;
        const progress = b.life / b.maxLife;

        // Bubble Physics: Expand to full size, then wobble & float upward
        if (b.radius < b.maxRadius) {
          b.radius += (b.maxRadius - b.radius) * 0.25;
        }

        b.vx *= 0.94; // Horizontal friction
        b.vy -= 0.09; // Liquid upward buoyancy
        b.vy *= 0.97;

        // Horizontal sinusoidal liquid wobble
        const wobbleX = Math.sin(b.life * b.wobbleSpeed + b.wobblePhase) * b.wobbleAmp;
        b.x += b.vx + wobbleX;
        b.y += b.vy;

        // Fade out smoothly towards the end of life
        if (progress > 0.65) {
          b.opacity = Math.max(0, (1 - progress) / 0.35);
        }

        // Draw Glassy Translucent Water Bubble
        ctx.save();
        const currentR = Math.max(0.5, b.radius);

        // 1. Soft Ambient Outer Liquid Glow
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentR + 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 215, 255, ${b.opacity * 0.15})`;
        ctx.fill();

        // 2. Translucent Glassy Bubble Body
        const bodyGrad = ctx.createRadialGradient(
          b.x - currentR * 0.3,
          b.y - currentR * 0.3,
          currentR * 0.1,
          b.x,
          b.y,
          currentR
        );
        bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${b.opacity * 0.35})`);
        bodyGrad.addColorStop(0.5, `hsla(${b.colorHue}, 80%, 75%, ${b.opacity * 0.22})`);
        bodyGrad.addColorStop(0.9, `hsla(${b.colorHue}, 90%, 65%, ${b.opacity * 0.55})`);
        bodyGrad.addColorStop(1, `rgba(255, 255, 255, ${b.opacity * 0.85})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // 3. Crisp Glassy Rim Stroke
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.85})`;
        ctx.lineWidth = Math.max(0.6, currentR * 0.15);
        ctx.stroke();

        // 4. Primary Specular Highlight (Tiny Bright Glint at Top-Left)
        const glintR = Math.max(0.6, currentR * 0.28);
        const glintX = b.x - currentR * 0.38;
        const glintY = b.y - currentR * 0.38;

        ctx.beginPath();
        ctx.arc(glintX, glintY, glintR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.95})`;
        ctx.fill();

        // 5. Secondary Subtle Rim Reflex Highlight (Bottom-Right)
        if (currentR > 4) {
          ctx.beginPath();
          ctx.arc(
            b.x + currentR * 0.32,
            b.y + currentR * 0.32,
            currentR * 0.16,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
          ctx.fill();
        }

        ctx.restore();

        if (b.life >= b.maxLife || b.opacity <= 0) {
          bubbles.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if ('clientX' in e) {
        spawnBubbleBurst(e.clientX, e.clientY);
      } else if (e.touches && e.touches[0]) {
        spawnBubbleBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[99999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
};

export default WaterBubbleClickEffect;
