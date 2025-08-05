import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Sparkles } from 'lucide-react';
import { useAdvancedAnimations, useAnimatedCounter } from '@/hooks/useAdvancedAnimations';

export const HeroSection = () => {
  const { mousePosition, particlesRef, observeElements } = useAdvancedAnimations();
  const heroRef = useRef<HTMLDivElement>(null);

  const projectsCount = useAnimatedCounter(2);
  const satisfactionCount = useAnimatedCounter(100);

  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.setProperty('--mouse-x', `${(mousePosition.x / window.innerWidth) * 100}%`);
      heroRef.current.style.setProperty('--mouse-y', `${(mousePosition.y / window.innerHeight) * 100}%`);
    }
  }, [mousePosition]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden mouse-glow parallax-container"
    >
      {/* LOGO at top‑left */}
      <div className="absolute top-4 left-56 z-30 flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-semibold tracking-wider text-white"></span>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10"></div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-float parallax-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed parallax-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-electric-blue/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-full mb-8 fade-in hover-3d backdrop-blur-sm">
            <Sparkles className="w-5 h-5 mr-3 text-electric-blue animate-pulse-glow" />
            <span className="text-sm text-electric-blue font-medium tracking-wider">Digital Innovation Studio</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 fade-in fade-in-stagger-1">
            <span className="gradient-text-animated block mb-2">CodeStudioX</span>
            <span className="text-white block">Digital Solutions</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed fade-in fade-in-stagger-2 max-w-3xl mx-auto">
            We transform your ideas into powerful digital experiences.
            <br className="hidden md:block" />
            From web development to AI solutions, we craft technology that drives results.
          </p>

          {/* Founder Credit */}
          <p className="text-lg text-gray-400 mb-12 fade-in fade-in-stagger-3">
            Led by <span className="text-electric-blue font-semibold gradient-text">Abdullah Qureshi</span> as Head of Sales & Client Success, and engineered by
            <span className="text-electric-blue font-semibold gradient-text"> Ammar Qureshi</span> behind operations and product, CodeStudioX is where vision meets execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 fade-in fade-in-stagger-4">
            <Button
              onClick={scrollToServices}
              size="lg"
              className="bg-electric-blue hover:bg-electric-blue/80 text-white px-10 py-4 text-lg animate-glow hover-3d transform transition-all duration-300 hover:scale-105"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-10 py-4 text-lg backdrop-blur-sm bg-white/5 hover-3d transform transition-all duration-300"
            >
              <Code className="w-5 h-5 mr-2" />
              Start Your Project
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in fade-in-stagger-5">
            {/* Projects Delivered */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-electric-blue/20 hover-3d">
              <div className="text-4xl font-bold text-electric-blue mb-2 counter">
                <span ref={projectsCount.ref}>50</span>+
              </div>
              <div className="text-gray-400 font-medium">Projects Successfully Delivered</div>
            </div>

            {/* Client Satisfaction */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-electric-blue/20 hover-3d">
              <div className="text-4xl font-bold text-electric-blue mb-2 counter">
                <span ref={satisfactionCount.ref}>96</span>%
              </div>
              <div className="text-gray-400 font-medium">Client Satisfaction Rate</div>
            </div>

            {/* Support Hours */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-electric-blue/20 hover-3d">
              <div className="text-4xl font-bold text-electric-blue mb-2">12 hrs / day</div>
              <div className="text-gray-400 font-medium">Support Available (9 AM – 9 PM)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
