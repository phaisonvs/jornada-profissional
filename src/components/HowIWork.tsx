import { useState } from 'react';
import { ArrowRight, Compass, FileText, BarChart3, Layers, CheckCircle, Users } from 'lucide-react';

const bullets = [
  {
    icon: Compass,
    title: 'Jornada primeiro',
    text: 'Eu começo pela jornada e pela regra de negócio, pra não resolver só a tela.',
  },
  {
    icon: FileText,
    title: 'Prioridade clara',
    text: 'Eu deixo claro o que é prioridade e o que é nice to have.',
  },
  {
    icon: Layers,
    title: 'Documentação mínima',
    text: 'Eu documento o mínimo necessário pra não depender de conversa solta.',
  },
  {
    icon: BarChart3,
    title: 'Validação com dados',
    text: 'Eu valido com dados quando faz sentido (evento, funil, conversão).',
  },
  {
    icon: CheckCircle,
    title: 'Ponta a ponta',
    text: 'Eu fecho ponta a ponta: UX → front → integração → validação.',
  },
  {
    icon: Users,
    title: 'Alinhamento preventivo',
    text: 'Eu puxo alinhamento quando existe risco de travar lá na frente.',
  },
];

const HowIWork = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="como-trabalho" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
          Como eu gosto de trabalhar (na prática)
        </h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          {/* Left: Navigation list */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {bullets.map((bullet, index) => {
              const Icon = bullet.icon;
              const isActive = index === activeIndex;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all flex-shrink-0 md:flex-shrink group ${
                    isActive 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-card border border-border hover:border-primary/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {bullet.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active content */}
          <div className="relative">
            <div 
              key={activeIndex}
              className="p-6 rounded-2xl bg-card border border-primary/20 animate-fade-in"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-float-slow">
                  {(() => {
                    const Icon = bullets[activeIndex].icon;
                    return <Icon className="w-6 h-6 text-primary" />;
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
              <div className="flex gap-1.5 mt-6">
                {bullets.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-muted-foreground/20 w-1.5 hover:bg-muted-foreground/40'
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
