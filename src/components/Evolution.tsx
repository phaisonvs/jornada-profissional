import { ArrowRight, Server, GitBranch, Eye, CheckCircle, Rocket } from 'lucide-react';

const roadmap = [
  {
    icon: GitBranch,
    phase: 'Agora',
    title: 'Contratos de API',
    description: 'Entender e especificar o que preciso do back antes de pedir',
  },
  {
    icon: Server,
    phase: '3-6 meses',
    title: 'Endpoints menores',
    description: 'Começar a mexer em endpoints simples, com supervisão',
  },
  {
    icon: Eye,
    phase: '6-9 meses',
    title: 'Observabilidade',
    description: 'Logs, métricas, debug em produção — entender o que quebra',
  },
  {
    icon: CheckCircle,
    phase: '9-12 meses',
    title: 'Validação e testes',
    description: 'Cobrir casos de erro, testes automatizados básicos',
  },
  {
    icon: Rocket,
    phase: '12+ meses',
    title: 'Autonomia parcial',
    description: 'Resolver problemas de back sem depender 100% do time',
  },
];

const Evolution = () => {
  return (
    <section id="evolucao" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Pra onde eu quero evoluir
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Hoje APIs entram indiretamente no meu trabalho. Quero começar a assumir mais backend aos poucos — com um plano realista.
        </p>

        {/* Roadmap */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roadmap.map((step, index) => (
              <div key={index} className="relative">
                {/* Arrow between items - hidden on mobile */}
                {index < roadmap.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-2 top-12 w-4 h-4 text-muted-foreground z-10" />
                )}

                <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all h-full">
                  {/* Icon and phase */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-primary font-medium">{step.phase}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 p-4 rounded-xl bg-card/50 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            <span className="text-foreground font-medium">Importante:</span> Não estou pedindo pra virar dev backend. 
            Estou pedindo espaço pra aprender de forma estruturada e agregar mais valor pro time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
