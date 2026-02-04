import { useState } from 'react';
import { Clock, Star, CheckCircle2, AlertCircle } from 'lucide-react';

const whyThisShowsLevel = [
  'Conduzi do zero — sem esperar que alguém me passasse o que fazer.',
  'Integrei áreas diferentes (design, dev, dados) sem precisar de intermediário.',
  'Entreguei resultado mensurável, não só "tela pronta".',
  'O projeto virou referência interna — e eu não precisei de supervisor.',
];

const resolved = [
  '[O_QUE_RESOLVI_1]',
  '[O_QUE_RESOLVI_2]',
  '[O_QUE_RESOLVI_3]',
];

const pending = [
  '[O_QUE_FALTA_1]',
  '[O_QUE_FALTA_2]',
  '[O_QUE_FALTA_3]',
];

const Challenge = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="desafio" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 italic">
            O desafio que eu tô fechando agora
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Um projeto crítico que exigiu atuação completa — do design à entrega em produção.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left column - Context */}
          <div className="space-y-6">
            {/* Context card */}
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Contexto</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium">[NOME_DO_PROJETO]</span> — Um projeto que precisava de alguém conectando discovery, desenvolvimento e validação. Não tinha espaço pra ficar jogando briefing de um lado pro outro. Era fazer acontecer.
              </p>
            </div>

            {/* Resolved / Pending cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">O que já foi resolvido</span>
                </div>
                <ul className="space-y-2">
                  {resolved.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border hover:border-gold-muted/30 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">O que falta pra sustentar</span>
                </div>
                <ul className="space-y-2">
                  {pending.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right column - Why this shows my level */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Por que isso mostra meu nível atual</span>
            </div>
            
            <ul className="space-y-4">
              {whyThisShowsLevel.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-4 group cursor-default"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-medium transition-all ${
                    hoveredItem === index 
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {index + 1}
                  </span>
                  <span className={`text-sm leading-relaxed transition-colors ${
                    hoveredItem === index ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing message */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary/5 border border-primary/20 text-sm text-foreground font-medium animate-float-slow">
            Esse é o momento certo de formalizar pra ficar sustentável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
