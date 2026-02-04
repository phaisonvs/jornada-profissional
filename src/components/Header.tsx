import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#tldr', label: 'TL;DR' },
  { href: '#desafio', label: 'Desafio Atual' },
  { href: '#cases', label: 'Cases' },
  { href: '#como-trabalho', label: 'Como Trabalho' },
  { href: '#escopo', label: 'Escopo' },
  { href: '#evolucao', label: 'Evolução' },
  { href: '#pedido', label: 'Pedido' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo MYSA */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-highlight flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MY</span>
            </div>
            <span className="text-foreground font-semibold text-lg hidden sm:block">MYSA</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile indicator */}
          <div className="md:hidden text-xs text-muted-foreground">
            Role para navegar
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
