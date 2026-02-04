import { TrendingUp, Zap, Shield } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    title: 'Impacto em conversão/receita',
    value: '[X%] / [R$Y]',
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    value: '[N releases] em [Z semanas]',
  },
  {
    icon: Shield,
    title: 'Estabilidade / risco evitado',
    value: '[N incidentes] a menos',
  },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Main headline */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
            Quero formalizar minha atuação como{' '}
            <span className="text-primary">Tech Lead (Front-end & Conversion)</span>.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Hoje meu cargo é UX, mas na prática eu conecto UX + front + conversão + integração.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                </div>
                <span className="text-xs text-muted-foreground">{stat.title}</span>
              </div>
              <div className="text-lg font-semibold text-foreground">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Microcopy */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="w-1 h-1 rounded-full bg-primary" />
          <p>
            Se você tiver <span className="text-foreground">60 segundos</span>, leia o TL;DR. 
            Se tiver <span className="text-foreground">3 minutos</span>, veja os cases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
