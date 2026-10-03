import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "Laravel Expert", "Problem Solver"];

export const Hero = ({ isLoaded }: { isLoaded: boolean }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, isLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tighter mb-4 font-serif italic">
            Hi, I'm <span className="text-indigo-500 not-italic font-sans">John Mark Entrina</span>
          </h1>
          
          <div className="h-10 mb-8">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium">
              I'm a <span className="text-slate-900 dark:text-white border-r-2 border-indigo-500 animate-pulse">{displayText}</span>
            </p>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-10 leading-relaxed">
            Crafting high-performance backends and seamless user experiences with 3 years of professional experience in the Laravel ecosystem.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/20"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold rounded-xl border border-black/5 dark:border-white/10 transition-all flex items-center gap-2"
            >
              Contact Me
            </a>
            <a
              href={profile.socials.cvUrl}
              download
              className="px-8 py-4 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl border border-indigo-500/20 transition-all flex items-center gap-2 group"
            >
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 blur-2xl opacity-10 dark:opacity-20 animate-pulse"></div>
            <div className="absolute -inset-4 rounded-3xl border border-black/5 dark:border-white/10 animate-[spin_10s_linear_infinite]"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-black/5 dark:border-white/10 shadow-2xl group cursor-pointer">
              <motion.div 
                className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-8xl font-bold text-slate-200 dark:text-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                {/* Fallback initials if no image */}
                {profile.name.split(" ").map(n => n[0]).join("")}
                
                {/* Image Placeholder with transition */}
                <img 
                  src={profile.avatar}
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-xl"
            >
              <div className="text-2xl font-bold text-indigo-500">{profile.stats[0].value}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Years exp</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-6 -left-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-xl"
            >
              <div className="text-2xl font-bold text-emerald-500">{profile.stats[1].value}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
