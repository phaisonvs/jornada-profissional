import {
  Plug,
  Shield,
  BarChart3,
  Layout,
  TrendingUp,
  ChevronDown,
  Info,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CASES_CARD_COUNT } from "@/components/Cases";
import MouseScroll from "@/components/icons/MouseScroll";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const COUNT_UP_DURATION = 2200;
const COUNT_UP_DURATION_SMALL = 1000;
const COUNT_UP_THRESHOLD = 10;
const COUNT_UP_DELAY_MS = 200;

interface PopupContent {
  title: string;
  summary: string;
  deliveries: string[];
}

interface StatItemIntro {
  icon: LucideIcon;
  title: string;
  isIntro: true;
  introText: ReactNode;
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

const heroStatUiKeys = [
  "intro",
  "integracoes-entregues",
  "sustentacao-operacional",
  "base-tecnica-para-cro",
  "jornadas-e-lps-publicadas",
  "evolucao-continua",
] as const;

const getStatUiKey = (_stat: StatItem, index: number) =>
  heroStatUiKeys[index] ?? `card-${index + 1}`;

const stats: StatItem[] = [
  {
    icon: MouseScroll as unknown as LucideIcon,
    title: "",
    isIntro: true,
    introText: (
      <>
        <strong className="font-semibold text-foreground">
          Interaja com os cards!
        </strong>
        <br />
        Reuni os meus principais indicadores dos últimos 4 anos.
      </>
    ),
  },
  {
    icon: Plug,
    title: "01 — Entregas integradas",
    valueTargets: [CASES_CARD_COUNT],
    valueFormat: (v) => `+${Math.round(v[0])}`,
    supportLine:
      "entregas conectando UX/UI, front-end, back-end, regra de negócio e operação.",
    popup: {
      title: "Entregas integradas",
      summary:
        "Atuei em +40 entregas que exigiam conexão entre experiência, tecnologia, regra de negócio e operação.",
      deliveries: [
        "Transformei necessidades do negócio em jornadas publicadas: LPs, campanhas, páginas e fluxos de captação.",
        "Implementei frentes que envolveram autenticação, checkout, cupons, navegação, tracking, WhatsApp e leads.",
        "Conectei UX/UI, front-end, back-end e integrações para tirar soluções do papel com mais autonomia.",
        "Acompanhei da definição da solução ao go-live, validação e ajustes pós-publicação.",
      ],
    },
  },
  {
    icon: Shield,
    title: "02 — Sustentação operacional",
    valueTargets: [10],
    valueFormat: (v) => `${Math.round(v[0])}`,
    supportLine:
      "frentes críticas sustentadas com atuação recorrente em produção.",
    popup: {
      title: "Sustentação operacional",
      summary:
        "Pelos cases publicados, atuei na sustentação de pelo menos 10 frentes críticas em produção, indo além de front-end isolado.",
      deliveries: [
        "Login e autenticacao: fluxos de acesso, cadastro, validacoes, login social e jornada Prime.",
        "Checkout e compra: revisoes de checkout, frete, pagamento, cupons e etapa final de conversao.",
        "Captacao de leads: formularios, LPs, popups, WhatsApp e encaminhamento para operacao comercial.",
        "Tracking e analytics: dataLayer, eventos, Looker e leitura ponta a ponta do comportamento em producao.",
        "Integracoes comerciais: Salesforce, Pipedrive, APIs e envio estruturado de dados entre sistemas.",
        "Navegacao e descoberta: header, menu, busca, autocomplete e orientacao da jornada no site.",
        "Campanhas e LPs: pages sazonais e jornadas de campanha com ativacao rapida e sustentacao tecnica.",
        "PDP e jornada de produto: paginas de produto, variacoes, conteudo e experiencia de conversao.",
        "Regionalizacao e regras de negocio: preco por regiao, CEP, store e comportamento da jornada.",
        "Comunicacao transacional: e-mails, mensagens e continuidade da experiencia apos a conversao.",
      ],
    },
  },
  {
    icon: BarChart3,
    title: "03 — Base técnica para CRO",
    valueTargets: [50],
    valueFormat: (v) => `+${Math.round(v[0])}`,
    supportLine:
      "eventos de funil revisados para melhorar tracking, jornada e mensuração.",
    popup: {
      title: "Base técnica para CRO",
      summary:
        "Atuei diretamente na mensuração dos funis para transformar comportamento do usuário em decisão prática de CRO.",
      deliveries: [
        "Revisei eventos em login, checkout, formulários, leads e conversão.",
        "Ajustei dataLayer, parâmetros, regras de disparo e leitura em analytics.",
        "Validei a conexão entre interface, implementação e mensuração.",
        "Usei essa leitura para identificar gargalos e priorizar melhorias.",
      ],
    },
  },
  {
    icon: Layout,
    title: "04 — Jornadas e LPs publicadas",
    valueTargets: [12],
    valueFormat: (v) => `+${Math.round(v[0])}`,
    supportLine:
      "LPs, hotsites e fluxos publicados em diferentes ambientes digitais.",
    popup: {
      title: "Jornadas e LPs publicadas",
      summary:
        "Atuei em jornadas publicadas em diferentes ambientes, conectando campanha, captação, front-end e operação.",
      deliveries: [
        "Publiquei LPs, hotsites e fluxos em Salesforce, Wake, Sharp e domínios próprios.",
        "Estruturei formulários, CTAs, WhatsApp, captação de leads e fluxos comerciais.",
        "Adaptei front-end, responsividade e interações conforme cada plataforma.",
        "Garanti que a jornada estivesse pronta para campanha, operação e conversão.",
      ],
    },
  },
  {
    icon: TrendingUp,
    title: "05 — Evolução contínua",
    valueTargets: [14],
    valueFormat: (v) => `${Math.round(v[0])}`,
    supportLine:
      "melhorias e releases acompanhados com foco em jornada, operação e conversão.",
    popup: {
      title: "Evolução contínua e CRO",
      summary:
        "Atuei na evolução contínua dos canais digitais, conectando ajustes técnicos, CRO e operação comercial.",
      deliveries: [
        "Acompanhei melhorias em páginas, componentes, fluxos e integrações.",
        "Apliquei CRO em frentes de franquia, venda e captação de leads.",
        "Estruturei fluxos com WhatsApp, Salesforce, Pipedrive e tracking.",
        "Sustentei ajustes pós-go-live para manter estabilidade e continuidade da jornada.",
      ],
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
    stats.map((s) =>
      "valueTargets" in s && s.valueTargets ? s.valueTargets.map(() => 0) : [],
    ),
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
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
      document.removeEventListener("mousemove", mouseMoveRef.current);
      document.removeEventListener("mouseup", mouseUpRef.current);
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
    document.addEventListener("mousemove", mouseMoveRef.current);
    document.addEventListener("mouseup", mouseUpRef.current);
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
        if (Date.now() - lastWheelStepTimeRef.current < WHEEL_STEP_COOLDOWN_MS)
          break;
      }
      while (wheelAccumulatedRef.current <= -threshold) {
        wheelAccumulatedRef.current += threshold;
        startWheelStepAnimation(-1);
        if (Date.now() - lastWheelStepTimeRef.current < WHEEL_STEP_COOLDOWN_MS)
          break;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
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
    if ("isIntro" in stat && stat.isIntro) return;
    const targets =
      "valueTargets" in stat && stat.valueTargets ? stat.valueTargets : [];
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
    const duration =
      maxTarget < COUNT_UP_THRESHOLD
        ? COUNT_UP_DURATION_SMALL
        : COUNT_UP_DURATION;
    const timeoutId = setTimeout(() => {
      const start = performance.now();
      const run = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / duration, 1);
        const progressVal = easeOutQuad(t);
        const decimals =
          "decimals" in stat && stat.decimals ? stat.decimals : [];
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
      if (e.key === "Escape") setOpenModalIndex(null);
    };
    window.addEventListener("keydown", handleEscape);
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [openModalIndex]);

  const drumRadius = isMobile ? DRUM_RADIUS_MOBILE : DRUM_RADIUS_DESKTOP;
  const drumHeight = isMobile
    ? CONTAINER_HEIGHT_MOBILE
    : CONTAINER_HEIGHT_DESKTOP;
  const angleStep = isMobile ? ANGLE_STEP_MOBILE : ANGLE_STEP_DESKTOP;

  return (
    <section
      className="min-h-[90dvh] md:min-h-[82vh] flex flex-col justify-center pt-24 pb-10 md:pt-20 md:pb-12 px-4 md:px-6"
      data-ui="hero.root"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out flex flex-col justify-between ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        data-ui="hero.content"
      >
        <div
          className="relative z-10 mb-4 md:mb-5 md:mt-12 text-center opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
          style={{ animationDelay: "100ms" }}
          data-ui="hero.intro"
        >
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-3 md:mb-4 break-words"
            data-ui="hero.title"
          >
            Formalização da atuação{"\u00A0"}como
            <br />
            <span className="text-primary">
              Coordenador de <br className="md:hidden" />
              <span className="whitespace-nowrap">CRO &amp; UX</span>
            </span>
          </h1>
          <p
            className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-snug md:leading-normal break-words"
            data-ui="hero.subtitle"
          >
            Um reconhecimento ao escopo que já assumo, CRO: UX/UI, front-end,
            tracking e integrações.
          </p>
        </div>

        <div
          className="relative w-full flex justify-center"
          data-ui="hero.drum-wrap"
        >
          <div
            className="mt-2 select-none overflow-visible w-full md:max-w-[70%] relative"
            data-ui="hero.drum"
          >
            <div
              ref={containerRef}
              className="relative z-0"
              style={{
                height: `${drumHeight}px`,
                perspective: isMobile ? "700px" : "1000px",
                perspectiveOrigin: "50% 50%",
                overflow: "visible",
                touchAction: "none",
                cursor: "grab",
              }}
              onMouseDown={handleContainerMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="animate-drum-hint-float"
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "visible",
                  animationPlayState: hintPaused ? "paused" : "running",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    overflow: "visible",
                  }}
                >
                  {stats.map((stat, index) => {
                    const offset = normalizeOffset(index - progress);
                    const absOffset = Math.abs(offset);
                    const thetaDeg = -offset * angleStep;
                    const isActive = absOffset < 0.25;
                    const baseOpacity = Math.max(0, 1 - absOffset * 0.72);
                    const opacity = isActive ? baseOpacity : baseOpacity * 0.78;

                    if (absOffset > N / 2 + 0.1) return null;

                    const isIntro = "isIntro" in stat && stat.isIntro;
                    const kpiStat = !isIntro ? (stat as StatItemKpi) : null;
                    const hasNumericKpi =
                      kpiStat?.valueTargets && kpiStat.valueTargets.length > 0;
                    const kpiFinalStr = kpiStat
                      ? (kpiStat.staticLabel ??
                        (kpiStat.valueFormat && kpiStat.valueTargets
                          ? kpiStat.valueFormat(kpiStat.valueTargets)
                          : ""))
                      : "";
                    const kpiShortDisplay = kpiFinalStr.length <= 4;
                    const kpiVeryShort = kpiFinalStr.length <= 2;
                    const valueDisplay = isIntro
                      ? stat.introText
                      : (kpiStat?.staticLabel ??
                        (kpiStat?.valueFormat && hasNumericKpi
                          ? kpiStat.valueFormat(
                              displayValues[index] ??
                                kpiStat.valueTargets!.map(() => 0),
                            )
                          : ""));
                    const cardUiKey = getStatUiKey(stat, index);

                    return (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: `rotateX(${thetaDeg}deg) translateZ(${drumRadius}px)`,
                          opacity,
                          zIndex: Math.round(2 - absOffset),
                          transition: isSnapping
                            ? "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.36s ease"
                            : "none",
                          willChange: "transform, opacity",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <div
                          className={`relative w-full max-w-[108%] md:max-w-full -m-4 p-4 ${index !== 0 ? "cursor-pointer" : ""}`}
                          data-ui={`hero.card.${cardUiKey}.frame`}
                          onMouseDown={
                            index !== 0
                              ? (e) => handleCardMouseDown(e, index)
                              : undefined
                          }
                          onMouseUp={
                            index !== 0
                              ? (e) => handleCardMouseUp(e, index)
                              : undefined
                          }
                          onTouchStart={
                            index !== 0
                              ? (e) => handleCardTouchStart(e, index)
                              : undefined
                          }
                          onTouchEnd={
                            index !== 0
                              ? (e) => handleCardTouchEnd(e, index)
                              : undefined
                          }
                        >
                          <div
                            className={`w-full p-5 md:p-6 rounded-xl bg-card border transition-all duration-300 relative ${
                              index === 0
                                ? "text-center flex flex-col items-center"
                                : ""
                            }`}
                            data-ui={`hero.card.${cardUiKey}.body`}
                            style={{
                              borderColor: isActive
                                ? "hsl(var(--primary) / 0.4)"
                                : "hsl(var(--border))",
                              boxShadow: isActive
                                ? "0 0 0 1px hsl(var(--primary) / 0.1), 0 8px 32px hsl(0 0% 0% / 0.3)"
                                : "none",
                              filter: isActive ? "none" : "blur(0.6px)",
                              WebkitFilter: isActive ? "none" : "blur(0.6px)",
                            }}
                          >
                            {index !== 0 && (
                              <div
                                className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center opacity-50 transition-opacity duration-200 hover:opacity-100"
                                data-ui={`hero.card.${cardUiKey}.info`}
                              >
                                <Info className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                            <div
                              className={`flex items-center gap-3 mb-3 ${index === 0 ? "justify-center" : ""}`}
                              data-ui={`hero.card.${cardUiKey}.header`}
                            >
                              <div
                                className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0"
                                data-ui={`hero.card.${cardUiKey}.icon`}
                                style={{
                                  backgroundColor: isActive
                                    ? "hsl(var(--primary) / 0.2)"
                                    : "hsl(var(--primary) / 0.1)",
                                  transition: "background-color 0.3s ease",
                                }}
                              >
                                <stat.icon
                                  className={`w-4 h-4 md:w-5 md:h-5 text-primary inline-block ${
                                    iconPulseIndex === index
                                      ? "animate-icon-pop"
                                      : ""
                                  }`}
                                />
                              </div>
                              {!isIntro && (
                                <span
                                  className="text-xs md:text-sm text-muted-foreground"
                                  data-ui={`hero.card.${cardUiKey}.title`}
                                >
                                  {stat.title}
                                </span>
                              )}
                            </div>
                            {isIntro ? (
                              <p
                                className="whitespace-pre-line text-foreground/85 font-normal text-base md:text-lg leading-snug"
                                data-ui={`hero.card.${cardUiKey}.text`}
                              >
                                {valueDisplay}
                              </p>
                            ) : (
                              <div
                                className={`flex items-baseline ${kpiVeryShort ? "gap-x-0.5" : kpiShortDisplay ? "gap-x-0.5" : "gap-x-1.5"}`}
                                data-ui={`hero.card.${cardUiKey}.metric`}
                              >
                                <div
                                  className={`shrink-0 ${kpiVeryShort ? "min-w-[1.25rem] md:min-w-[1.5rem]" : kpiShortDisplay ? "min-w-[2rem] md:min-w-[2.5rem]" : "min-w-[2.5rem] md:min-w-[3rem]"}`}
                                  data-ui={`hero.card.${cardUiKey}.value`}
                                >
                                  <span
                                    className={`text-lg md:text-xl font-semibold text-foreground inline-block origin-center ${
                                      hasNumericKpi && scalePulseIndex === index
                                        ? "animate-value-count-pop"
                                        : ""
                                    }`}
                                    data-ui={`hero.card.${cardUiKey}.value.text`}
                                  >
                                    {valueDisplay}
                                  </span>
                                </div>
                                <span
                                  className="text-sm md:text-base font-light text-foreground/75"
                                  data-ui={`hero.card.${cardUiKey}.support-line`}
                                >
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
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "-22%",
                  height: "32%",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.35) 75%, transparent 100%)",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "-22%",
                  height: "32%",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.35) 75%, transparent 100%)",
                }}
              />
            </div>

            <div
              className="relative z-10 flex justify-center gap-1.5 mt-14 md:mt-16 md:gap-2"
              data-ui="hero.dots"
            >
              {stats.map((_, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => goToCard(i)}
                    aria-label={`Card ${i + 1}`}
                    data-ui={`hero.dot.${i + 1}`}
                    className="rounded-full border-0 cursor-pointer transition-all duration-300 shrink-0"
                    style={{
                      width: isMobile ? (isActive ? 14 : 4) : isActive ? 18 : 6,
                      height: isMobile ? 4 : 6,
                      borderRadius: 4,
                      backgroundColor: isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground) / 0.3)",
                      padding: 0,
                    }}
                  />
                );
              })}
            </div>
            <div
              className="relative z-10 flex justify-center mt-8 md:mt-10 pb-1"
              data-ui="hero.scroll-next.wrap"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("tldr")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label="Ir para próxima seção"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-primary/25 bg-primary/5 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 animate-arrow-float-subtle"
                data-ui="hero.scroll-next"
              >
                <ChevronDown className="w-5 h-5 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden">
          <div
            className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
            style={{ animationDelay: "700ms" }}
          >
            <div className="w-1 h-1 rounded-full bg-primary" />
            <p>
              Se tiver <span className="text-foreground">3 minutos</span>, veja
              os cases.
            </p>
          </div>
        </div>
      </div>

