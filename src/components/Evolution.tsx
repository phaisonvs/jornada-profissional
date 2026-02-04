import { useState } from 'react';
import { Code, Database, Eye, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Code,
    title: 'Contratos de API',
    text: 'Entender melhor contratos de API (payload, erros, validações).',
  },
  {
    icon: Database,
    title: 'Ajustes menores',
    text: 'Pegar ajustes menores (endpoints simples, validações, logs).',
  },
  {
    icon: Eye,
    title: 'Observabilidade',
    text: 'Evoluir em observabilidade (monitorar falhas que afetam a jornada).',
  },
  {
    icon: TrendingUp,
    title: 'Ownership gradual',
    text: 'Aumentar ownership gradualmente conforme maturidade e necessidade.',
  },
];

const Evolution = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="evolucao" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Minha evolução natural: começar a pegar mais backend
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Hoje eu encosto em API de forma indireta, porque meu foco principal é experiência e front. Mesmo assim, eu tenho interesse real em evoluir tecnicamente e começar a assumir partes de backend aos poucos — com responsabilidade.
        </p>

        {/* Timeline navigation */}
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative z-10 flex flex-col items-center gap-2 transition-all ${
                  index === activeStep ? 'scale-110' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index === activeStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border border-border'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`text-xs hidden sm:block transition-colors ${
                  index === activeStep ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step card */}
        <div className="p-6 rounded-xl bg-card border border-primary/20 animate-fade-in" key={activeStep}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              {(() => {
                const Icon = steps[activeStep].icon;
                return <Icon className="w-5 h-5 text-primary" />;
              })()}
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {steps[activeStep].text}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-3 mt-4">
          <button 
            onClick={() => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)}
            className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-xs text-muted-foreground self-center">
            {activeStep + 1} de {steps.length}
          </span>
          <button 
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
