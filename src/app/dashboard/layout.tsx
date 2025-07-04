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
  Home,
  Waves,
  Wind,
  Video,
  UserCircle,
  LogOut,
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
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                 <Image src="https://placehold.co/40x40.png" width={40} height={40} alt={t('app.title')} className="rounded-full" data-ai-hint="logo" />
              </Link>
              <h1 className="text-lg font-semibold truncate">{t('app.title')}</h1>
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
          <div className='p-2'>
            <SidebarMenu>
               <SidebarMenuItem>
                 <Link href="#">
                    <SidebarMenuButton tooltip={{children: t('dashboard.sidebar.account')}}>
                        <UserCircle />
                        <span>{t('dashboard.sidebar.account')}</span>
                    </SidebarMenuButton>
                 </Link>
               </SidebarMenuItem>
               <SidebarMenuItem>
                 <Link href="/">
                    <SidebarMenuButton tooltip={{children: t('dashboard.sidebar.logout')}}>
                        <LogOut />
                        <span>{t('dashboard.sidebar.logout')}</span>
                    </SidebarMenuButton>
                 </Link>
               </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </Sidebar>
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              {/* You can add a breadcrumb or page title here */}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
