import { CheckCircle2, Clock, Star } from 'lucide-react';

const Challenge = () => {
  return (
    <section id="desafio" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          O desafio que eu tô fechando agora
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Um projeto crítico que exigiu atuação completa — do design à entrega em produção.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Context */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Contexto
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-highlight">[NOME_DO_PROJETO]</span> — Um projeto que precisava de alguém 
                conectando discovery, desenvolvimento e validação. Não tinha espaço pra ficar jogando briefing 
                de um lado pro outro. Era fazer acontecer.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-4 h-4 text-primary mb-3" />
                <h4 className="text-sm font-medium text-foreground mb-2">O que já foi resolvido</h4>
                <p className="text-xs text-muted-foreground">
                  <span className="text-highlight">[O_QUE_RESOLVI]</span>
                </p>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <Clock className="w-4 h-4 text-highlight-muted mb-3" />
                <h4 className="text-sm font-medium text-foreground mb-2">O que falta pra sustentar</h4>
                <p className="text-xs text-muted-foreground">
                  <span className="text-highlight">[O_QUE_FALTA]</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Why this matters */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-card border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <h3 className="text-foreground font-semibold">
                Por que isso mostra meu nível atual
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1</span>
                <p className="text-sm text-muted-foreground">
                  Conduzi do zero — sem esperar que alguém me passasse o que fazer
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2</span>
                <p className="text-sm text-muted-foreground">
                  Integrei áreas diferentes (design, dev, dados) sem precisar de intermediário
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3</span>
                <p className="text-sm text-muted-foreground">
                  Entreguei resultado mensurável, não só "tela pronta"
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4</span>
                <p className="text-sm text-muted-foreground">
                  O projeto virou referência interna — e eu não precisei de supervisor
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
