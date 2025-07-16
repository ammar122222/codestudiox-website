import SiteHeader from '@/components/layout/SiteHeader';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TeamSection } from '@/components/TeamSection';
import { PricingSection } from '@/components/PricingSection';
import { PortfolioSection } from '@/components/PortfolisSection';
import { ContactSection } from '@/components/ContactSection';
import { Navigation } from '@/components/Navigation';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    <Helmet>
  <title>CodeStudioX – Professional Web & App Development</title>
  <meta name="description" content="We build custom websites, apps, and smart digital solutions." />
  <meta name="keywords" content="CodeStudioX, Web Developer Pakistan, Amar CodeStudioX, Apps, UI UX, Firebase" />
  <meta name="author" content="Amar from CodeStudioX" />
  <meta name="robots" content="index, follow" />
  <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />

  {/* Social sharing (OG) */}
  <meta property="og:title" content="CodeStudioX – Build Smarter" />
  <meta property="og:description" content="Transform your brand with powerful digital tools." />
  <meta property="og:image" content="https://codestudiox-website.vercel.app/logo.png" />
  <meta property="og:url" content="https://codestudiox-website.vercel.app/" />
  <meta property="og:type" content="website" />

  {/* Twitter Cards */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CodeStudioX – Professional Web & App Development" />
  <meta name="twitter:description" content="Smart websites and apps built by Amar in Pakistan." />
  <meta name="twitter:image" content="https://codestudiox-website.vercel.app/logo.png" />
</Helmet>

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-dark-slate text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <PricingSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
};

export default Index;