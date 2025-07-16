import SiteHeader from '@/components/layout/SiteHeader';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { getAllProjects, Project } from "@/lib/firestoreProjects";
import { Search, Filter, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Fetch projects once                                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      const data = await getAllProjects();
      // newest first
      setProjects(data.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
    })();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Filters                                                           */
  /* ------------------------------------------------------------------ */
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const term = search.toLowerCase();
    const text = (p.title + p.description + p.tags.join(" ")).toLowerCase();
    const matchesSearch = text.includes(term);
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  /* ------------------------------------------------------------------ */
  /*  Page                                                               */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-dark-slate text-white">
      {/* top nav */}
      <Navigation />

      {/* hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-dark-slate via-slate-800 to-dark-slate text-center px-4">
        <Link to="/" className="inline-flex items-center text-electric-blue hover:text-electric-blue/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Our Complete <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our full collection of innovative digital solutions across various industries.
          Each project showcases our commitment to excellence and cutting‑edge technology.
        </p>
      </section>

      {/* filters */}
      <section className="py-8 bg-slate-800/30 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* category buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={category === c ? "default" : "outline"}
                className={
                  category === c
                    ? "bg-electric-blue hover:bg-electric-blue/80"
                    : "border-electric-blue/40 text-electric-blue hover:bg-electric-blue/10"
                }
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* projects grid */}
      <section className="py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filtered.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl"
            >
              <a
                href={p.link || p.live || p.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none"
              >
                <Card className="group bg-slate-800/60 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-electric-blue/40 transition-all duration-300 border border-slate-700 transform-gpu [perspective:1000px] hover:[transform:perspective(1000px)_rotateX(10deg)_rotateY(3deg)_scale(1.05)]">
                  {/* image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[2deg]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* content */}
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">{p.title}</h2>
                      <span className="text-xs bg-electric-blue/20 text-electric-blue px-3 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-4">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t, i) => (
                        <span key={i} className="text-xs bg-slate-700 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* optional link */}
                    {p.link && (
                      <div className="mt-2">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-electric-blue hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Site
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <h3 className="text-2xl font-bold mb-4">No projects found</h3>
            <p className="mb-6">Try adjusting your search or filter criteria.</p>
            <Button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="bg-electric-blue hover:bg-electric-blue/80"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
