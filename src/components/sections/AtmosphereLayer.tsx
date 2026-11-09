'use client';

import React, { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import Waves, { type WavesProps } from '@/components/reactbits/Waves/Waves';
import DotField, { type DotFieldProps } from '@/components/reactbits/DotField/DotField';
import type { NoiseProps } from '@/components/reactbits/Noise/Noise';

/**
 * Error boundary that isolates any WebGL2 / Canvas2D initialization or runtime failure
 * so atmospheric background layers never crash the surrounding React tree in headless
 * or restricted browser environments.
 */
class AtmosphereErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback?: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch() {
    // Degrade silently to static CSS atmosphere when WebGL/Canvas fails
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

let cachedWebGL2Support: boolean | null = null;

function detectWebGL2Support(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (cachedWebGL2Support !== null) return cachedWebGL2Support;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    cachedWebGL2Support = Boolean(gl);
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return cachedWebGL2Support;
  } catch {
    cachedWebGL2Support = false;
    return false;
  }
}

/**
 * Hook that checks whether WebGL2 is supported on the current client device/browser.
 * Defaults to `true` before mount to avoid unnecessary layout churn, and disables
 * WebGL2 canvases cleanly if `webgl2` is unavailable.
 */
function useWebGL2Available(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(detectWebGL2Support());
  }, []);

  return supported;
}

/**
 * Reactive hook to detect `prefers-reduced-motion: reduce`.
 * Ensures all WebGL/Canvas background animations degrade gracefully to static or disabled states.
 */
function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

/**
 * Tracks whether the container element is within or near the viewport so heavy
 * WebGL2 shader loops automatically pause when scrolled offscreen.
 */
function useInViewport(ref: React.RefObject<HTMLElement | null>, rootMargin = '200px'): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export interface HeroWavesBackgroundProps extends Partial<WavesProps> {
  /**
   * Optional radial vignette overlay to keep center/editorial typography high-contrast
   * against the Cobalt (#004AAD) hero canvas.
   * @default true
   */
  withVignette?: boolean;
}

/**
 * `HeroWavesBackground`
 * Wraps ReactBits `Waves` tuned for AQRO's Cobalt Blue (`#004AAD`) hero section.
 * Uses ultra-subtle white technical contour lines (`rgba(255,255,255,0.12)`) with a
 * faint Signal Red (`#ED1C24`) kinetic highlight on cursor movement, and pauses
 * cleanly when `prefers-reduced-motion: reduce` is enabled.
 */
export function HeroWavesBackground({
  lineColor = 'rgba(255,255,255,0.12)',
  accentColor = 'rgba(237,28,36,0.28)',
  backgroundColor = 'transparent',
  lineStyle = 'solid',
  spacing = 14,
  lineWidth = 1,
  rotation = -8,
  amplitude = 22,
  scale = 1.15,
  twist = 0.65,
  speed = 0.35,
  variation = 2,
  mouseInteraction = true,
  mouseRadius = 150,
  mouseStrength = 0.45,
  bounce = 0.35,
  returnDuration = 1.6,
  clickRipple = false,
  intro = true,
  fade = 0.18,
  opacity = 1,
  paused = false,
  withVignette = true,
  className = '',
  style,
  ...rest
}: HeroWavesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const webgl2Available = useWebGL2Available();
  const inViewport = useInViewport(containerRef);
  const isPaused = paused || prefersReducedMotion || !inViewport;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {webgl2Available && (
        <AtmosphereErrorBoundary>
          <Waves
            lineColor={lineColor}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            lineStyle={lineStyle}
            spacing={spacing}
            lineWidth={lineWidth}
            rotation={rotation}
            amplitude={amplitude}
            scale={scale}
            twist={twist}
            speed={isPaused ? 0 : speed}
            variation={variation}
            mouseInteraction={!isPaused && mouseInteraction}
            mouseRadius={mouseRadius}
            mouseStrength={mouseStrength}
            bounce={bounce}
            returnDuration={returnDuration}
            clickRipple={!isPaused && clickRipple}
            intro={!isPaused && intro}
            fade={fade}
            opacity={opacity}
            paused={isPaused}
            {...rest}
          />
        </AtmosphereErrorBoundary>
      )}
      {withVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, transparent 35%, rgba(0, 42, 99, 0.38) 100%)',
          }}
        />
      )}
    </div>
  );
}

