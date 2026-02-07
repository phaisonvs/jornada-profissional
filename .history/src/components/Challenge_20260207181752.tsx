import { useState, useRef, useEffect } from 'react';
import { Clock, Star, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const whyThisShowsLevel = [
  'Conduzi do zero — sem esperar que alguém me passasse o que fazer.',
  'Integrei áreas diferentes (design, dev, dados) sem precisar de intermediário.',
  'Entreguei resultado mensurável, não só "tela pronta".',
  'O projeto virou referência interna — e eu não precisei de supervisor.',
];

const resolved = [
  '[O_QUE_RESOLVI_1]',
  '[O_QUE_RESOLVI_2]',
  '[O_QUE_RESOLVI_3]',
];

const pending = [
  '[O_QUE_FALTA_1]',
  '[O_QUE_FALTA_2]',
  '[O_QUE_FALTA_3]',
];

interface Tool {
  name: string;
  icon: string;
  mastered: boolean;
}

const tools: Tool[] = [
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', mastered: true },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', mastered: true },
  { name: 'Cursor', icon: 'https://cursor.sh/favicon.ico', mastered: true },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', mastered: true },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', mastered: true },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', mastered: true },
  { name: 'Salesforce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg', mastered: false },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', mastered: true },
  { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', mastered: true },
  { name: 'Slack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', mastered: true },
];

const Challenge = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredResolved, setHoveredResolved] = useState<number | null>(null);
  const [hoveredPending, setHoveredPending] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [hoveredTool, setHoveredTool] = useState<{ name: string; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    let intervalId: number;

    const scrollToNext = () => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    };

    intervalId = window.setInterval(scrollToNext, 1500);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [carouselApi]);

  return (
    <section id="desafio" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            O desafio que eu tô fechando agora
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Um projeto crítico que exigiu atuação completa — do design à entrega em produção.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mb-8">
          {/* Left column - Context */}
          <div className="flex flex-col gap-6">
            {/* Context card */}
            <div className="flex-1 p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Contexto</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium">[NOME_DO_PROJETO]</span> — Um projeto que precisava de alguém conectando discovery, desenvolvimento e validação. Não tinha espaço pra ficar jogando briefing de um lado pro outro. Era fazer acontecer.
              </p>
            </div>

            {/* Resolved / Pending cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">O que já foi resolvido</span>
                </div>
                <ul className="space-y-2">
                  {resolved.map((item, i) => (
                    <li 
                      key={i} 
                      className={`text-xs transition-colors cursor-default ${
                        hoveredResolved === i ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                      onMouseEnter={() => setHoveredResolved(i)}
                      onMouseLeave={() => setHoveredResolved(null)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border hover:border-gold-muted/30 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">O que falta pra sustentar</span>
                </div>
                <ul className="space-y-2">
                  {pending.map((item, i) => (
                    <li 
                      key={i} 
                      className={`text-xs transition-colors cursor-default ${
                        hoveredPending === i ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                      onMouseEnter={() => setHoveredPending(i)}
                      onMouseLeave={() => setHoveredPending(null)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right column - Why this shows my level + Tools */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Por que isso mostra meu nível atual</span>
              </div>
              
              <ul 
                className="space-y-3"
                onMouseLeave={() => setHoveredItem(null)}
              >
                {whyThisShowsLevel.map((item, index) => (
                  <li 
                    key={index}
                    className={`flex items-start gap-3 group cursor-default transition-all ${
                      hoveredItem !== null && hoveredItem !== index 
                        ? 'opacity-50 blur-[2px]' 
                        : 'opacity-100 blur-0'
                    }`}
                    onMouseEnter={() => setHoveredItem(index)}
                  >
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-medium transition-all ${
                      hoveredItem === index 
                        ? 'bg-primary text-primary-foreground scale-110' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {index + 1}
                    </span>
                    <span className={`text-sm leading-relaxed transition-colors ${
                      hoveredItem === index ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools carousel card */}
            <div className="p-3 rounded-xl bg-card border border-border hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-foreground">Ferramentas que domino</span>
              </div>
              
              <div className="py-0.5 relative">
                <Carousel
                  setApi={setCarouselApi}
                  opts={{
                    align: 'start',
                    loop: true,
                    duration: 20,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-1.5">
                    {[...tools, ...tools, ...tools].map((tool, index) => (
                      <CarouselItem key={`${tool.name}-${index}`} className="pl-1.5 basis-1/6">
                        <div 
                          className="relative p-1 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all group flex items-center justify-center aspect-square cursor-pointer"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredTool({
                              name: tool.name,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8
                            });
                          }}
                          onMouseMove={(e) => {
                            setHoveredTool(prev => prev ? {
                              ...prev,
                              x: e.clientX + 12,
                              y: e.clientY - 8
                            } : null);
                          }}
                          onMouseLeave={() => {
                            setHoveredTool(null);
                          }}
                        >
                          <img 
                            src={tool.icon} 
                            alt={tool.name}
                            className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                
                {hoveredTool && (
                  <div
                    className="fixed z-[100] pointer-events-none bg-card/95 backdrop-blur-sm border border-primary/30 text-foreground text-xs px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap"
                    style={{
                      left: `${hoveredTool.x}px`,
                      top: `${hoveredTool.y}px`,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-medium">{hoveredTool.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Challenge;
