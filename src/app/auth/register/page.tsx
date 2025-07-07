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
import { Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  
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
    // Check for special email first
    if (values.email.toLowerCase() === 'eloallende.openmusicacademy@gmail.com') {
      toast({
        variant: 'destructive',
        title: "Cuenta Especial",
        description: "Esta cuenta es de propietario y no puede ser registrada. Por favor, utiliza la página de inicio de sesión.",
      });
      return;
    }

    // Check if Firebase is configured
    if (!isFirebaseConfigured || !auth) {
      toast({
        variant: 'destructive',
        title: "Servicio no disponible",
        description: "La autenticación no está configurada. Por favor, contacta al administrador.",
      });
      return;
    }
    
    // Proceed with registration
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      if (userCredential.user) {
        // This is a separate async action, but we don't need to block redirection on it.
        // We'll update the profile in the background. The auth listener will handle the UI update.
        updateProfile(userCredential.user, {
            displayName: values.name
        }).catch(err => {
            // Log if profile update fails, but don't block the user.
            console.error("Failed to update profile:", err);
        });
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente. Redirigiendo...",
      });

      const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      router.replace(redirectUrl);

    } catch (error: any) {
      console.error("Registration Error:", error);
      
      let title = "Error de registro";
      let errorMessage = "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.";

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está registrado. Por favor, intenta iniciar sesión.";
        form.setError("email", { type: "manual", message: "Este correo ya está en uso." });
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El formato del correo electrónico no es válido.";
        form.setError("email", { type: "manual", message: "Correo inválido." });
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
        form.setError("password", { type: "manual", message: "Contraseña débil." });
      } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
        errorMessage = "La clave de API de Firebase no es válida. Por favor, contacta al administrador.";
      }

      toast({
        variant: 'destructive',
        title: title,
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
                      <div className="relative">
                        <FormControl>
                           <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                            disabled={isSubmitting || !isFirebaseConfigured} 
                            className="pr-10"
                          />
                        </FormControl>
                         <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
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
