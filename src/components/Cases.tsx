import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useInView } from '@/hooks/use-in-view';
import { shuffleArray, uniqueCases } from '@/components/cases-utils';
interface CaseItem {
  id: number;
  title: string;
  tags: string[];
  impact: string;
  src: string;
  imagePosition?: 'top' | 'center' | 'bottom';
  problem: string;
  problemLabel?: string;
  actions: string[];
  result: string;
  evidence: string;
  evidences?: { label: string; href: string }[];
  year?: number;
}

const createGenericCase = (
  id: number,
  title: string,
  src: string,
  tags: string[],
  imagePosition: 'top' | 'center' | 'bottom' = 'top'
): CaseItem => ({
  id,
  title,
  tags,
  impact: `${title} com foco em experiência, execução técnica e conversão.`,
  src,
  imagePosition,
  problem:
    `A frente "${title}" exigia evolução de jornada e execução de front-end para reduzir atrito e sustentar crescimento do funil.`,
  problemLabel: 'Contexto / Dor',
  actions: [
    `Mapeei o escopo de "${title}" e defini a solução com foco em clareza e consistência da jornada.`,
    'Implementei interface e regras técnicas necessárias para publicação com estabilidade.',
    'Validei comportamento responsivo, acompanhamento de métricas e alinhamento com a operação.',
  ],
  result: `${title} publicado com jornada mais clara e base pronta para evolução contínua.`,
  evidence: `[LINK_${id}]`,
  year: 2023,
});

