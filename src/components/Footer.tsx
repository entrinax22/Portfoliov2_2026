import { profile } from "../data/profile";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-black/5 dark:border-white/5 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-slate-500 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} John Mark Entrina. Built with React & Tailwind.
        </div>
        
        <div className="flex gap-8">
          <a href="#about" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-slate-400 dark:text-slate-600 font-mono text-[10px] uppercase tracking-widest">
          Laravel · PHP · MySQL · React
        </div>
      </div>
    </footer>
  );
};
