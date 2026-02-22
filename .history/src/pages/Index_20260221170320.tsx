import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TLDR from '@/components/TLDR';
import Challenge from '@/components/Challenge';
import Cases from '@/components/Cases';
import HowIWork from '@/components/HowIWork';
import Scope from '@/components/Scope';
import Evolution from '@/components/Evolution';
import Request from '@/components/Request';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <TLDR />
        <Cases />
        <Challenge />
        <HowIWork />
        <Scope />
        <Evolution />
        <Request />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
