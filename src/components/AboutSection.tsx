"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useInView,
} from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

/* ------------------ Tilt + Glow Helper ------------------ */
const useInteractiveTilt = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const handle = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left - r.width / 2) / r.width) * 8);
    rotateX.set(-((e.clientY - r.top - r.height / 2) / r.height) * 8);
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    mx.set(50);
    my.set(50);
  };
  return { ref, rotateX, rotateY, mx, my, handle, reset };
};

/* ------------------ Animated Letters ------------------ */
const AnimatedText = ({ text, start }: { text: string; start: boolean }) => (
  <motion.div className="inline-flex flex-wrap whitespace-pre">
    {text.split("").map((char, i) => {
      const displayChar = char === " " ? "\u00A0" : char; // non‑breaking space
      return (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{
            delay: start ? 0.15 + i * 0.045 : 0,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {displayChar}
        </motion.span>
      );
    })}
  </motion.div>
);

/* ------------------ Types ------------------ */
interface FounderProps {
  name: string;
  role: string;
  img: string;
  desc: string;
}

/* ------------------ Founder Card ------------------ */
const FounderCard = ({ name, role, img, desc }: FounderProps) => {
  const [open, setOpen] = useState(false);
  const { ref, rotateX, rotateY, mx, my, handle, reset } = useInteractiveTilt();
  const viewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(viewRef, { once: true, margin: "-60px" });

  return (
    <>
      <motion.div
        ref={(node) => {
          ref.current = node;
          viewRef.current = node;
        }}
        style={{ rotateX, rotateY, perspective: 1000 }}
        onMouseMove={handle}
        onMouseLeave={reset}
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05, y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full max-w-[620px] flex justify-start cursor-pointer select-none"
      >
        {/* Mouse‑follow glow with breathing effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(34,211,238,0.45), transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Neon Frame */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(120deg, rgba(34,211,238,0.4) 0%, rgba(139,92,246,0.35) 50%, rgba(253,186,116,0.35) 100%)",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "3px",
            borderRadius: "1rem",
          }}
        />

        {/* Glass Panel */}
        <div className="relative w-full md:w-[620px] h-[260px] bg-slate-800/40 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_0_40px_6px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_70px_18px_rgba(34,211,238,0.55)] transition-shadow duration-700" />

        {/* Content Row */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 px-10 py-8 z-10">
          {/* Portrait */}
          <motion.img
            src={img}
            alt={name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover object-top shadow-xl"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          />

          {/* Text Block */}
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-1 tracking-tight">
              <AnimatedText text={name} start={inView} />
            </h4>
            <p className="text-cyan-300 text-sm uppercase tracking-wider mb-3">{role}</p>
            <p className="text-gray-200 text-sm leading-relaxed line-clamp-4 max-w-md mx-auto md:mx-0">
              {desc}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-xl p-0 bg-transparent border-none shadow-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative bg-slate-900/90 backdrop-blur-lg p-10 rounded-2xl ring-1 ring-white/10 shadow-2xl"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-400 to-purple-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img
                    src={img}
                    alt={name}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover object-top shadow-xl"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="text-center md:text-left max-w-sm">
                    <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {name}
                    </h3>
                    <p className="text-cyan-300 text-sm uppercase tracking-widest mb-4">{role}</p>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

/* -------------------- Section Wrapper -------------------- */
export const AboutSection = () => (
  <section id="about" className="py-24 bg-slate-950/70">
    <div className="container mx-auto px-4">
      <h3 className="text-4xl font-bold text-center text-cyan-300 mb-20 tracking-tight">
        Meet the Founders
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-30 max-w-10xl mx-auto items-start">
        <FounderCard
          name="Abdullah Qureshi"
          role="Head of Sales & Client Success"
          img="/founders/abdullah.png"
          desc="A people‑first strategist with a passion for helping businesses grow through tailored solutions and exceptional communication."
        />
        <FounderCard
          name="Ammar Qureshi"
          role="Operations & Engineering"
          img="/founders/ammar.png"
          desc="Focused on innovation, efficiency, and building scalable solutions with clean, modern code."
        />
      </div>
    </div>
  </section>
);

export default AboutSection;
