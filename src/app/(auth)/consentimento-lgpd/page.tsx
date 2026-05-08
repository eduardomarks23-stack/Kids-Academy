'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

/**
 * Versão do termo de consentimento — incrementar a cada mudança
 * para manter trilha auditável.
 */
const TERMO_VERSAO = 'lgpd-consentimento-v1-2026-05-08';

const consentimentoSchema = z.object({
  aceiteTratamentoDados: z.literal(true, {
    message: 'Necessário aceitar para criar perfil da criança',
  }),
  aceiteAnaliseComportamental: z.boolean(),
  aceiteComunicacaoEmail: z.boolean(),
});

type ConsentimentoInput = z.infer<typeof consentimentoSchema>;

export default function ConsentimentoLgpdPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ConsentimentoInput>({
    resolver: zodResolver(consentimentoSchema),
    defaultValues: {
      aceiteTratamentoDados: false as unknown as true,
      aceiteAnaliseComportamental: false,
      aceiteComunicacaoEmail: false,
    },
  });

  async function onSubmit(values: ConsentimentoInput) {
    if (!user) {
      router.push('/login');
      return;
    }

    setSubmitting(true);
    setServerError(null);
    const supabase = createClient();

    type Consentimento = {
      responsavel_id: string;
      tipo: 'tratamento_dados' | 'analytics_comportamental' | 'comunicacao_email';
      status: 'concedido';
      texto_versao: string;
      concedido_em: string;
    };

    const agora = new Date().toISOString();
    const consentimentos: Consentimento[] = [
      {
        responsavel_id: user.id,
        tipo: 'tratamento_dados',
        status: 'concedido',
        texto_versao: TERMO_VERSAO,
        concedido_em: agora,
      },
    ];

    if (values.aceiteAnaliseComportamental) {
      consentimentos.push({
        responsavel_id: user.id,
        tipo: 'analytics_comportamental',
        status: 'concedido',
        texto_versao: TERMO_VERSAO,
        concedido_em: agora,
      });
    }

    if (values.aceiteComunicacaoEmail) {
      consentimentos.push({
        responsavel_id: user.id,
        tipo: 'comunicacao_email',
        status: 'concedido',
        texto_versao: TERMO_VERSAO,
        concedido_em: agora,
      });
    }

    const { error } = await supabase.from('consentimentos_lgpd').insert(consentimentos);

    if (error) {
      setServerError('Erro ao registrar consentimento. Tente novamente.');
      setSubmitting(false);
      return;
    }

    router.push('/pais/dashboard');
  }

  if (loading) {
    return <p className="text-center">Carregando…</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consentimento parental LGPD</CardTitle>
        <CardDescription>
          A Lei Geral de Proteção de Dados exige seu consentimento, como responsável legal,
          para tratarmos os dados da criança.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 max-h-64 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed">
          <p className="mb-2 font-semibold">Resumo dos dados coletados:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Nome da criança e série escolar (obrigatório).</li>
            <li>Progresso de aprendizagem nas atividades.</li>
            <li>
              Eventos de comportamento (tempo de resposta, hesitações) — usados para
              personalizar a experiência via MENTOR IA.
            </li>
            <li>
              Nenhum dado é compartilhado com terceiros. Você pode revogar o consentimento e
              solicitar a exclusão dos dados a qualquer momento.
            </li>
          </ul>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="aceiteTratamentoDados"
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
                    <FormLabel className="font-medium">
                      Autorizo o tratamento dos dados básicos da criança (obrigatório).
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aceiteAnaliseComportamental"
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
                      Autorizo análise comportamental para personalização pedagógica (opcional).
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aceiteComunicacaoEmail"
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
                      Aceito receber comunicação por e-mail sobre o progresso da criança
                      (opcional).
                    </FormLabel>
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
              {submitting ? 'Registrando…' : 'Registrar consentimento e continuar'}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-xs text-muted-foreground">
          Versão do termo: {TERMO_VERSAO}
        </p>
      </CardContent>
    </Card>
  );
}
