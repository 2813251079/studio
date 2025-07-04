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

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: RegisterFormValues) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock register logic
    login({
        email: values.email,
        displayName: values.name,
    });
    
    toast({
      title: "¡Cuenta creada!",
      description: "Tu cuenta ha sido creada exitosamente.",
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
       <Link href="/">
        <Logo className="w-32 h-32" />
      </Link>
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('register.title')}</CardTitle>
          <CardDescription className="text-center">{t('register.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">{t('register.name')}</Label>
                      <FormControl>
                        <Input id="name" placeholder="Tu Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">{t('register.email')}</Label>
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
                      <Label htmlFor="password">{t('register.password')}</Label>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : t('register.button')}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t('register.has_account')}{" "}
            <Link href="/auth/login" className="underline text-primary">
              {t('register.login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
