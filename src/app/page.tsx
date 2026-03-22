'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductViewer } from '@/components/3d/product-viewer';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  Palette, 
  Globe, 
  Layers, 
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  Star,
  Play,
  Infinity,
  MousePointer2,
  Move
} from 'lucide-react';
import { PLANS } from '@/lib/stripe';
import { PricingCard } from '@/components/pricing/pricing-card';

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `linear-gradient(135deg, ${
              particle.id % 3 === 0 
                ? 'rgba(139, 92, 246, 0.6)' 
                : particle.id % 3 === 1 
                  ? 'rgba(217, 70, 239, 0.6)' 
                  : 'rgba(34, 211, 238, 0.6)'
            })`,
            boxShadow: `0 0 ${particle.size * 2}px ${
              particle.id % 3 === 0 
                ? 'rgba(139, 92, 246, 0.3)' 
                : particle.id % 3 === 1 
                  ? 'rgba(217, 70, 239, 0.3)' 
                  : 'rgba(34, 211, 238, 0.3)'
            }`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function GradientOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const orb1X = useSpring(mouseX, springConfig);
  const orb1Y = useSpring(mouseY, springConfig);
  const orb2X = useSpring(mouseX, { ...springConfig, stiffness: 100 });
  const orb2Y = useSpring(mouseY, { ...springConfig, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          x: orb1X,
          y: orb1Y,
          left: '30%',
          top: '20%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 70%)',
          x: orb2X,
          y: orb2Y,
          right: '20%',
          bottom: '20%',
          translateX: '50%',
          translateY: '50%',
        }}
      />
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 -left-20 w-40 h-40 border border-violet-500/20 rounded-full hidden lg:block"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-10 w-60 h-60 border border-fuchsia-500/10 rounded-full hidden lg:block"
        animate={{
          y: [0, 40, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-32 h-32 border border-cyan-500/10 hidden md:block"
        animate={{
          y: [0, -20, 0],
          rotate: [45, 90, 45],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-lg blur-xl hidden md:block"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-lg hidden md:block"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
    </div>
  );
}

const features = [
  {
    icon: <Zap className="h-7 w-7" />,
    title: 'Lightning Fast',
    description: 'Built on Next.js 16 with Turbopack for instant loading and optimal performance.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SOC 2 compliance, and advanced access controls.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Palette className="h-7 w-7" />,
    title: 'Beautiful Design',
    description: 'Stunning UI with glassmorphism, neon accents, and premium interactions.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: <Globe className="h-7 w-7" />,
    title: 'Global CDN',
    description: 'Deploy worldwide with edge computing and 99.9% uptime guarantee.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Layers className="h-7 w-7" />,
    title: '3D Visualization',
    description: 'Interactive 3D viewers powered by React Three Fiber with WebGL.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'AI-Powered',
    description: 'Smart features powered by cutting-edge AI for automation.',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at DesignStudio',
    content: 'Nexus3D transformed how we present our 3D designs to clients. The interactive viewer is incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer at TechCorp',
    content: 'The best 3D visualization platform I have ever used. Clean API and amazing performance.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer at CreativeLabs',
    content: 'Our clients love the 3D previews. Sales have increased 40% since we started using Nexus3D.',
    rating: 5,
  },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '1M+', label: '3D Models' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'User Rating' },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const heroTitleX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const heroTitleY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 20);
        mouseY.set(y * 20);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative">
      <GradientOrbs />
      <ParticleField />
      <FloatingShapes />

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          style={{ y, opacity, scale }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 border border-violet-500/20 rounded-full"
            style={{ x: useTransform(mouseX, [-50, 50], [-30, 30]) }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 border border-fuchsia-500/10 rounded-full"
            style={{ x: useTransform(mouseX, [-50, 50], [20, -20]) }}
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-40 right-1/4 w-48 h-48 border border-cyan-500/10 rounded-full"
            style={{ y: useTransform(mouseY, [-50, 50], [-20, 20]) }}
          />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', damping: 20 }}
              className="mb-8"
            >
              <Badge 
                variant="outline" 
                className="px-5 py-2 text-sm font-medium glass-effect border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                v2.0 Now Available - Introducing AI Features
              </Badge>
            </motion.div>

            <motion.div
              style={{ x: heroTitleX, y: heroTitleY }}
              className="relative"
            >
              <motion.h1
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2, type: 'spring', damping: 20 }}
                className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter mb-8"
                style={{ perspective: '1000px' }}
              >
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-violet-200"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Next Generation
                </motion.span>
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-gradient mt-2"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  3D Visualization
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="perspective-1000"
            >
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
                style={{ 
                  textShadow: '0 0 40px rgba(255,255,255,0.1)'
                }}
              >
                Create stunning interactive 3D experiences for your products.
                <br className="hidden md:block" />
                Perfect for e-commerce, presentations, and creative projects.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 60px rgba(139, 92, 246, 0.6), 0 0 120px rgba(217, 70, 239, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="group relative px-10 py-5 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] text-white overflow-hidden shadow-2xl shadow-violet-500/30"
                  style={{ backgroundPosition: isHovering ? '100% 0' : '0% 0' }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500"
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovering ? '0%' : '-100%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started Free
                    <motion.div
                      animate={{ x: isHovering ? 5 : 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
              <Link href="/#demo">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 text-lg font-semibold rounded-2xl glass-effect border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  View Demo
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              {[
                { icon: Check, text: 'No credit card required' },
                { icon: Check, text: '14-day free trial' },
                { icon: Infinity, text: 'Unlimited projects on Pro' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2, type: 'spring', damping: 20 }}
            className="mt-24 relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            />
            <motion.div
              className="glass-card p-3 max-w-5xl mx-auto glow-violet relative overflow-hidden"
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 80px rgba(139, 92, 246, 0.4), 0 0 160px rgba(217, 70, 239, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
              <div className="relative rounded-xl overflow-hidden">
                <ProductViewer variant="hero" />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2, type: 'spring', damping: 20 }}
            className="mt-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
            <motion.div
              className="glass-card p-3 max-w-5xl mx-auto glow-violet relative overflow-hidden"
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 80px rgba(139, 92, 246, 0.4), 0 0 160px rgba(217, 70, 239, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
              <div className="relative rounded-xl overflow-hidden">
                <ProductViewer variant="hero" />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col items-center mt-12"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <span className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Scroll to explore</span>
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Industry Leaders</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of companies revolutionizing their 3D visualization
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl glass-effect"
              >
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to create, manage, and showcase your 3D content.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full glass-effect rounded-2xl border-white/5 hover:border-violet-500/30 transition-all duration-300 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardContent className="p-6 md:p-8 relative">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                Interactive 3D Demo
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Drag, rotate, and zoom to explore our interactive 3D viewer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-card p-2 md:p-4 glow-cyan">
              <div className="relative rounded-xl overflow-hidden">
                <ProductViewer variant="demo" />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 glass-effect px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium flex items-center gap-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Interactive Demo
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard key={plan.id} plan={plan} popular={plan.id === 'pro'} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                Loved by Creators
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about Nexus3D.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full glass-effect rounded-2xl border-white/5 hover:border-amber-500/20 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 md:p-8 relative">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-base md:text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(217,70,239,0.2),transparent_50%)]" />
            
            <div className="relative glass-effect rounded-3xl p-8 md:p-12 lg:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
                  Ready to Get Started?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10">
                Join thousands of creators using Nexus3D to showcase their 3D work.
              </p>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(139, 92, 246, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white overflow-hidden shadow-2xl shadow-violet-500/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Today
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
