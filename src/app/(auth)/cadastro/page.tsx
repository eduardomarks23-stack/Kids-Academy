'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const cadastroSchema = z
  .object({
    nome: z.string().min(2, 'Informe seu nome completo'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmarSenha: z.string(),
    aceitouTermos: z.literal(true, {
      message: 'Você precisa aceitar os termos para continuar',
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não conferem',
    path: ['confirmarSenha'],
  });

type CadastroInput = z.infer<typeof cadastroSchema>;

export default function CadastroPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CadastroInput>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      aceitouTermos: false as unknown as true,
    },
  });

  async function onSubmit(values: CadastroInput) {
    setSubmitting(true);
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.senha,
      options: {
        data: { nome: values.nome },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/consentimento-lgpd`,
      },
    });
    if (error) {
      setServerError(traduzErro(error.message));
      setSubmitting(false);
      return;
    }
    setEmailEnviado(true);
    setSubmitting(false);
  }

  if (emailEnviado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verifique seu e-mail</CardTitle>
          <CardDescription>
            Enviamos um link de confirmação para o e-mail informado. Clique no link para
            ativar sua conta e seguir para o consentimento parental LGPD.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => router.push('/login')} className="w-full">
            Ir para o login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta de responsável</CardTitle>
        <CardDescription>
          Como responsável legal, você precisa cadastrar-se antes de criar o perfil da criança.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" {...field} />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormDescription>Mínimo 8 caracteres.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aceitouTermos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Li e aceito os{' '}
                      <Link href="/termos" className="text-[#6B46C1] hover:underline">
                        Termos de Uso
                      </Link>{' '}
                      e a{' '}
                      <Link href="/privacidade" className="text-[#6B46C1] hover:underline">
                        Política de Privacidade Infantil
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {serverError && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Criando conta…' : 'Criar conta'}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#6B46C1] hover:underline">
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function traduzErro(msg: string): string {
  if (msg.toLowerCase().includes('already registered')) {
    return 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.';
  }
  if (msg.toLowerCase().includes('password')) {
    return 'Senha não atende aos requisitos mínimos de segurança.';
  }
  return 'Erro ao criar conta. Tente novamente.';
}
