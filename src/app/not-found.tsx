import Link from 'next/link';
import { DogBerg } from '@/components/kids/dog-berg';

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white p-8">
      <div className="text-center max-w-md">
        <DogBerg size={180} expression="curious" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Ops! Página não encontrada</h1>
        <p className="mt-2 text-gray-600">Não conseguimos achar o que você procurava.</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 px-6 rounded-2xl bg-purple-700 text-white font-extrabold items-center"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
