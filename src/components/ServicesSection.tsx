
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Bot, 
  Palette, 
  Search,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAdvancedAnimations } from '@/hooks/useAdvancedAnimations';

export const ServicesSection = () => {
  const { observeElements } = useAdvancedAnimations();

  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Next.js, and TypeScript.",
      features: ["Responsive Design", "Performance Optimized", "SEO Ready", "Modern Stack"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Ready"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description: "Complete online stores with payment integration, inventory management, and analytics.",
      features: ["Shopify/WooCommerce", "Payment Gateway", "Inventory System", "Analytics"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Bot,
      title: "AI Integration",
      description: "Intelligent features powered by AI including chatbots, automation, and data analysis.",
      features: ["Custom AI Models", "Automation", "Data Analysis", "API Integration"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that engage users and drive conversions.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Search,
      title: "SEO & Digital Marketing",
      description: "Comprehensive digital marketing strategies to increase your online visibility and reach.",
      features: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics"],
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-full mb-8 hover-3d backdrop-blur-sm">
            <Zap className="w-5 h-5 mr-3 text-electric-blue animate-pulse" />
            <span className="text-sm text-electric-blue font-medium tracking-wider">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 fade-in-stagger-1">
            What We <span className="gradient-text-animated">Create</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto fade-in-stagger-2 leading-relaxed">
            From concept to launch, we provide end-to-end digital solutions that transform 
            your ideas into powerful, scalable applications.
          </p>
        </div>

        {/* Services Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="bg-slate-800/30 backdrop-blur-sm border-electric-blue/20 p-8 hover:border-electric-blue/50 transition-all duration-500 hover-3d mouse-glow group fade-in overflow-hidden relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} p-4 mb-6 animate-float group-hover:scale-110 transition-transform duration-400 relative z-10`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-electric-blue transition-colors duration-300 relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed relative z-10">{service.description}</p>
              
              <div className="space-y-3 relative z-10">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm group/feature">
                    <div className="w-2 h-2 bg-electric-blue rounded-full mr-3 group-hover/feature:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center fade-in">
          <div className="bg-gradient-to-r from-electric-blue/10 via-purple-500/10 to-electric-blue/10 border border-electric-blue/30 rounded-3xl p-10 max-w-4xl mx-auto backdrop-blur-sm relative overflow-hidden hover-3d">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/5 to-transparent animate-pulse"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white relative z-10">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-gray-300 mb-8 relative z-10 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with our expertise and innovation.
            </p>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-electric-blue hover:bg-electric-blue/80 text-white px-10 py-4 text-lg animate-glow hover-3d transform transition-all duration-300 relative z-10"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
