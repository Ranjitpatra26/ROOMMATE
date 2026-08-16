import React, { useRef, useEffect, useMemo } from 'react';

export type FlamePreset =
  | 'Original Fire'
  | 'White Flame'
  | 'Blue Flame'
  | 'Inferno Lava'
  | 'Metallic Fire'
  | 'Molten Red Steel'
  | 'Silver Chrome Fire'
  | 'Neon-Fire Hybrid'
  | 'Ice-Metal Fire'
  | 'Black Metal Fire'
  | 'Custom';

export type PerformanceMode = 'Auto' | 'Low' | 'Balanced' | 'High';

export interface CanvasFlameProps {
  preset?: FlamePreset;
  backgroundFill?: string;
  haloColor?: string;
  intensity?: number;
  useMouse?: boolean;
  listenToWindow?: boolean;
  performanceMode?: PerformanceMode;
  renderScale?: number;
  idlePause?: boolean;
  idleSeconds?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CanvasFlame: React.FC<CanvasFlameProps> = ({
  preset = 'Molten Red Steel',
  backgroundFill = '#121620',
  haloColor = 'rgba(224, 109, 83, 0.45)',
  intensity = 1.4,
  useMouse = true,
  listenToWindow = true,
  performanceMode = 'Balanced',
  renderScale = 1,
  idlePause = false,
  idleSeconds = 3,
  className = '',
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { bgColor, halo, fireIntensity } = useMemo(() => {
    switch (preset) {
      case 'Original Fire':
        return { bgColor: 'rgb(15, 5, 2)', halo: 'rgb(50, 2, 0)', fireIntensity: 1 };
      case 'White Flame':
        return { bgColor: '#050508', halo: '#3b4a6d', fireIntensity: 1.3 };
      case 'Blue Flame':
        return { bgColor: '#020713', halo: '#003366', fireIntensity: 1.5 };
      case 'Inferno Lava':
        return { bgColor: '#1a0200', halo: '#5a0600', fireIntensity: 1.8 };
      case 'Metallic Fire':
        return { bgColor: '#0A0504', halo: '#ff9d00', fireIntensity: 2 };
      case 'Molten Red Steel':
        return { bgColor: '#121620', halo: 'rgba(224, 109, 83, 0.6)', fireIntensity: 1.6 };
      case 'Silver Chrome Fire':
        return { bgColor: '#050509', halo: '#8fb4ff', fireIntensity: 1.6 };
      case 'Neon-Fire Hybrid':
        return { bgColor: '#050010', halo: '#ff00ff', fireIntensity: 2 };
      case 'Ice-Metal Fire':
        return { bgColor: '#020814', halo: '#4ad9ff', fireIntensity: 1.4 };
      case 'Black Metal Fire':
        return { bgColor: '#020203', halo: '#ff5500', fireIntensity: 1.8 };
      case 'Custom':
      default:
        return { bgColor: backgroundFill, halo: haloColor, fireIntensity: intensity };
    }
  }, [preset, backgroundFill, haloColor, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    let cssW = 800;
    let cssH = 600;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let rs = Math.min(1, Math.max(0.35, renderScale || 1));
    let raf = 0;
    let running = true;
    let lastMoveAt = performance.now();
    let lastFrameAt = performance.now();
    let fpsSmoothed = 60;
    let autoQuality: PerformanceMode = 'Balanced';
    let lastAutoShiftAt = 0;

    const mouse = { x: 400, y: 300 };

    interface FlameParticle {
      cx: number;
      cy: number;
      x: number;
      y: number;
      lx: number;
      ly: number;
      vy: number;
      vx: number;
      r: number;
      life: number;
      alive: boolean;
      c: { h: number; s: number; l: number; a: number; ta: number };
      update: () => void;
      draw: (c: CanvasRenderingContext2D) => void;
    }

    interface SparkParticle {
      cx: number;
      cy: number;
      x: number;
      y: number;
      lx: number;
      ly: number;
      vy: number;
      vx: number;
      r: number;
      life: number;
      alive: boolean;
      c: { h: number; s: number; l: number; a: number };
      update: () => void;
      draw: (c: CanvasRenderingContext2D) => void;
    }

    const fires: FlameParticle[] = [];
    const sparks: SparkParticle[] = [];
    const sparks2: SparkParticle[] = [];

    const sizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      cssW = rect.width || 800;
      cssH = rect.height || 600;
      rs = Math.min(1, Math.max(0.35, renderScale || 1));
      const internalW = Math.max(1, Math.floor(cssW * rs * dpr));
      const internalH = Math.max(1, Math.floor(cssH * rs * dpr));
      if (canvas.width !== internalW) canvas.width = internalW;
      if (canvas.height !== internalH) canvas.height = internalH;
      if (mouse.x === 400 && mouse.y === 300) {
        mouse.x = canvas.width * 0.5;
        mouse.y = canvas.height * 0.55;
      }
    };

    function createFlame(m: { x: number; y: number }): FlameParticle {
      const cx = m.x;
      const cy = m.y;
      const x = rand(cx - 25, cx + 25);
      const y = rand(cy - 5, cy + 5);
      return {
        cx,
        cy,
        x,
        y,
        lx: x,
        ly: y,
        vy: rand(1, 3.2),
        vx: rand(-1.2, 1.2),
        r: rand(28, 42),
        life: rand(2, 6.5),
        alive: true,
        c: {
          h: Math.floor(rand(4, 38)), // warm coral to fire amber
          s: 100,
          l: rand(70, 95),
          a: 0,
          ta: rand(0.7, 0.9),
        },
        update() {
          this.lx = this.x;
          this.ly = this.y;
          this.y -= this.vy;
          this.vy += 0.08;
          this.x += this.vx;
          if (this.x < this.cx) this.vx += 0.18;
          else this.vx -= 0.18;
          if (this.r > 0) this.r -= 0.32;
          if (this.r <= 0) this.r = 0;
          this.life -= 0.11;
          if (this.life <= 0) {
            this.c.a -= 0.05;
            if (this.c.a <= 0) this.alive = false;
          } else if (this.c.a < this.c.ta) {
            this.c.a += 0.08;
          }
        },
        draw(c: CanvasRenderingContext2D) {
          const grd1 = c.createRadialGradient(this.x, this.y, this.r * 3, this.x, this.y, 0);
          grd1.addColorStop(0.5, `hsla(${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a / 22})`);
          grd1.addColorStop(0, 'transparent');

          const grd2 = c.createRadialGradient(this.x, this.y, this.r, this.x, this.y, 0);
          grd2.addColorStop(0.5, `hsla(${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a})`);
          grd2.addColorStop(0, 'transparent');

          const oldComp = c.globalCompositeOperation;
          c.beginPath();
          c.arc(this.x, this.y, this.r * 3, 0, 2 * Math.PI);
          c.fillStyle = grd1;
          c.fill();

          c.globalCompositeOperation = 'overlay';
          c.beginPath();
          c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
          c.fillStyle = grd2;
          c.fill();
          c.globalCompositeOperation = oldComp;
        },
      };
    }

    function createSpark(m: { x: number; y: number }): SparkParticle {
      const cx = m.x;
      const cy = m.y;
      const x = rand(cx - 35, cx + 35);
      const y = rand(cy, cy + 5);
      return {
        cx,
        cy,
        x,
        y,
        lx: x,
        ly: y,
        vy: rand(1.2, 3.5),
        vx: rand(-3.5, 3.5),
        r: rand(0.6, 1.4),
        life: rand(4, 8),
        alive: true,
        c: {
          h: Math.floor(rand(4, 38)),
          s: 100,
          l: rand(45, 95),
          a: rand(0.7, 0.9),
        },
        update() {
          this.lx = this.x;
          this.ly = this.y;
          this.y -= this.vy;
          this.x += this.vx;
          if (this.x < this.cx) this.vx += 0.18;
          else this.vx -= 0.18;
          this.vy += 0.07;
          this.life -= 0.1;
          if (this.life <= 0) {
            this.c.a -= 0.05;
            if (this.c.a <= 0) this.alive = false;
          }
        },
        draw(c: CanvasRenderingContext2D) {
          c.beginPath();
          c.moveTo(this.lx, this.ly);
          c.lineTo(this.x, this.y);
          c.strokeStyle = `hsla(${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a / 2})`;
          c.lineWidth = this.r * 2;
          c.lineCap = 'round';
          c.stroke();
          c.closePath();

          c.beginPath();
          c.moveTo(this.lx, this.ly);
          c.lineTo(this.x, this.y);
          c.strokeStyle = `hsla(${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a})`;
          c.lineWidth = this.r;
          c.stroke();
          c.closePath();
        },
      };
    }

    const clearCanvas = (base: string) => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = base || '#121620';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawHalo = (hc: string) => {
      const minDim = Math.min(canvas.width, canvas.height);
      const r = rand(minDim * 0.35, minDim * 0.55);
      ctx.globalCompositeOperation = 'lighter';
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, r, mouse.x, mouse.y, 0);
      grd.addColorStop(0, 'transparent');
      grd.addColorStop(1, hc || 'rgba(224, 109, 83, 0.4)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const getQuality = () => {
      if (performanceMode === 'Auto') return autoQuality;
      return performanceMode || 'Balanced';
    };

    const updateAutoQuality = (now: number) => {
      if (performanceMode !== 'Auto') return;
      const since = now - lastAutoShiftAt;
      if (since < 800) return;
      if (fpsSmoothed < 42 && autoQuality !== 'Low') {
        autoQuality = 'Low';
        lastAutoShiftAt = now;
      } else if (fpsSmoothed > 55 && autoQuality === 'Low') {
        autoQuality = 'Balanced';
        lastAutoShiftAt = now;
      } else if (fpsSmoothed > 58 && autoQuality === 'Balanced') {
        autoQuality = 'High';
        lastAutoShiftAt = now;
      } else if (fpsSmoothed < 50 && autoQuality === 'High') {
        autoQuality = 'Balanced';
        lastAutoShiftAt = now;
      }
    };

    const step = (now: number) => {
      if (!running) return;
      const dt = now - lastFrameAt;
      lastFrameAt = now;
      const currentFps = dt > 0 ? 1000 / dt : 60;
      fpsSmoothed = fpsSmoothed * 0.9 + currentFps * 0.1;
      updateAutoQuality(now);

      const idleOn = !!idlePause;
      const idleMs = Math.max(0, (idleSeconds || 3) * 1000);
      const isIdle = idleOn && now - lastMoveAt > idleMs;
      const quality = getQuality();

      let density = Math.max(1, Math.round((fireIntensity || 1) * 1));
      let maxFlames: number | null = null;
      let maxSparks: number | null = null;

      if (quality === 'High') {
        density = Math.max(1, Math.round((fireIntensity || 1) * 1.5));
        maxFlames = 500;
        maxSparks = 280;
      } else if (quality === 'Low') {
        density = Math.max(1, Math.round((fireIntensity || 1) * 0.6));
        maxFlames = 220;
        maxSparks = 120;
      }

      if (!isIdle) {
        for (let i = 0; i < density; i++) {
          if (!maxFlames || fires.length < maxFlames) fires.push(createFlame(mouse));
          if (!maxSparks || sparks.length < maxSparks) sparks.push(createSpark(mouse));
          if (!maxSparks || sparks2.length < maxSparks) sparks2.push(createSpark(mouse));
        }

        for (let i = fires.length - 1; i >= 0; i--) {
          if (fires[i].alive) fires[i].update();
          else fires.splice(i, 1);
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
          if (sparks[i].alive) sparks[i].update();
          else sparks.splice(i, 1);
        }

        for (let i = sparks2.length - 1; i >= 0; i--) {
          if (sparks2[i].alive) sparks2[i].update();
          else sparks2.splice(i, 1);
        }
      }

      clearCanvas(bgColor);
      drawHalo(halo);

      ctx.globalCompositeOperation = 'overlay';
      for (let i = fires.length - 1; i >= 0; i--) fires[i].draw(ctx);

      ctx.globalCompositeOperation = 'soft-light';
      for (let i = sparks.length - 1; i >= 0; i--) {
        if (i % 2 === 0) sparks[i].draw(ctx);
      }

      ctx.globalCompositeOperation = 'color-dodge';
      for (let i = sparks2.length - 1; i >= 0; i--) sparks2[i].draw(ctx);

      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(step);
    };

    const updateCoordinates = (clientX: number, clientY: number) => {
      lastMoveAt = performance.now();
      const rect = canvas.getBoundingClientRect();
      const mx = (clientX - rect.left) * rs * dpr;
      const my = (clientY - rect.top) * rs * dpr;
      mouse.x = mx;
      mouse.y = my;
    };

    const onMove = (e: MouseEvent) => {
      if (!useMouse) return;
      updateCoordinates(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!useMouse) return;
      if (!e.touches || !e.touches[0]) return;
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onResize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      sizeCanvas();
    };

    sizeCanvas();

    if (useMouse) {
      if (listenToWindow) {
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
      } else {
        canvas.addEventListener('mousemove', onMove, { passive: true });
        canvas.addEventListener('touchmove', onTouchMove, { passive: true });
      }
    }

    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (listenToWindow) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onTouchMove);
      } else {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('touchmove', onTouchMove);
      }
    };
  }, [
    bgColor,
    halo,
    fireIntensity,
    useMouse,
    listenToWindow,
    preset,
    performanceMode,
    renderScale,
    idlePause,
    idleSeconds,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CanvasFlame;
