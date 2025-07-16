
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortfolioSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern online store with advanced features including inventory management, payment processing, and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      category: "Web Development"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking application with biometric authentication and real-time transactions.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      tags: ["React Native", "TypeScript", "Firebase", "Biometrics"],
      category: "Mobile App"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Intelligent business analytics platform powered by machine learning algorithms for predictive insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["Python", "React", "TensorFlow", "D3.js"],
      category: "AI Integration"
    },
    {
      title: "Restaurant Management System",
      description: "Complete restaurant management solution including POS, inventory, staff scheduling, and customer management.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      tags: ["Vue.js", "Laravel", "MySQL", "PWA"],
      category: "Web Application"
    },
    {
      title: "Real Estate Platform",
      description: "Comprehensive real estate platform with property listings, virtual tours, and mortgage calculator.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      tags: ["Next.js", "GraphQL", "PostgreSQL", "Maps API"],
      category: "Web Development"
    },
    {
      title: "Fitness Tracking App",
      description: "Personal fitness companion with workout tracking, nutrition logging, and progress analytics.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["Flutter", "Firebase", "HealthKit", "Charts"],
      category: "Mobile App"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-6">
            <ExternalLink className="w-4 h-4 mr-2 text-electric-blue" />
            <span className="text-sm text-electric-blue font-medium">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore some of our recent work that showcases our expertise in creating 
            innovative digital solutions across various industries.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="bg-slate-800/50 border-electric-blue/20 overflow-hidden hover:border-electric-blue/40 transition-all duration-300 hover:transform hover:scale-105 fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="text-sm text-electric-blue font-medium mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-electric-blue/10 text-electric-blue text-xs rounded-full border border-electric-blue/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center fade-in">
          <div className="bg-gradient-to-r from-electric-blue/10 to-purple-500/10 border border-electric-blue/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Like What You See?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              These are just a few examples of what we can create. Let's discuss how we can 
              bring your unique vision to life with the same level of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-electric-blue hover:bg-electric-blue/80 text-white px-8 py-4"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/portfolio">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 w-full"
                >
                  View Full Portfolio
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
