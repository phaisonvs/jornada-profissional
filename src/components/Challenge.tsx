import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const resolved = [
  '[O_QUE_RESOLVI_1]',
  '[O_QUE_RESOLVI_2]',
  '[O_QUE_RESOLVI_3]',
];

const pending = [
  '[O_QUE_FALTA_1]',
  '[O_QUE_FALTA_2]',
  '[O_QUE_FALTA_3]',
];

const Challenge = () => {
  const [activeView, setActiveView] = useState<'resolved' | 'pending'>('resolved');

  return (
    <section id="desafio" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          O projeto mais importante dos últimos 4 meses
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Nos últimos meses eu estive focado em <span className="text-primary font-medium">[NOME_DO_PROJETO]</span>, um desafio crítico de integração. A fase mais pesada está sendo concluída e estamos entrando em sustentação, onde o que importa é previsibilidade, estabilidade e melhoria contínua. Esse ciclo mostrou, na prática, meu papel de referência técnica entre UX, front e integrações.
        </p>

        {/* Toggle tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-card rounded-xl border border-border w-fit">
          <button
            onClick={() => setActiveView('resolved')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              activeView === 'resolved'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 transition-transform ${activeView === 'resolved' ? 'scale-110' : 'group-hover:scale-125'}`} />
            O que já foi resolvido
          </button>
          <button
            onClick={() => setActiveView('pending')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              activeView === 'pending'
                ? 'bg-gold-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <AlertCircle className={`w-4 h-4 transition-transform ${activeView === 'pending' ? 'scale-110' : 'group-hover:scale-125'}`} />
            O que falta pra sustentar
          </button>
        </div>

        {/* Content cards */}
        <div className="space-y-3 min-h-[180px]">
          {(activeView === 'resolved' ? resolved : pending).map((item, index) => (
            <div 
              key={`${activeView}-${index}`}
              className={`flex gap-4 p-5 rounded-xl border transition-all animate-fade-in ${
                activeView === 'resolved'
                  ? 'bg-card border-primary/20'
                  : 'bg-card border-gold-muted/30'
              }`}
            >
              <span className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0 font-medium ${
                activeView === 'resolved'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gold-muted/20 text-gold'
              }`}>
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed self-center">{item}</span>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground text-center font-medium">
            Esse é o momento certo de formalizar pra ficar sustentável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
