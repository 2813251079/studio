'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  Waves,
  Wind,
  Video,
  UserCircle,
  LogOut,
  Puzzle,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const logoUrl = "https://placehold.co/128x128.png";

  const menuItems = [
    {
      href: '/dashboard',
      label: t('dashboard.sidebar.home'),
      icon: <Home />,
    },
    {
      href: '/dashboard/frequencies',
      label: t('dashboard.sidebar.frequencies'),
      icon: <Waves />,
    },
    {
      href: '/dashboard/audio-enhancer',
      label: t('dashboard.sidebar.workspace_harmonizer'),
      icon: <Wind />,
    },
    {
      href: '/dashboard/video-harmonizer',
      label: t('dashboard.sidebar.video_harmonizer'),
      icon: <Video />,
    },
    {
      href: '/dashboard/inclusive-games',
      label: t('dashboard.sidebar.inclusive_games'),
      icon: <Puzzle />,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                 <Image src={logoUrl} width={40} height={40} alt={t('app.title')} className="rounded-full" data-ai-hint="logo soundwave" />
              </Link>
              <h1 className="text-lg font-semibold truncate bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('app.title')}</h1>
            </div>
          </SidebarHeader>
          <SidebarMenu className="flex-1 p-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </Sidebar>
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              {/* This empty div will push the user menu to the right */}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://placehold.co/32x32.png" alt="@user" data-ai-hint="person avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <UserCircle className="mr-2 h-4 w-4" />
                                <span>{t('dashboard.sidebar.account')}</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t('dashboard.sidebar.logout')}</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
