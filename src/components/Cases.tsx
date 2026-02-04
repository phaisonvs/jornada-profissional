import { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface CaseItem {
  id: number;
  title: string;
  tags: string[];
  impact: string;
  print: string;
  problem: string;
  actions: string[];
  result: string;
  evidence: string;
}

const cases: CaseItem[] = [
  {
    id: 1,
    title: 'Regionalização de preço no e-commerce',
    tags: ['Integração', 'Conversão'],
    impact: 'Preço certo por CEP sem quebrar checkout · [X%]',
    print: '[PRINT_1]',
    problem: '[PROBLEMA_1]',
    actions: ['[ACAO_1_1]', '[ACAO_1_2]', '[ACAO_1_3]'],
    result: '[RESULTADO_1]',
    evidence: '[LINK_1]',
  },
  {
    id: 2,
    title: 'Falhas na integração de pedidos',
    tags: ['Sustentação', 'API'],
    impact: 'Menos pedidos travados / menos ajuste manual · [X]',
    print: '[PRINT_2]',
    problem: '[PROBLEMA_2]',
    actions: ['[ACAO_2_1]', '[ACAO_2_2]', '[ACAO_2_3]'],
    result: '[RESULTADO_2]',
    evidence: '[LINK_2]',
  },
  {
    id: 3,
    title: 'Evolução de jornada em etapa crítica',
    tags: ['UX/UI', 'Front-end'],
    impact: 'Menos atrito em etapa chave · [X%]',
    print: '[PRINT_3]',
    problem: '[PROBLEMA_3]',
    actions: ['[ACAO_3_1]', '[ACAO_3_2]', '[ACAO_3_3]'],
    result: '[RESULTADO_3]',
    evidence: '[LINK_3]',
  },
  {
    id: 4,
    title: 'Tracking e validação de eventos',
    tags: ['Dados', 'CRO'],
    impact: 'Métricas confiáveis pra decisão · [X eventos]',
    print: '[PRINT_4]',
    problem: '[PROBLEMA_4]',
    actions: ['[ACAO_4_1]', '[ACAO_4_2]', '[ACAO_4_3]'],
    result: '[RESULTADO_4]',
    evidence: '[LINK_4]',
  },
  {
    id: 5,
    title: 'Performance / percepção de velocidade',
    tags: ['Front-end', 'Qualidade'],
    impact: 'Menos abandono por lentidão · [X%]',
    print: '[PRINT_5]',
    problem: '[PROBLEMA_5]',
    actions: ['[ACAO_5_1]', '[ACAO_5_2]', '[ACAO_5_3]'],
    result: '[RESULTADO_5]',
    evidence: '[LINK_5]',
  },
  {
    id: 6,
    title: 'Frete / logística e regras de entrega',
    tags: ['Integração', 'Operação'],
    impact: 'Regras de frete mais estáveis · [X]',
    print: '[PRINT_6]',
    problem: '[PROBLEMA_6]',
    actions: ['[ACAO_6_1]', '[ACAO_6_2]', '[ACAO_6_3]'],
    result: '[RESULTADO_6]',
    evidence: '[LINK_6]',
  },
  {
    id: 7,
    title: 'Padronização de componentes',
    tags: ['UI', 'Escala'],
    impact: 'Mais consistência e menos retrabalho · [X]',
    print: '[PRINT_7]',
    problem: '[PROBLEMA_7]',
    actions: ['[ACAO_7_1]', '[ACAO_7_2]', '[ACAO_7_3]'],
    result: '[RESULTADO_7]',
    evidence: '[LINK_7]',
  },
  {
    id: 8,
    title: 'Bug crítico com time externo',
    tags: ['Coordenação', 'Entrega'],
    impact: 'Resolução mais rápida e rastreável · [Z dias]',
    print: '[PRINT_8]',
    problem: '[PROBLEMA_8]',
    actions: ['[ACAO_8_1]', '[ACAO_8_2]', '[ACAO_8_3]'],
    result: '[RESULTADO_8]',
    evidence: '[LINK_8]',
  },
];

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  return (
    <section id="cases" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          Cases que eu já entreguei (com prova)
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Passe pro lado. Cada card tem imagem e resumo. Ao abrir, tem o detalhe do que foi feito.
        </p>

        {/* Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {cases.map((caseItem) => (
              <CarouselItem key={caseItem.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <button
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full text-left p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="aspect-video w-full rounded-md bg-secondary/50 border border-border/50 mb-4 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{caseItem.print}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {caseItem.title}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {caseItem.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Impact */}
                  <p className="text-xs text-muted-foreground mt-auto">
                    {caseItem.impact}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>

        {/* Mobile swipe hint */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ChevronLeft className="w-3 h-3" />
            <span>arraste para ver mais</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-foreground">
                {selectedCase?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCase && (
              <div className="space-y-5 mt-2">
                {/* Tags */}
                <div className="flex gap-2">
                  {selectedCase.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Problema */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Problema</h4>
                  <p className="text-sm text-foreground">{selectedCase.problem}</p>
                </div>

                {/* O que eu fiz */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">O que eu fiz</h4>
                  <ul className="space-y-2">
                    {selectedCase.actions.map((action, i) => (
                      <li key={i} className="text-sm text-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resultado */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Resultado</h4>
                  <p className="text-sm text-foreground">{selectedCase.result}</p>
                </div>

                {/* Evidências */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Evidências</h4>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                    {selectedCase.evidence}
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