const cases: CaseItem[] = [
  {
    id: 1,
    title: 'Localpage',
    tags: ['UX/UI', 'Front-end', 'SEO'],
    impact: 'UI/UX + front: componentes reutilizáveis, layout responsivo e roteamento hierárquico (estado→cidade→loja) para escalar o diretório',
    src: '/cases/1-localpage.jpg',
    problem: 'Escalar SEO local e entrada de novas lojas exigia um diretório padronizado, com estrutura previsível (rotas/URLs) e baixa manutenção para não gerar duplicidades.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o template do diretório (Estado → Cidade → Loja) com UI responsiva e componentes reutilizáveis.',
      'Modelei estrutura de rotas + slugs e padrões de navegação para consistência entre páginas.',
      'Defini regras de governança para publicação de novas unidades (campos e validações), reduzindo retrabalho.',
    ],
    result: 'Diretório escalável e consistente, pronto para crescimento contínuo de lojas com estrutura estável e manutenção previsível.',
    evidence: '[LINK_1]',
    evidences: [
      { label: 'Figma — fluxo + templates', href: '#' },
      { label: 'Produção — exemplo cidade/loja', href: '#' },
    ],
    year: 2021,
  },
  {
    id: 2,
    title: 'Black Friday ABC',
    tags: ['CRO', 'Front-end', 'Campanha'],
    impact: 'Landing e fluxo de conversão para campanha Black Friday com foco em clareza e performance.',
    src: '/cases/2-black-friday-abc.jpg',
    problem: 'A campanha Black Friday exigia uma experiência dedicada, com mensagem clara, CTAs visíveis e integração com estoque/preço para evitar fricção no pico de demanda.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei a landing da Black Friday com hierarquia visual e CTAs alinhados ao funil.',
      'Garanti responsividade e carregamento otimizado para tráfego de pico.',
      'Integrei com regras de estoque e exibição de ofertas para consistência da jornada.',
    ],
    result: 'Campanha publicada em tempo hábil com experiência estável e conversão alinhada aos objetivos da data.',
    evidence: '[LINK_2]',
    year: 2022,
  },
  {
    id: 3,
    title: 'Visita à obra',
    tags: ['UX/UI', 'Jornada'],
    impact: 'Jornada de agendamento e experiência de visita à obra com foco em conversão e clareza.',
    src: '/cases/3-visita-a-obra.jpg',
    problem: 'Era necessário oferecer uma jornada clara de agendamento de visita à obra, reduzindo atrito e aumentando o preenchimento de formulários e conversão.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o fluxo de visita à obra com formulário e confirmação claros.',
      'Ajustei copy e hierarquia visual para reduzir abandono em etapas críticas.',
      'Mantive consistência com o restante do site e padrões de acessibilidade.',
    ],
    result: 'Jornada de visita à obra publicada e estável, com melhor adesão e rastreio de conversão.',
    evidence: '[LINK_3]',
    year: 2022,
  },
  {
    id: 4,
    title: 'Página de cupons',
    tags: ['UX/UI', 'Front-end', 'CRO'],
    impact: 'Página de cupons com destaque de ofertas e CTAs para aumento de uso e conversão.',
    src: '/cases/4-pagina-de-cupons.jpg',
    problem: 'A página de cupons precisava ser mais clara e acionável, com ofertas em destaque e caminho óbvio para uso no checkout.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Reestruturei a página de cupons com layout focado em descoberta e uso do cupom.',
      'Implementei componentes reutilizáveis e estados de copy válido/expirado.',
      'Alinhei exibição com regras de elegibilidade e integração ao fluxo de compra.',
    ],
    result: 'Página de cupons mais clara e utilizável, com melhor percepção de valor e uso no funil.',
    evidence: '[LINK_4]',
    year: 2022,
  },
  {
    id: 5,
    title: 'Página de encarte lead',
    tags: ['UX/UI', 'Front-end'],
    impact: 'Evolução da experiência de cupons com foco em clareza e conversão.',
    src: '/cases/5-pagina-de-encarte-lead.jpg',
    problem: 'Evolução contínua da página de cupons para melhorar descoberta, legibilidade e taxa de aplicação no checkout.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Ajustes de layout e hierarquia visual na listagem de cupons.',
      'Refinamento de estados (válido, expirado, já utilizado) e feedback ao usuário.',
      'Alinhamento com métricas de uso de cupom e impacto em conversão.',
    ],
    result: 'Experiência de cupons evoluída com menor fricção e melhor adesão às ofertas.',
    evidence: '[LINK_5]',
    year: 2022,
  },
  {
    id: 6,
    title: 'Login Users Prime',
    tags: ['UX/UI', 'Front-end', 'Autenticação'],
    impact: 'Fluxo de login e experiência para usuários Prime com redução de atrito e clareza.',
    src: '/cases/6-login-users-prime.jpg',
    problem: 'O fluxo de login para usuários Prime precisava ser claro, seguro e alinhado ao restante da jornada para evitar abandono em etapa crítica.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o fluxo de login dedicado aos usuários Prime.',
      'Garanti responsividade, mensagens de erro claras e integração com autenticação.',
      'Mantive consistência visual e de copy com o programa e o site.',
    ],
    result: 'Login Prime estável e compreensível, com menor atrito e melhor rastreio de conversão.',
    evidence: '[LINK_6]',
    year: 2022,
  },
  {
    id: 7,
    title: 'Checkout ABC da Construção',
    tags: ['CRO', 'Front-end', 'Checkout'],
    impact: 'Checkout ABC com foco em clareza, redução de atrito e conversão na etapa final.',
    src: '/cases/7-checkout-abc-da-construcao.jpg',
    problem: 'O checkout precisava de revisão de UX e consistência técnica para reduzir abandono e falhas na etapa final do funil.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Revisei e implementei melhorias no fluxo de checkout (revisão de pedido, frete, pagamento).',
      'Padronizei componentes e mensagens de erro para reduzir confusão.',
      'Garanti integração estável com frete e pagamento e acompanhamento de eventos de conversão.',
    ],
    result: 'Checkout mais claro e estável, com menor abandono e métricas de conversão mensuráveis.',
    evidence: '[LINK_7]',
    evidences: [
      { label: 'Checkout ABC da Construção', href: '#' },
      { label: 'Checkout ABC Prime', href: '#' },
    ],
    year: 2022,
  },
  {
    id: 8,
    title: 'Checkout ABC Prime',
    tags: ['CRO', 'Front-end', 'Checkout'],
    impact: 'Versão do checkout para usuários Prime com benefícios visíveis e fluxo dedicado.',
    src: '/cases/8-checkout-abcprime.jpg',
    problem: 'Usuários Prime precisavam de uma experiência de checkout que destacasse benefícios (frete, ofertas) sem quebrar o fluxo padrão.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Implementei a variante de checkout para usuários Prime com exibição de benefícios.',
      'Mantive reuso de componentes do checkout principal e regras específicas para Prime.',
      'Garanti rastreio de conversão separado para análise de performance do programa.',
    ],
    result: 'Checkout Prime publicado com experiência diferenciada e conversão monitorada.',
    evidence: '[LINK_8]',
    year: 2022,
  },
  {
    id: 9,
    title: 'Header menu ABC da Construção',
    tags: ['UX/UI', 'Front-end', 'Navegação'],
    impact: 'Header e menu padronizados para melhor navegação e descoberta no site.',
    src: '/cases/9-header-menu-abc-da-construcao.jpg',
    problem: 'O header e o menu precisavam ser consistentes, acessíveis e alinhados às jornadas de conversão em todas as páginas.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o header e o menu com estrutura reutilizável e responsiva.',
      'Organizei a navegação por prioridade e alinhei com SEO e rotas do diretório.',
      'Mantive estados de hover/foco e acessibilidade para teclado e leitores de tela.',
    ],
    result: 'Header e menu estáveis em todo o site, com melhor orientação e menor fricção na navegação.',
    evidence: '[LINK_9]',
    year: 2022,
  },
  createGenericCase(
    10,
    'Novo Front E-com ABC',
    '/cases/10-novo-front-e-com-abc.png',
    ['Front-end', 'UX/UI', 'Plataforma']
  ),
  createGenericCase(
    11,
    'Página Login Ecom ABC',
    '/cases/11-pagina-login-ecom-abc.jpg',
    ['UX/UI', 'Front-end', 'Autenticação']
  ),
  createGenericCase(
    12,
    'LP Amigo Pé Quente',
    '/cases/12-lp-amigo-pe-quente.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    13,
    'LP Liquida ABC',
    '/cases/12-lpliquidaabc.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    14,
    'Migração LPs',
    '/cases/12-migração-lps.jpg',
    ['CRO', 'Front-end', 'Migração']
  ),
  createGenericCase(
    15,
    'PDP Pisos e Revestimentos',
    '/cases/12-pdp-pisos-e-revestimentos.png',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    16,
    'Regionalização de Preços',
    '/cases/13-regionalizacao-de-preços.jpg',
    ['CRO', 'Pricing', 'Front-end']
  ),
  createGenericCase(
    17,
    'Integração Loja Duratex',
    '/cases/14-Integracao-loja-duratex.jpg',
    ['Integração', 'Front-end', 'Operação']
  ),
  createGenericCase(
    18,
    'Integração Loja Duratex (Fase 2)',
    '/cases/15-Integracao-loja-duratex.jpg',
    ['Integração', 'Front-end', 'Operação']
  ),
  createGenericCase(
    19,
    'Casa Dexco',
    '/cases/16-casa-dexco.jpg',
    ['UX/UI', 'Front-end', 'Marca']
  ),
  createGenericCase(
    20,
    'PDP Loja Duratex',
    '/cases/18-pdp-loja-duratex.jpg',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    21,
    'PDP Loja Duratex (Fase 2)',
    '/cases/19-pdp-loja-duratex.jpg',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    22,
    'Setup Nova Loja ABC Prime',
    '/cases/17-setup-nova-loja-abc-prime.jpg',
    ['UX/UI', 'Front-end', 'Setup']
  ),
  createGenericCase(
    23,
    'LP Chance Única',
    '/cases/20-lp-chance-única.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    24,
    'Tracking Leads Expansão',
    '/cases/21-tracking-leads-expansao.jpeg',
    ['Analytics', 'Tracking', 'Leads']
  ),
  createGenericCase(
    25,
    'LP Semana do Consumidor',
    '/cases/25-lp-semana-do-consumidor.jpg',
    ['CRO', 'Front-end', 'Campanha']
  ),
  createGenericCase(
    26,
    'Design System ABC',
    '/cases/22-design-system-abc.jpg',
    ['Design System', 'UX/UI', 'Front-end']
  ),
  createGenericCase(
    27,
    'Programa de Indicação Franqueado',
    '/cases/23-programa-de-indicacao-franqueado.jpg',
    ['UX/UI', 'Front-end', 'Programa']
  ),
  createGenericCase(
    28,
    'E-mails Transacionais',
    '/cases/24-e-mails-transacionais.jpg',
    ['E-mail', 'Transacional', 'Comunicação']
  ),
  createGenericCase(
    29,
    'LP ABC Prime',
    '/cases/24-lp-abc-primeo.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    30,
    'Página de produto - pisos e revestimentos',
    '/cases/26-pagina-de-produto-pisos-e-revestimentos.jpg',
    ['UX/UI', 'Front-end', 'PDP']
  ),
  createGenericCase(
    31,
    'Página de produtos - variante metais',
    '/cases/27-pagina-de-produtos variante metais.jpg',
    ['UX/UI', 'Front-end', 'PDP']
  ),
  createGenericCase(
    32,
    'PDP piso e revestimentos - desktop',
    '/cases/28-pdp-piso- e revestimentosdesk.jpg',
    ['UX/UI', 'Front-end', 'PDP']
  ),
  createGenericCase(
    33,
    'Popup especialista piso - desktop',
    '/cases/29-popup-especialista-piso-desk.jpg',
    ['UX/UI', 'Front-end', 'CRO']
  ),
  createGenericCase(
    34,
    'Looker performance - LP expansão',
    '/cases/30-looker-performance-lp-expansao.jpg',
    ['Analytics', 'Front-end', 'Performance']
  ),
  createGenericCase(
    35,
    'Primeira compra popup',
    '/cases/31primeira-compra-opup.jpg',
    ['CRO', 'Front-end', 'Popup']
  ),
  createGenericCase(
    36,
    'Formulário Bot WhatsApp',
    '/cases/32-formulario-bot Whatsapp.jpg',
    ['UX/UI', 'Front-end', 'WhatsApp'],
    'center'
  ),
  createGenericCase(
    37,
    'Autocomplete performance de busca',
    '/cases/33-Auto-complete-perfoamance-busca.jpg',
    ['Front-end', 'UX/UI', 'Busca']
  ),
  createGenericCase(
    38,
    'Retira na Guide Shop - cotação de frete',
    '/cases/34-Retira na Guide Shop - cotacao de frete.jpg',
    ['CRO', 'Front-end', 'Frete'],
    'center'
  ),
  createGenericCase(
    39,
    'LP Super Chance Única',
    '/cases/35-LP-SuperChnce Unica.png',
    ['CRO', 'Front-end', 'Campanha']
  ),
  createGenericCase(
    40,
    'LP Mês do Consumidor',
    '/cases/36-LP-Mes do consumidor.png',
    ['CRO', 'Front-end', 'Campanha']
  ),
  createGenericCase(
    41,
    'Material adicional',
    '/cases/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png',
    ['Front-end', 'UI']
  ),
];

