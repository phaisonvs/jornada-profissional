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
        
        <div className="grid md:grid-cols-3 gap-4">
          {bullets.map((item, index) => (
            <div 
              key={index} 
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all opacity-0 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
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
