import { useState } from 'react';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  const items = activeTab === 'own' ? iOwn : iDontOwn;
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const visibleItems = items.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const handleTabChange = (tab: 'own' | 'delegate') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <section id="escopo" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
          O que eu quero assumir como Tech Lead
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 p-1 bg-card rounded-xl border border-border w-fit">
          <button
            onClick={() => handleTabChange('own')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'own'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Check className="w-4 h-4" />
            Eu assumo
          </button>
          <button
            onClick={() => handleTabChange('delegate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'delegate'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <X className="w-4 h-4" />
            Eu não assumo sozinho
          </button>
        </div>

        {/* Cards slider */}
        <div className="space-y-3 min-h-[160px]">
          {visibleItems.map((item, index) => (
            <div 
              key={`${activeTab}-${currentIndex}-${index}`}
              className={`flex gap-4 p-5 rounded-xl border transition-all animate-fade-in ${
                activeTab === 'own' 
                  ? 'bg-card border-primary/20 hover:border-primary/40' 
                  : 'bg-card border-border hover:border-muted-foreground/30'
              }`}
            >
              <span className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0 font-medium ${
                activeTab === 'own' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentIndex * itemsPerPage + index + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed self-center">{item}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)}
            className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
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
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalPages)}
            className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Scope;
