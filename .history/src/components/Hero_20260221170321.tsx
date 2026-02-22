import { TrendingUp, Zap, Shield, Target, Users, ChevronDown } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    icon: TrendingUp,
    title: 'Impacto em conversão/receita',
    value: '[X%] / [R$Y]',
    primary: true,
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    value: '[N releases] em [Z semanas]',
    primary: true,
  },
  {
    icon: Shield,
    title: 'Estabilidade / risco evitado',
    value: '[N incidentes] a menos',
    primary: true,
  },
  {
    icon: Target,
    title: 'Precisão em testes',
    value: '[N testes] / [X% cobertura]',
    primary: false,
  },
  {
    icon: Users,
    title: 'Colaboração cross-team',
    value: '[N squads] integradas',
    primary: false,
  },
];

const DRUM_RADIUS = 120;
const ANGLE_STEP = 52;
const CONTAINER_HEIGHT = 260;
const SCROLL_SENSITIVITY = 0.006;
const TOUCH_SENSITIVITY = 0.014;

const Hero = () => {
  const { ref, isVisible } = useInView();
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [hintPaused, setHintPaused] = useState(false);
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hintResumeRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const N = stats.length;

  const normalizeOffset = (offset: number) =>
    offset - N * Math.round(offset / N);

  const snapToNearest = (delay = 180) => {
    clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => {
      const snapped = Math.round(progressRef.current);
      progressRef.current = snapped;
      setProgress(snapped);
      setIsSnapping(true);
      setTimeout(() => setIsSnapping(false), 500);
    }, delay);
  };

  useEffect(() => {
    if (!isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const scheduleHintResume = () => {
      clearTimeout(hintResumeRef.current);
      hintResumeRef.current = setTimeout(() => setHintPaused(false), 800);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setHintPaused(true);
      scheduleHintResume();
      setIsSnapping(false);
      clearTimeout(snapTimeoutRef.current);
      progressRef.current = progressRef.current + e.deltaY * SCROLL_SENSITIVITY;
      setProgress(progressRef.current);
      snapToNearest();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(hintResumeRef.current);
    };
  }, [isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    setHintPaused(true);
    clearTimeout(hintResumeRef.current);
    setIsSnapping(false);
    clearTimeout(snapTimeoutRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    const deltaY = touchStartYRef.current - e.touches[0].clientY;
    progressRef.current = progressRef.current + deltaY * TOUCH_SENSITIVITY;
    setProgress(progressRef.current);
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    snapToNearest(60);
    clearTimeout(hintResumeRef.current);
    hintResumeRef.current = setTimeout(() => setHintPaused(false), 800);
  };

  const goToCard = (targetIndex: number) => {
    setHintPaused(true);
    clearTimeout(hintResumeRef.current);
    hintResumeRef.current = setTimeout(() => setHintPaused(false), 800);
    const current = progressRef.current;
    const nearest = targetIndex + N * Math.round((current - targetIndex) / N);
    progressRef.current = nearest;
    setProgress(nearest);
    setIsSnapping(true);
    setTimeout(() => setIsSnapping(false), 500);
  };

  const primaryStats = stats.filter(s => s.primary);
  const secondaryStats = stats.filter(s => !s.primary);
  const activeIndex = ((Math.round(progress) % N) + N) % N;
  const drumHeight = isMobile ? 220 : CONTAINER_HEIGHT;

  return (
    <section className="min-h-[100dvh] md:min-h-[88vh] flex flex-col justify-center pt-24 pb-10 md:pt-24 md:pb-16 px-4 md:px-6">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out flex flex-col justify-between ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="mb-5 md:mb-12 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
          style={{ animationDelay: '100ms' }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-3 md:mb-4">
            Formalização da atuação como{' '}
            <br className="hidden md:block" />
            <span className="text-primary">Tech Lead de CRO.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl leading-snug md:leading-normal">
            Meu papel vai além do UX/UI e responde por decisões que impactam conversão, receita e sustentação da operação.
          </p>
        </div>

        <div className="mt-auto w-full">
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-4">
            {primaryStats.map((stat, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex md:justify-center md:gap-4">
            {secondaryStats.map((stat, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0 animate-[fade-in_0.8s_ease-out_forwards] w-full max-w-[280px]"
                style={{ animationDelay: `${(primaryStats.length + index + 2) * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="md:hidden mt-2 select-none overflow-visible" style={{ position: 'relative' }}>
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                height: `${drumHeight}px`,
                perspective: '700px',
                perspectiveOrigin: '50% 50%',
                overflow: 'visible',
                touchAction: 'none',
                cursor: 'grab',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="animate-drum-hint-float"
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'visible',
                  animationPlayState: hintPaused ? 'paused' : 'running',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transformStyle: 'preserve-3d',
                    overflow: 'visible',
                  }}
                >
                {stats.map((stat, index) => {
                  const offset = normalizeOffset(index - progress);
                  const absOffset = Math.abs(offset);
                  const thetaDeg = -offset * ANGLE_STEP;
                  const isActive = absOffset < 0.25;
                  const opacity = Math.max(0, 1 - absOffset * 0.62);

                  if (absOffset > N / 2 + 0.1) return null;

                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        transform: `rotateX(${thetaDeg}deg) translateZ(${DRUM_RADIUS}px)`,
                        opacity,
                        zIndex: Math.round(100 - absOffset * 10),
                        transition: isSnapping
                          ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.36s ease'
                          : 'none',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <div
                        className="w-full p-5 rounded-xl bg-card border transition-colors duration-300"
                        style={{
                          borderColor: isActive
                            ? 'hsl(var(--primary) / 0.4)'
                            : 'hsl(var(--border))',
                          boxShadow: isActive
                            ? '0 0 0 1px hsl(var(--primary) / 0.1), 0 8px 32px hsl(0 0% 0% / 0.3)'
                            : 'none',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                            style={{
                              backgroundColor: isActive
                                ? 'hsl(var(--primary) / 0.2)'
                                : 'hsl(var(--primary) / 0.1)',
                            }}
                          >
                            <stat.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{stat.title}</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '-22%',
                  height: '32%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.35) 75%, transparent 100%)',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '-22%',
                  height: '32%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.35) 75%, transparent 100%)',
                }}
              />
            </div>

            <div className="flex justify-center gap-1.5 mt-16">
              {stats.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToCard(i)}
                  aria-label={`Card ${i + 1}`}
                  style={{
                    width: activeIndex === i ? '14px' : '4px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor:
                      activeIndex === i
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground) / 0.3)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-center mt-5 pb-1">
              <button
                onClick={() => document.getElementById('tldr')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Ir para próxima seção"
                className="text-muted-foreground/70 hover:text-muted-foreground transition-colors p-1 rounded-full hover:bg-muted/50"
              >
                <ChevronDown className="w-4 h-4 animate-arrow-hint-pulse" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden">
          <div
            className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
            style={{ animationDelay: '700ms' }}
          >
            <div className="w-1 h-1 rounded-full bg-primary" />
            <p>
              Se tiver <span className="text-foreground">3 minutos</span>, veja os cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
