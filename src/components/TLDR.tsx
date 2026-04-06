import { Briefcase, Code2, RefreshCw } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const cards = [
  {
    icon: Briefcase,
    title: 'Desafios além do cargo',
    text: 'Há 3 anos e meio atuo além do escopo de UI/UX para conduzir as entregas e destravar temas críticos da operação.',
  },
  {
    icon: Code2,
    title: 'Execução técnica (front-end + integrações)',
    text: 'Assumo frentes técnicas para remover dependências, viabilizar integrações e garantir a entrega nos devidos prazos.',
  },
  {
    icon: RefreshCw,
    title: 'Sustentação e evolução do funil',
    text: 'Mantenho atuação contínua na sustentação do funil, destravando correções e evoluções com foco em resultado.',
  },
];

const TLDR = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="tldr" className="py-16 px-4 md:px-6 bg-secondary/30 scroll-mt-24" data-ui="tldr.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="tldr.content"
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-lg font-semibold text-foreground mb-6" data-ui="tldr.title">
          Atuação no dia a dia
        </h2>

        <div className="grid md:grid-cols-3 gap-4" data-ui="tldr.cards">
          {cards.map((item, index) => (
            <div
              key={index}
              data-ui={`tldr.card.${toUiKey(item.title)}`}
              className={`p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-700 ease-out group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all" data-ui={`tldr.card.${toUiKey(item.title)}.icon`}>
                <item.icon className="w-5 h-5 text-primary icon-hover-effect" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2" data-ui={`tldr.card.${toUiKey(item.title)}.title`}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-ui={`tldr.card.${toUiKey(item.title)}.text`}>
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
