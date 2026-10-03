import { useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Maximize2, X, Monitor, Tablet, Phone } from "lucide-react";

const categories = ["All", "Laravel", "React", "Full Stack"];

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
        <div>
          <h2 className="text-sm uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">Portfolio</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h3>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-2xl w-fit border border-black/5 dark:border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl bg-white dark:bg-slate-900/50 border border-black/5 dark:border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5"
            >
              {/* Project Image - Iframe Style Browser View */}
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-50 dark:bg-slate-950 m-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-inner group-hover:shadow-indigo-500/10 transition-all">
                {/* Browser Chrome */}
                <div className="h-8 bg-slate-100 dark:bg-slate-800 flex items-center px-4 gap-1.5 border-b border-black/5 dark:border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
                  <div className="ml-4 flex-1 h-5 bg-black/5 dark:bg-white/5 rounded-md flex items-center px-3">
                    <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{project.liveUrl.replace('https://', '')}</div>
                  </div>
                </div>
                
                <div className="relative h-full overflow-hidden bg-slate-200 dark:bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center p-12 text-slate-400 dark:text-slate-600 font-medium text-center italic">Screenshot of ${project.title}</div>`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-indigo-600 text-white rounded-full hover:scale-110 transition-transform"
                      title="Quick Preview"
                    >
                      <Maximize2 size={20} />
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="p-3 bg-white/10 text-white rounded-full hover:scale-110 transition-transform border border-white/20"
                      title="View Source"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest text-indigo-500 dark:text-indigo-400 font-bold">
                      {tech}
                      {i < project.techStack.length - 1 && <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed text-sm">{project.description}</p>
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold rounded-xl border border-black/5 dark:border-white/10 transition-all text-sm"
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-slate-950/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl h-full flex flex-col bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-900/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedProject.techStack.join(" · ")}</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Viewport Toggles */}
                  <div className="hidden sm:flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
                    <button
                      onClick={() => setViewport("desktop")}
                      className={`p-1.5 rounded-md transition-colors ${viewport === "desktop" ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                    >
                      <Monitor size={16} />
                    </button>
                    <button
                      onClick={() => setViewport("tablet")}
                      className={`p-1.5 rounded-md transition-colors ${viewport === "tablet" ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                    >
                      <Tablet size={16} />
                    </button>
                    <button
                      onClick={() => setViewport("mobile")}
                      className={`p-1.5 rounded-md transition-colors ${viewport === "mobile" ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                    >
                      <Phone size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content / Iframe */}
              <div className="flex-1 bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex justify-center">
                <div 
                  className={`h-full bg-white transition-all duration-500 shadow-2xl ${
                    viewport === "desktop" ? "w-full" : 
                    viewport === "tablet" ? "w-[768px]" : "w-[375px]"
                  }`}
                >
                  {selectedProject.embeddable ? (
                    <iframe
                      src={selectedProject.liveUrl}
                      className="w-full h-full border-none"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900">
                      <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                        <Maximize2 className="text-amber-500" size={40} />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Embedded Preview Unavailable</h4>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                        This site prevents being viewed inside an iframe for security reasons. Please visit the live site directly.
                      </p>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        Open in New Tab <ExternalLink size={18} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
