import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const bullets = [
  'Eu começo pela jornada e pela regra de negócio, pra não resolver só a tela.',
  'Eu deixo claro o que é prioridade e o que é nice to have.',
  'Eu documento o mínimo necessário pra não depender de conversa solta.',
  'Eu valido com dados quando faz sentido (evento, funil, conversão).',
  'Eu fecho ponta a ponta: UX → front → integração → validação.',
  'Eu puxo alinhamento quando existe risco de travar lá na frente.',
];

const HowIWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(bullets.length / itemsPerPage);

  const next = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const visibleBullets = bullets.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="como-trabalho" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Como eu gosto de trabalhar (na prática)
          </h2>
          
          {/* Navigation dots */}
          <div className="flex items-center gap-2">
            <button 
              onClick={prev}
              className="p-1.5 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex 
                      ? 'bg-primary w-4' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-1.5 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 min-h-[120px]">
          {visibleBullets.map((bullet, index) => (
            <div 
              key={currentIndex * itemsPerPage + index} 
              className="flex gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all animate-fade-in"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed self-center">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-4 flex justify-center">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} de {totalPages}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
