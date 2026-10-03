import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "Clean code. Fast delivery. Scalable solutions.";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, current));
      current++;
      if (current > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
    >
      <div className="relative overflow-hidden">
        <motion.h1 
          className="text-2xl md:text-4xl font-bold text-white tracking-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 h-8 md:h-10 bg-indigo-500 ml-1 align-middle"
          />
        </motion.h1>
      </div>
    </motion.div>
  );
};
