'use client';

import Link from 'next/link';
import Image from 'next/image';
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
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, LogOut, Home, GraduationCap, ChevronRight } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = "/logo.png";
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="">
          <SidebarContent className="p-0">
            <Collapsible open={isNavOpen} onOpenChange={setIsNavOpen} className="w-full">
              <CollapsibleTrigger asChild>
                <button className="flex items-center justify-between w-full p-2 text-left hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:h-16">
                    <div className="flex items-center gap-3">
                        <Image src={logoUrl} width={48} height={48} alt={t('app.title')} className="rounded-full flex-shrink-0 bg-slate-200 p-1" data-ai-hint="logo guitar wave" />
                        <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('app.title')}</h1>
                        </div>
                    </div>
                    <ChevronRight className={cn("h-5 w-5 transition-transform duration-200 group-data-[collapsible=icon]:hidden", isNavOpen && "rotate-90")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="group-data-[collapsible=icon]:hidden">
                  <SidebarMenu className="px-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard">
                          <Home />
                          <span>{t('dashboard.sidebar.home')}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/education">
                          <GraduationCap />
                          <span>{t('landing.header.education')}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </div>
              </CollapsibleContent>
            </Collapsible>
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
