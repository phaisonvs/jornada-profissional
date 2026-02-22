import { useState, useEffect } from 'react';
import { Code, Database, Eye, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

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
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useInView();

  const goToStep = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section id="evolucao" className="py-24 px-4 md:px-6 scroll-mt-24">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Minha evolução natural: começar a pegar mais backend
        </h2>
        
        <p className="text-sm text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          Hoje eu encosto em API de forma indireta, porque meu foco principal é experiência e front. Mesmo assim, eu tenho interesse real em evoluir tecnicamente e começar a assumir partes de backend aos poucos — com responsabilidade.
        </p>

        {/* Timeline navigation */}
        <div className="relative mb-10">
          <div className="absolute top-5 left-0 right-0 h-px bg-border" />
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
                  index === activeStep ? 'scale-110' : 'opacity-50 hover:opacity-80'
                } ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group ${
                  index === activeStep 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'bg-card border border-border hover:border-primary/50'
                }`}>
                  <step.icon className="w-4 h-4 icon-hover-effect" />
                </div>
                <span className={`text-xs hidden sm:block transition-all duration-300 max-w-20 text-center ${
                  index === activeStep ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step card with smooth transition */}
        <div className="relative overflow-hidden min-h-[140px]">
          <div 
            className={`p-8 rounded-2xl bg-card border border-primary/20 transition-all duration-400 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float group">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-6 h-6 text-primary icon-hover-effect" />;
                })()}
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {steps[activeStep].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => goToStep((activeStep - 1 + steps.length) % steps.length)}
            className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeStep 
                    ? 'bg-primary w-4' 
                    : 'bg-muted-foreground/20 w-1.5 hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => goToStep((activeStep + 1) % steps.length)}
            className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
