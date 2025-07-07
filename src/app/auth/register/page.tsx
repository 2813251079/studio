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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { translations } from "@/lib/translations";
import { Loader2, AlertTriangle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect } from "react";

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
  const { user, loading, isFirebaseConfigured } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);


  const { isSubmitting } = form.formState;

  const onSubmit = async (values: RegisterFormValues) => {
    if (!isFirebaseConfigured) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      // Update the user's profile with their name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: values.name
        });
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente.",
      });

      const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      router.replace(redirectUrl);

    } catch (error: any) {
      console.error(error);
      let errorMessage = "Ha ocurrido un error inesperado.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está registrado.";
        form.setError("email", { type: "manual", message: errorMessage });
      } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
        errorMessage = "La clave de API de Firebase no es válida. Por favor, contacta al administrador.";
      }
      toast({
        variant: 'destructive',
        title: "Error de registro",
        description: errorMessage,
      });
    }
  };
  
  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
       <Link href="/">
        <Logo className="w-40 h-40" />
      </Link>
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('register.title')}</CardTitle>
          <CardDescription className="text-center">{t('register.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isFirebaseConfigured && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Servicio no disponible</AlertTitle>
                <AlertDescription>
                  La autenticación no está configurada. Por favor, contacta al administrador.
                </AlertDescription>
              </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">{t('register.name')}</Label>
                      <FormControl>
                        <Input id="name" placeholder="Tu Nombre" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
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
                        <Input id="email" type="email" placeholder="m@ejemplo.com" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
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
                        <Input id="password" type="password" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full" disabled={isSubmitting || !isFirebaseConfigured}>
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