      {openModalIndex !== null &&
        openModalIndex > 0 &&
        "popup" in stats[openModalIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-fade-in"
            data-ui="hero.modal"
            onClick={() => setOpenModalIndex(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-modal-scale-in"
              data-ui="hero.modal.content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenModalIndex(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200"
                aria-label="Fechar"
                data-ui="hero.modal.close"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              {(() => {
                const stat = stats[openModalIndex] as StatItemKpi;
                const pop = stat.popup;
                const Icon = stat.icon;
                return (
                  <>
                    <div
                      className="flex items-center gap-4 mb-4"
                      data-ui="hero.modal.header"
                    >
                      <div
                        className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0"
                        data-ui="hero.modal.icon"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3
                        className="text-lg font-semibold text-foreground"
                        data-ui="hero.modal.title"
                      >
                        {pop.title}
                      </h3>
                    </div>
                    <div
                      className="space-y-4 text-sm text-muted-foreground leading-relaxed"
                      data-ui="hero.modal.body"
                    >
                      <p data-ui="hero.modal.body.summary">{pop.summary}</p>
                      <ul
                        className="space-y-2"
                        data-ui="hero.modal.body.deliveries"
                      >
                        {pop.deliveries.map((item, index) => (
                          <li
                            key={index}
                            className="flex gap-2 items-start"
                            data-ui={`hero.modal.body.deliveries.item.${index + 1}`}
                          >
                            <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
