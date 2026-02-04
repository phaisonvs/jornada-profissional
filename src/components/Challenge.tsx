import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

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
  return (
    <section id="desafio" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          O projeto mais importante dos últimos 4 meses
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Nos últimos meses eu estive focado em <span className="text-highlight">[NOME_DO_PROJETO]</span>, um desafio crítico de integração. A fase mais pesada está sendo concluída e estamos entrando em sustentação, onde o que importa é previsibilidade, estabilidade e melhoria contínua. Esse ciclo mostrou, na prática, meu papel de referência técnica entre UX, front e integrações.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* O que foi resolvido */}
          <div className="p-5 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">O que já foi resolvido</h3>
            </div>
            <ul className="space-y-3">
              {resolved.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-primary/50 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que falta */}
          <div className="p-5 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-highlight-muted" />
              <h3 className="text-sm font-medium text-foreground">O que falta pra sustentar bem</h3>
            </div>
            <ul className="space-y-3">
              {pending.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-highlight-muted/50 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fecho */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground text-center">
            Esse é o momento certo de formalizar pra ficar sustentável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
