import { redirect } from 'next/navigation';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { KidsAcademyLogo } from '@/components/kids/kids-academy-logo';

export default async function PaisLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-4">
          <Link href="/pais/dashboard">
            <KidsAcademyLogo size="md" />
          </Link>
          <nav className="ml-auto flex items-center gap-4 text-sm font-bold text-gray-600">
            <Link href="/pais/dashboard" className="hover:text-purple-700">
              Dashboard
            </Link>
            <Link href="/pais/conta" className="hover:text-purple-700">
              Conta
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
