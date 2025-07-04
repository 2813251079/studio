'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { translations } from "@/lib/translations";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";

const t = (key: any) => translations.es[key as any] || key;

const loginSchema = z.object({
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  password: z.string().min(1, "La contraseña no puede estar vacía."), // Kept for UI consistency
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: LoginFormValues) => {
    // Mock login logic
    const userName = values.email.split('@')[0];
    login({
        email: values.email,
        displayName: userName,
    });
    
    toast({
      title: "¡Bienvenido de nuevo!",
      description: "Has iniciado sesión correctamente.",
    });

    const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
    sessionStorage.removeItem('redirectAfterLogin');
    router.push(redirectUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Link href="/">
        <Logo className="w-32 h-32" />
      </Link>
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('login.title')}</CardTitle>
          <CardDescription className="text-center">{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">{t('login.email')}</Label>
                      <FormControl>
                        <Input id="email" type="email" placeholder="m@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">{t('login.password')}</Label>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : t('login.button')}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t('login.no_account')}{" "}
            <Link href="/auth/register" className="underline text-primary">
              {t('login.register')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
