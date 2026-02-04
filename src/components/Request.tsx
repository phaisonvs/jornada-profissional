import { MessageCircle, CheckCircle2, Calendar } from 'lucide-react';

const optionABullets = [
  'Título oficial: Tech Lead (Interface + Conversão).',
  'Escopo documentado.',
  'Alinhamento de expectativa de nível.',
];

const optionBBullets = [
  'Decisão registrada agora.',
  'Efetivação na virada do projeto.',
  'Transição natural pro novo escopo.',
];

const Request = () => {
  return (
    <section id="pedido" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            O que eu estou pedindo
          </h2>
          <p className="text-muted-foreground">
            Formalizar título, escopo e expectativa de senioridade.
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Sem mais 90 dias pra provar.</span>{' '}
            <span className="text-primary">Já são quase 4 anos.</span>
          </p>
        </div>

        {/* Two paths */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Option A */}
          <div className="p-6 rounded-2xl bg-card border border-primary/30 hover:border-primary/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-primary font-medium">Opção A</span>
                <h3 className="text-base font-semibold text-foreground">
                  Decidir e formalizar agora
                </h3>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              A gente define título, escopo e senioridade hoje. Nos próximos 30 dias a gente ajusta qualquer detalhe que surgir.
            </p>

            <ul className="space-y-2.5">
              {optionABullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Option B */}
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-muted-foreground/30 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-medium">Opção B</span>
                <h3 className="text-base font-semibold text-foreground">
                  Decidir agora, efetivar na virada
                </h3>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              A gente toma a decisão hoje, mas a formalização acontece quando o projeto atual entrar em sustentação.
            </p>

            <ul className="space-y-2.5">
              {optionBBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final message */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Eu não tô pedindo aumento (por enquanto). Eu tô pedindo clareza.
              </p>
              <p className="text-sm text-foreground font-medium">
                Quero saber oficialmente o que eu sou e o que se espera de mim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Request;
