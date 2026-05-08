export default function GlobalLoading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin" />
        <p className="text-sm font-bold text-purple-700">Carregando…</p>
      </div>
    </main>
  );
}
