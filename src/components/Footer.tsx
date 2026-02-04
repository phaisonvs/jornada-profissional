const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-highlight flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">MY</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Página pessoal para 1:1 com direção
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Documento interno • [SEU_NOME] • [DATA]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
