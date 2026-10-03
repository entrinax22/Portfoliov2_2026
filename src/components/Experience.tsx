import { SectionWrapper } from "./SectionWrapper";
import { experience } from "../data/experience";
import { motion } from "framer-motion";
import { Calendar, Briefcase, CheckCircle2 } from "lucide-react";

export const Experience = () => {
  return (
    <SectionWrapper id="experience" className="bg-black/[0.01] dark:bg-white/[0.01]">
      <div className="text-center mb-16">
        <h2 className="text-sm uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">Journey</h2>
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Work Experience</h3>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative border-l border-black/5 dark:border-white/10 ml-4 md:ml-0 md:before:absolute md:before:left-1/2 md:before:-translate-x-1/2 md:before:h-full md:before:w-px md:before:bg-black/5 md:before:dark:bg-white/10 md:border-none">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative mb-16 md:mb-24 flex flex-col ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 top-0 w-10 h-10 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-500 flex items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                <Briefcase size={16} className="text-indigo-500" />
              </div>

              {/* Content Card */}
              <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:pr-16" : "md:pl-16"} ml-8 md:ml-0`}>
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-black/5 dark:border-white/5 hover:border-indigo-500/20 dark:hover:border-white/10 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-black/5 dark:border-white/5">
                    <Calendar size={12} /> {exp.period}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h4>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">{exp.company}</p>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">{exp.description}</p>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
