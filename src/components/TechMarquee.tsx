import { motion } from "framer-motion";
import { techStack } from "../data/techStack";
import * as SiIcons from "react-icons/si";

const IconComponent = ({ iconName, className }: { iconName: string; className?: string }) => {
  // @ts-ignore
  const Icon = SiIcons[iconName];
  return Icon ? <Icon className={className} /> : null;
};

export const TechMarquee = () => {
  const doubledTech = [...techStack, ...techStack, ...techStack];

  return (
    <div className="py-12 bg-black/[0.02] dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5 relative overflow-hidden group">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20" />
      
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {doubledTech.map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 group/icon">
              <div className={`text-3xl transition-transform group-hover/icon:scale-110 ${tech.color}`}>
                <IconComponent iconName={tech.icon} />
              </div>
              <span className="text-xl font-bold tracking-tight">{tech.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex overflow-hidden mt-10">
        <motion.div
          animate={{ x: [-2000, 0] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {doubledTech.reverse().map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 group/icon">
              <div className={`text-3xl transition-transform group-hover/icon:scale-110 ${tech.color}`}>
                <IconComponent iconName={tech.icon} />
              </div>
              <span className="text-xl font-bold tracking-tight">{tech.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
