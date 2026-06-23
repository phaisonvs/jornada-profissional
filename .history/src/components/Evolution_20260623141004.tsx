import { useState, useEffect, useRef } from "react";
import {
  Palette,
  Megaphone,
  Layout,
  Eye,
  Code,
  Users,
  Target,
  Rocket,
  Check,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { toUiKey } from "@/lib/data-ui";

const steps = [
  {
    year: "2021",
    icon: Palette,
    title: "Design e comunicação",
    text: "Comecei atuando com design gráfico, motion e apoio às frentes de marca, campanhas e patrocínios, incluindo ativações ligadas ao futebol.",
  },
  {
    year: "2021",
    icon: Megaphone,
    title: "Marketing e Growth",
    text: "Fiz minha entrada em frentes mais próximas de performance, aquisição, campanhas e evolução digital, ampliando a visão sobre canais, funil e impacto no negócio.",
  },
  {
    year: "2022",
    icon: Layout,
    title: "UX/UI",
    text: "A oportunidade em UX/UI se concretizou quando me posicionei buscando ter mais entendimento e visibilidade do meu trabalho, apartir disso, atuei com mais profundidade em jornadas, interfaces, usabilidade e experiência digital voltado para conversão e aumento da receita.",
  },
  {
    year: "2022",
    icon: Eye,
    title: "CRO e funil",
    text: "Minha atuação passou a se conectar diretamente com hipóteses, fricções, conversão, eventos, métricas e evolução dos principais funis digitais.",
  },
  {
    year: "2023",
    icon: Code,
    title: "Execução técnica",
    text: "Nosso time sempre enfrentou desafios técnicos e funcionais e para tirar evoluções do papel, passei a atuar diretamente com front-end, back-end, APIs, tracking, integrações e sustentação técnica, afinal minhas skills sempre foram mais técnicas.",
  },
  {
    year: "2024",
    icon: Users,
    title: "Coordenação de frentes",
    text: "Com a saída de gestores, conduzi prioridades entre negócio, produto, tecnologia, operação, agências e parceiros para destravar entregas e acelerar evolução dos produtos MYSA. Foi onde de fato aprendi a atuar como dono de produtos.",
  },
  {
    year: "2026",
    icon: Target,
    title: "Objetivo atual",
    text: "Espero por uma formalização de minha atuação como Coordenador de CRO & UX, senioridade e responsabilidade compatível com o papel que já exerço.",
  },
  {
    year: "2027",
    icon: Rocket,
    title: "Ciclo 2027 — Tech Lead",
    text: "Evoluir para uma atuação como Tech Lead, ampliando meu escopo técnico para além do e-commerce e aplicando linguagens e competências que já venho desenvolvendo.",
  },
];

const CURRENT_STEP = 6;

const Evolution = () => {
  const [activeStep, setActiveStep] = useState(CURRENT_STEP);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useInView();
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    if (isVisible && !wasVisibleRef.current) {
      setActiveStep(CURRENT_STEP);
    }
    wasVisibleRef.current = isVisible;
  }, [isVisible]);

  const goToStep = (index: number) => {
    if (isAnimating || index === activeStep) return;
    setIsAnimating(true);
    setActiveStep(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section
      id="evolucao"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-4 md:px-6 scroll-mt-24"
      data-ui="evolution.root"
    >
      <div
        data-ui="evolution.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2
          className="text-lg font-semibold text-foreground mb-6"
          data-ui="evolution.title"
        >
          Minha evolução dentro da Mysa
        </h2>

        <p
          className="text-sm text-muted-foreground mb-12 max-w-3xl leading-relaxed"
          data-ui="evolution.subtitle"
        >
          Trilha no tim de Growth Tech 2021 a 2026
        </p>

        {/* Timeline navigation */}
        <div
          className="mb-6 overflow-x-auto pb-2 -mx-1 px-1 md:overflow-visible md:pb-0 md:mx-0 md:px-0"
          data-ui="evolution.timeline"
        >
          <div className="relative min-w-[640px] md:min-w-0">
            <div className="absolute top-4 md:top-5 left-0 right-0 h-px bg-border" />
            <div className="relative flex justify-between gap-0.5 md:gap-0">
              {steps.map((step, index) => {
                const doneBeforeCurrent = index < CURRENT_STEP;
                const active = index === activeStep;
                return (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    data-ui={`evolution.step.${toUiKey(step.title)}`}
                    className={`relative z-10 flex flex-1 flex-col items-center gap-2 md:gap-3 transition-all duration-700 ease-out min-w-0 ${
                      active
                        ? "scale-105 md:scale-110"
                        : "opacity-50 hover:opacity-80"
                    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    <span
                      className={`text-[9px] md:text-[10px] leading-none transition-colors duration-300 ${
                        active
                          ? "text-foreground/55"
                          : "text-muted-foreground/55"
                      }`}
                    >
                      {step.year}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 md:h-10 md:w-10 ${
                        active
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : doneBeforeCurrent
                            ? "border border-primary/38 bg-background hover:border-primary/55"
                            : "border border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <step.icon
                        className={`h-3.5 w-3.5 md:h-4 md:w-4 icon-hover-effect ${
                          active
                            ? ""
                            : doneBeforeCurrent
                              ? "text-primary/45"
                              : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`hidden max-w-[4.5rem] text-[9px] leading-tight transition-all duration-300 sm:block md:max-w-[5.5rem] sm:text-[10px] md:text-[11px] text-center ${
                        active
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden min-h-[180px]"
          data-ui="evolution.panel"
        >
          <div
            className={`rounded-xl bg-card border border-primary/20 transition-all duration-400 ${
              isAnimating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
            data-ui="evolution.panel.card"
          >
            <div className="flex items-start gap-4 p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return (
                    <Icon className="w-5 h-5 text-primary icon-hover-effect" />
                  );
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="text-sm font-medium text-foreground">
                    {steps[activeStep].title}
                  </h3>
                  {activeStep < CURRENT_STEP && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium leading-none text-primary whitespace-nowrap">
                      <Check
                        className="h-3 w-3 shrink-0"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      Concluído
                    </span>
                  )}
                  {activeStep === CURRENT_STEP && (
                    <span className="whitespace-nowrap rounded-full border border-sky-500/55 bg-sky-500/25 px-2 py-0.5 text-[10px] font-medium leading-none text-sky-200 shadow-sm shadow-sky-950/40 ring-1 ring-sky-400/25">
                      Em definição
                    </span>
                  )}
                  {activeStep > CURRENT_STEP && (
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5 leading-none whitespace-nowrap">
                      Próxima etapa
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {steps[activeStep].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
