import { MessageCircle, TrendingUp, Zap, Shield, Target, Users, BarChart3, LineChart, GitBranch, Activity, ChevronDown, ArrowUpRight, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useEffect, useRef, useState } from 'react';

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const COUNT_UP_DURATION = 2200;
const COUNT_UP_DELAY_MS = 200;

interface StatItemBase {
  icon: LucideIcon;
  title: string;
  context: string;
}

interface StatItemIntro extends StatItemBase {
  isIntro: true;
  introText: string;
}

interface StatItemKpi extends StatItemBase {
  isIntro?: false;
  valueTargets: number[];
  valueFormat: (v: number[]) => string;
  decimals?: number[];
}

type StatItem = StatItemIntro | StatItemKpi;

const stats: StatItem[] = [
  {
    icon: MessageCircle,
    title: 'Antes dos números',
    isIntro: true,
    introText: 'Contexto do que busco entregar como Tech Lead de CRO — depois vêm os KPIs.',
    context: 'Este card introduz o papel de Tech Lead de CRO, que vai além da execução técnica e responde por decisões que impactam conversão, receita e sustentação da operação.',
  },
  {
    icon: TrendingUp,
    title: 'Impacto em conversão/receita',
    valueTargets: [18, 420],
    valueFormat: (v) => `${Math.round(v[0])}% / R$ ${Math.round(v[1])}k`,
    context: 'Mede o impacto direto em conversão (%) e receita (R$) gerado pelas entregas e otimizações conduzidas. Inclui testes A/B, ajustes de jornada e melhorias de performance que resultaram em aumento mensurável de conversão e receita.',
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    valueTargets: [12, 6],
    valueFormat: (v) => `${Math.round(v[0])} releases em ${Math.round(v[1])} semanas`,
    context: 'Frequência e ritmo de entrega em produção. Reflete a capacidade de conduzir múltiplas entregas em paralelo, com qualidade e sem travar o time. Inclui features, correções e melhorias que chegaram ao usuário final.',
  },
  {
    icon: Shield,
    title: 'Estabilidade / risco evitado',
    valueTargets: [4],
    valueFormat: (v) => `${Math.round(v[0])} incidentes a menos`,
    context: 'Redução de incidentes críticos e bugs em produção. Reflete decisões técnicas preventivas, validação antes de deploy e processos que evitam retrabalho e quebra de jornada crítica.',
  },
  {
    icon: Target,
    title: 'Precisão em testes',
    valueTargets: [340, 78],
    valueFormat: (v) => `${Math.round(v[0])} testes / ${Math.round(v[1])}% cobertura`,
    context: 'Volume de testes automatizados e cobertura de código. Garante que mudanças não quebrem funcionalidades existentes e que novas features sejam validadas antes de produção.',
  },
  {
    icon: Users,
    title: 'Colaboração cross-team',
    valueTargets: [3],
    valueFormat: (v) => `${Math.round(v[0])} squads integradas`,
    context: 'Número de squads/áreas diferentes integradas em projetos conduzidos. Reflete a capacidade de alinhar design, dev, dados e produto sem precisar de intermediário.',
  },
  {
    icon: BarChart3,
    title: 'Funil e conversão',
    valueTargets: [12],
    valueFormat: (v) => `${Math.round(v[0])}% por etapa`,
    context: 'Taxa média de conversão por etapa do funil. Mede a eficiência de cada passo da jornada crítica e identifica onde há mais perda de usuários para priorizar otimizações.',
  },
  {
    icon: LineChart,
    title: 'Métricas de produto',
    valueTargets: [8],
    valueFormat: (v) => `${Math.round(v[0])} OKRs rastreáveis`,
    context: 'Quantidade de OKRs e métricas de produto acompanhadas com visibilidade clara de progresso. Garante que cada entrega esteja ligada a objetivos de negócio mensuráveis.',
  },
  {
    icon: GitBranch,
    title: 'Entrega iterativa',
    valueTargets: [14],
    valueFormat: (v) => `${Math.round(v[0])} deploys/semana`,
    context: 'Frequência de deploys em produção. Reflete a capacidade de entregar valor de forma iterativa e contínua, com entregas pequenas e frequentes que reduzem risco e aceleram feedback.',
  },
  {
    icon: Activity,
    title: 'Health do sistema',
    valueTargets: [99.6],
    valueFormat: (v) => `${v[0].toFixed(1)}% uptime`,
    decimals: [1],
    context: 'Disponibilidade e estabilidade do sistema (uptime). Reflete a confiabilidade da operação, monitoramento proativo e capacidade de resposta a incidentes antes que impactem o usuário.',
  },
];

const DRUM_RADIUS_MOBILE = 120;
const DRUM_RADIUS_DESKTOP = 180;
const ANGLE_STEP_MOBILE = 60;
const ANGLE_STEP_DESKTOP = 48;
const CONTAINER_HEIGHT_MOBILE = 220;
const CONTAINER_HEIGHT_DESKTOP = 300;
const SCROLL_SENSITIVITY = 0.006;
const TOUCH_SENSITIVITY = 0.014;

