'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/#demo', label: 'Demo' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-12' : 'h-14'
        }`}>
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 glow-violet">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
              Nexus3D
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {status === 'loading' ? (
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                    <Avatar className="h-10 w-10 ring-2 ring-violet-500/50 group-hover:ring-violet-500 transition-all">
                      <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || ''} />
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card p-2 min-w-[220px]">
                  <div className="px-3 py-2">
                    <p className="font-medium text-sm">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg">
                    <Link href="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-lg">
                    <Link href="/dashboard/settings" className="w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-red-400 cursor-pointer hover:bg-red-500/10 rounded-lg"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    className="text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass hover:bg-white/10 transition-colors"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-violet-500/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 border-t border-violet-500/20 space-y-2">
                {session ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={() => signOut({ callbackUrl: '/' })} 
                      className="w-full justify-start text-red-400 hover:bg-red-500/10"
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full hover:bg-white/10">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
