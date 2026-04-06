import { useState } from 'react';
import { Target, CheckCircle2, Calendar, ArrowRight, FileText, Users, TrendingUp, MessageSquare } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const formalizations = [
  {
    icon: FileText,
    title: 'Título oficial',
    text: 'Tech Lead de CRO',
  },
  {
    icon: Target,
    title: 'Escopo documentado',
    text: 'O que eu decido e o que eu não decido — claro e sustentável.',
  },
  {
    icon: Users,
    title: 'Alinhamento de senioridade',
    text: 'Expectativa de nível e caminho de evolução definido.',
  },
  {
    icon: TrendingUp,
    title: 'Checkpoint de ajuste',
    text: 'Revisão curta na sustentação pra calibrar qualquer detalhe.',
  },
];

const paths = [
  {
    id: 'A',
    icon: CheckCircle2,
    title: 'Decidir e formalizar agora',
    description: 'A gente define título, escopo e senioridade hoje. Nos próximos 30 dias a gente ajusta qualquer detalhe que surgir.',
    bullets: [
      'Título oficial: Tech Lead de CRO.',
      'Escopo documentado.',
      'Alinhamento de expectativa de nível.',
    ],
  },
  {
    id: 'B',
    icon: Calendar,
    title: 'Decidir agora, efetivar na virada',
    description: 'A gente toma a decisão hoje, mas a formalização acontece quando o projeto atual entrar em sustentação.',
    bullets: [
      'Decisão registrada agora.',
      'Efetivação na virada do projeto.',
      'Transição natural pro novo escopo.',
    ],
  },
];

const Request = () => {
  const [activePath, setActivePath] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { ref, isVisible } = useInView();

  return (
    <section id="pedido" className="py-24 px-4 md:px-6 bg-secondary/30 scroll-mt-24" data-ui="request.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="request.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header with styled title */}
        <div className="text-center mb-14" data-ui="request.header">
          <h2 className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-lg md:text-xl font-semibold text-primary mb-6" data-ui="request.title">
            <Target className="w-5 h-5" />
            O que eu estou pedindo
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto" data-ui="request.subtitle">
            Formalizar título, escopo e expectativa de senioridade.{' '}
            <span className="text-foreground font-medium">Sem mais 90 dias pra provar.</span>{' '}
            <span className="text-primary">Já são quase 4 anos.</span>
          </p>
        </div>

        {/* What I want to formalize - grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14" data-ui="request.formalizations">
          {formalizations.map((item, index) => (
            <div 
              key={index}
              data-ui={`request.formalization.${toUiKey(item.title)}`}
              className={`p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-700 ease-out group cursor-default ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group ${
                hoveredItem === index 
                  ? 'bg-primary text-primary-foreground scale-110' 
                  : 'bg-primary/10 text-primary'
              }`} data-ui={`request.formalization.${toUiKey(item.title)}.icon`}>
                <item.icon className="w-5 h-5 icon-hover-effect" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1" data-ui={`request.formalization.${toUiKey(item.title)}.title`}>{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed" data-ui={`request.formalization.${toUiKey(item.title)}.text`}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Two paths - horizontal tabs */}
        <div className="mb-8" data-ui="request.paths">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4 text-center">
            Dois caminhos possíveis
          </p>
          <div className="flex justify-center gap-3 mb-6" data-ui="request.paths.tabs">
            {paths.map((path, index) => (
              <button
                key={path.id}
                onClick={() => setActivePath(index)}
                data-ui={`request.path.${path.id.toLowerCase()}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all group ${
                  activePath === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                <path.icon className="w-4 h-4 icon-hover-effect" />
                Opção {path.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active path content */}
        <div className="p-8 rounded-2xl bg-card border border-primary/20 transition-all" data-ui="request.path.content">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float-slow group" data-ui="request.path.icon">
              {(() => {
                const Icon = paths[activePath].icon;
                return <Icon className="w-6 h-6 text-primary icon-hover-effect" />;
              })()}
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2" data-ui="request.path.title">
                {paths[activePath].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-ui="request.path.description">
                {paths[activePath].description}
              </p>
            </div>
          </div>

          <div className="space-y-3 pl-17" data-ui="request.path.bullets">
            {paths[activePath].bullets.map((bullet, index) => (
              <div 
                key={index}
                data-ui={`request.path.bullet.${index + 1}`}
                className="flex items-center gap-3 group"
              >
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final message */}
        <div className="mt-10 text-center" data-ui="request.footer">
          <p className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border text-sm text-foreground" data-ui="request.footer.message">
            <MessageSquare className="w-5 h-5 text-muted-foreground animate-float" />
            Meu objetivo é deixar esse papel claro e sustentável — pra empresa e pra mim.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Request;
