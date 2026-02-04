import { Briefcase, CheckCircle2, Target } from 'lucide-react';

const bullets = [
  {
    icon: Briefcase,
    text: 'O que eu já faço: lidero decisões de interface e execução no front, olhando conversão e integração ponta a ponta.',
  },
  {
    icon: CheckCircle2,
    text: 'O que isso resolve: reduz retrabalho, acelera entrega e evita quebra em jornada crítica.',
  },
  {
    icon: Target,
    text: 'O que eu estou pedindo: formalizar título + escopo + expectativa do papel de Tech Lead.',
  },
];

const TLDR = () => {
  return (
    <section id="tldr" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          TL;DR (10 segundos)
        </h2>
        
        <div className="space-y-4">
          {bullets.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border/50 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TLDR;
