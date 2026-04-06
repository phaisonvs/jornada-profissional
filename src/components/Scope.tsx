import { useState } from 'react';
import { Check, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const iOwn = [
  'Padrão de interface e qualidade do front nas jornadas críticas.',
  'Direcionamento técnico pra experiências que impactam conversão.',
  'Priorização e desenho de solução junto do time (não só pedido pronto).',
  'Validação com dados (tracking, funil, testes quando fizer sentido).',
  'Ponte com integrações quando afetam a jornada (sem virar dono de API).',
];

const iDontOwn = [
  'Ser resolvedor universal de tudo que estoura.',
  'Manter operação no braço sem padrão mínimo.',
  'Assumir backend inteiro sem transição.',
  'Tomar decisão de produto sem alinhamento (eu apoio, não substituo).',
  'Trabalho repetitivo que pode ser automatizado ou delegado.',
];

const Scope = () => {
  const [activeTab, setActiveTab] = useState<'own' | 'delegate'>('own');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useInView();
  
  const items = activeTab === 'own' ? iOwn : iDontOwn;

  const handleTabChange = (tab: 'own' | 'delegate') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const goUp = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  const goDown = () => setCurrentIndex((prev) => (prev + 1) % items.length);

  return (
    <section id="escopo" className="py-16 px-4 md:px-6 bg-secondary/30 scroll-mt-24" data-ui="scope.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="scope.content"
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8" data-ui="scope.title">
          Objetivos que quero alcançar como Tech Lead CRO
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 p-1 bg-card rounded-xl border border-border w-fit" data-ui="scope.tabs">
          <button
            onClick={() => handleTabChange('own')}
            data-ui="scope.tab.own"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              activeTab === 'own'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Check className={`w-4 h-4 transition-transform ${activeTab === 'own' ? 'scale-110' : 'group-hover:scale-110'}`} />
            Eu assumo
          </button>
          <button
            onClick={() => handleTabChange('delegate')}
            data-ui="scope.tab.delegate"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              activeTab === 'delegate'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <X className={`w-4 h-4 transition-transform ${activeTab === 'delegate' ? 'scale-110' : 'group-hover:scale-110'}`} />
            Eu não assumo sozinho
          </button>
        </div>

        {/* Cards with vertical navigation */}
        <div className="flex gap-4" data-ui="scope.layout">
          {/* Cards list */}
          <div className="flex-1 space-y-3" data-ui="scope.list">
            {items.map((item, index) => (
              <div 
                key={`${activeTab}-${index}`}
                onClick={() => setCurrentIndex(index)}
                data-ui={`scope.item.${activeTab}.${index + 1}.${toUiKey(item)}`}
                className={`flex gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-700 ease-out ${
                  index === currentIndex
                    ? activeTab === 'own' 
                      ? 'bg-card border-primary/40 shadow-lg shadow-primary/5' 
                      : 'bg-card border-gold-muted/40 shadow-lg shadow-gold-muted/5'
                    : 'bg-card/50 border-border hover:border-primary/20'
                } ${
                  isVisible 
                    ? index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-0 hover:opacity-80'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <span className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0 font-medium transition-all ${
                  index === currentIndex
                    ? activeTab === 'own' 
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'bg-gold-muted text-foreground scale-110'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </span>
                <span className={`text-sm leading-relaxed self-center transition-colors ${
                  index === currentIndex ? 'text-foreground' : 'text-muted-foreground'
                }`}>{item}</span>
              </div>
            ))}
          </div>

          {/* Vertical navigation arrows */}
          <div className="flex flex-col justify-center gap-2" data-ui="scope.nav">
            <button 
              onClick={goUp}
              data-ui="scope.nav.up"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <div className="text-center py-2">
              <span className="text-xs text-muted-foreground" data-ui="scope.counter">{currentIndex + 1}/{items.length}</span>
            </div>
            <button 
              onClick={goDown}
              data-ui="scope.nav.down"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
