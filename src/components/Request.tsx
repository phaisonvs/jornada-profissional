import { useState } from 'react';
import { Target, CheckCircle2, Calendar, ArrowRight, FileText, Users, TrendingUp, MessageSquare } from 'lucide-react';

const formalizations = [
  {
    icon: FileText,
    title: 'Título oficial',
    text: 'Tech Lead (Interface + Conversão)',
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
      'Título oficial: Tech Lead (Interface + Conversão).',
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

  return (
    <section id="pedido" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        {/* Header with styled title */}
        <div className="text-center mb-14">
          <h2 className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-lg md:text-xl font-semibold text-primary mb-6">
            <Target className="w-5 h-5" />
            O que eu estou pedindo
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Formalizar título, escopo e expectativa de senioridade.{' '}
            <span className="text-foreground font-medium">Sem mais 90 dias pra provar.</span>{' '}
            <span className="text-primary">Já são quase 4 anos.</span>
          </p>
        </div>

        {/* What I want to formalize - grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {formalizations.map((item, index) => (
            <div 
              key={index}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group cursor-default"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all ${
                hoveredItem === index 
                  ? 'bg-primary text-primary-foreground scale-110' 
                  : 'bg-primary/10 text-primary'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Two paths - horizontal tabs */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4 text-center">
            Dois caminhos possíveis
          </p>
          <div className="flex justify-center gap-3 mb-6">
            {paths.map((path, index) => (
              <button
                key={path.id}
                onClick={() => setActivePath(index)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activePath === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                <path.icon className="w-4 h-4" />
                Opção {path.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active path content */}
        <div className="p-8 rounded-2xl bg-card border border-primary/20 transition-all">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float-slow">
              {(() => {
                const Icon = paths[activePath].icon;
                return <Icon className="w-6 h-6 text-primary" />;
              })()}
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {paths[activePath].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {paths[activePath].description}
              </p>
            </div>
          </div>

          <div className="space-y-3 pl-17">
            {paths[activePath].bullets.map((bullet, index) => (
              <div 
                key={index}
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
        <div className="mt-10 text-center">
          <p className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border text-sm text-foreground">
            <MessageSquare className="w-5 h-5 text-muted-foreground animate-float" />
            Meu objetivo é deixar esse papel claro e sustentável — pra empresa e pra mim.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Request;
