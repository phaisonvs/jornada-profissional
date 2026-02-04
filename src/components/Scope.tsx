import { Check, Users2 } from 'lucide-react';

const iOwn = [
  'Liderar o ciclo de UX + front-end dos projetos que eu pego',
  'Definir hipóteses e implementar testes de conversão',
  'Garantir qualidade e consistência do que vai pro ar',
  'Desbloquear o time quando trava em decisão técnica ou de UX',
  'Documentar padrões e repassar conhecimento',
];

const iDelegate = [
  'Tarefas de back-end complexo (mas quero evoluir nisso)',
  'Definição de roadmap de produto — isso é do PO',
  'Criação de assets visuais — isso é do designer',
  'Infraestrutura e deploys — isso é do DevOps',
  'Análise profunda de dados — isso é do analista',
];

const Scope = () => {
  return (
    <section id="escopo" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          O que eu quero assumir como Tech Lead
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Clareza sobre escopo é maturidade. Sei o que é meu e o que não é.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* I own */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-card border border-primary/20">
            <div className="flex items-center gap-2 mb-6">
              <Check className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Eu assumo</h3>
            </div>
            <ul className="space-y-4">
              {iOwn.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* I delegate */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <Users2 className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Eu não assumo sozinho</h3>
            </div>
            <ul className="space-y-4">
              {iDelegate.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-muted-foreground text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
