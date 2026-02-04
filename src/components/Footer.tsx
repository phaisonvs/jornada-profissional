import mysaLogo from '@/assets/mysa-logo.png';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl flex flex-col items-center gap-4">
        <img 
          src={mysaLogo} 
          alt="MYSA" 
          className="h-4 w-auto brightness-0 invert opacity-50"
        />
        <p className="text-xs text-muted-foreground">
          desenvolvido por <span className="text-foreground">Phaison Vieira</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
