import { TrendingUp, Target, Zap } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '[X]',
    label: 'projetos entregues no híbrido',
    placeholder: 'METRICA_1',
  },
  {
    icon: Target,
    value: '[Y]',
    label: 'de conversão média nos testes',
    placeholder: 'METRICA_2',
  },
  {
    icon: Zap,
    value: '[Z]',
    label: 'anos nesse modelo de atuação',
    placeholder: 'METRICA_3',
  },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Main headline */}
        <div className="mb-16 animate-fade-in">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
            Tech Lead · Interface + Conversão
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Eu entrego de ponta a ponta.
            <br />
            <span className="text-muted-foreground">
              Agora quero que isso seja oficial.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Há quase 4 anos atuo como ponte entre UX, front-end e CRO. 
            O projeto atual está fechando, e é o momento certo pra formalizar esse escopo.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <stat.icon className="w-5 h-5 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-highlight-muted mt-2">
                  [{stat.placeholder}]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
