import { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useInView } from "@/hooks/use-in-view";
import { shuffleArray, uniqueCases } from "@/components/cases-utils";

const caseAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}cases/${fileName}`;

interface CaseItem {
  id: number;
  title: string;
  tags: string[];
  impact: string;
  src: string;
  imagePosition?: "top" | "center" | "bottom";
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
  imagePosition: "top" | "center" | "bottom" = "top",
): CaseItem => ({
  id,
  title,
  tags,
  impact: `${title} com foco em experiência, execução técnica e conversão.`,
  src,
  imagePosition,
  problem: `A frente "${title}" exigia evolução de jornada e execução de front-end para reduzir atrito e sustentar crescimento do funil.`,
  problemLabel: "Contexto / Dor",
  actions: [
    `Mapeei o escopo de "${title}" e defini a solução com foco em clareza e consistência da jornada.`,
    "Implementei interface e regras técnicas necessárias para publicação com estabilidade.",
    "Validei comportamento responsivo, acompanhamento de métricas e alinhamento com a operação.",
  ],
  result: `${title} publicado com jornada mais clara e base pronta para evolução contínua.`,
  evidence: `[LINK_${id}]`,
  year: 2023,
});

const cases: CaseItem[] = [
  {
    id: 1,
    title: "Localpage",
    tags: ["UX/UI", "Front-end", "SEO"],
    impact:
      "UI/UX + front: componentes reutilizáveis, layout responsivo e roteamento hierárquico (estado→cidade→loja) para escalar o diretório",
    src: caseAsset("1-localpage.jpg"),
    problem:
      "Escalar SEO local e entrada de novas lojas exigia um diretório padronizado, com estrutura previsível (rotas/URLs) e baixa manutenção para não gerar duplicidades.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Desenhei e implementei o template do diretório (Estado → Cidade → Loja) com UI responsiva e componentes reutilizáveis.",
      "Modelei estrutura de rotas + slugs e padrões de navegação para consistência entre páginas.",
      "Defini regras de governança para publicação de novas unidades (campos e validações), reduzindo retrabalho.",
    ],
    result:
      "Diretório escalável e consistente, pronto para crescimento contínuo de lojas com estrutura estável e manutenção previsível.",
    evidence: "[LINK_1]",
    evidences: [
      { label: "Figma — fluxo + templates", href: "#" },
      { label: "Produção — exemplo cidade/loja", href: "#" },
    ],
    year: 2021,
  },
  {
    id: 2,
    title: "Black Friday ABC",
    tags: ["CRO", "Front-end", "Campanha"],
    impact:
      "Landing e fluxo de conversão para campanha Black Friday com foco em clareza e performance.",
    src: caseAsset("2-black-friday-abc.jpg"),
    problem:
      "A campanha Black Friday exigia uma experiência dedicada, com mensagem clara, CTAs visíveis e integração com estoque/preço para evitar fricção no pico de demanda.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Desenhei e implementei a landing da Black Friday com hierarquia visual e CTAs alinhados ao funil.",
      "Garanti responsividade e carregamento otimizado para tráfego de pico.",
      "Integrei com regras de estoque e exibição de ofertas para consistência da jornada.",
    ],
    result:
      "Campanha publicada em tempo hábil com experiência estável e conversão alinhada aos objetivos da data.",
    evidence: "[LINK_2]",
    year: 2022,
  },
  {
    id: 3,
    title: "Visita à obra",
    tags: ["UX/UI", "Jornada"],
    impact:
      "Jornada de agendamento e experiência de visita à obra com foco em conversão e clareza.",
    src: caseAsset("3-visita-a-obra.jpg"),
    problem:
      "Era necessário oferecer uma jornada clara de agendamento de visita à obra, reduzindo atrito e aumentando o preenchimento de formulários e conversão.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Desenhei e implementei o fluxo de visita à obra com formulário e confirmação claros.",
      "Ajustei copy e hierarquia visual para reduzir abandono em etapas críticas.",
      "Mantive consistência com o restante do site e padrões de acessibilidade.",
    ],
    result:
      "Jornada de visita à obra publicada e estável, com melhor adesão e rastreio de conversão.",
    evidence: "[LINK_3]",
    year: 2022,
  },
  {
    id: 4,
    title: "Página de cupons",
    tags: ["UX/UI", "Front-end", "CRO"],
    impact:
      "Página de cupons com destaque de ofertas e CTAs para aumento de uso e conversão.",
    src: caseAsset("4-pagina-de-cupons.jpg"),
    problem:
      "A página de cupons precisava ser mais clara e acionável, com ofertas em destaque e caminho óbvio para uso no checkout.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Reestruturei a página de cupons com layout focado em descoberta e uso do cupom.",
      "Implementei componentes reutilizáveis e estados de copy válido/expirado.",
      "Alinhei exibição com regras de elegibilidade e integração ao fluxo de compra.",
    ],
    result:
      "Página de cupons mais clara e utilizável, com melhor percepção de valor e uso no funil.",
    evidence: "[LINK_4]",
    year: 2024,
  },
  {
    id: 5,
    title: "Página de encarte lead",
    tags: ["UX/UI", "Front-end"],
    impact:
      "Evolução da experiência de cupons com foco em clareza e conversão.",
    src: caseAsset("5-pagina-de-encarte-lead.jpg"),
    problem:
      "Evolução contínua da página de cupons para melhorar descoberta, legibilidade e taxa de aplicação no checkout.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Ajustes de layout e hierarquia visual na listagem de cupons.",
      "Refinamento de estados (válido, expirado, já utilizado) e feedback ao usuário.",
      "Alinhamento com métricas de uso de cupom e impacto em conversão.",
    ],
    result:
      "Experiência de cupons evoluída com menor fricção e melhor adesão às ofertas.",
    evidence: "[LINK_5]",
    year: 2023,
  },
  {
    id: 6,
    title: "Login Users Prime",
    tags: ["UX/UI", "Front-end", "Autenticação"],
    impact:
      "Fluxo de login e experiência para usuários Prime com redução de atrito e clareza.",
    src: caseAsset("6-login-users-prime.jpg"),
    problem:
      "O fluxo de login para usuários Prime precisava ser claro, seguro e alinhado ao restante da jornada para evitar abandono em etapa crítica.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Desenhei e implementei o fluxo de login dedicado aos usuários Prime.",
      "Garanti responsividade, mensagens de erro claras e integração com autenticação.",
      "Mantive consistência visual e de copy com o programa e o site.",
    ],
    result:
      "Login Prime estável e compreensível, com menor atrito e melhor rastreio de conversão.",
    evidence: "[LINK_6]",
    year: 2023,
  },
  {
    id: 7,
    title: "Checkout ABC da Construção",
    tags: ["CRO", "Front-end", "Checkout"],
    impact:
      "Checkout ABC com foco em clareza, redução de atrito e conversão na etapa final.",
    src: caseAsset("7-checkout-abc-da-construcao.jpg"),
    problem:
      "O checkout precisava de revisão de UX e consistência técnica para reduzir abandono e falhas na etapa final do funil.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Revisei e implementei melhorias no fluxo de checkout (revisão de pedido, frete, pagamento).",
      "Padronizei componentes e mensagens de erro para reduzir confusão.",
      "Garanti integração estável com frete e pagamento e acompanhamento de eventos de conversão.",
    ],
    result:
      "Checkout mais claro e estável, com menor abandono e métricas de conversão mensuráveis.",
    evidence: "[LINK_7]",
    evidences: [
      { label: "Checkout ABC da Construção", href: "#" },
      { label: "Checkout ABC Prime", href: "#" },
    ],
    year: 2025,
  },
  {
    id: 8,
    title: "Checkout ABC Prime",
    tags: ["CRO", "Front-end", "Checkout"],
    impact:
      "Versão do checkout para usuários Prime com benefícios visíveis e fluxo dedicado.",
    src: caseAsset("8-checkout-abcprime.jpg"),
    problem:
      "Usuários Prime precisavam de uma experiência de checkout que destacasse benefícios (frete, ofertas) sem quebrar o fluxo padrão.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Implementei a variante de checkout para usuários Prime com exibição de benefícios.",
      "Mantive reuso de componentes do checkout principal e regras específicas para Prime.",
      "Garanti rastreio de conversão separado para análise de performance do programa.",
    ],
    result:
      "Checkout Prime publicado com experiência diferenciada e conversão monitorada.",
    evidence: "[LINK_8]",
    year: 2022,
  },
  {
    id: 9,
    title: "Header menu ABC da Construção",
    tags: ["UX/UI", "Front-end", "Navegação"],
    impact:
      "Header e menu padronizados para melhor navegação e descoberta no site.",
    src: caseAsset("9-header-menu-abc-da-construcao.jpg"),
    problem:
      "O header e o menu precisavam ser consistentes, acessíveis e alinhados às jornadas de conversão em todas as páginas.",
    problemLabel: "Contexto / Dor",
    actions: [
      "Desenhei e implementei o header e o menu com estrutura reutilizável e responsiva.",
      "Organizei a navegação por prioridade e alinhei com SEO e rotas do diretório.",
      "Mantive estados de hover/foco e acessibilidade para teclado e leitores de tela.",
    ],
    result:
      "Header e menu estáveis em todo o site, com melhor orientação e menor fricção na navegação.",
    evidence: "[LINK_9]",
    year: 2025,
  },
  {
    ...createGenericCase(
      10,
      "Novo Front E-com ABC",
      caseAsset("10-novo-front-e-com-abc.png"),
      ["Front-end", "UX/UI", "Plataforma"],
    ),
    year: 2022,
  },
  {
    id: 11,
    title: "Página de Login Ecom ABC",
    tags: ["UX/UI", "Front-end", "Back-end", "Autenticação", "APIs"],
    impact:
      "Jornada de autenticação para login dedicado, login no checkout e integrações com provedores externos.",
    src: caseAsset("11-pagina-login-ecom-abc.jpg"),
    problem:
      "A jornada de autenticação do e-commerce precisava ser refatorada, incluindo login dedicado, login no checkout e integrações externas.",
    problemLabel: "Contexto / dor",
    actions: [
      "Refatorei a estrutura front-end da página de login e dos fluxos de autenticação.",
      "Atuei no back-end e na integração das APIs de login com Google e Facebook.",
      "Validei o comportamento entre login, cadastro, checkout e retorno do usuário.",
    ],
    result:
      "Jornada de login publicada com estrutura dedicada, autenticação social integrada e base mais consistente para evolução do e-commerce.",
    evidence: "[LINK_11]",
    year: 2024,
  },
  {
    ...createGenericCase(
      12,
      "LP Amigo Pé Quente",
      caseAsset("12-lp-amigo-pe-quente.jpg"),
      ["CRO", "Front-end", "LP"],
    ),
    year: 2021,
  },
  createGenericCase(13, "LP Liquida ABC", caseAsset("12-lpliquidaabc.jpg"), [
    "CRO",
    "Front-end",
    "LP",
  ]),
  {
    ...createGenericCase(14, "Migração LPs", caseAsset("12-migração-lps.jpg"), [
      "CRO",
      "Front-end",
      "Migração",
    ]),
    year: 2024,
  },
  {
    ...createGenericCase(
      15,
      "PDP Pisos e Revestimentos",
      caseAsset("12-pdp-pisos-e-revestimentos.png"),
      ["CRO", "UX/UI", "PDP"],
    ),
    year: 2022,
  },
  {
    id: 16,
    title: "Regionalização de Preços ABC da Construção",
    tags: ["CRO", "Pricing", "Front-end", "Wake"],
    impact:
      "Aplicação de preços por região no e-commerce com fluxo integrado entre CEP, tabela de preço e compra.",
    src: caseAsset("13-regionalizacao-de-preços.jpg"),
    problem:
      "A ABC precisava aplicar preços por região no e-commerce, conectando CEP, tabela de preço e jornada de compra.",
    problemLabel: "Contexto / dor",
    actions: [
      "Mapeei o fluxo Wake de regionalização entre CEP, região, Storefront e tabela de preço.",
      "Estruturei o modal de região com foco em clareza, validação e menor atrito.",
      "Apoiei a lógica front-end e validei estados, responsividade e comportamento da jornada.",
    ],
    result:
      "Regionalização publicada com experiência mais clara e base pronta para evolução comercial por região.",
    evidence: "[LINK_16]",
    year: 2022,
  },
  createGenericCase(
    17,
    "Integração Loja Duratex",
    caseAsset("14-Integracao-loja-duratex.jpg"),
    ["Integração", "Front-end", "Operação"],
  ),
  {
    ...createGenericCase(19, "Casa Dexco", caseAsset("16-casa-dexco.jpg"), [
      "UX/UI",
      "Front-end",
      "Marca",
    ]),
    year: 2025,
  },
  createGenericCase(
    20,
    "LP Expansão Seja um Franqueado",
    caseAsset("18-pdp-loja-duratex.jpg"),
    ["CRO", "UX/UI", "LP"],
  ),
  createGenericCase(
    21,
    "PDP Loja Duratex (Fase 2)",
    caseAsset("19-pdp-loja-duratex.jpg"),
    ["CRO", "UX/UI", "PDP"],
  ),
  createGenericCase(
    22,
    "Setup Nova Loja ABC Prime",
    caseAsset("17-setup-nova-loja-abc-prime.jpg"),
    ["UX/UI", "Front-end", "Setup"],
  ),
  {
    ...createGenericCase(
      23,
      "LP Chance Única",
      caseAsset("20-lp-chance-única.jpg"),
      ["CRO", "Front-end", "LP"],
    ),
    year: 2026,
  },
  {
    id: 24,
    title: "Tracking Leads Expansão",
    tags: ["Analytics", "Tracking", "Looker"],
    impact:
      "Tracking confiável para medir tentativas, sucessos e erros no envio de leads.",
    src: caseAsset("21-tracking-leads-expansao.jpeg"),
    problem:
      "A LP de Expansão precisava de rastreamento confiável para medir tentativas, sucessos e erros no envio de leads.",
    problemLabel: "Contexto / dor",
    actions: [
      "Configurei o dataLayer com eventos como lead_submit_attempt, lead_submit_success e lead_submit_error.",
      "Estruturei parâmetros para analisar status, perfil do lead, retry e comportamento do formulário.",
      "Montei o dashboard no Looker para acompanhar volume, sucesso, falhas e evolução dos envios.",
    ],
    result:
      "Tracking publicado com eventos estruturados e dashboard no Looker para leitura da performance e estabilidade da captação de leads.",
    evidence: "[LINK_24]",
    year: 2026,
  },
  {
    id: 26,
    title: "Design System ABC",
    tags: ["Design System", "UX/UI", "Front-end", "Componentização"],
    impact:
      "Base reutilizável para padronizar interfaces e acelerar novas frentes digitais MYSA.",
    src: caseAsset("22-design-system-abc.jpg"),
    problem:
      "As evoluções digitais estavam sendo criadas do zero, sem uma base componentizada para reduzir retrabalho e padronizar interfaces.",
    problemLabel: "Contexto / DOR",
    actions: [
      "Estruturei a lógica de componentização para elementos reutilizáveis do Design System ABC.",
      "Organizei padrões de interface e documentação para dar suporte às futuras implementações front-end.",
      "Conectei a base técnica e visual às necessidades de evolução dos e-commerces e demais produtos digitais MYSA.",
    ],
    result:
      "Design System ABC estruturado como base reutilizável para evolução contínua das frentes digitais.",
    evidence: "[LINK_26]",
    year: 2024,
  },
  {
    id: 27,
    title: "Programa de Indicação ABC",
    tags: ["UX/UI", "Front-end", "Back-end", "Salesforce", "Pipedrive"],
    impact:
      "Página dedicada para apresentar a mecânica de indicação e capturar o lead até o fluxo comercial.",
    src: caseAsset("23-programa-de-indicacao-franqueado.jpg"),
    problem:
      "O programa precisava de uma página dedicada para apresentar a mecânica de indicação e garantir a captura do lead até o fluxo comercial.",
    problemLabel: "Contexto / dor",
    actions: [
      "Desenvolvi o front-end completo da página, estruturando a jornada de apresentação e captura do lead.",
      "Atuei no back-end para registrar o lead como objeto no Salesforce e garantir o envio ao Pipedrive.",
      "Validei usabilidade, responsividade e consistência do fluxo entre formulário, Salesforce e operação comercial.",
    ],
    result:
      "Página do Programa de Indicação ABC publicada com jornada dedicada, captura de lead integrada e envio estruturado para o Pipedrive.",
    evidence: "[LINK_27]",
    year: 2024,
  },
  {
    id: 28,
    title: "E-mails Transacionais ABC Prime",
    tags: ["E-mail", "Transacional", "UX/UI", "Comunicação", "Sustentação"],
    impact:
      "Templates transacionais para pedidos, produtos e assinaturas com comunicação mais clara e consistente.",
    src: caseAsset("24-e-mails-transacionais.jpg"),
    problem:
      "Os e-mails transacionais do ABC Prime precisavam evoluir em layout, clareza de comunicação, usabilidade e correção dos envios da jornada.",
    problemLabel: "Contexto / dor",
    actions: [
      "Refatorei templates transacionais de pedidos, produtos e assinaturas.",
      "Ajustei layout, hierarquia de informação e mensagens para reduzir atrito.",
      "Atuei na correção e sustentação dos fluxos de envio.",
    ],
    result:
      "Templates transacionais do ABC Prime evoluídos com comunicação mais clara e maior consistência nos fluxos de pedido e assinatura.",
    evidence: "[LINK_28]",
    year: 2023,
  },
  {
    ...createGenericCase(29, "LP ABC Prime", caseAsset("24-lp-abc-primeo.jpg"), [
      "CRO",
      "Front-end",
      "LP",
    ]),
    year: 2025,
  },
  {
    ...createGenericCase(
      30,
      "Página de produto - pisos e revestimentos",
      caseAsset("26-pagina-de-produto-pisos-e-revestimentos.jpg"),
      ["UX/UI", "Front-end", "PDP"],
    ),
    year: 2022,
  },
  createGenericCase(
    31,
    "Página de produtos - variante metais",
    caseAsset("27-pagina-de-produtos variante metais.jpg"),
    ["UX/UI", "Front-end", "PDP"],
  ),
  createGenericCase(
    32,
    "PDP piso e revestimentos - desktop",
    caseAsset("28-pdp-piso- e revestimentosdesk.jpg"),
    ["UX/UI", "Front-end", "PDP"],
  ),
  {
    id: 33,
    title: "Popup Especialista para Categoria Pisos e Revestimentos ABC",
    tags: ["CRO", "Lead", "WhatsApp", "UX/UI", "Front-end"],
    impact:
      "Captação de lead para atendimento consultivo via WhatsApp em uma categoria com alta barreira de conversão.",
    src: caseAsset("29-popup-especialista-piso-desk.jpg"),
    problem:
      "A categoria de pisos tinha alta barreira de conversão no e-commerce por custo de frete, exigindo uma estratégia de captura de lead para atendimento consultivo via WhatsApp.",
    problemLabel: "Contexto / dor",
    actions: [
      "Estruturei o popup de captação com mensagem consultiva, CTA para WhatsApp e opção clara de recusa.",
      "Direcionei a experiência para transformar interesse em contato comercial, sem depender apenas da compra direta no e-commerce.",
      "Implementei e validei a interface no desktop, considerando contexto da categoria, usabilidade e comportamento da jornada.",
    ],
    result:
      "Popup publicado para captura de leads na categoria de pisos, conectando intenção de compra, atendimento especializado e conversão assistida via WhatsApp.",
    evidence: "[LINK_33]",
    year: 2026,
  },
  {
    ...createGenericCase(
      34,
      "Looker performance - LP expansão",
      caseAsset("30-looker-performance-lp-expansao.jpg"),
      ["Analytics", "Front-end", "Performance"],
    ),
    year: 2026,
  },
  {
    ...createGenericCase(
      35,
      "Primeira compra popup",
      caseAsset("31primeira-compra-opup.jpg"),
      ["CRO", "Front-end", "Popup"],
    ),
    year: 2025,
  },
  {
    id: 36,
    title: "Formulário Bot WhatsApp",
    tags: ["UX/UI", "Front-end", "Back-end", "WhatsApp", "Lead"],
    impact:
      "Formulário de entrada para captura de lead e direcionamento ao bot no WhatsApp.",
    src: caseAsset("32-formulario-bot Whatsapp.jpg"),
    imagePosition: "center",
    problem:
      "O formulário era a primeira porta de entrada do usuário como lead, conectando captura de dados, abertura da jornada e direcionamento para o bot no WhatsApp.",
    problemLabel: "Contexto / dor",
    actions: [
      "Evoluí a interface de abertura e preenchimento, melhorando clareza, responsividade e interação.",
      "Implementei máscaras, validações e campos no front-end e back-end para qualificar a captura dos dados.",
      "Estruturei o fluxo para armazenar as informações e direcionar o usuário ao bot no WhatsApp.",
    ],
    result:
      "Formulário publicado com captura de lead mais consistente, validação de dados e direcionamento estruturado para o bot no WhatsApp.",
    evidence: "[LINK_36]",
    year: 2023,
  },
  {
    ...createGenericCase(
      37,
      "Autocomplete performance de busca",
      caseAsset("33-Auto-complete-perfoamance-busca.jpg"),
      ["Front-end", "UX/UI", "Busca"],
    ),
    year: 2024,
  },
  {
    ...createGenericCase(
      38,
      "Retira na Guide Shop - cotação de frete",
      caseAsset("34-Retira na Guide Shop - cotacao de frete.jpg"),
      ["CRO", "Front-end", "Frete"],
      "center",
    ),
    year: 2025,
  },
  {
    ...createGenericCase(
      39,
      "LP Super Chance Única",
      caseAsset("35-LP-SuperChnce Unica.png"),
      ["CRO", "Front-end", "Campanha"],
    ),
    year: 2026,
  },
  {
    id: 40,
    title: "LP Mês do Consumidor ABC",
    tags: ["CRO", "Front-end", "Campanha", "WhatsApp", "Lead"],
    impact:
      "Landing page de campanha focada em captura de lead e direcionamento para bot no WhatsApp.",
    src: caseAsset("36-LP-Mes do consumidor.png"),
    problem:
      "A campanha do Mês do Consumidor precisava de uma LP com foco em conversão de leads e contato assistido via WhatsApp.",
    problemLabel: "Contexto / dor",
    actions: [
      "Estruturei a LP com oferta clara, urgência de campanha e CTA para WhatsApp.",
      "Implementei countdowns, animações e reforços visuais para sustentar o senso de ativação.",
      "Organizei a jornada para reduzir atrito e levar o usuário ao bot com mais rapidez.",
    ],
    result:
      "LP publicada com experiência responsiva e fluxo orientado à captura de leads via WhatsApp.",
    evidence: "[LINK_40]",
    year: 2022,
  },
  {
    ...createGenericCase(
      41,
      "LP Semana do Consumidor",
      caseAsset("25-lp-semana-do-consumidor.jpg"),
      ["CRO", "Front-end", "Campanha"],
    ),
    year: 2022,
  },
  {
    ...createGenericCase(
      42,
      "Ofertas Mensais",
      caseAsset("40-Ofertas-Mensais.png"),
      ["CRO", "Front-end", "Campanha"],
    ),
    year: 2026,
  },
  {
    ...createGenericCase(
      43,
      "Campanha Viver Ambientes",
      caseAsset("41-Campanha-Viver-ambientes.png"),
      ["CRO", "Front-end", "Campanha"],
    ),
    year: 2026,
  },
];

const casesForDedup = cases.map((caseItem) => ({
  ...caseItem,
  print: caseItem.src,
}));
const dedupedCases = uniqueCases(casesForDedup).map(
  ({ print: _print, ...caseItem }) => caseItem,
);
export const CASES_CARD_COUNT = dedupedCases.length;
const shuffledCases = shuffleArray(dedupedCases);
const hasRenderableImage = (src: string) =>
  src.startsWith("/") || src.startsWith("http");

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoScrollRafRef = useRef<number>();
  const autoScrollLastTimeRef = useRef<number>();
  const dragGestureRef = useRef<{
    startX: number;
    startY: number;
  } | null>(null);

  const AUTO_SCROLL_PX_PER_SECOND = 30;

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    if (typeof api.internalEngine !== "function") return;

    const engine = api.internalEngine();

    const tick = (time: number) => {
      if (autoScrollLastTimeRef.current == null) {
        autoScrollLastTimeRef.current = time;
      }

      const deltaMs = time - autoScrollLastTimeRef.current;
      autoScrollLastTimeRef.current = time;

      if (!engine.dragHandler.pointerDown() && !selectedCase) {
        const distance = (AUTO_SCROLL_PX_PER_SECOND * deltaMs) / 1000;
        engine.scrollBody.useBaseFriction().useDuration(0);
        engine.scrollTo.distance(distance, false);
      }

      autoScrollRafRef.current = window.requestAnimationFrame(tick);
    };

    autoScrollRafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (autoScrollRafRef.current !== undefined) {
        window.cancelAnimationFrame(autoScrollRafRef.current);
      }
      autoScrollRafRef.current = undefined;
      autoScrollLastTimeRef.current = undefined;
    };
  }, [api, selectedCase]);

  const { ref, isVisible } = useInView();

  const handleCardPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
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

  const handleCardClick = (
    caseItem: CaseItem,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const gesture = dragGestureRef.current;
    const movedTooFar =
      !!gesture &&
      (Math.abs(event.clientX - gesture.startX) > 6 ||
        Math.abs(event.clientY - gesture.startY) > 6);

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
    <section
      id="cases"
      className="py-16 bg-secondary/30 overflow-hidden scroll-mt-24"
      data-ui="cases.root"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="cases.content"
        className={`container mx-auto max-w-5xl px-4 md:px-6 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="flex items-end justify-between mb-6 md:mb-4"
          data-ui="cases.header"
        >
          <div data-ui="cases.header.copy">
            <h2
              className="text-xl md:text-2xl font-semibold text-foreground mb-2"
              data-ui="cases.title"
            >
              Cases entregues como evidência
            </h2>
            <p
              className="text-sm text-muted-foreground"
              data-ui="cases.subtitle"
            >
              Entregas que demonstram o escopo já assumido entre CRO, UX/UI,
              tecnologia, sustentação e evolução dos canais digitais.
            </p>
          </div>

          {/* Desktop navigation */}
          <div
            className="hidden md:flex items-center gap-2"
            data-ui="cases.nav.desktop"
          >
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
            align: "center",
            dragFree: true,
            loop: true,
          }}
          className="w-full cursor-grab active:cursor-grabbing select-none"
          data-ui="cases.carousel"
        >
          <CarouselContent
            className="-ml-4 md:-ml-4"
            data-ui="cases.carousel.content"
          >
            {shuffledCases.map((caseItem, index) => (
              <CarouselItem
                key={caseItem.id}
                className="pl-4 md:pl-4 basis-[280px] md:basis-[320px]"
                data-ui={`cases.carousel.item.${index + 1}`}
              >
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
                  <div
                    className="aspect-video w-full rounded-xl bg-secondary/50 border border-border/50 mb-4 flex items-center justify-center relative overflow-hidden"
                    data-ui={`cases.card.${index + 1}.media`}
                  >
                    {hasRenderableImage(caseItem.src) ? (
                      <img
                        src={caseItem.src}
                        alt=""
                        draggable={false}
                        data-ui={`cases.card.${caseItem.id}.media.asset`}
                        className={`w-full h-full object-cover ${
                          caseItem.imagePosition === "bottom"
                            ? "object-bottom"
                            : caseItem.imagePosition === "center"
                              ? "object-center"
                              : "object-top"
                        } transition-transform duration-300 ease-out group-hover:scale-105`}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {caseItem.src}
                      </span>
                    )}
                    <div
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110"
                      data-ui={`cases.card.${caseItem.id}.media.badge`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div
                    className="flex gap-2 mb-3"
                    data-ui={`cases.card.${caseItem.id}.tags`}
                  >
                    {caseItem.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        data-ui={`cases.card.${caseItem.id}.tag.${i + 1}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 whitespace-pre-line"
                    data-ui={`cases.card.${caseItem.id}.title`}
                  >
                    {caseItem.title}
                  </h3>

                  {/* Impact */}
                  <p
                    className="text-xs text-muted-foreground leading-relaxed"
                    data-ui={`cases.card.${caseItem.id}.impact`}
                  >
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
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/20 w-1 hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent
          className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] flex flex-col p-0 gap-0 bg-card border-border overflow-hidden"
          data-ui="cases.modal"
        >
          {selectedCase && (
            <>
              {hasRenderableImage(selectedCase.src) && (
                <div
                  className="w-full flex-shrink-0 overflow-hidden rounded-t-lg"
                  data-ui="cases.modal.image"
                >
                  <img
                    src={selectedCase.src}
                    alt=""
                    data-ui="cases.modal.image.asset"
                    className={`w-full object-cover ${
                      selectedCase.imagePosition === "bottom"
                        ? "object-bottom"
                        : selectedCase.imagePosition === "center"
                          ? "object-center"
                          : "object-top"
                    }`}
                    style={{ height: "clamp(160px, 28vw, 260px)" }}
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 min-h-0 relative">
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10 bg-gradient-to-t from-card to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-10 bg-gradient-to-b from-card to-transparent"
                  aria-hidden
                />
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 md:p-8 pb-8">
                  <DialogHeader
                    className="pr-10 sm:pr-12 pb-4 pt-1 space-y-2 text-left"
                    data-ui="cases.modal.header"
                  >
                    <DialogTitle
                      className="text-lg font-semibold text-foreground break-words leading-snug whitespace-pre-line"
                      data-ui="cases.modal.title"
                    >
                      {selectedCase.title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Detalhes do case com contexto, acoes, resultado e
                      evidencias.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-2" data-ui="cases.modal.content">
                    <div
                      className="flex flex-wrap gap-2"
                      data-ui="cases.modal.tags"
                    >
                      {selectedCase.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                          data-ui={`cases.modal.tag.${i + 1}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="p-5 md:p-6 rounded-xl bg-secondary/50 border border-border"
                      data-ui="cases.modal.problem"
                    >
                      <h4
                        className="text-xs font-medium text-primary uppercase tracking-wide mb-2"
                        data-ui="cases.modal.problem.label"
                      >
                        {selectedCase.problemLabel ?? "Problema"}
                      </h4>
                      <p
                        className="text-sm text-foreground leading-relaxed"
                        data-ui="cases.modal.problem.text"
                      >
                        {selectedCase.problem}
                      </p>
                    </div>

                    <div data-ui="cases.modal.actions">
                      <h4
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3"
                        data-ui="cases.modal.actions.title"
                      >
                        O que eu fiz
                      </h4>
                      <div className="relative pl-6">
                        <span
                          className="absolute left-[0.4rem] top-2 bottom-2 w-px bg-border"
                          aria-hidden
                        />
                        <ul
                          className="relative space-y-3"
                          data-ui="cases.modal.actions.list"
                        >
                          {selectedCase.actions.map((action, i) => (
                            <li
                              key={i}
                              className="relative flex gap-3 items-start leading-relaxed"
                              data-ui={`cases.modal.actions.item.${i + 1}`}
                            >
                              <span
                                className="w-5 h-5 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 relative z-[1] bg-card"
                                data-ui={`cases.modal.actions.item.${i + 1}.index`}
                              >
                                {i + 1}
                              </span>
                              <span
                                className="text-sm text-muted-foreground"
                                data-ui={`cases.modal.actions.item.${i + 1}.text`}
                              >
                                {action}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      className="p-5 md:p-6 rounded-xl bg-primary/5 border border-primary/20"
                      data-ui="cases.modal.result"
                    >
                      <div
                        className="flex items-center gap-2 mb-2"
                        data-ui="cases.modal.result.header"
                      >
                        <div
                          className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                          data-ui="cases.modal.result.icon"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <h4
                          className="text-xs font-medium text-primary uppercase tracking-wide"
                          data-ui="cases.modal.result.title"
                        >
                          Resultado
                        </h4>
                      </div>
                      <p
                        className="text-sm text-foreground font-medium leading-relaxed"
                        data-ui="cases.modal.result.text"
                      >
                        {selectedCase.result}
                      </p>
                    </div>

                    <div data-ui="cases.modal.evidence">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Evidências
                      </h4>
                      {selectedCase.evidences?.length ? (
                        <ul
                          className="space-y-2"
                          data-ui="cases.modal.evidence.list"
                        >
                          {selectedCase.evidences.map((ev, i) => (
                            <li
                              key={i}
                              data-ui={`cases.modal.evidence.item.${i + 1}`}
                            >
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

