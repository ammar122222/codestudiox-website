
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$299",
      duration: "one-time",
      description: "Perfect for small businesses and startups looking to establish their online presence.",
      features: [
        "Custom Website Design",
        "5 Pages Included",
        "Mobile Responsive",
        "Basic SEO Setup",
        "Contact Form",
        "1 Month Support",
        "Basic Analytics"
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      icon: Crown,
      price: "$899",
      duration: "one-time",
      description: "Ideal for growing businesses needing advanced functionality and features.",
      features: [
        "Everything in Starter",
        "Up to 15 Pages",
        "E-commerce Integration",
        "Advanced SEO",
        "Content Management System",
        "3 Months Support",
        "Advanced Analytics",
        "Social Media Integration",
        "Email Marketing Setup"
      ],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "$1,599+",
      duration: "custom",
      description: "Complete digital solutions for large businesses with complex requirements.",
      features: [
        "Everything in Professional",
        "Unlimited Pages",
        "Custom Web Applications",
        "AI Integration",
        "Advanced Automation",
        "6 Months Support",
        "Priority Support 24/7",
        "Custom Integrations",
        "Performance Optimization",
        "Security Audit"
      ],
      popular: false,
      color: "from-orange-500 to-red-500"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-6">
            <Crown className="w-4 h-4 mr-2 text-electric-blue" />
            <span className="text-sm text-electric-blue font-medium">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Investment</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Clear, honest pricing with no hidden fees. Every package is designed to deliver 
            maximum value for your investment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative bg-slate-800/50 border-electric-blue/20 p-8 hover:border-electric-blue/40 transition-all duration-300 hover:transform hover:scale-105 fade-in ${
                plan.popular ? 'ring-2 ring-electric-blue/50 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-electric-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} p-3 mb-6 animate-float`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-electric-blue">{plan.price}</span>
                <span className="text-gray-400 ml-2">/ {plan.duration}</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-electric-blue mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={scrollToContact}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-electric-blue hover:bg-electric-blue/80 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center fade-in">
          <div className="bg-gradient-to-r from-electric-blue/10 to-purple-500/10 border border-electric-blue/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Need Something Custom?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Every business is unique. If our standard packages don't fit your needs, 
              let's create a custom solution tailored specifically for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-electric-blue mb-2">Free</div>
                <div className="text-gray-400">Consultation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-electric-blue mb-2">Custom</div>
                <div className="text-gray-400">Solutions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-electric-blue mb-2">Flexible</div>
                <div className="text-gray-400">Payment Terms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};