export interface GraphiteDotFieldProps extends Partial<DotFieldProps> {
  /**
   * Whether to render the solid `#292929` graphite surface behind the dot matrix.
   * @default true
   */
  withSurface?: boolean;
}

/**
 * `GraphiteDotField`
 * Wraps ReactBits `DotField` for dark graphite (`#292929`) storytelling sections.
 * Renders a precision architectural dot matrix blending Warm Sand (`#F5F1E8`) and
 * AQRO Signal Red (`#ED1C24`) with subtle cursor lens response. Disables motion
 * cleanly on `prefers-reduced-motion: reduce`.
 */
export function GraphiteDotField({
  dotRadius = 1.2,
  dotSpacing = 20,
  pattern = 'grid',
  gradientFrom = '#F5F1E8',
  gradientTo = '#ED1C24',
  gradientAngle = 135,
  cursorRadius = 180,
  bulgeStrength = 0.25,
  twist = 0,
  glowColor = '#ED1C24',
  glowRadius = 140,
  glowIntensity = 0.45,
  baseOpacity = 0.22,
  waveAmplitude = 3.5,
  sparkle = false,
  speed = 0.3,
  interactive = true,
  holdToZoom = false,
  intro = true,
  lightMode = false,
  opacity = 1,
  withSurface = true,
  className = '',
  style,
  ...rest
}: GraphiteDotFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const webgl2Available = useWebGL2Available();
  const inViewport = useInViewport(containerRef);
  const isStatic = prefersReducedMotion || !inViewport;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${
        withSurface ? 'bg-[#292929]' : ''
      } ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {webgl2Available && inViewport && (
        <AtmosphereErrorBoundary>
          <DotField
            dotRadius={dotRadius}
            dotSpacing={dotSpacing}
            pattern={pattern}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            gradientAngle={gradientAngle}
            cursorRadius={cursorRadius}
            bulgeStrength={isStatic ? 0 : bulgeStrength}
            twist={twist}
            glowColor={glowColor}
            glowRadius={glowRadius}
            glowIntensity={isStatic ? 0 : glowIntensity}
            baseOpacity={baseOpacity}
            waveAmplitude={isStatic ? 0 : waveAmplitude}
            sparkle={!isStatic && sparkle}
            speed={isStatic ? 0 : speed}
            interactive={!isStatic && interactive}
            holdToZoom={!isStatic && holdToZoom}
            intro={!isStatic && intro}
            lightMode={lightMode}
            opacity={opacity}
            className="h-full w-full"
            {...rest}
          />
        </AtmosphereErrorBoundary>
      )}
    </div>
  );
}

export interface FilmGrainOverlayProps extends Partial<NoiseProps> {
  /**
   * Whether the film grain covers the full viewport (`fixed`) or the parent section (`absolute`).
   * @default true
   */
  fixed?: boolean;
}

const FILM_GRAIN_SVG_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='aqroGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23aqroGrain)'/%3E%3C/svg%3E\")";

/**
 * `FilmGrainOverlay`
 * GPU-composited tactile editorial film grain overlay (`opacity-[0.035] pointer-events-none`).
 * Uses a hardware-accelerated SVGfractalNoise tile instead of per-frame CPU `putImageData`
 * so scroll and WebGL animations run at a locked 60fps.
 */
export function FilmGrainOverlay({
  fixed = true,
  zIndex = 40,
  className = '',
  style,
}: FilmGrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 opacity-[0.035] pointer-events-none select-none ${className}`.trim()}
      style={{
        zIndex,
        backgroundImage: FILM_GRAIN_SVG_DATA_URI,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        mixBlendMode: 'overlay',
        ...style,
      }}
    />
  );
}

const AtmosphereLayer = {
  HeroWavesBackground,
  GraphiteDotField,
  FilmGrainOverlay,
};

export default AtmosphereLayer;
