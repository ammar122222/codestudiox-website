import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  MessageSquare,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendSubmission } from '@/lib/firestoreSubmissions';   // ✅ NEW

export const ContactSection = () => {
  /* ------------------- form state ------------------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  /* ---------------- handlers ---------------- */
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendSubmission({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        company: formData.company,
        project: formData.project,
        budget: formData.budget,
      });

      toast({
        title: 'Message Sent Successfully!',
        description:
          "Thank you for your interest. We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      toast({
        title: 'Error sending message',
        description: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = () => {
    window.open('/abdullah.pdf', '_blank');
  };

  /* ------------------- JSX ------------------- */
  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 mr-2 text-electric-blue" />
            <span className="text-sm text-electric-blue font-medium">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Create Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with us
            today and let&apos;s discuss how we can help bring your vision to
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8 fade-in">
            <Card className="bg-slate-800/50 border-electric-blue/20 p-6">
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Us</h4>
                    <p className="text-gray-400">codestudioxbyblack@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us</h4>
                    <p className="text-gray-400">+92 331 572 1177 (Mobile)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Visit Us</h4>
                    <p className="text-gray-400">
                      Remote First Studio
                      <br />
                      Available Worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Response Time</h4>
                    <p className="text-gray-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* CV Download */}
            <Card className="bg-gradient-to-r from-electric-blue/10 to-purple-500/10 border border-electric-blue/20 p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Download Our CV</h3>
              <p className="text-gray-300 mb-4">
                Get detailed information about our experience, skills, and past
                projects.
              </p>
              <Button
                onClick={handleDownloadCV}
                className="w-full bg-electric-blue hover:bg-electric-blue/80"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 fade-in">
            <Card className="bg-slate-800/50 border-electric-blue/20 p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Start Your Project
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700/50 border-electric-blue/20 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700/50 border-electric-blue/20 text-white"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-electric-blue/20 text-white"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-electric-blue/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Select project type</option>
                      <option value="website">Website Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="ecommerce">E‑commerce</option>
                      <option value="ai">AI Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-electric-blue/20 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5 000</option>
                    <option value="5k-10k">$5 000 – $10 000</option>
                    <option value="10k-25k">$10 000 – $25 000</option>
                    <option value="25k-plus">$25 000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-slate-700/50 border-electric-blue/20 text-white"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-electric-blue hover:bg-electric-blue/80 text-white py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending Message…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-electric-blue/20 fade-in">
          <p className="text-gray-400 mb-4">
            © 2024 CodeStudioX. Crafted with passion by Amar & Abdullah Qureshi.
          </p>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-electric-blue" />
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
