import { SectionWrapper } from "./SectionWrapper";
import { skills } from "../data/techStack";
import { motion } from "framer-motion";
import { Server, Monitor, Database, Terminal } from "lucide-react";

const getIcon = (category: string) => {
  switch (category) {
    case "Backend": return <Server className="text-indigo-500" />;
    case "Frontend": return <Monitor className="text-emerald-500" />;
    case "Database": return <Database className="text-orange-500" />;
    case "DevOps & Tools": return <Terminal className="text-purple-500" />;
    default: return <Server />;
  }
};

export const Skills = () => {
  return (
    <SectionWrapper id="skills" className="bg-black/[0.01] dark:bg-white/[0.01]">
      <div className="text-center mb-16">
        <h2 className="text-sm uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">Expertise</h2>
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">My Technical Stack</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Specialized in building scalable applications with modern technologies and industry best practices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skillGroup, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-black/5 dark:border-white/5 hover:border-indigo-500/20 dark:hover:border-white/10 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {getIcon(skillGroup.category)}
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{skillGroup.category}</h4>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, i) => (
                <span
                  key={i}
                  className="text-sm text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
