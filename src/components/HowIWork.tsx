import { Puzzle, MessageSquare, Code, BarChart3, Repeat, Users } from 'lucide-react';

const methods = [
  {
    icon: Puzzle,
    title: 'Entendo o problema antes de desenhar',
    description: 'Não começo pelo Figma. Começo entendendo o que dói, quem usa, o que já foi testado.',
  },
  {
    icon: MessageSquare,
    title: 'Falo a língua de cada área',
    description: 'Consigo traduzir entre design, dev e negócio sem virar telefone sem fio.',
  },
  {
    icon: Code,
    title: 'Entrego código, não só protótipo',
    description: 'Meu trabalho só termina quando tá em produção e funcionando.',
  },
  {
    icon: BarChart3,
    title: 'Valido com dados, não com achismo',
    description: 'Configuro eventos, acompanho métricas, proponho testes A/B quando faz sentido.',
  },
  {
    icon: Repeat,
    title: 'Itero rápido e documento',
    description: 'Prefiro entregar algo simples e evoluir do que travar esperando perfeição.',
  },
  {
    icon: Users,
    title: 'Trago o time junto',
    description: 'Não faço sozinho e escondido. Envolvo quem precisa, alinho expectativa, compartilho aprendizado.',
  },
];

const HowIWork = () => {
  return (
    <section id="como-trabalho" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Como eu trabalho
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Sem jargão. Na prática, é isso que eu faço pra reduzir retrabalho e entregar com qualidade.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group"
            >
              <method.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
