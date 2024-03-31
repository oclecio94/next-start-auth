"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const form = useForm();
  const router = useRouter();

  const handleSubmit = form.handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast({ title: "Login realizado", description: "Bem vindo de volta" });
        router.push("/app");
      } else {
        toast({
          title: "Login não realizado",
          description: "Email ou senha inválido",
        });
      }
    } catch (e) {
      toast({
        title: "Erro",
        description: "Não foi possível realizar o login",
      });
    }
  });
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-10 lg:py-14">
        <div className="container px-4 flex flex-col items-center space-y-2">
          <div />
          <h1 className="text-3xl font-bold">Sistema SAAS</h1>
        </div>
      </header>
      <main className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="container px-4 flex flex-col items-center space-y-6"
        >
          <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Entre com seu email e senha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  {...form.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  {...form.register("password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
      <footer className="py-6">
        <div className="container px-4 flex items-center justify-center space-x-4">
          <Link className="text-sm underline" href="#">
            Termos
          </Link>
          <Link className="text-sm underline" href="#">
            Privacidade
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default page;