const casesForDedup = cases.map((caseItem) => ({
  ...caseItem,
  print: caseItem.src,
}));
const dedupedCases = uniqueCases(casesForDedup).map(({ print: _print, ...caseItem }) => caseItem);
const shuffledCases = shuffleArray(dedupedCases);
const hasRenderableImage = (src: string) => src.startsWith('/') || src.startsWith('http');

const CASES_CARD_MEDIA_UI = [
  'cases.card.1.media',
  'cases.card.2.media',
  'cases.card.3.media',
  'cases.card.4.media',
  'cases.card.5.media',
  'cases.card.6.media',
  'cases.card.7.media',
  'cases.card.8.media',
  'cases.card.9.media',
  'cases.card.10.media',
  'cases.card.11.media',
  'cases.card.12.media',
  'cases.card.13.media',
  'cases.card.14.media',
  'cases.card.15.media',
  'cases.card.16.media',
  'cases.card.17.media',
  'cases.card.18.media',
  'cases.card.19.media',
  'cases.card.20.media',
  'cases.card.21.media',
  'cases.card.22.media',
  'cases.card.23.media',
  'cases.card.24.media',
  'cases.card.25.media',
  'cases.card.26.media',
  'cases.card.27.media',
  'cases.card.28.media',
  'cases.card.29.media',
  'cases.card.30.media',
  'cases.card.31.media',
  'cases.card.32.media',
  'cases.card.33.media',
  'cases.card.34.media',
  'cases.card.35.media',
  'cases.card.36.media',
  'cases.card.37.media',
  'cases.card.38.media',
  'cases.card.39.media',
  'cases.card.40.media',
  'cases.card.41.media',
] as const;

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const dragGestureRef = useRef<{
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const { ref, isVisible } = useInView();

  const handleCardPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button > 0) return;

    dragGestureRef.current = {
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handleCardMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.button > 0) return;

    dragGestureRef.current = {
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handleCardClick = (caseItem: CaseItem, event: React.MouseEvent<HTMLButtonElement>) => {
    const gesture = dragGestureRef.current;
    const movedTooFar =
      !!gesture &&
      (Math.abs(event.clientX - gesture.startX) > 6 || Math.abs(event.clientY - gesture.startY) > 6);

    if (movedTooFar) {
      event.preventDefault();
      event.stopPropagation();
      dragGestureRef.current = null;
      return;
    }

    dragGestureRef.current = null;
    setSelectedCase(caseItem);
  };

  return (
    <section id="cases" className="py-16 bg-secondary/30 overflow-hidden scroll-mt-24" data-ui="cases.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="cases.content"
        className={`container mx-auto max-w-5xl px-4 md:px-6 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-end justify-between mb-6 md:mb-4" data-ui="cases.header">
          <div data-ui="cases.header.copy">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2" data-ui="cases.title">
              Cases entregues (evidências)
            </h2>
            <p className="text-sm text-muted-foreground" data-ui="cases.subtitle">
              Passe pro lado. Cada card traz um resumo; ao abrir, você vê problema, execução, resultado e evidências.
            </p>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2" data-ui="cases.nav.desktop">
            <button
              onClick={() => api?.scrollPrev()}
              data-ui="cases.nav.prev"
              className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <span className="text-xs text-muted-foreground px-2">
              {current + 1} / {shuffledCases.length}
            </span>
            <button
              onClick={() => api?.scrollNext()}
              data-ui="cases.nav.next"
              className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="cases-carousel-mask relative overflow-visible"
        data-ui="cases.carousel.mask"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full cursor-grab active:cursor-grabbing select-none"
          data-ui="cases.carousel"
        >
          <CarouselContent className="-ml-4 md:-ml-4" data-ui="cases.carousel.content">
            {shuffledCases.map((caseItem, index) => (
              <CarouselItem key={caseItem.id} className="pl-4 md:pl-4 basis-[280px] md:basis-[320px]" data-ui={`cases.carousel.item.${index + 1}`}>
                <button
                  type="button"
                  onPointerDown={handleCardPointerDown}
                  onMouseDown={handleCardMouseDown}
                  onClick={(event) => handleCardClick(caseItem, event)}
                  data-ui={`cases.card.${caseItem.id}`}
                  className="w-full text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group h-full flex flex-col relative cursor-grab active:cursor-grabbing select-none touch-manipulation"
                >
                  {caseItem.year != null && (
                    <span
                      className="absolute top-0 right-0 z-10 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      data-ui={`cases.card.${caseItem.id}.year`}
                    >
                      {caseItem.year}
                    </span>
                  )}
                  <div className="aspect-video w-full rounded-xl bg-secondary/50 border border-border/50 mb-4 flex items-center justify-center relative overflow-hidden" data-ui={CASES_CARD_MEDIA_UI[caseItem.id - 1]}>
                    {hasRenderableImage(caseItem.src) ? (
                      <img
                        src={caseItem.src}
                        alt=""
                        draggable={false}
                        data-ui={`cases.card.${caseItem.id}.media.asset`}
                        className={`w-full h-full object-cover ${
                          caseItem.imagePosition === 'bottom'
                            ? 'object-bottom'
                            : caseItem.imagePosition === 'center'
                              ? 'object-center'
                              : 'object-top'
                        } transition-transform duration-300 ease-out group-hover:scale-105`}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">{caseItem.src}</span>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110" data-ui={`cases.card.${caseItem.id}.media.badge`}>
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mb-3" data-ui={`cases.card.${caseItem.id}.tags`}>
                    {caseItem.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium" data-ui={`cases.card.${caseItem.id}.tag.${i + 1}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 whitespace-pre-line" data-ui={`cases.card.${caseItem.id}.title`}>
                    {caseItem.title}
                  </h3>
                  
                  {/* Impact */}
                  <p className="text-xs text-muted-foreground leading-relaxed" data-ui={`cases.card.${caseItem.id}.impact`}>
                    {caseItem.impact}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-4 flex justify-center" data-ui="cases.pagination">
        <div className="flex gap-1" data-ui="cases.pagination.dots">
          {shuffledCases.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              data-ui={`cases.pagination.dot.${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'bg-primary w-4' 
                  : 'bg-muted-foreground/20 w-1 hover:bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] flex flex-col p-0 gap-0 bg-card border-border overflow-hidden" data-ui="cases.modal">
          {selectedCase && (
            <>
              {hasRenderableImage(selectedCase.src) && (
                <div className="w-full flex-shrink-0 overflow-hidden rounded-t-lg" data-ui="cases.modal.image">
                  <img
                    src={selectedCase.src}
                    alt=""
                    data-ui="cases.modal.image.asset"
                    className={`w-full object-cover ${
                      selectedCase.imagePosition === 'bottom'
                        ? 'object-bottom'
                        : selectedCase.imagePosition === 'center'
                          ? 'object-center'
                          : 'object-top'
                    }`}
                    style={{ height: 'clamp(160px, 28vw, 260px)' }}
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 min-h-0 relative">
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10 bg-gradient-to-t from-card to-transparent" aria-hidden />
                <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-10 bg-gradient-to-b from-card to-transparent" aria-hidden />
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 md:p-8 pb-8">
                <DialogHeader className="pr-10 sm:pr-12 pb-4 pt-1 space-y-2 text-left" data-ui="cases.modal.header">
                  <DialogTitle className="text-lg font-semibold text-foreground break-words leading-snug whitespace-pre-line" data-ui="cases.modal.title">
                    {selectedCase.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Detalhes do case com contexto, acoes, resultado e evidencias.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-2" data-ui="cases.modal.content">
                  <div className="flex flex-wrap gap-2" data-ui="cases.modal.tags">
                    {selectedCase.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium" data-ui={`cases.modal.tag.${i + 1}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="p-5 md:p-6 rounded-xl bg-secondary/50 border border-border" data-ui="cases.modal.problem">
                    <h4 className="text-xs font-medium text-primary uppercase tracking-wide mb-2" data-ui="cases.modal.problem.label">
                      {selectedCase.problemLabel ?? 'Problema'}
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed" data-ui="cases.modal.problem.text">{selectedCase.problem}</p>
                  </div>

                  <div data-ui="cases.modal.actions">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3" data-ui="cases.modal.actions.title">O que eu fiz</h4>
                    <div className="relative pl-6">
                      <span className="absolute left-[0.4rem] top-2 bottom-2 w-px bg-border" aria-hidden />
                      <ul className="relative space-y-3" data-ui="cases.modal.actions.list">
                        {selectedCase.actions.map((action, i) => (
                          <li key={i} className="relative flex gap-3 items-start leading-relaxed" data-ui={`cases.modal.actions.item.${i + 1}`}>
                            <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 relative z-[1] bg-card" data-ui={`cases.modal.actions.item.${i + 1}.index`}>
                              {i + 1}
                            </span>
                            <span className="text-sm text-muted-foreground" data-ui={`cases.modal.actions.item.${i + 1}.text`}>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 rounded-xl bg-primary/5 border border-primary/20" data-ui="cases.modal.result">
                    <div className="flex items-center gap-2 mb-2" data-ui="cases.modal.result.header">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" data-ui="cases.modal.result.icon">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-wide" data-ui="cases.modal.result.title">Resultado</h4>
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed" data-ui="cases.modal.result.text">{selectedCase.result}</p>
                  </div>

                  <div data-ui="cases.modal.evidence">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Evidências</h4>
                    {selectedCase.evidences?.length ? (
                      <ul className="space-y-2" data-ui="cases.modal.evidence.list">
                        {selectedCase.evidences.map((ev, i) => (
                          <li key={i} data-ui={`cases.modal.evidence.item.${i + 1}`}>
                            <a
                              href={ev.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1.5 group"
                              data-ui={`cases.modal.evidence.item.${i + 1}.link`}
                            >
                              {ev.label}
                              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1.5 group"
                        data-ui="cases.modal.evidence.link"
                      >
                        {selectedCase.evidence}
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Cases;
