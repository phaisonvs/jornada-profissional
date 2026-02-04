import { ArrowRight } from 'lucide-react';

const bullets = [
  'Eu começo pela jornada e pela regra de negócio, pra não resolver só a tela.',
  'Eu deixo claro o que é prioridade e o que é nice to have.',
  'Eu documento o mínimo necessário pra não depender de conversa solta.',
  'Eu valido com dados quando faz sentido (evento, funil, conversão).',
  'Eu fecho ponta a ponta: UX → front → integração → validação.',
  'Eu puxo alinhamento quando existe risco de travar lá na frente.',
];

const HowIWork = () => {
  return (
    <section id="como-trabalho" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
          Como eu gosto de trabalhar (na prática)
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {bullets.map((bullet, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-4 rounded-lg bg-card border border-border opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
