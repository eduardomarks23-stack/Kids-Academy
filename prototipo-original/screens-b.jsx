// Kids Academy — Telas 4-7: Videoaula, Jogo, Quiz, MENTOR

// ====================================================================
// TELA 4 — VIDEOAULA EM CURSO
// ====================================================================
function ScreenVideoaula({ onBack, onNext }) {
  const [playing, setPlaying] = React.useState(false);
  const progress = 0.89; // 5:23 / 6:00
  return (
    <div data-screen-label="04 Videoaula" className="min-h-full bg-white pb-10">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <Icon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <p className="text-[12px] font-bold uppercase tracking-wide text-purple-600">Matemática · Frações</p>
            <h1 className="text-[22px] font-extrabold text-gray-900 leading-tight">Frações: o que é metade?</h1>
          </div>
          <span className="hidden md:inline-flex text-xs font-bold bg-purple-50 text-purple-700 rounded-full px-3 py-1">
            Microlearning · 6 min
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-5 space-y-5">
        {/* Video player placeholder */}
        <div
          className="relative rounded-3xl overflow-hidden aspect-video shadow-[0_30px_50px_-30px_rgba(107,70,193,0.5)]"
          style={{ background: "linear-gradient(135deg,#6B46C1 0%,#3B82F6 100%)" }}
        >
          {/* decorative shapes (representing the lesson visual) */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 120" preserveAspectRatio="none">
            <circle cx="30" cy="30" r="24" fill="#FCD34D" />
            <circle cx="170" cy="90" r="30" fill="#10B981" />
            <rect x="80" y="80" width="40" height="20" rx="4" fill="#F87171" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pausar" : "Reproduzir"}
              className="w-24 h-24 rounded-full bg-white/95 text-purple-700 flex items-center justify-center shadow-2xl active:scale-95 transition"
            >
              {playing ? <Icon.Pause size={44} /> : <Icon.Play size={44} />}
            </button>
          </div>
          <div className="absolute left-4 top-4 bg-black/30 backdrop-blur text-white text-xs font-bold rounded-full px-3 py-1">
            ● ao vivo · pré-gravado
          </div>
          <div className="absolute right-4 bottom-4 bg-black/40 backdrop-blur text-white text-sm font-extrabold rounded-full px-3 py-1">
            5:23 / 6:00
          </div>
        </div>

        {/* progress bar */}
        <div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg,#FCD34D,#F59E0B)" }} />
          </div>
          <div className="flex justify-between mt-2 text-[12px] font-bold text-gray-500">
            <span>5:23</span>
            <span>capítulo 3 de 4</span>
            <span>6:00</span>
          </div>
        </div>

        {/* Pontos importantes */}
        <div className="rounded-3xl p-5 border-2" style={{ background: "#FEF9C3", borderColor: "#FDE68A" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-yellow-300 text-yellow-900 flex items-center justify-center">
              <Icon.Sparkle size={20} />
            </span>
            <h3 className="text-lg font-extrabold text-yellow-900">Pontos importantes</h3>
          </div>
          <ul className="space-y-2.5">
            {[
              "Metade é dividir em 2 partes iguais.",
              "1/2 é igual a 50% — é a mesma metade.",
              "Pizza, bolo, dinheiro... tudo pode ter metade!",
            ].map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-[12px] font-extrabold shrink-0">
                  {i + 1}
                </span>
                <span className="text-[15px] font-semibold text-gray-800">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MENTOR hint */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-purple-50 border border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <Icon.Sparkle size={16} />
          </span>
          <p className="text-sm font-semibold text-purple-900">
            <strong className="font-extrabold">MENTOR</strong> está aprendendo como você aprende.
          </p>
        </div>

        {/* Next CTA */}
        <button
          onClick={onNext}
          className="w-full h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.99]"
          style={{
            background: "linear-gradient(180deg,#7B52D6 0%,#6B46C1 100%)",
            boxShadow: "0 14px 28px -14px rgba(107,70,193,0.6)",
          }}
        >
          Próximo passo: vamos jogar! 🎮
        </button>
      </main>
    </div>
  );
}

// ====================================================================
// TELA 5 — JOGO EM ANDAMENTO ("Pega Frações")
// ====================================================================
function ScreenJogo({ onBack, onFinish }) {
  // simple drag-to-target
  const targets = [
    { id: "p2", node: <FractionPizza slices={2} filled={1} size={120} color="#FCD34D" />, answer: "1/2" },
    { id: "s4", node: <FractionSquare parts={4} filled={1} size={120} color="#10B981" />, answer: "1/4" },
    { id: "c4", node: <FractionCircle parts={4} filled={3} size={120} color="#3B82F6" />, answer: "3/4" },
  ];
  const [matched, setMatched] = React.useState({}); // {answer: targetId}
  const [feedback, setFeedback] = React.useState(null); // {kind:'right'|'wrong', xp?}
  const [draggedOver, setDraggedOver] = React.useState(null);
  const [time, setTime] = React.useState(42);

  React.useEffect(() => {
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const cards = ["1/2", "1/4", "3/4"];

  function handleDrop(targetId, frac) {
    const correct = targets.find((t) => t.id === targetId).answer === frac;
    if (correct) {
      setMatched((m) => ({ ...m, [frac]: targetId }));
      setFeedback({ kind: "right", xp: 20 });
      setTimeout(() => setFeedback(null), 1500);
    } else {
      setFeedback({ kind: "wrong" });
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  const allDone = Object.keys(matched).length === 3;
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div data-screen-label="05 Jogo Pega Fracoes" className="min-h-full bg-white">
      {/* Game header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <Icon.ArrowLeft size={20} />
          </button>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-extrabold ${time < 10 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"}`}>
            <Icon.Clock size={16} />
            <span className="tabular-nums">{mm}:{ss}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-emerald-100 text-emerald-700 font-extrabold">
            <Icon.Bolt size={16} fill="#10B981" />
            +180 XP
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-purple-100 text-purple-700 font-extrabold">
            Pergunta 3/10
          </div>
          <div className="flex-1" />
          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <Icon.Pause size={18} />
          </button>
        </div>
        {/* progress dots */}
        <div className="max-w-3xl mx-auto px-5 pb-3 flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < 2 ? "#10B981" : i === 2 ? "#6B46C1" : "#E5E7EB" }} />
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pt-6 pb-12">
        <h2 className="text-[26px] md:text-[30px] font-extrabold text-gray-900 leading-tight text-center">
          Arraste cada fração para a imagem certa!
        </h2>
        <p className="text-center text-gray-500 font-semibold mt-1">Pega Frações · Nível Médio</p>

        {/* Targets row */}
        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-6">
          {targets.map((t) => {
            const filled = Object.entries(matched).find(([_, tid]) => tid === t.id);
            const isOver = draggedOver === t.id;
            return (
              <div
                key={t.id}
                onDragOver={(e) => { e.preventDefault(); setDraggedOver(t.id); }}
                onDragLeave={() => setDraggedOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDraggedOver(null);
                  const frac = e.dataTransfer.getData("text/plain");
                  if (frac) handleDrop(t.id, frac);
                }}
                className={`relative rounded-3xl border-2 border-dashed p-4 flex flex-col items-center justify-center aspect-square transition ${
                  isOver ? "border-purple-500 bg-purple-50" : filled ? "border-emerald-400 bg-emerald-50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="scale-75 sm:scale-90 md:scale-100">{t.node}</div>
                {filled && (
                  <div className="mt-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-extrabold flex items-center gap-1">
                    <Icon.Check size={14} /> {filled[0]}
                  </div>
                )}
                {/* arrow up hint */}
                {!filled && (
                  <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-gray-300" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l6 8h-4v8h-4v-8H6z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Cards row */}
        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-6">
          {cards.map((c) => {
            const used = !!matched[c];
            return (
              <div
                key={c}
                draggable={!used}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", c)}
                onClick={() => {
                  // tap fallback: drop onto first matching target
                  if (used) return;
                  const tg = targets.find((t) => t.answer === c);
                  if (tg) handleDrop(tg.id, c);
                }}
                className={`select-none cursor-grab active:cursor-grabbing rounded-3xl h-24 md:h-28 flex items-center justify-center text-3xl md:text-4xl font-extrabold shadow-lg transition ${
                  used ? "bg-gray-100 text-gray-300 line-through" : "bg-white text-purple-700 hover:-translate-y-1"
                }`}
                style={{
                  border: used ? "2px solid #E5E7EB" : "3px solid #6B46C1",
                  boxShadow: used ? "none" : "0 12px 0 #4C2A99, 0 18px 30px -10px rgba(107,70,193,0.4)",
                }}
              >
                {c}
              </div>
            );
          })}
        </div>

        {/* Feedback toasts */}
        {feedback?.kind === "right" && (
          <div className="fixed left-1/2 -translate-x-1/2 top-28 z-30 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-extrabold shadow-2xl flex items-center gap-2">
            <Icon.Check size={20} /> Mandou bem! +{feedback.xp} XP
          </div>
        )}
        {feedback?.kind === "wrong" && (
          <div className="fixed left-1/2 -translate-x-1/2 top-28 z-30 px-5 py-3 rounded-2xl bg-rose-400 text-white font-extrabold shadow-2xl">
            Quase! Tenta de novo 💪
          </div>
        )}

        {allDone && (
          <button
            onClick={onFinish}
            className="mt-10 mx-auto block w-full max-w-md h-14 rounded-2xl text-white font-extrabold text-lg"
            style={{ background: "linear-gradient(180deg,#1FCB8E,#10B981)" }}
          >
            Pra pergunta 4 →
          </button>
        )}

        {/* helper note (decisão de UX) */}
        {/* animação: confete + +XP no acerto; balança + coral suave no erro */}
        {/* nota: DogBerg NÃO aparece nesta tela — foco no jogo. */}
      </main>
    </div>
  );
}

// ====================================================================
// TELA 6 — QUIZ COM FEEDBACK (acerto + erro lado a lado)
// ====================================================================
function ScreenQuiz({ onBack }) {
  const options = [
    { k: "A", label: "1/2", node: <FractionPizza slices={2} filled={1} size={100} color="#FCD34D" /> },
    { k: "B", label: "1/4", node: <FractionPizza slices={4} filled={1} size={100} color="#FCD34D" /> },
    { k: "C", label: "1/1", node: <FractionPizza slices={1} filled={1} size={100} color="#FCD34D" /> },
    { k: "D", label: "1/3", node: <FractionPizza slices={3} filled={1} size={100} color="#FCD34D" /> },
  ];
  const [variant, setVariant] = React.useState("right"); // right | wrong

  return (
    <div data-screen-label="06 Quiz" className="min-h-full bg-white pb-10">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <Icon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-gray-900">Quiz — Frações</h1>
            <p className="text-[13px] font-bold text-gray-500">Pergunta 3 de 10</p>
          </div>
          {/* toggle (demo only) */}
          <div className="hidden sm:flex bg-gray-100 rounded-full p-1 text-xs font-extrabold">
            <button
              onClick={() => setVariant("right")}
              className={`px-3 py-1.5 rounded-full transition ${variant === "right" ? "bg-emerald-500 text-white" : "text-gray-500"}`}
            >
              acerto
            </button>
            <button
              onClick={() => setVariant("wrong")}
              className={`px-3 py-1.5 rounded-full transition ${variant === "wrong" ? "bg-rose-400 text-white" : "text-gray-500"}`}
            >
              erro
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 pb-3 flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < 3 ? "#6B46C1" : "#E5E7EB" }} />
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pt-8">
        <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.1] text-center text-balance">
          Qual fração representa metade de uma pizza?
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {options.map((o) => {
            const correct = o.k === "A";
            const isPicked = (variant === "right" && o.k === "A") || (variant === "wrong" && o.k === "C");
            const showCorrect = variant === "wrong" && correct;

            let ring = "border-gray-200 bg-white";
            let badge = null;
            if (isPicked && correct) {
              ring = "border-emerald-500 bg-emerald-50";
              badge = <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center"><Icon.Check size={18} /></span>;
            } else if (isPicked && !correct) {
              ring = "border-rose-400 bg-rose-50";
              badge = <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-400 text-white text-xl font-extrabold flex items-center justify-center">×</span>;
            } else if (showCorrect) {
              ring = "border-emerald-400 bg-emerald-50/60 ring-4 ring-emerald-100";
              badge = <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center"><Icon.Check size={18} /></span>;
            }
            return (
              <div key={o.k} className={`relative rounded-3xl border-2 p-5 flex flex-col items-center text-center ${ring}`}>
                <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-sm font-extrabold flex items-center justify-center">
                  {o.k}
                </span>
                {badge}
                <div className="mt-3">{o.node}</div>
                <p className="mt-3 text-2xl font-extrabold text-gray-900">{o.label}</p>
              </div>
            );
          })}
        </div>

        {/* Feedback banner + CTAs */}
        {variant === "right" ? (
          <div className="mt-8">
            <div className="rounded-3xl p-5 flex items-center gap-4" style={{ background: "#D1FAE5" }}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Icon.Check size={26} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-extrabold text-emerald-900">Mandou bem!</p>
                <p className="text-sm font-semibold text-emerald-800">Metade = 1 parte de 2 iguais. +25 XP</p>
              </div>
              <span className="text-2xl font-extrabold text-emerald-700">+25 XP</span>
            </div>
            <button
              className="mt-4 w-full h-14 rounded-2xl text-white font-extrabold text-lg"
              style={{ background: "linear-gradient(180deg,#1FCB8E,#10B981)" }}
            >
              Próxima pergunta →
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-3xl p-5 flex items-center gap-4" style={{ background: "#FEE2E2" }}>
              <div className="w-12 h-12 rounded-2xl bg-rose-400 text-white flex items-center justify-center shrink-0">
                <span className="text-2xl font-extrabold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-extrabold text-rose-900">Quase!</p>
                <p className="text-sm font-semibold text-rose-800">A resposta certa é <strong>1/2</strong>. Vamos revisar?</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="h-14 rounded-2xl text-white font-extrabold text-base" style={{ background: "#3B82F6" }}>
                Ver explicação
              </button>
              <button className="h-14 rounded-2xl bg-gray-100 text-gray-700 font-extrabold text-base">
                Próxima pergunta
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ====================================================================
// TELA 7 — MENTOR · DogBerg leva a mensagem
// ====================================================================
function ScreenMentor({ onAccept, onLater }) {
  return (
    <div
      data-screen-label="07 MENTOR"
      className="min-h-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(107,70,193,0.05) 0%, rgba(255,255,255,1) 35%, rgba(252,211,77,0.10) 100%)",
      }}
    >
      {/* decorative blobs */}
      <span className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full" style={{ background: "#EDE9FE", filter: "blur(20px)" }} />
      <span className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full" style={{ background: "#FEF3C7", filter: "blur(20px)" }} />

      <div className="relative max-w-3xl mx-auto px-5 pt-10 pb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-7 rounded-full bg-purple-700 text-white flex items-center justify-center">
            <Icon.Sparkle size={14} />
          </span>
          <p className="text-sm font-extrabold tracking-wide uppercase text-purple-700">
            Mensagem do MENTOR
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start">
          {/* DogBerg */}
          <div className="flex md:block justify-center">
            <div className="relative">
              <span className="absolute inset-2 rounded-full" style={{ background: "radial-gradient(closest-side,#FCD34D55,transparent 70%)" }} />
              <div className="relative">
                <DogBerg size={150} />
              </div>
            </div>
          </div>

          {/* Speech bubble */}
          <div className="relative bg-white rounded-3xl p-6 md:p-7 shadow-[0_24px_50px_-30px_rgba(107,70,193,0.4)] border border-purple-100">
            <span className="hidden md:block absolute -left-3 top-12 w-0 h-0 border-y-[12px] border-y-transparent border-r-[16px] border-r-white" />
            <p className="text-2xl font-extrabold text-gray-900">Oi, Lucas! 👋</p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Eu vi que você tá indo <span className="text-emerald-600 font-extrabold">super bem em frações!</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Mas notei que tá tendo um pouquinho de dúvida em <span className="text-purple-700 font-extrabold">multiplicação</span>...
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Que tal a gente treinar isso juntos por <span className="bg-yellow-200 px-1.5 rounded">10 minutos</span>?
            </p>

            {/* CTAs */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <button
                onClick={onAccept}
                className="h-[60px] rounded-3xl text-white font-extrabold text-xl active:scale-[0.99]"
                style={{
                  background: "linear-gradient(180deg,#1FCB8E,#10B981)",
                  boxShadow: "0 14px 28px -14px rgba(16,185,129,0.55)",
                }}
              >
                Bora! 🚀
              </button>
              <button
                onClick={onLater}
                className="h-[60px] px-6 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-lg"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-4 md:p-5">
          <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400">
            O MENTOR já aprendeu sobre você
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-purple-700">47</p>
              <p className="text-xs font-bold text-gray-500">conceitos</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-extrabold text-emerald-600">78%</p>
              <p className="text-xs font-bold text-gray-500">acertos</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-gray-800 leading-tight">Frações<br/>Geometria</p>
              <p className="text-xs font-bold text-gray-500 mt-1">pontos fortes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenVideoaula, ScreenJogo, ScreenQuiz, ScreenMentor });
