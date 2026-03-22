'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductViewer } from '@/components/3d/product-viewer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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
  Infinity
} from 'lucide-react';
import { PLANS } from '@/lib/stripe';
import { PricingCard } from '@/components/pricing/pricing-card';

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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          style={{ y, opacity, scale }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-20 left-10 w-72 h-72 border border-violet-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-40 right-20 w-96 h-96 border border-fuchsia-500/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-1/4 w-48 h-48 border border-cyan-500/10 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge 
                variant="outline" 
                className="px-4 py-1.5 text-sm font-medium glass-button border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
              >
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                v2.0 Now Available - Introducing AI Features
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-violet-200">
                Next Generation
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-gradient">
                3D Visualization
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Create stunning interactive 3D experiences for your products.
              <br className="hidden md:block" />
              Perfect for e-commerce, presentations, and creative projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
              <Link href="/#demo">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl glass-button border border-white/10 flex items-center gap-2 hover:bg-white/5"
                >
                  <Play className="w-5 h-5" />
                  View Demo
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              {[
                { icon: Check, text: 'No credit card required' },
                { icon: Check, text: '14-day free trial' },
                { icon: Infinity, text: 'Unlimited projects on Pro' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-card p-2 max-w-5xl mx-auto glow-violet">
              <div className="relative rounded-xl overflow-hidden">
                <ProductViewer variant="hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full glass-card hover-lift border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                Interactive 3D Demo
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Drag, rotate, and zoom to explore our interactive 3D viewer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-card p-4 glow-cyan">
              <div className="relative rounded-xl overflow-hidden">
                <ProductViewer variant="demo" />
                <div className="absolute top-4 left-4 glass-button px-3 py-1.5 text-xs font-medium flex items-center gap-2">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard key={plan.id} plan={plan} popular={plan.id === 'pro'} />
              </motion.div>
            ))}
          </div>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                Loved by Creators
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about Nexus3D.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass-card border-violet-500/10 hover:border-violet-500/30 transition-all">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
            
            <div className="relative glass-card rounded-3xl p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
                  Ready to Get Started?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of creators using Nexus3D to showcase their 3D work.
              </p>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
