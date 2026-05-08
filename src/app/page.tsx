import Link from 'next/link';
import { DogBerg } from '@/components/kids/dog-berg';
import { KidsAcademyLogo } from '@/components/kids/kids-academy-logo';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="flex-1 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <KidsAcademyLogo size="xl" />
            <p className="mt-2 text-sm font-semibold tracking-wide text-purple-500 uppercase">
              Aprender ativamente · BNCC
            </p>
            <h1 className="mt-6 text-[44px] md:text-[56px] leading-[1.05] font-extrabold text-gray-900">
              Aprender é uma <span style={{ color: '#6B46C1' }}>aventura!</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              Trilhas, jogos e desafios alinhados à BNCC. MENTOR pedagógico de IA acompanha
              cada criança individualmente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cadastro"
                className="h-[56px] px-8 rounded-3xl text-white font-extrabold text-lg shadow-lg flex items-center"
                style={{
                  background: 'linear-gradient(180deg,#7B52D6,#6B46C1)',
                  boxShadow: '0 14px 28px -14px rgba(107,70,193,0.6)',
                }}
              >
                Criar conta gratuita
              </Link>
              <Link
                href="/login"
                className="h-[56px] px-8 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-lg flex items-center"
              >
                Já tenho conta
              </Link>
            </div>
            <p className="mt-6 text-xs text-gray-400 font-semibold tracking-wide uppercase">
              Para crianças de 6 a 10 anos · Ensino Fundamental I
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full -z-0"
                style={{
                  background: 'radial-gradient(closest-side, #FCD34D44, transparent 70%)',
                }}
              />
              <div className="relative">
                <DogBerg size={280} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Nexus Kids Academy</p>
          <div className="flex gap-4">
            <Link href="/termos" className="hover:text-purple-700">
              Termos
            </Link>
            <Link href="/privacidade" className="hover:text-purple-700">
              Privacidade
            </Link>
            <Link href="/login" className="hover:text-purple-700">
              Entrar
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
