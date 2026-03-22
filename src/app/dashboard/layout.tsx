'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  FolderOpen, 
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen,
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  
  const user = session?.user;

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col glass-effect fixed inset-y-4 left-4 rounded-2xl border border-white/10">
        <div className="flex h-16 items-center border-b border-white/5 px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Nexus3D
            </span>
          </Link>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="px-4 space-y-2">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  <motion.div
                    className={cn(
                      'relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    )}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebar"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className={cn(
                      'relative z-10 flex items-center justify-center',
                      isActive ? 'text-violet-400' : ''
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="relative z-10">{item.title}</span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 ml-auto"
                      >
                        <ChevronRight className="h-4 w-4 text-violet-400" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t border-white/5 p-4">
          <motion.div 
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signOut()}
          >
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-violet-500/20">
                <AvatarImage src={user?.image || undefined} alt={user?.name || ''} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col md:pl-72">
        <header className="flex h-16 items-center gap-4 glass-effect border-b border-white/10 px-6 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-all hover:bg-white/10 focus:outline-none">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 glass-effect">
              <div className="flex h-16 items-center border-b border-white/5">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Nexus3D</span>
                </Link>
              </div>
              <nav className="py-4 space-y-2">
                {sidebarNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                      pathname === item.href
                        ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white border border-violet-500/20'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto rounded-full">
              <Avatar className="h-9 w-9 ring-2 ring-violet-500/20">
                <AvatarImage src={user?.image || undefined} alt={user?.name || ''} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem>
                <Link href="/dashboard/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
