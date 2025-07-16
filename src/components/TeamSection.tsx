import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  MapPin,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';

/* ───────── 3‑D Tilt + Glow Hook ───────── */
function useTiltGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
    el.style.setProperty('--glow-x', `${x * 100 + 50}%`);
    el.style.setProperty('--glow-y', `${y * 100 + 50}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
      el.style.setProperty('--glow-x', '50%');
      el.style.setProperty('--glow-y', '50%');
    }
  };
  return { ref, handleMove, reset };
}

/* ───────── Local Team (no social props) ───────── */
const team = [
  {
    name: 'Ayesha Khan',
    role: 'UI/UX Designer',
    location: 'Rawalpindi, PK',
    image: 'https://ui-avatars.com/api/?name=Ayesha+Khan&background=0D8ABC&color=fff',
    skills: ['Figma', 'Design‑Systems', 'Research'],
    bio: 'Creates beautiful, intuitive experiences for web & mobile.',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Full‑Stack Developer',
    location: 'Rawalpindi, PK',
    image: 'https://ui-avatars.com/api/?name=Bilal+Ahmed&background=0D8ABC&color=fff',
    skills: ['Next.js', 'Node.js', 'AWS'],
    bio: 'Builds scalable SaaS and e‑commerce platforms.',
  },
  {
    name: 'Maryam Saeed',
    role: 'AI Engineer',
    location: 'Islamabad, PK',
    image: 'https://ui-avatars.com/api/?name=Maryam+Saeed&background=0D8ABC&color=fff',
    skills: ['Python', 'TensorFlow', 'CV'],
    bio: 'Turns data into intelligent user experiences.',
  },
  {
    name: 'Ahmed Ali',
    role: 'Digital Marketer',
    location: 'Rawalpindi, PK',
    image: 'https://ui-avatars.com/api/?name=Ahmed+Ali&background=0D8ABC&color=fff',
    skills: ['SEO', 'Analytics', 'Ads'],
    bio: 'Drives growth with data‑driven marketing.',
  },
];

/* ───────── Component ───────── */
export const TeamSection = () => {
  const [dark, setDark] = useState(true);
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark', !dark);
    setDark(!dark);
  };

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden bg-black text-white">
      {/* Animated blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-black/90 animate-pulse backdrop-blur-3xl" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-30 p-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition"
      >
        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-4">
            <Users className="w-4 h-4 mr-2 text-electric-blue" />
            <span className="text-sm text-electric-blue">Our Team</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            Meet the <span className="gradient-text">Local Experts</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Pakistani talent building world‑class digital products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {team.map((member) => {
            const tilt = useTiltGlow();
            return (
              <div key={member.name} className="[perspective:1200px]">
                <Card
                  ref={tilt.ref as any}
                  onMouseMove={tilt.handleMove}
                  onMouseLeave={tilt.reset}
                  className="relative bg-white/5 border border-white/10 p-6 rounded-3xl shadow-md backdrop-blur-md transition-all duration-300"
                  style={{
                    background:
                      'radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(72,100,255,0.25) 0%, rgba(0,0,0,0) 60%)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto border-2 border-electric-blue/40 mb-4"
                  />

                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-electric-blue text-sm">{member.role}</p>
                    <div className="flex items-center justify-center text-gray-400 text-xs my-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {member.location}
                    </div>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.skills.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="text-xs bg-electric-blue/10 text-electric-blue border border-electric-blue/30"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Team Excellence */}
        <div className="max-w-5xl mx-auto bg-white/5 border border-electric-blue/20 rounded-3xl backdrop-blur-lg px-8 py-12 hover:border-electric-blue/50 transition">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-4">
              <Zap className="w-4 h-4 mr-2 text-electric-blue animate-pulse" />
              <span className="text-sm text-electric-blue">Team Excellence</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Impact Metrics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-electric-blue">4</div>
              <p className="text-gray-300">Experts</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">4</div>
              <p className="text-gray-300">Cities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400">100%</div>
              <p className="text-gray-300">Remote First</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">24/7</div>
              <p className="text-gray-300">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
