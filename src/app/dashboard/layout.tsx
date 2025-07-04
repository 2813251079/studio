'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, LogOut } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const t = (key: any) => translations.es[key as any] || key;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = "https://placehold.co/120x120.png";
  const smallLogoUrl = "https://placehold.co/48x48.png";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="">
          <SidebarContent className="p-0 flex flex-col items-center">
             <Link href="/dashboard" className="flex items-center justify-center p-2 h-20 group-data-[collapsible=icon]:h-16">
                <Image src={logoUrl} width={120} height={120} alt={t('app.title')} className="rounded-full flex-shrink-0 bg-slate-200 p-1 group-data-[collapsible=icon]:hidden" data-ai-hint="logo guitar wave" />
                <Image src={smallLogoUrl} width={48} height={48} alt={t('app.title')} className="rounded-full hidden flex-shrink-0 bg-slate-200 p-1 group-data-[collapsible=icon]:block" data-ai-hint="logo guitar wave" />
             </Link>
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
