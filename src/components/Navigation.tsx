import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleDownloadCV = () => {
    window.open('/abdullah.pdf', '_blank');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-slate/95 backdrop-blur-sm border-b border-electric-blue/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text">
            CodeStudioX
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="hover:text-electric-blue transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-electric-blue transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-electric-blue transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-electric-blue transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-electric-blue transition-colors">
              Contact
            </button>
            <Button onClick={handleDownloadCV} className="bg-electric-blue hover:bg-electric-blue/80">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-dark-slate/95 backdrop-blur-sm border-b border-electric-blue/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left hover:text-electric-blue transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left hover:text-electric-blue transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left hover:text-electric-blue transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left hover:text-electric-blue transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left hover:text-electric-blue transition-colors">
                Contact
              </button>
              <Button onClick={handleDownloadCV} className="w-full bg-electric-blue hover:bg-electric-blue/80">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
