import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Case {
  id: number;
  title: string;
  tags: string[];
  impact: string;
  problem: string;
  solution: string;
  result: string;
  evidence: string;
}

const cases: Case[] = [
  {
    id: 1,
    title: 'Redesign checkout mobile',
    tags: ['UX', 'Conversão'],
    impact: '+[X]% de conversão no fluxo mobile',
    problem: '[Descrever o problema que existia no checkout]',
    solution: '[O que você fez: pesquisa, protótipo, implementação]',
    result: '[Resultado com números]',
    evidence: '[Link para prints, Figma, GA4]',
  },
  {
    id: 2,
    title: 'Sistema de componentes',
    tags: ['Front-end', 'Design System'],
    impact: 'Redução de [X]h por sprint em retrabalho',
    problem: '[Problema de inconsistência visual/código duplicado]',
    solution: '[Criação do design system, documentação]',
    result: '[Economia de tempo, consistência]',
    evidence: '[Link para Storybook, repo]',
  },
  {
    id: 3,
    title: 'Testes A/B PDP',
    tags: ['CRO', 'Analytics'],
    impact: '[X]% de aumento em add-to-cart',
    problem: '[Baixa conversão na página de produto]',
    solution: '[Hipóteses, implementação de testes]',
    result: '[Variante vencedora, impacto no funil]',
    evidence: '[Screenshots GA4, relatório]',
  },
  {
    id: 4,
    title: 'Integração Salesforce',
    tags: ['Front-end', 'API'],
    impact: 'Fluxo automatizado de [X] a [Y]',
    problem: '[Processo manual, perda de dados]',
    solution: '[Mapeamento, desenvolvimento, testes]',
    result: '[Automação completa]',
    evidence: '[Diagrama, documentação]',
  },
  {
    id: 5,
    title: 'Landing pages sazonais',
    tags: ['UX', 'Performance'],
    impact: '[X] LPs entregues em [Y] meses',
    problem: '[Demanda alta, time limitado]',
    solution: '[Processo otimizado, templates]',
    result: '[Velocidade de entrega]',
    evidence: '[Portfolio, métricas]',
  },
  {
    id: 6,
    title: 'Onboarding novo cliente',
    tags: ['UX', 'Conversão'],
    impact: 'Redução de [X]% no drop-off',
    problem: '[Alto abandono no cadastro]',
    solution: '[Simplificação, progressive disclosure]',
    result: '[Melhoria na retenção]',
    evidence: '[Funil antes/depois]',
  },
  {
    id: 7,
    title: 'Performance front-end',
    tags: ['Front-end', 'Core Web Vitals'],
    impact: 'LCP de [X]s para [Y]s',
    problem: '[Site lento, mal rankeado]',
    solution: '[Otimização de assets, lazy loading]',
    result: '[Melhoria no SEO]',
    evidence: '[Lighthouse, PageSpeed]',
  },
  {
    id: 8,
    title: 'Painel de métricas CRO',
    tags: ['Analytics', 'DataViz'],
    impact: 'Decisões [X]% mais rápidas',
    problem: '[Dados espalhados, sem visibilidade]',
    solution: '[Dashboard consolidado]',
    result: '[Clareza para o time]',
    evidence: '[Screenshots do painel]',
  },
];

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 340;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="cases" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Meus cases
            </h2>
            <p className="text-muted-foreground">
              Projetos onde atuei de ponta a ponta
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              onClick={() => setSelectedCase(caseItem)}
              className="flex-shrink-0 w-[300px] md:w-[320px] snap-start cursor-pointer group"
            >
              <div className="h-full p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                {/* Image placeholder */}
                <div className="aspect-video rounded-lg bg-secondary/50 border border-border mb-4 flex items-center justify-center group-hover:border-primary/20 transition-colors">
                  <Image className="w-8 h-8 text-muted-foreground/50" />
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  {caseItem.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-foreground font-semibold mb-2 group-hover:text-primary transition-colors">
                  {caseItem.title}
                </h3>

                {/* Impact */}
                <p className="text-sm text-muted-foreground">
                  {caseItem.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl text-foreground">
                {selectedCase?.title}
              </DialogTitle>
            </DialogHeader>

            {selectedCase && (
              <div className="space-y-6 mt-4">
                {/* Tags */}
                <div className="flex gap-2">
                  {selectedCase.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Image placeholder */}
                <div className="aspect-video rounded-lg bg-secondary/50 border border-border flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">[Imagem principal do case]</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problema</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.problem}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-2">O que eu fiz</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.solution}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Resultado</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.result}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Evidências
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.evidence}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Cases;
