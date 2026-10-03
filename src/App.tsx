import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TechMarquee } from "./components/TechMarquee";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Background } from "./components/Background";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { Preloader } from "./components/Preloader";
import { ThemeProvider } from "./context/ThemeContext";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="relative selection:bg-indigo-500/30 selection:text-white">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
        
        <Background />
        <ParticlesBackground />
        <Navbar />
        
        <main>
          <Hero isLoaded={!isLoading} />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
