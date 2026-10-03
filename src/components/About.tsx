import { SectionWrapper } from "./SectionWrapper";
import { profile } from "../data/profile";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-sm uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">About Me</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            I turn complex requirements into <span className="text-indigo-400">elegant solutions</span>.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
            {profile.bio}
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            {profile.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
