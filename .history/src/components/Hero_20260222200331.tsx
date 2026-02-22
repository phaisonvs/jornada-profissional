import { MessageCircle, Plug, Shield, BarChart3, Layout, Calendar, Truck, CreditCard, GitBranch, ChevronDown, Info, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useEffect, useRef, useState } from 'react';

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const COUNT_UP_DURATION = 2200;
const COUNT_UP_DURATION_SMALL = 1000;
const COUNT_UP_THRESHOLD = 10;
const COUNT_UP_DELAY_MS = 200;

interface PopupContent {
  title: string;
  oQueMede: string;
  comoLer: string;
  porQueImporta: string;
}

interface StatItemIntro {
  icon: LucideIcon;
  title: string;
  isIntro: true;
  introText: string;
}

interface StatItemKpi {
  icon: LucideIcon;
  title: string;
  isIntro?: false;
  valueTargets?: number[];
  valueFormat?: (v: number[]) => string;
  decimals?: number[];
  staticLabel?: string;
  supportLine: string;
  popup: PopupContent;
}

type StatItem = StatItemIntro | StatItemKpi;

const stats: StatItem[] = [
  {
    icon: MessageCircle,
    title: '',
    isIntro: true,
    introText: 'Os cards a seguir traduzem meu escopo atual em indicadores de integração, sustentação e conversão.',
  },
  {
    icon: Plug,
    title: '01 — Integrações entregues',
    valueTargets: [18],
    valueFormat: (v) => `+${Math.round(v[0])}`,
    supportLine: 'entregas de integração (UI/UX + front + regra de negócio)',
    popup: {
      title: 'Integrações entregues',
      oQueMede: 'Volume de integrações e entregas técnicas implementadas e publicadas em produção.',
      comoLer: 'Total acumulado de entregas com aplicação real em jornada e operação (não inclui apenas protótipo ou ajuste visual isolado).',
      porQueImporta: 'Evidencia atuação híbrida ponta a ponta, conectando experiência, front-end e operação.',
    },
  },
  {
    icon: Shield,
    title: '02 — Sustentação operacional',
    valueTargets: [7],
    valueFormat: (v) => `${Math.round(v[0])}`,
    supportLine: 'frentes/fluxos críticos com sustentação operacional recorrente',
    popup: {
      title: 'Sustentação operacional',
      oQueMede: 'Cobertura de sustentação sobre frentes e fluxos críticos (correções, ajustes, acompanhamento e estabilidade operacional).',
      comoLer: 'Pode ser apresentado em quantidade de frentes/fluxos acompanhados ou percentual de cobertura, conforme a base disponível.',
      porQueImporta: 'Mostra continuidade de operação, redução de risco e manutenção da performance além de novas entregas.',
    },
  },
  {
    icon: BarChart3,
    title: '03 — Base de CRO e mensuração',
    valueTargets: [24],
    valueFormat: (v) => `${Math.round(v[0])}`,
    supportLine: 'eventos críticos validados no funil (E2E)',
    popup: {
      title: 'Base de CRO e mensuração',
      oQueMede: 'Maturidade da base de conversão via instrumentação, validação de eventos e acompanhamento do funil ponta a ponta.',
      comoLer: 'Considera eventos críticos validados nas etapas do funil (PDP → Carrinho → Checkout → Pedido), com foco em consistência de mensuração.',
      porQueImporta: 'Demonstra que conversão está sendo tratada com método (dados + rotina), e não apenas por percepção.',
    },
  },
  {
    icon: Layout,
    title: '04 — Jornadas e LPs publicadas',
    valueTargets: [12],
    valueFormat: (v) => `+${Math.round(v[0])}`,
    supportLine: 'LPs/hotsites e fluxos de conversão publicados',
    popup: {
      title: 'Jornadas e LPs publicadas',
      oQueMede: 'Volume de páginas, LPs/hotsites e fluxos de jornada publicados com objetivo de conversão.',
      comoLer: 'Total de entregas publicadas em produção (captação, login, formulários e jornadas associadas).',
      porQueImporta: 'Evidencia capacidade de transformar demanda em experiência publicada com foco em resultado.',
    },
  },
  {
    icon: Calendar,
    title: '05 — Rotina de CRO (cadência)',
    staticLabel: 'Semanal',
    supportLine: 'backlog de hipóteses, priorização e acompanhamento de releases',
    popup: {
      title: 'Rotina de CRO',
      oQueMede: 'Frequência e consistência da rotina operacional de CRO (hipóteses, acompanhamento, análise e ajustes).',
      comoLer: 'Pode ser apresentado por cadência (semanal/quinzenal) e evoluído depois com volume de hipóteses/releases acompanhados.',
      porQueImporta: 'Mostra operação contínua de melhoria, não apenas entregas pontuais.',
    },
  },
  {
    icon: Truck,
    title: '06 — Saúde do frete',
    valueTargets: [96.2],
    valueFormat: (v) => `${v[0].toFixed(1).replace('.', ',')}%`,
    decimals: [1],
    supportLine: 'cotação → opção exibida, com monitoramento de falhas',
    popup: {
      title: 'Saúde do frete',
      oQueMede: 'Taxa de sucesso no fluxo de frete entre cotação e exibição de opções para o usuário.',
      comoLer: 'Percentual de tentativas em que a jornada de frete retorna corretamente opções utilizáveis.',
      porQueImporta: 'Frete é etapa crítica de conversão; falhas aqui impactam abandono e confiança da jornada.',
    },
  },
  {
    icon: CreditCard,
    title: '07 — Saúde do pagamento',
    valueTargets: [91.8],
    valueFormat: (v) => `${v[0].toFixed(1).replace('.', ',')}%`,
    decimals: [1],
    supportLine: 'tentativa → aprovação, com leitura por método/etapa',
    popup: {
      title: 'Saúde do pagamento',
      oQueMede: 'Taxa de sucesso da jornada de pagamento entre tentativa e aprovação.',
      comoLer: 'Percentual de transações que avançam corretamente, com análise de erros por método e etapa.',
      porQueImporta: 'Pagamento é etapa final de conversão; monitorar falhas aumenta eficiência comercial e reduz perda de receita.',
    },
  },
  {
    icon: GitBranch,
    title: '08 — Evolução contínua (releases)',
    valueTargets: [14],
    valueFormat: (v) => `${Math.round(v[0])}`,
    supportLine: 'melhorias/releases acompanhados por impacto em operação e conversão',
    popup: {
      title: 'Evolução contínua',
      oQueMede: 'Volume de melhorias e releases acompanhados dentro da rotina de evolução da plataforma.',
      comoLer: 'Total de evoluções entregues/acompanhadas em período definido (ex.: ciclo/mês), com leitura por impacto.',
      porQueImporta: 'Reforça previsibilidade de execução e capacidade de sustentar evolução contínua com foco em negócio.',
    },
  },
];

