'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContaPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push('/login');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Conta</h1>

      <Card>
        <CardHeader>
          <CardTitle>Dados do responsável</CardTitle>
          <CardDescription>Informações cadastrais.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Field label="E-mail" value={user?.email ?? '—'} />
          <Field
            label="ID"
            value={user?.id ? `${user.id.slice(0, 8)}…` : '—'}
          />
          <Field
            label="MFA"
            value="Desabilitado"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacidade e LGPD</CardTitle>
          <CardDescription>Direitos garantidos pela Lei 13.709/2018.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-gray-700">
            Você pode acessar, corrigir, exportar ou excluir os dados a qualquer momento.
            Tempo máximo de resposta: 15 dias.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled>
              Exportar dados (em breve)
            </Button>
            <Button variant="outline" disabled className="text-destructive">
              Excluir conta e dados (em breve)
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Veja a{' '}
            <Link href="/privacidade" className="text-purple-700 underline">
              Política de Privacidade Infantil
            </Link>{' '}
            completa.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? 'Saindo…' : 'Sair'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <span className="font-bold text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}