const Hero = () => {
  const { ref, isVisible } = useInView();
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [hintPaused, setHintPaused] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[][]>(() =>
    stats.map((s) => ('valueTargets' in s ? s.valueTargets.map(() => 0) : [0]))
  );
  const [scalePulseIndex, setScalePulseIndex] = useState<number | null>(null);
  const [iconPulseIndex, setIconPulseIndex] = useState<number | null>(null);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);
  const clickStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hintResumeRef = useRef<ReturnType<typeof setTimeout>>();
  const animationFrameRef = useRef<Map<number, number>>(new Map());

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
  }, []);

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

  const handleCardMouseDown = (e: React.MouseEvent, cardIndex: number) => {
    clickStartPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardMouseUp = (e: React.MouseEvent, cardIndex: number) => {
    if (!clickStartPosRef.current) return;
    const dx = Math.abs(e.clientX - clickStartPosRef.current.x);
    const dy = Math.abs(e.clientY - clickStartPosRef.current.y);
    if (dx < 5 && dy < 5) {
      setOpenModalIndex(cardIndex);
    }
    clickStartPosRef.current = null;
  };

  const handleCardTouchStart = (e: React.TouchEvent, cardIndex: number) => {
    const touch = e.touches[0];
    clickStartPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCardTouchEnd = (e: React.TouchEvent, cardIndex: number) => {
    if (!clickStartPosRef.current || !e.changedTouches[0]) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - clickStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - clickStartPosRef.current.y);
    if (dx < 5 && dy < 5) {
      setOpenModalIndex(cardIndex);
    }
    clickStartPosRef.current = null;
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

  const activeIndex = ((Math.round(progress) % N) + N) % N;

  useEffect(() => {
    const cardIndex = activeIndex;
    const stat = stats[cardIndex];
    if ('isIntro' in stat && stat.isIntro) return;
    const rafMap = animationFrameRef.current;
    const existingRAF = rafMap.get(cardIndex);
    if (existingRAF) cancelAnimationFrame(existingRAF);

    setDisplayValues((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[cardIndex] = ('valueTargets' in stat ? stat.valueTargets : []).map(() => 0);
      return copy;
    });

    const timeoutId = setTimeout(() => {
      const start = performance.now();
      const run = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / COUNT_UP_DURATION, 1);
        const progressVal = easeOutQuad(t);
        const next = ('valueTargets' in stat ? stat.valueTargets : []).map((target, j) => {
          const d = ('decimals' in stat ? stat.decimals : undefined)?.[j] ?? 0;
          const v = target * progressVal;
          return d > 0 ? Number(v.toFixed(d)) : v;
        });
        setDisplayValues((prev) => {
          const copy = prev.map((row) => [...row]);
          copy[cardIndex] = next;
          return copy;
        });
        if (t < 1) {
          const rafId = requestAnimationFrame(run);
          rafMap.set(cardIndex, rafId);
        } else {
          rafMap.delete(cardIndex);
          setScalePulseIndex(cardIndex);
          setIconPulseIndex(cardIndex);
        }
      };
      const rafId = requestAnimationFrame(run);
      rafMap.set(cardIndex, rafId);
    }, COUNT_UP_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
      const currentRAF = rafMap.get(cardIndex);
      if (currentRAF !== undefined) {
        cancelAnimationFrame(currentRAF);
        rafMap.delete(cardIndex);
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    if (scalePulseIndex === null) return;
    const t = setTimeout(() => setScalePulseIndex(null), 520);
    return () => clearTimeout(t);
  }, [scalePulseIndex]);

  useEffect(() => {
    if (iconPulseIndex === null) return;
    const t = setTimeout(() => setIconPulseIndex(null), 460);
    return () => clearTimeout(t);
  }, [iconPulseIndex]);

  useEffect(() => {
    if (openModalIndex === null) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenModalIndex(null);
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [openModalIndex]);

  const drumRadius = isMobile ? DRUM_RADIUS_MOBILE : DRUM_RADIUS_DESKTOP;
  const drumHeight = isMobile ? CONTAINER_HEIGHT_MOBILE : CONTAINER_HEIGHT_DESKTOP;
  const angleStep = isMobile ? ANGLE_STEP_MOBILE : ANGLE_STEP_DESKTOP;

  return (
    <section className="min-h-[90dvh] md:min-h-[82vh] flex flex-col justify-center pt-24 pb-10 md:pt-20 md:pb-12 px-4 md:px-6">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out flex flex-col justify-between ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="relative z-10 mb-4 md:mb-5 md:mt-12 text-center opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
          style={{ animationDelay: '100ms' }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-3 md:mb-4">
            Formalização da atuação como
            <br />
            <span className="text-primary">Tech Lead de CRO.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-snug md:leading-normal">
            Meu papel vai além do UX/UI e responde por decisões que impactam
            <br className="hidden md:block" />
            conversão, receita e sustentação da operação.
          </p>
        </div>

        <div className="relative w-full flex justify-center">
          <div className="mt-2 select-none overflow-visible w-full max-w-[100%] md:max-w-[70%] relative">
            <div
              ref={containerRef}
              className="relative z-0"
              style={{
                height: `${drumHeight}px`,
                perspective: isMobile ? '700px' : '1000px',
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
                  const thetaDeg = -offset * angleStep;
                  const isActive = absOffset < 0.25;
                  const opacity = Math.max(0, 1 - absOffset * 0.62);

                  if (absOffset > N / 2 + 0.1) return null;

                  const isIntro = 'isIntro' in stat && stat.isIntro;
                  const valueText = isIntro
                    ? stat.introText
                    : (stat as StatItemKpi).valueFormat(displayValues[index] ?? (stat as StatItemKpi).valueTargets.map(() => 0));

                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        transform: `rotateX(${thetaDeg}deg) translateZ(${drumRadius}px)`,
                        opacity,
                        zIndex: Math.round(2 - absOffset),
                        transition: isSnapping
                          ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.36s ease'
                          : 'none',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <div
                        className={`w-full p-5 md:p-6 rounded-xl bg-card border transition-all duration-300 relative ${
                          index !== 0 ? 'cursor-pointer' : ''
                        } ${index === 0 && isActive ? 'text-center flex flex-col items-center' : ''}`}
                        style={{
                          borderColor: isActive
                            ? 'hsl(var(--primary) / 0.4)'
                            : 'hsl(var(--border))',
                          boxShadow: isActive
                            ? '0 0 0 1px hsl(var(--primary) / 0.1), 0 8px 32px hsl(0 0% 0% / 0.3)'
                            : 'none',
                          filter: isActive ? 'none' : 'blur(0.35px)',
                          WebkitFilter: isActive ? 'none' : 'blur(0.35px)',
                        }}
                        onMouseDown={index !== 0 ? (e) => handleCardMouseDown(e, index) : undefined}
                        onMouseUp={index !== 0 ? (e) => handleCardMouseUp(e, index) : undefined}
                        onTouchStart={index !== 0 ? (e) => handleCardTouchStart(e, index) : undefined}
                        onTouchEnd={index !== 0 ? (e) => handleCardTouchEnd(e, index) : undefined}
                      >
                        {index !== 0 && (
                          <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center opacity-40 transition-opacity duration-200 hover:opacity-100">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className={`flex items-center gap-3 mb-3 ${index === 0 && isActive ? 'justify-center' : ''}`}>
                          <div
                            className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: isActive
                                ? 'hsl(var(--primary) / 0.2)'
                                : 'hsl(var(--primary) / 0.1)',
                              transition: 'background-color 0.3s ease',
                            }}
                          >
                            <stat.icon
                              className={`w-4 h-4 md:w-5 md:h-5 text-primary inline-block ${
                                iconPulseIndex === index ? 'animate-icon-pop' : ''
                              }`}
                            />
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground">{stat.title}</span>
                        </div>
                        <div
                          className={`text-lg md:text-xl font-semibold text-foreground inline-block origin-bottom-left ${
                            !isIntro && scalePulseIndex === index ? 'animate-value-count-pop' : ''
                          } ${isIntro ? 'text-foreground/85 font-normal text-base md:text-lg' : ''}`}
                        >
                          {valueText}
                        </div>
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

            <div className="relative z-10 flex justify-center gap-1.5 mt-14 md:mt-16 md:gap-2">
              {stats.map((_, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => goToCard(i)}
                    aria-label={`Card ${i + 1}`}
                    className="rounded-full border-0 cursor-pointer transition-all duration-300 shrink-0"
                    style={{
                      width: isMobile ? (isActive ? 14 : 4) : (isActive ? 18 : 6),
                      height: isMobile ? 4 : 6,
                      borderRadius: 4,
                      backgroundColor: isActive
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground) / 0.3)',
                      padding: 0,
                    }}
                  />
                );
              })}
            </div>
            <div className="relative z-10 flex justify-center mt-8 md:mt-10 pb-1">
              <button
                onClick={() => document.getElementById('tldr')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Ir para próxima seção"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-primary/25 bg-primary/5 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 animate-arrow-float-subtle"
              >
                <ChevronDown className="w-5 h-5 md:w-5 md:h-5" />
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

      {openModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-fade-in"
          onClick={() => setOpenModalIndex(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-modal-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenModalIndex(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                {(() => {
                  const stat = stats[openModalIndex];
                  const Icon = stat.icon;
                  return <Icon className="w-6 h-6 text-primary" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {stats[openModalIndex].title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {stats[openModalIndex].context}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
