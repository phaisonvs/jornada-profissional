import { MessageCircle, Calendar, Rocket } from 'lucide-react';

const Request = () => {
  return (
    <section id="pedido" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            O que eu estou pedindo
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Formalizar título, escopo e expectativa de senioridade.
            <br />
            <span className="text-foreground">Sem mais 90 dias pra provar.</span> Já são quase 4 anos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Option A */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-card border border-primary/30 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-primary font-medium">Opção A</span>
                <h3 className="text-foreground font-semibold">Decidir e formalizar agora</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A gente define título, escopo e senioridade hoje. Nos próximos 30 dias a gente ajusta qualquer detalhe que surgir.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Título oficial: Tech Lead (Interface + Conversão)</li>
              <li>• Escopo documentado</li>
              <li>• Alinhamento de expectativa de nível</li>
            </ul>
          </div>

          {/* Option B */}
          <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-medium">Opção B</span>
                <h3 className="text-foreground font-semibold">Decidir agora, efetivar na virada</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A gente toma a decisão hoje, mas a formalização acontece quando o projeto atual entrar em sustentação.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Decisão registrada agora</li>
              <li>• Efetivação na virada do projeto</li>
              <li>• Transição natural pro novo escopo</li>
            </ul>
          </div>
        </div>

        {/* Direct message */}
        <div className="p-6 rounded-xl bg-secondary/30 border border-border text-center">
          <MessageCircle className="w-6 h-6 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Eu não tô pedindo aumento (por enquanto). Eu tô pedindo clareza.
            <br />
            <span className="text-foreground font-medium">
              Quero saber oficialmente o que eu sou e o que se espera de mim.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Request;
