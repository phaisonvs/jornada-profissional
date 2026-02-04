import { MessageCircle, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';

const bullets = [
  'Formalizar o título: Tech Lead (Front-end & Conversion).',
  'Alinhar escopo e autonomia (o que eu decido e o que eu não decido).',
  'Definir expectativa de senioridade e caminho de evolução (incluindo backend aos poucos).',
  'Combinar um checkpoint curto pra ajuste fino na sustentação.',
];

const Request = () => {
  return (
    <section id="pedido" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          O que eu preciso de você (decisão)
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Eu já venho atuando de forma híbrida há quase 4 anos. O que falta agora não é mais prova, é formalizar o papel com nome, escopo e expectativa.
        </p>

        {/* Bullets */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Dois caminhos */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Caminho A */}
          <div className="p-5 rounded-lg bg-card border border-primary/30 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-primary font-medium">Caminho A</span>
            </div>
            <p className="text-sm text-foreground">
              Alinhar e formalizar agora, e usar a sustentação como fase de organização.
            </p>
          </div>

          {/* Caminho B */}
          <div className="p-5 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">Caminho B</span>
            </div>
            <p className="text-sm text-foreground">
              Alinhar a decisão agora e efetivar na virada oficial para sustentação do projeto.
            </p>
          </div>
        </div>

        {/* Frase final */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <p className="text-sm text-foreground text-center">
              Meu objetivo é deixar esse papel claro e sustentável — pra empresa e pra mim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Request;
