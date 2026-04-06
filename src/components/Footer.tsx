import mysaLogo from '@/assets/mysa-logo.png';
import { useInView } from '@/hooks/use-in-view';
const Footer = () => {
  const { ref, isVisible } = useInView({ threshold: 0, rootMargin: '0px 0px 0px 0px' });

  return (
    <footer className="py-10 px-4 md:px-6 border-t border-border" data-ui="footer.root">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="footer.content"
        className={`container mx-auto max-w-4xl flex flex-col items-center justify-center gap-3 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-xs text-muted-foreground text-center" data-ui="footer.credit">
          Idealizado e desenvolvido por <span className="text-foreground">Phaison Vieira Simões</span>
        </p>
        <img
          src={mysaLogo}
          alt="MYSA Inteligência para Negócios"
          className="h-4 w-auto brightness-0 invert opacity-60"
          data-ui="footer.brand"
        />
      </div>
    </footer>
  );
};

export default Footer;
