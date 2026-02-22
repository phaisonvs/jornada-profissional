import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import mysaLogo from '@/assets/mysa-logo.png';

const navLinks = [
  { href: '#tldr', label: 'TL;DR' },
  { href: '#cases', label: 'Cases' },
  { href: '#desafio', label: 'Desafio' },
  { href: '#objetivos-techlead', label: 'Objetivos' },
  { href: '#escopo', label: 'Escopo' },
  { href: '#evolucao', label: 'Evolução' },
  { href: '#pedido', label: 'Pedido' },
];

const MENU_TRANSITION_DURATION = 450;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMenuVisible(true);
        });
      });
    } else {
      setIsMenuVisible(false);
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMenuVisible(false);
    closeTimeoutRef.current = setTimeout(() => {
      setIsMobileMenuOpen(false);
      closeTimeoutRef.current = undefined;
    }, MENU_TRANSITION_DURATION);
  };

  const scrollToSection = (href: string) => {
    closeMenu();
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
              onClick={() => (isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true))}
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
          <div
            className={`fixed inset-0 z-30 bg-black/15 md:hidden transition-opacity duration-[450ms] ease-out ${
              isMenuVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
          />
          <nav
            className={`fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden shadow-lg transition-[transform] duration-[450ms] ease-out ${
              isMenuVisible ? 'translate-y-0' : '-translate-y-[calc(100%+5rem)]'
            }`}
          >
            <div
              className={`container mx-auto px-4 py-5 transition-opacity duration-100 ease-out ${
                isMenuVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-primary/5"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
