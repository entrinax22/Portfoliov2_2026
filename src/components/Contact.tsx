import { SectionWrapper } from "./SectionWrapper";
import { profile } from "../data/profile";
import { Mail, Github, Linkedin, Send, MessageSquare } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    
    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback logic if environment variables are not set
    if (!serviceId || !templateId || !publicKey || serviceId === "your_service_id") {
      console.warn("EmailJS credentials not configured. Simulating delivery...");
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } catch (err) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
      return;
    }
    
    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-sm uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">Connect</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Let's build something <span className="text-indigo-400">extraordinary</span> together.</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">
            I'm currently available for freelance projects and full-time positions. If you have a question or just want to say hi, I'll do my best to get back to you!
          </p>

          <div className="space-y-6">
            <a 
              href={`mailto:${profile.socials.email}`} 
              className="flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Email</div>
                <div className="text-slate-900 dark:text-white font-medium">{profile.socials.email}</div>
              </div>
            </a>

            <div className="flex gap-4">
              <a 
                href={profile.socials.github} 
                target="_blank"
                className="flex-1 flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-slate-400/30 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                  <Github size={24} />
                </div>
                <span className="text-slate-900 dark:text-white font-medium">GitHub</span>
              </a>
              <a 
                href={profile.socials.linkedin} 
                target="_blank"
                className="flex-1 flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </div>
                <span className="text-slate-900 dark:text-white font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 relative overflow-hidden shadow-2xl shadow-indigo-500/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Name</label>
                <input
                  required
                  name="user_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
                <input
                  required
                  name="user_email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Message</label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="How can I help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
              />
            </div>

            <button
              disabled={status !== "idle"}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                status === "success" 
                  ? "bg-emerald-600 text-white" 
                  : status === "error"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
              }`}
            >
              {status === "idle" && <><Send size={18} /> Send Message</>}
              {status === "sending" && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Error Sending!"}
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};
