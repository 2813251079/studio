
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, LogOut, Home, BookOpen, Waves, Wind, Video, Puzzle, SlidersHorizontal, Star, ChevronDown, Music } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const t = (key: any) => translations.es[key as any] || key;

const features = [
    {
      href: '/dashboard/frequencies',
      title: t('dashboard.sidebar.frequencies'),
      icon: <Waves />,
    },
    {
      href: '/dashboard/audio-enhancer',
      title: t('dashboard.sidebar.workspace_harmonizer'),
      icon: <Wind />,
    },
    {
      href: '/dashboard/video-harmonizer',
      title: t('dashboard.sidebar.video_harmonizer'),
      icon: <Video />,
    },
    {
      href: '/dashboard/inclusive-games',
      title: t('dashboard.sidebar.inclusive_games'),
      icon: <Puzzle />,
    },
    {
      href: '/dashboard/production',
      title: t('dashboard.sidebar.music_production'),
      icon: <SlidersHorizontal />,
    },
    {
      href: '/pricing',
      title: t('dashboard.sidebar.coming_soon'),
      icon: <Star />,
    },
  ];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = "https://placehold.co/120x120.png";
  const smallLogoUrl = "https://placehold.co/48x48.png";
  const pathname = usePathname();
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="">
          <SidebarContent className="p-0 flex flex-col">
             <Link href="/dashboard" className="flex items-center justify-center p-2 h-20 group-data-[collapsible=icon]:h-16">
                <Image src={logoUrl} width={120} height={120} alt={t('app.title')} className="rounded-full flex-shrink-0 bg-slate-200 p-1 group-data-[collapsible=icon]:hidden" data-ai-hint="logo guitar wave" />
                <Image src={smallLogoUrl} width={48} height={48} alt={t('app.title')} className="rounded-full hidden flex-shrink-0 bg-slate-200 p-1 group-data-[collapsible=icon]:block" data-ai-hint="logo guitar wave" />
             </Link>
             <SidebarMenu className="w-full flex-1 overflow-y-auto">
                <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between" variant="ghost">
                          <div className="flex items-center gap-2">
                            <Music />
                            <span>Open Music</span>
                          </div>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent asChild>
                    <SidebarMenuSub>
                        <SidebarMenuItem>
                            <Link href="/dashboard">
                                <SidebarMenuSubButton isActive={pathname === '/dashboard'}>
                                   <Home /> <span>{t('dashboard.sidebar.home')}</span>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/education">
                                <SidebarMenuSubButton isActive={pathname === '/education'}>
                                    <BookOpen /> <span>{t('dashboard.sidebar.education')}</span>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>

                {features.map((feature) => (
                    <SidebarMenuItem key={feature.href}>
                        <SidebarMenuButton asChild isActive={pathname === feature.href} tooltip={{children: feature.title, side: "right"}}>
                            <Link href={feature.href}>
                                {feature.icon}
                                <span>{feature.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
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
