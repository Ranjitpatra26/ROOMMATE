import React, { useRef, useEffect, useCallback } from 'react';

export type InteractionMode = 'push' | 'pull' | 'wave' | 'none';
export type TriggerMode = 'hover' | 'hold';

export interface ElasticGridProProps {
  cellSize?: number;
  elasticStrength?: number;
  damping?: number;
  interactionRadius?: number;
  interactionStrength?: number;
  interactionMode?: InteractionMode;
  triggerMode?: TriggerMode;
  lineColor?: string;
  baseOpacity?: number;
  glowColor?: string;
  glowIntensity?: number;
  glowRadius?: number;
  lineWidth?: number;
  showDots?: boolean;
  dotRadius?: number;
  ambientWaveAmplitude?: number;
  ambientWaveFrequency?: number;
  perspective?: number;
  className?: string;
  style?: React.CSSProperties;
  pointerEvents?: 'none' | 'auto';
  listenToWindow?: boolean;
}

export const ElasticGridPro: React.FC<ElasticGridProProps> = ({
  cellSize = 55,
  elasticStrength = 0.08,
  damping = 0.85,
  interactionRadius = 260,
  interactionStrength = 3.2,
  interactionMode = 'push',
  triggerMode = 'hover',
  lineColor = 'rgba(255, 255, 255, 0.15)',
  baseOpacity = 0.28,
  glowColor = '#E06D53', // Signature Roommate Coral
  glowIntensity = 24,
  glowRadius = 320,
  lineWidth = 1,
  showDots = true,
  dotRadius = 1.6,
  ambientWaveAmplitude = 4,
  ambientWaveFrequency = 0.0012,
  perspective = 0,
  className = '',
  style,
  pointerEvents = 'none',
  listenToWindow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsData = useRef<Float32Array | null>(null);
  const gridDim = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const isPointerDownRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const safeCellSize = Math.max(12, cellSize);

  // Initialize Point Grid Matrix
  const initGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const cols = Math.ceil(width / safeCellSize) + 4;
    const rows = Math.ceil(height / safeCellSize) + 4;
    gridDim.current = { cols, rows };

    // 6 floats per node: [originX, originY, currentX, currentY, velocityX, velocityY]
    const data = new Float32Array(cols * rows * 6);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = (y * cols + x) * 6;
        const px = x * safeCellSize - safeCellSize * 2;
        const py = y * safeCellSize - safeCellSize * 2;
        data[idx] = px; // originX
        data[idx + 1] = py; // originY
        data[idx + 2] = px; // currentX
        data[idx + 3] = py; // currentY
        data[idx + 4] = 0; // vx
        data[idx + 5] = 0; // vy
      }
    }
    pointsData.current = data;
  }, [safeCellSize]);

  // Main Canvas Render Frame
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !pointsData.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const time = Date.now() * ambientWaveFrequency;
    const data = pointsData.current;
    const { cols, rows } = gridDim.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const isInteracting = triggerMode === 'hover' || isPointerDownRef.current;
    const rSq = interactionRadius * interactionRadius;

    // Physics Simulation Update
    for (let i = 0; i < data.length; i += 6) {
      const nodeIndex = i / 6;
      const xIdx = nodeIndex % cols;
      const yIdx = Math.floor(nodeIndex / cols);

      const waveX = Math.sin(time + xIdx * 0.4) * ambientWaveAmplitude;
      const waveY = Math.cos(time + yIdx * 0.4) * ambientWaveAmplitude;

      const targetX = data[i] + waveX;
      const targetY = data[i + 1] + waveY;

      let fx = (targetX - data[i + 2]) * elasticStrength;
      let fy = (targetY - data[i + 3]) * elasticStrength;

      if (isInteracting && interactionMode !== 'none' && interactionRadius > 0) {
        const dx = data[i + 2] - mx;
        const dy = data[i + 3] - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < rSq) {
          const dist = Math.sqrt(distSq) || 0.001;
          const influence = (1 - dist / interactionRadius) * interactionStrength;

          if (interactionMode === 'pull') {
            fx -= (dx / dist) * influence * 15;
            fy -= (dy / dist) * influence * 15;
          } else if (interactionMode === 'push') {
            fx += (dx / dist) * influence * 20;
            fy += (dy / dist) * influence * 20;
          } else if (interactionMode === 'wave') {
            const ripple = Math.sin(dist * 0.05 - Date.now() * 0.004) * influence * 10;
            fx += (dx / dist) * ripple;
            fy += (dy / dist) * ripple;
          }
        }
      }

      data[i + 4] += fx; // vx
      data[i + 5] += fy; // vy
      data[i + 4] *= damping; // damping
      data[i + 5] *= damping;
      data[i + 2] += data[i + 4]; // update currentX
      data[i + 3] += data[i + 5]; // update currentY
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw Smooth Quadratic Bezier Curves
    const drawGridLines = (isGlowPass: boolean) => {
      if (isGlowPass) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(0.5, `${glowColor}66`);
        gradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.shadowBlur = glowIntensity;
        ctx.shadowColor = glowColor;
      } else {
        ctx.strokeStyle = lineColor;
        ctx.globalAlpha = baseOpacity;
        ctx.shadowBlur = 0;
      }

      // Horizontal Curves
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        const startIdx = y * cols * 6;
        ctx.moveTo(data[startIdx + 2], data[startIdx + 3]);
        for (let x = 1; x < cols; x++) {
          const idx = (y * cols + x) * 6;
          const prevIdx = idx - 6;
          const midX = (data[prevIdx + 2] + data[idx + 2]) / 2;
          const midY = (data[prevIdx + 3] + data[idx + 3]) / 2;
          ctx.quadraticCurveTo(data[prevIdx + 2], data[prevIdx + 3], midX, midY);
        }
        ctx.stroke();
      }

      // Vertical Curves
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        const startIdx = x * 6;
        ctx.moveTo(data[startIdx + 2], data[startIdx + 3]);
        for (let y = 1; y < rows; y++) {
          const idx = (y * cols + x) * 6;
          const prevIdx = ((y - 1) * cols + x) * 6;
          const midX = (data[prevIdx + 2] + data[idx + 2]) / 2;
          const midY = (data[prevIdx + 3] + data[idx + 3]) / 2;
          ctx.quadraticCurveTo(data[prevIdx + 2], data[prevIdx + 3], midX, midY);
        }
        ctx.stroke();
      }
    };

    // Base Grid Pass
    drawGridLines(false);

    // Glow Aura Cursor Reactive Pass
    if (glowIntensity > 0 && glowRadius > 0 && mx > -5000) {
      drawGridLines(true);
    }

    // Node Vertex Dots Pass
    if (showDots) {
      ctx.shadowBlur = 0;
      ctx.globalAlpha = baseOpacity * 1.3;
      ctx.fillStyle = lineColor;
      for (let i = 0; i < data.length; i += 6) {
        ctx.beginPath();
        ctx.arc(data[i + 2], data[i + 3], dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [
    elasticStrength,
    damping,
    interactionRadius,
    interactionStrength,
    interactionMode,
    triggerMode,
    lineColor,
    baseOpacity,
    glowColor,
    glowIntensity,
    glowRadius,
    lineWidth,
    showDots,
    dotRadius,
    ambientWaveAmplitude,
    ambientWaveFrequency,
  ]);

  // RequestAnimationFrame Loop
  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    drawFrame();
    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  // Resize & Retina Canvas Scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
      initGrid();
      drawFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initGrid, drawFrame]);

  // Viewport Visibility Observer for Optimal GPU Performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [animate]);

  // Pointer Interaction Handlers
  useEffect(() => {
    if (!listenToWindow) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInsideOrNearby =
        e.clientX >= rect.left - 200 &&
        e.clientX <= rect.right + 200 &&
        e.clientY >= rect.top - 200 &&
        e.clientY <= rect.bottom + 200;

      if (isInsideOrNearby) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };

    const handleWindowPointerDown = () => {
      isPointerDownRef.current = true;
    };

    const handleWindowPointerUp = () => {
      isPointerDownRef.current = false;
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerdown', handleWindowPointerDown);
    window.addEventListener('pointerup', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerdown', handleWindowPointerDown);
      window.removeEventListener('pointerup', handleWindowPointerUp);
    };
  }, [listenToWindow]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (listenToWindow) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = () => {
    if (listenToWindow) return;
    isPointerDownRef.current = true;
  };

  const handlePointerUp = () => {
    if (listenToWindow) return;
    isPointerDownRef.current = false;
  };

  const handlePointerLeave = () => {
    if (listenToWindow) return;
    mouseRef.current = { x: -9999, y: -9999 };
    isPointerDownRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none ${className}`}
      style={{
        pointerEvents: pointerEvents,
        touchAction: 'pan-y',
        perspective: `${1200 + perspective * 10}px`,
        ...style,
      }}
      onPointerMove={listenToWindow ? undefined : handlePointerMove}
      onPointerDown={listenToWindow ? undefined : handlePointerDown}
      onPointerUp={listenToWindow ? undefined : handlePointerUp}
      onPointerLeave={listenToWindow ? undefined : handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          transform: perspective ? `rotateX(${perspective}deg)` : undefined,
          transformOrigin: '50% 50%',
        }}
      />
    </div>
  );
};

export default ElasticGridPro;
