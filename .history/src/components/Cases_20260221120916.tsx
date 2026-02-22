import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useInView } from '@/hooks/use-in-view';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardScales, setCardScales] = useState<Record<number, number>>({});

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const updateCardScales = () => {
      const slides = api.slideNodes();
      const container = api.containerNode();
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.left + containerRect.width / 2;

      const scales: Record<number, number> = {};
      
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const maxDistance = containerRect.width / 2;
        const proximity = Math.max(0, 1 - distance / maxDistance);
        scales[index] = 1 + proximity * 0.08;
      });

      setCardScales(scales);
    };

    updateCardScales();
    api.on('scroll', updateCardScales);
    api.on('resize', updateCardScales);

    return () => {
      api.off('scroll', updateCardScales);
      api.off('resize', updateCardScales);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
  
    const scrollToPrev = () => {
      if (isPaused) return;
      
      if (api.canScrollPrev()) {
        api.scrollPrev();
      } else {
        api.scrollTo(cases.length - 1);
      }
    };
  
    const intervalId = window.setInterval(scrollToPrev, 1500);
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [api, isPaused]);

  const { ref, isVisible } = useInView();

  return (
    <section id="cases" className="py-16 bg-secondary/30 overflow-hidden">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl px-4 md:px-6 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-end justify-between mb-6 md:mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              Cases que eu já entreguei (com prova)
            </h2>
            <p className="text-sm text-muted-foreground">
              Passe pro lado. Cada card tem imagem e resumo. Ao abrir, tem o detalhe do que foi feito.
            </p>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
          <button 
  onClick={() => {
    setIsPaused(true);
    api?.scrollPrev();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <span className="text-xs text-muted-foreground px-2">
              {current + 1} / {cases.length}
            </span>
            <button onClick={() => {
    setIsPaused(true);
    api?.scrollNext();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none w-20 md:w-[480px]"
          style={{
            background: 'linear-gradient(to right, hsl(var(--secondary) / 0.3) 0%, hsl(var(--secondary) / 0.28) 18%, hsl(var(--secondary) / 0.25) 35%, hsl(var(--secondary) / 0.18) 50%, hsl(var(--secondary) / 0.08) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none w-20 md:w-[480px]"
          style={{
            background: 'linear-gradient(to left, hsl(var(--secondary) / 0.3) 0%, hsl(var(--secondary) / 0.28) 18%, hsl(var(--secondary) / 0.25) 35%, hsl(var(--secondary) / 0.18) 50%, hsl(var(--secondary) / 0.08) 70%, transparent 100%)',
          }}
        />
        
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {cases.map((caseItem, index) => (
              <CarouselItem 
                key={caseItem.id} 
                className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]"
                style={{
                  transform: `scale(${cardScales[index] || 1})`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <button
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="aspect-video w-full rounded-xl bg-secondary/50 border border-border/50 mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-xs text-muted-foreground">{caseItem.print}</span>
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {caseItem.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {caseItem.title}
                  </h3>
                  
                  {/* Impact */}
                  <p className="text-xs text-muted-foreground mt-auto leading-relaxed">
                    {caseItem.impact}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex gap-1.5">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/20 w-1.5 hover:bg-muted-foreground/40'
              }`}
            />
          ))}
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
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Problema */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <h4 className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Problema</h4>
                <p className="text-sm text-foreground">{selectedCase.problem}</p>
              </div>

              {/* O que eu fiz */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">O que eu fiz</h4>
                <ul className="space-y-2">
                  {selectedCase.actions.map((action, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resultado */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Resultado</h4>
                <p className="text-sm text-foreground font-medium">{selectedCase.result}</p>
              </div>

              {/* Evidências */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Evidências</h4>
                <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1 group">
                  {selectedCase.evidence}
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Cases;
