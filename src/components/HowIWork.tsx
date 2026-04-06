import { useState } from 'react';
import { Target, TrendingUp, Layers, BarChart3, Compass, Zap } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const bullets = [
  {
    icon: Target,
    title: 'KPIs de produto e equipe',
    text: 'Definir e acompanhar KPIs claros (conversão, retenção, tempo de entrega) e vincular cada entrega a impacto de negócio mensurável.',
  },
  {
    icon: TrendingUp,
    title: 'CRO e experimentação',
    text: 'Liderar iniciativas de CRO com testes A/B, funis e métricas de conversão para decisões baseadas em dados, não em opinião.',
  },
  {
    icon: Layers,
    title: 'Evoluções complexas de negócio',
    text: 'Conduzir mudanças de modelo, novos fluxos e integrações que exigem alinhamento técnico e de negócio e entrega em fases.',
  },
  {
    icon: BarChart3,
    title: 'Impacto mensurável',
    text: 'Garantir que cada entrega tenha métricas de sucesso definidas e seja validada com dados (eventos, funis, conversão).',
  },
  {
    icon: Compass,
    title: 'Roadmap alinhado a OKRs',
    text: 'Alinhar prioridades técnicas aos objetivos de negócio e OKRs da empresa, com visibilidade de progresso e resultado.',
  },
  {
    icon: Zap,
    title: 'Escala com qualidade',
    text: 'Evoluir processos e ferramentas para que a equipe escale sem perder qualidade nem visibilidade sobre resultados e KPIs.',
  },
];

const HowIWork = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useInView();

  return (
    <section id="objetivos-techlead" className="py-16 px-4 md:px-6 scroll-mt-24" data-ui="how-i-work.root">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="how-i-work.content"
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8" data-ui="how-i-work.title">
          Objetivos que quero alcançar como Tech Lead
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <div
            data-ui="how-i-work.controls"
            className={`flex flex-col gap-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-x-4 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap gap-2 justify-center md:justify-start" data-ui="how-i-work.controls.icons">
              {bullets.map((bullet, index) => {
                const Icon = bullet.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    title={bullet.title}
                    data-ui={`how-i-work.control.${toUiKey(bullet.title)}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ease-out group ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105'
                        : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 icon-hover-effect" />
                  </button>
                );
              })}
            </div>
            <div
              key={activeIndex}
              className="min-h-[52px] flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 opacity-0 animate-fade-in-up-slow"
              data-ui="how-i-work.active-summary"
            >
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 group">
                {(() => {
                  const Icon = bullets[activeIndex].icon;
                  return <Icon className="w-3.5 h-3.5 icon-hover-effect" />;
                })()}
              </div>
              <span className="text-sm font-medium text-primary truncate">
                {bullets[activeIndex].title}
              </span>
            </div>
          </div>

          <div className="relative" data-ui="how-i-work.panel">
            <div
              key={activeIndex}
              className="p-6 rounded-2xl bg-card border border-primary/20 opacity-0 animate-fade-in-up-slow group"
              style={{ animationDelay: '0.32s' }}
              data-ui="how-i-work.panel.card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-float-slow">
                  {(() => {
                    const Icon = bullets[activeIndex].icon;
                    return <Icon className="w-5 h-5 text-primary icon-hover-effect" />;
                  })()}
                </div>
                <div>
                  <span className="text-xs text-primary font-medium">{activeIndex + 1} de {bullets.length}</span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {bullets[activeIndex].title}
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {bullets[activeIndex].text}
              </p>

              {/* Quick nav dots */}
              <div className="flex gap-1 mt-6" data-ui="how-i-work.dots">
                {bullets.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    data-ui={`how-i-work.dot.${i + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      i === activeIndex 
                        ? 'bg-primary w-4' 
                        : 'bg-muted-foreground/20 w-1 hover:bg-muted-foreground/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
