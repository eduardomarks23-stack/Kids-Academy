import { type ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#6B46C1]">Nexus Kids Academy</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
