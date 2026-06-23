import { CheckCircle2 } from "lucide-react";
import type { RefObject } from "react";
import { useInView } from "@/hooks/use-in-view";

const decisionItems = [
  {
    title: "Prazo",
    description: "Formalização em até 40 dias.",
  },
  {
    title: "Escopo",
    description:
      "Validação do papel que já exerço na condução técnica e estratégica das frentes digitais.",
  },
  {
    title: "Remuneração",
    description:
      "Adequação de responsabilidade e senioridade com 65% de aumento salarial.",
  },
];

const Request = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="pedido"
      className="py-24 px-4 md:px-6 bg-secondary/30 scroll-mt-24"
      data-ui="request.root"
    >
      <div
        ref={ref as RefObject<HTMLDivElement>}
        data-ui="request.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-primary" aria-hidden />
              <h2
                className="text-lg font-medium text-foreground"
                data-ui="request.title"
              >
                Avaliação e aprovação de decisão
              </h2>
            </div>
            <p className="sr-only" data-ui="request.subtitle">
              Formalizar em até 60 dias o cargo de Coordenador de CRO &amp; UX,
              com escopo, senioridade e remuneração alinhados à atuação já
              exercida.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-primary">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            60 dias
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-3xl border border-border bg-card px-6 py-6 md:px-8 md:py-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-primary">
              Coordenador de CRO &amp; UX
            </span>
          </div>
          <p className="max-w-3xl text-sm md:text-base font-normal leading-relaxed text-foreground">
            Responsável pela coordenação técnica de CRO & UX nos produtos
            digitais da MYSA, garantindo setup, qualidade, sustentação e
            evolução das jornadas e funis dos e-commerces.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8" data-ui="request.items">
          {decisionItems.map((item, index) => (
            <div
              key={item.title}
              data-ui={`request.item.${index + 1}`}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 130}ms` : "0ms",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-xs font-medium text-primary">
                  0{index + 1}
                </span>
                <span className="h-px flex-1 bg-border/70 ml-3" aria-hidden />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Encaminhamento esperado: decisão objetiva sobre cargo, escopo e
          remuneração.
        </p>
      </div>
    </section>
  );
};

export default Request;