const DRUM_RADIUS_MOBILE = 120;
const DRUM_RADIUS_DESKTOP = 180;
const ANGLE_STEP_MOBILE = 60;
const ANGLE_STEP_DESKTOP = 48;
const CONTAINER_HEIGHT_MOBILE = 220;
const CONTAINER_HEIGHT_DESKTOP = 300;
const WHEEL_NOTCH_THRESHOLD = 120;
const WHEEL_STEP_COOLDOWN_MS = 150;
const WHEEL_ANIMATION_DURATION = 420;
const TOUCH_SENSITIVITY = 0.014;
const MOUSE_SENSITIVITY = 0.012;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero = () => {
  const { ref, isVisible } = useInView();
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [hintPaused, setHintPaused] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[][]>(() =>
    stats.map((s) => ('valueTargets' in s && s.valueTargets ? s.valueTargets.map(() => 0) : []))
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
  const mouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const mouseUpRef = useRef<() => void>(() => {});
  const wheelAccumulatedRef = useRef(0);
  const wheelAnimationRef = useRef<number | null>(null);
  const pendingWheelStepsRef = useRef(0);
  const lastWheelStepTimeRef = useRef(0);

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

  const snapToNearestRef = useRef(snapToNearest);
  snapToNearestRef.current = snapToNearest;

  useEffect(() => {
    mouseMoveRef.current = (e: MouseEvent) => {
      const deltaY = touchStartYRef.current - e.clientY;
      progressRef.current = progressRef.current + deltaY * MOUSE_SENSITIVITY;
      setProgress(progressRef.current);
      touchStartYRef.current = e.clientY;
      setHintPaused(true);
      setIsSnapping(false);
      clearTimeout(snapTimeoutRef.current);
    };
    mouseUpRef.current = () => {
      document.removeEventListener('mousemove', mouseMoveRef.current);
      document.removeEventListener('mouseup', mouseUpRef.current);
      snapToNearestRef.current(60);
      clearTimeout(hintResumeRef.current);
      hintResumeRef.current = setTimeout(() => setHintPaused(false), 800);
    };
  }, []);

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    touchStartYRef.current = e.clientY;
    setHintPaused(true);
    setIsSnapping(false);
    clearTimeout(snapTimeoutRef.current);
    clearTimeout(hintResumeRef.current);
    document.addEventListener('mousemove', mouseMoveRef.current);
    document.addEventListener('mouseup', mouseUpRef.current);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scheduleHintResume = () => {
      clearTimeout(hintResumeRef.current);
      hintResumeRef.current = setTimeout(() => setHintPaused(false), 800);
    };

    const startWheelStepAnimation = (direction: number) => {
      if (wheelAnimationRef.current != null) {
        pendingWheelStepsRef.current += direction;
        return;
      }
      lastWheelStepTimeRef.current = Date.now();
      const start = progressRef.current;
      const target = Math.round(start) + direction;
      const startTime = performance.now();
      const duration = WHEEL_ANIMATION_DURATION;

      const run = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(t);
        const current = start + (target - start) * eased;
        progressRef.current = current;
        setProgress(current);
        if (t < 1) {
          wheelAnimationRef.current = requestAnimationFrame(run);
        } else {
          progressRef.current = target;
          setProgress(target);
          wheelAnimationRef.current = null;
          setIsSnapping(true);
          setTimeout(() => setIsSnapping(false), 120);
          const pending = pendingWheelStepsRef.current;
          if (pending > 0) {
            pendingWheelStepsRef.current = pending - 1;
            startWheelStepAnimation(1);
          } else if (pending < 0) {
            pendingWheelStepsRef.current = pending + 1;
            startWheelStepAnimation(-1);
          }
        }
      };
      wheelAnimationRef.current = requestAnimationFrame(run);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setHintPaused(true);
      scheduleHintResume();
      setIsSnapping(false);
      clearTimeout(snapTimeoutRef.current);
      wheelAccumulatedRef.current += e.deltaY;
      const now = Date.now();
      if (now - lastWheelStepTimeRef.current < WHEEL_STEP_COOLDOWN_MS) return;
      const threshold = WHEEL_NOTCH_THRESHOLD;
      while (wheelAccumulatedRef.current >= threshold) {
        wheelAccumulatedRef.current -= threshold;
        startWheelStepAnimation(1);
        if (Date.now() - lastWheelStepTimeRef.current < WHEEL_STEP_COOLDOWN_MS) break;
      }
      while (wheelAccumulatedRef.current <= -threshold) {
        wheelAccumulatedRef.current += threshold;
        startWheelStepAnimation(-1);
        if (Date.now() - lastWheelStepTimeRef.current < WHEEL_STEP_COOLDOWN_MS) break;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(hintResumeRef.current);
      if (wheelAnimationRef.current != null) {
        cancelAnimationFrame(wheelAnimationRef.current);
        wheelAnimationRef.current = null;
      }
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
    const targets = 'valueTargets' in stat && stat.valueTargets ? stat.valueTargets : [];
    if (targets.length === 0) return;
    const rafMap = animationFrameRef.current;
    const existingRAF = rafMap.get(cardIndex);
    if (existingRAF) cancelAnimationFrame(existingRAF);

    setDisplayValues((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[cardIndex] = targets.map(() => 0);
      return copy;
    });

    const maxTarget = Math.max(...targets.map((v) => Math.abs(v)));
    const duration = maxTarget < COUNT_UP_THRESHOLD ? COUNT_UP_DURATION_SMALL : COUNT_UP_DURATION;
    const timeoutId = setTimeout(() => {
      const start = performance.now();
      const run = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / duration, 1);
        const progressVal = easeOutQuad(t);
        const decimals = ('decimals' in stat && stat.decimals) ? stat.decimals : [];
        const next = targets.map((target, j) => {
          const d = decimals[j] ?? 0;
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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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
              onMouseDown={handleContainerMouseDown}
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
                  const kpiStat = !isIntro ? (stat as StatItemKpi) : null;
                  const hasNumericKpi = kpiStat?.valueTargets && kpiStat.valueTargets.length > 0;
                  const kpiFinalStr = kpiStat
                    ? (kpiStat.staticLabel ?? (kpiStat.valueFormat && kpiStat.valueTargets ? kpiStat.valueFormat(kpiStat.valueTargets) : ''))
                    : '';
                  const kpiShortDisplay = kpiFinalStr.length <= 4;
                  const kpiVeryShort = kpiFinalStr.length <= 2;
                  const valueDisplay = isIntro
                    ? stat.introText
                    : kpiStat?.staticLabel ?? (kpiStat?.valueFormat && hasNumericKpi
                      ? kpiStat.valueFormat(displayValues[index] ?? kpiStat.valueTargets!.map(() => 0))
                      : '');

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
                        className={`w-full ${index !== 0 ? '-m-4 p-4 cursor-pointer' : ''}`}
                        onMouseDown={index !== 0 ? (e) => handleCardMouseDown(e, index) : undefined}
                        onMouseUp={index !== 0 ? (e) => handleCardMouseUp(e, index) : undefined}
                        onTouchStart={index !== 0 ? (e) => handleCardTouchStart(e, index) : undefined}
                        onTouchEnd={index !== 0 ? (e) => handleCardTouchEnd(e, index) : undefined}
                      >
                        <div
                          className={`w-full p-5 md:p-6 rounded-xl bg-card border transition-all duration-300 relative ${
                            index === 0 ? 'text-center flex flex-col items-center' : ''
                          }`}
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
                        >
                        {index !== 0 && (
                          <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center opacity-50 transition-opacity duration-200 hover:opacity-100">
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className={`flex items-center gap-3 mb-3 ${index === 0 ? 'justify-center' : ''}`}>
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
                          {!isIntro && (
                            <span className="text-xs md:text-sm text-muted-foreground">{stat.title}</span>
                          )}
                        </div>
                        {isIntro ? (
                          <p className="text-foreground/85 font-normal text-base md:text-lg leading-snug">
                            {valueDisplay}
                          </p>
                        ) : (
                          <div className={`flex items-baseline ${kpiVeryShort ? 'gap-x-0.5' : kpiShortDisplay ? 'gap-x-0.5' : 'gap-x-1.5'}`}>
                            <div className={`shrink-0 ${kpiVeryShort ? 'min-w-[1.25rem] md:min-w-[1.5rem]' : kpiShortDisplay ? 'min-w-[2rem] md:min-w-[2.5rem]' : 'min-w-[2.5rem] md:min-w-[3rem]'}`}>
                              <span
                                className={`text-lg md:text-xl font-semibold text-foreground inline-block origin-center ${
                                  hasNumericKpi && scalePulseIndex === index ? 'animate-value-count-pop' : ''
                                }`}
                              >
                                {valueDisplay}
                              </span>
                            </div>
                            <span className="text-sm md:text-base font-light text-foreground/75">
                              {kpiStat?.supportLine}
                            </span>
                          </div>
                        )}
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

      {openModalIndex !== null && openModalIndex > 0 && 'popup' in stats[openModalIndex] && (
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
            {(() => {
              const stat = stats[openModalIndex] as StatItemKpi;
              const pop = stat.popup;
              const Icon = stat.icon;
              return (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {pop.title}
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div>
                      <span className="font-medium text-foreground">O que mede: </span>
                      {pop.oQueMede}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Como ler: </span>
                      {pop.comoLer}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Por que importa: </span>
                      {pop.porQueImporta}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
