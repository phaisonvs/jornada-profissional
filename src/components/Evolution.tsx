import { ArrowRight, Code, Database, Eye, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Code,
    text: 'Entender melhor contratos de API (payload, erros, validações).',
  },
  {
    icon: Database,
    text: 'Pegar ajustes menores (endpoints simples, validações, logs).',
  },
  {
    icon: Eye,
    text: 'Evoluir em observabilidade (monitorar falhas que afetam a jornada).',
  },
  {
    icon: TrendingUp,
    text: 'Aumentar ownership gradualmente conforme maturidade e necessidade.',
  },
];

const Evolution = () => {
  return (
    <section id="evolucao" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Minha evolução natural: começar a pegar mais backend
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Hoje eu encosto em API de forma indireta, porque meu foco principal é experiência e front. Mesmo assim, eu tenho interesse real em evoluir tecnicamente e começar a assumir partes de backend aos poucos — com responsabilidade.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-4 rounded-lg bg-card border border-border opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground self-center">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Evolution;
