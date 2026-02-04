import { ArrowRight } from 'lucide-react';

const bullets = [
  {
    title: 'O que eu faço hoje',
    description: 'Conduzo projetos do discovery até produção — UX, front-end, testes A/B e integração com times.',
  },
  {
    title: 'O que isso resolve',
    description: 'Elimina ruído entre áreas, acelera entrega e garante que a solução funcione pro negócio.',
  },
  {
    title: 'O que eu estou pedindo',
    description: 'Formalizar o título de Tech Lead com escopo definido e expectativa de senioridade.',
  },
];

const TLDR = () => {
  return (
    <section id="tldr" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">10 segundos</span>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {bullets.map((bullet, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl bg-secondary/50 border border-border group hover:bg-secondary transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <h3 className="text-foreground font-semibold">{bullet.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                {bullet.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TLDR;
