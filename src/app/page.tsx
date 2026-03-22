'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductViewer } from '@/components/3d/product-viewer';
import { 
  Zap, 
  Shield, 
  Palette, 
  Globe, 
  Layers, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { PLANS } from '@/lib/stripe';
import { PricingCard } from '@/components/pricing/pricing-card';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Lightning Fast',
    description: 'Built on Next.js 15 for optimal performance and instant loading.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and SOC 2 compliance for your peace of mind.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Beautiful Design',
    description: 'Stunning UI with shadcn/ui components and Tailwind CSS.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global CDN',
    description: 'Deploy worldwide with edge computing and global presence.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: '3D Visualization',
    description: 'Interactive 3D viewers powered by React Three Fiber.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'AI-Powered',
    description: 'Smart features powered by cutting-edge AI technology.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at DesignStudio',
    content: 'Nexus3D transformed how we present our 3D designs to clients. The interactive viewer is incredible.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer at TechCorp',
    content: 'The best 3D visualization platform I have ever used. Clean API and amazing performance.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer at CreativeLabs',
    content: 'Our clients love the 3D previews. Sales have increased 40% since we started using Nexus3D.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-fuchsia-500/5 to-transparent" />
        <div className="container px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="px-4 py-1 text-sm">
                v2.0 Now Available
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Next Generation
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  3D Visualization
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Create stunning interactive 3D experiences for your products. 
                Perfect for e-commerce, presentations, and creative projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90">
                  <Link href="/auth/register">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#demo">View Demo</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-violet-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-violet-500" />
                  14-day free trial
                </div>
              </div>
            </div>
            <div className="relative">
              <ProductViewer variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Powerful features to create, manage, and showcase your 3D content.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-none bg-background">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive 3D Demo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Drag, rotate, and zoom to explore our interactive 3D viewer.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ProductViewer variant="demo" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} popular={plan.id === 'pro'} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Creators
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              See what our customers are saying about Nexus3D.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
            Join thousands of creators using Nexus3D to showcase their 3D work.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">
              Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
