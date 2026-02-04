import { Check, X } from 'lucide-react';

const iOwn = [
  'Padrão de interface e qualidade do front nas jornadas críticas.',
  'Direcionamento técnico pra experiências que impactam conversão.',
  'Priorização e desenho de solução junto do time (não só pedido pronto).',
  'Validação com dados (tracking, funil, testes quando fizer sentido).',
  'Ponte com integrações quando afetam a jornada (sem virar dono de API).',
];

const iDontOwn = [
  'Ser resolvedor universal de tudo que estoura.',
  'Manter operação no braço sem padrão mínimo.',
  'Assumir backend inteiro sem transição.',
  'Tomar decisão de produto sem alinhamento (eu apoio, não substituo).',
  'Trabalho repetitivo que pode ser automatizado ou delegado.',
];

const Scope = () => {
  return (
    <section id="escopo" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
          O que eu quero assumir como Tech Lead
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Eu assumo */}
          <div className="p-5 rounded-lg bg-card border border-primary/20">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Eu assumo</h3>
            </div>
            <ul className="space-y-3">
              {iOwn.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eu não assumo sozinho */}
          <div className="p-5 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-3 h-3 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Eu não quero assumir sozinho</h3>
            </div>
            <ul className="space-y-3">
              {iDontOwn.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary text-muted-foreground text-xs flex items-center justify-center flex-shrink-0">
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
