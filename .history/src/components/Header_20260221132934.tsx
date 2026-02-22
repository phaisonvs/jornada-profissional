import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import mysaLogo from '@/assets/mysa-logo.png';

const navLinks = [
  { href: '#tldr', label: 'TL;DR' },
  { href: '#desafio', label: 'Desafio' },
  { href: '#cases', label: 'Cases' },
  { href: '#como-trabalho', label: 'Como trabalho' },
  { href: '#escopo', label: 'Escopo' },
  { href: '#evolucao', label: 'Evolução' },
  { href: '#pedido', label: 'Pedido' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex items-center justify-between min-h-[5rem] h-20 md:min-h-0 md:h-14">
            <a href="#" className="flex items-center">
              <img
                src={mysaLogo}
                alt="MYSA"
                className="h-5 w-auto brightness-0 invert opacity-80"
              />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <button
            className="fixed inset-0 z-[100] bg-black/40 md:hidden animate-fade-in"
            aria-label="Fechar menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="fixed left-0 top-0 bottom-0 z-[101] w-fit min-w-[12rem] max-w-[min(85vw,20rem)] bg-background border-r border-border md:hidden animate-fade-in overflow-y-auto"
            aria-hidden="false"
          >
            <div className="px-4 pt-6 pb-6">
              <div className="flex items-center justify-between min-h-[3rem]">
                <a href="#" className="flex items-center">
                  <img
                    src={mysaLogo}
                    alt="MYSA"
                    className="h-5 w-auto brightness-0 invert opacity-80"
                  />
                </a>
                <button
                  className="p-2 -mr-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <nav className="flex flex-wrap justify-center gap-2 pt-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-primary/5"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
