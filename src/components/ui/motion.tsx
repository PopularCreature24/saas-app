'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function StaggerContainer({ 
  children, 
  className = '',
  delay = 0.1,
  staggerClassName = ''
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  staggerClassName?: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div
              key={index}
              className={staggerClassName}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

export function HoverLift({ 
  children, 
  className = '',
  lift = -8,
  scale = 1.02
}: { 
  children: React.ReactNode; 
  className?: string;
  lift?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: lift, scale: scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function GlowButton({ 
  children, 
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.5)',
  glowSize = 50
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
  glowSize?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 ${glowSize}px ${glowColor}`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticEffect({ 
  children,
  strength = 0.3
}: { 
  children: React.ReactNode;
  strength?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
