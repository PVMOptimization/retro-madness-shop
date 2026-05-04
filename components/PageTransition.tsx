"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0.4 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
