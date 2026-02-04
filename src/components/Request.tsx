import { useState } from 'react';
import { MessageCircle, CheckCircle2, Calendar, ArrowRight, Sparkles } from 'lucide-react';

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
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [hoveredBullet, setHoveredBullet] = useState<number | null>(null);

  return (
    <section id="pedido" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-float-slow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">Próximo passo</span>
          </div>
          
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

        {/* Two paths - Interactive */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Option A */}
          <button
            onClick={() => setSelectedOption('A')}
            className={`p-6 rounded-2xl text-left transition-all duration-300 group ${
              selectedOption === 'A' 
                ? 'bg-card border-2 border-primary shadow-lg shadow-primary/10 scale-[1.02]' 
                : 'bg-card border border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                selectedOption === 'A' 
                  ? 'bg-primary text-primary-foreground animate-pulse-glow' 
                  : 'bg-primary/20 text-primary group-hover:bg-primary/30'
              }`}>
                <CheckCircle2 className={`w-5 h-5 transition-transform ${selectedOption === 'A' ? 'scale-110' : 'group-hover:scale-110'}`} />
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
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-muted-foreground group/item"
                  onMouseEnter={() => setHoveredBullet(index)}
                  onMouseLeave={() => setHoveredBullet(null)}
                >
                  <ArrowRight className={`w-4 h-4 mt-0.5 transition-all ${
                    hoveredBullet === index ? 'text-primary translate-x-1' : 'text-primary/50'
                  }`} />
                  <span className={`transition-colors ${hoveredBullet === index ? 'text-foreground' : ''}`}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </button>

          {/* Option B */}
          <button
            onClick={() => setSelectedOption('B')}
            className={`p-6 rounded-2xl text-left transition-all duration-300 group ${
              selectedOption === 'B' 
                ? 'bg-card border-2 border-gold-soft shadow-lg shadow-gold-soft/10 scale-[1.02]' 
                : 'bg-card border border-border hover:border-gold-muted/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                selectedOption === 'B' 
                  ? 'bg-gold-soft text-primary-foreground' 
                  : 'bg-muted text-muted-foreground group-hover:bg-gold-muted/30 group-hover:text-gold'
              }`}>
                <Calendar className={`w-5 h-5 transition-transform ${selectedOption === 'B' ? 'scale-110' : 'group-hover:scale-110'}`} />
              </div>
              <div>
                <span className="text-xs text-gold font-medium">Opção B</span>
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
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-muted-foreground group/item"
                  onMouseEnter={() => setHoveredBullet(index + 10)}
                  onMouseLeave={() => setHoveredBullet(null)}
                >
                  <ArrowRight className={`w-4 h-4 mt-0.5 transition-all ${
                    hoveredBullet === index + 10 ? 'text-gold translate-x-1' : 'text-muted-foreground/50'
                  }`} />
                  <span className={`transition-colors ${hoveredBullet === index + 10 ? 'text-foreground' : ''}`}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </button>
        </div>

        {/* Selection indicator */}
        {selectedOption && (
          <div className="text-center mb-8 animate-fade-in">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              selectedOption === 'A' 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'bg-gold-muted/20 text-gold border border-gold-muted/30'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              Opção {selectedOption} selecionada
            </span>
          </div>
        )}

        {/* Final message */}
        <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center animate-float">
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
