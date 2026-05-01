import { CheckCircle2, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const paths = [
  {
    id: 'A',
    icon: CheckCircle2,
    title: 'Formalização imediata',
    description: 'Definir cargo, escopo e senioridade agora, com ajustes operacionais conforme necessário.',
    bullets: [
      'Coordenador de CRO & UX como título oficial.',
      'Escopo documentado e alinhado.',
      'Reconhecimento da senioridade exercida.',
    ],
  },
  {
    id: 'B',
    icon: Calendar,
    title: 'Formalização na transição',
    description: 'Decisão tomada agora, efetivação quando o projeto atual entrar em sustentação.',
    bullets: [
      'Acordo registrado imediatamente.',
      'Implementação na virada operacional.',
      'Continuidade natural do escopo.',
    ],
  },
];

const Request = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="pedido" className="py-24 px-4 md:px-6 bg-secondary/30 scroll-mt-24" data-ui="request.root">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="request.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-lg font-semibold text-foreground mb-3" data-ui="request.title">
          Formalização proposta
        </h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed" data-ui="request.subtitle">
          A proposta é alinhar cargo, escopo e expectativa ao papel que já exerço na prática.
        </p>

        {/* Scope summary */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-10 px-5 py-4 rounded-xl bg-card border border-border" data-ui="request.scope">
          <span className="text-sm font-medium text-foreground">Coordenador de CRO &amp; UX</span>
          <span className="text-border hidden sm:block">|</span>
          <span className="text-sm text-muted-foreground">CRO · UX/UI · Front-end · Tracking · Integrações · Sustentação</span>
        </div>

        {/* Two paths side by side */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10" data-ui="request.paths">
          {paths.map((path, index) => (
            <div
              key={path.id}
              data-ui={`request.path.${path.id.toLowerCase()}`}
              className={`p-5 rounded-xl bg-card border border-border transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <path.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground">{path.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{path.description}</p>
              <div className="space-y-2">
                {path.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final message */}
        <p className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed" data-ui="request.footer.message">
          <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 animate-float" />
          Minha proposta é formalizar a atuação como Coordenador de CRO &amp; UX, com escopo claro, senioridade alinhada e próximos passos definidos junto à diretoria.
        </p>
      </div>
    </section>
  );
};

export default Request;
