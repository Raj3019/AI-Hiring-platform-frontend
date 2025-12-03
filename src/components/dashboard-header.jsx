"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import ProfileDropdown from '@/components/ui/dropdown-profile';
import { useAuth } from '@/context/AuthContext';
import { Logo, LogoImage, LogoText } from '@/components/logo';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Jobs', href: '/jobs', icon: Briefcase },
  { title: 'Applications', href: '/applications', icon: FileText },
];

const DashboardHeader = ({ children }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActiveRoute = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className='flex min-h-dvh w-full flex-col'>
      <header className='bg-background sticky top-0 z-50 border-b shadow-sm'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Logo and Navigation */}
          <div className='flex items-center gap-8'>
            {/* Logo */}
            <Logo url='/' className='flex items-center gap-2'>
              <LogoImage 
                src='https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg' 
                alt='Logo'
                className='h-8 dark:invert'
              />
              <LogoText>AI Hiring</LogoText>
            </Logo>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <Icon className='size-4' />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className='flex items-center gap-2'>
            {/* Notifications */}
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='size-5' />
              <Badge 
                variant='destructive' 
                className='absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-xs'
              >
                3
              </Badge>
            </Button>

            {/* Profile Dropdown */}
            <ProfileDropdown
              user={user}
              trigger={
                <Button variant='ghost' className='flex items-center gap-2 px-2'>
                  <Avatar className='size-8'>
                    <AvatarImage src={user?.profilePicture || ''} />
                    <AvatarFallback className='text-xs'>
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className='hidden sm:block text-sm font-medium max-w-[120px] truncate'>
                    {user?.fullName || 'User'}
                  </span>
                </Button>
              } 
            />

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[280px] sm:w-[320px]'>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-2 mt-6'>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
                          ${isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                      >
                        <Icon className='size-5' />
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>
        <div className='container mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardHeader
