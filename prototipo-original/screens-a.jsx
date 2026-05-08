// Kids Academy — Telas 1-3: Onboarding, Home (Mapa), Trilha aberta

// ====================================================================
// TELA 1 — ONBOARDING / BOAS-VINDAS (com etapa de criação de perfil)
// ====================================================================
function ScreenOnboarding({ onComplete }) {
  const [step, setStep] = React.useState("welcome"); // welcome | profile
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(8);
  const [grade, setGrade] = React.useState("3º ano");
  const [avatar, setAvatar] = React.useState(0);

  const avatars = [
    { bg: "#6B46C1", emoji: "🦊" },
    { bg: "#10B981", emoji: "🐼" },
    { bg: "#3B82F6", emoji: "🦉" },
    { bg: "#F87171", emoji: "🐱" },
    { bg: "#FCD34D", emoji: "🦁" },
    { bg: "#A855F7", emoji: "🐸" },
  ];

  return (
    <div data-screen-label="01 Onboarding" className="min-h-full bg-white px-6 py-10 md:py-16">
      <div className="max-w-xl mx-auto">
        {step === "welcome" && (
          <div className="flex flex-col items-center text-center">
            <KidsAcademyLogo size="lg" />
            <p className="mt-2 text-sm font-semibold tracking-wide text-purple-500 uppercase">
              Aprender ativamente · BNCC
            </p>

            {/* DogBerg destaque central */}
            <div className="relative mt-8 mb-2">
              <div
                className="absolute inset-0 rounded-full -z-0"
                style={{ background: "radial-gradient(closest-side, #FCD34D44, transparent 70%)" }}
              />
              <div className="relative">
                <DogBerg size={230} />
              </div>
            </div>

            <h1 className="mt-2 text-[40px] leading-[1.05] font-extrabold text-gray-900">
              Aprender é uma <span style={{ color: "#6B46C1" }}>aventura!</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-medium">
              Trilhas, jogos e desafios para você arrasar na escola.
            </p>

            <button
              onClick={() => setStep("profile")}
              className="mt-8 w-full max-w-sm h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.98] transition-transform"
              style={{
                background: "linear-gradient(180deg, #7B52D6 0%, #6B46C1 100%)",
                boxShadow: "0 14px 28px -14px rgba(107,70,193,0.6)",
              }}
            >
              Vamos começar! →
            </button>

            <p className="mt-6 text-xs text-gray-400 font-semibold tracking-wide uppercase">
              Para crianças de 6 a 10 anos
            </p>
          </div>
        )}

        {step === "profile" && (
          <div>
            <button
              onClick={() => setStep("welcome")}
              className="mb-6 inline-flex items-center gap-1 text-purple-700 font-bold"
            >
              <Icon.ArrowLeft size={22} /> voltar
            </button>

            <div className="flex items-center gap-4 mb-8">
              <DogBerg size={84} />
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Vamos te conhecer!</h2>
                <p className="text-gray-500 font-medium">3 perguntinhas rápidas.</p>
              </div>
            </div>

            {/* Nome */}
            <label className="block">
              <span className="text-base font-bold text-gray-700">Como podemos te chamar?</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="mt-2 w-full h-14 rounded-2xl border-2 border-gray-200 px-5 text-lg font-semibold text-gray-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
              />
            </label>

            {/* Idade */}
            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Quantos anos você tem?</span>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[6, 7, 8, 9, 10].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAge(a)}
                    className={`h-14 rounded-2xl font-extrabold text-lg transition-all ${
                      age === a
                        ? "bg-purple-700 text-white shadow-md scale-[1.04]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Série */}
            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Qual série?</span>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {["1º", "2º", "3º", "4º", "5º"].map((g) => {
                  const v = `${g} ano`;
                  return (
                    <button
                      key={v}
                      onClick={() => setGrade(v)}
                      className={`h-14 rounded-2xl font-extrabold text-base transition-all ${
                        grade === v
                          ? "bg-yellow-300 text-gray-900 shadow-md scale-[1.04]"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {g} ano
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Avatar */}
            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Escolha um avatar</span>
              <div className="mt-3 grid grid-cols-6 gap-3">
                {avatars.map((av, i) => (
                  <button
                    key={i}
                    onClick={() => setAvatar(i)}
                    aria-label={`Avatar ${i + 1}`}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                      avatar === i
                        ? "ring-4 ring-purple-500 scale-105"
                        : "ring-2 ring-transparent opacity-90"
                    }`}
                    style={{ background: av.bg }}
                  >
                    <span className="drop-shadow">{av.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onComplete}
              className="mt-8 w-full h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.98] transition-transform"
              style={{
                background: "linear-gradient(180deg, #1FCB8E 0%, #10B981 100%)",
                boxShadow: "0 14px 28px -14px rgba(16,185,129,0.6)",
              }}
            >
              Criar meu perfil!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ====================================================================
// TELA 2 — HOME / MAPA DE TRILHAS
// ====================================================================
function ScreenHome({ onOpenTrilha }) {
  const trilhas = [
    { id: "port", name: "Português", color: "#F87171", soft: "#FEE2E2", IconComp: Icon.Book, progress: 60, status: "done", stars: 3 },
    { id: "mat", name: "Matemática", color: "#3B82F6", soft: "#DBEAFE", IconComp: Icon.Calc, progress: 35, status: "active", stars: 1, current: true },
    { id: "cie", name: "Ciências", color: "#10B981", soft: "#D1FAE5", IconComp: Icon.Lupa, progress: 0, status: "locked" },
    { id: "his", name: "História", color: "#B45309", soft: "#FEF3C7", IconComp: Icon.Scroll, progress: 0, status: "locked" },
    { id: "geo", name: "Geografia", color: "#0E7490", soft: "#CFFAFE", IconComp: Icon.Globe, progress: 0, status: "locked" },
    { id: "ing", name: "Inglês", color: "#6B46C1", soft: "#EDE9FE", IconComp: Icon.Speak, progress: 0, status: "locked" },
  ];

  // positions on the path (percentages of map area)
  const positions = [
    { x: 14, y: 18 },
    { x: 50, y: 12 },
    { x: 82, y: 28 },
    { x: 76, y: 60 },
    { x: 38, y: 70 },
    { x: 12, y: 82 },
  ];

  return (
    <div data-screen-label="02 Home Mapa" className="min-h-full bg-white">
      {/* Header fixo */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <Avatar name="L" color="#6B46C1" size={48} />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-900 truncate">Oi, Lucas!</span>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Nível 7
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "62%", background: "linear-gradient(90deg,#FCD34D,#F59E0B)" }} />
              </div>
              <span className="text-xs font-bold text-gray-600">1.247 XP</span>
            </div>
          </div>
          <button className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
            <Icon.Bell size={22} />
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-6 pb-32">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-[28px] leading-tight font-extrabold text-gray-900">Sua jornada</h1>
            <p className="text-gray-500 font-medium">Toque em uma trilha pra continuar.</p>
          </div>
          <span className="text-sm font-bold text-purple-700 bg-purple-50 rounded-full px-3 py-1">
            🔥 5 dias seguidos
          </span>
        </div>

        {/* MAPA */}
        <div className="relative w-full rounded-[28px] overflow-hidden border border-gray-100 shadow-[0_2px_0_rgba(0,0,0,0.02)]" style={{ aspectRatio: "1 / 1.05", background: "linear-gradient(180deg,#FAF7FF 0%,#FFFDF5 100%)" }}>
            {/* subtle grid dots */}
            <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
              <defs>
                <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#E5DEFC" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            {/* Wavy connecting path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 105" preserveAspectRatio="none">
              <path
                d="M14,18 C30,8 38,18 50,12 C66,4 74,20 82,28 C90,38 84,50 76,60 C66,72 50,62 38,70 C24,80 22,76 12,82"
                stroke="#E5DEFC"
                strokeWidth="2.2"
                strokeDasharray="1.6 1.4"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Trilha nodes */}
            {trilhas.map((t, i) => {
              const p = positions[i];
              const I = t.IconComp;
              const locked = t.status === "locked";
              const isCurrent = t.current;
              return (
                <button
                  key={t.id}
                  onClick={() => !locked && onOpenTrilha?.(t.id)}
                  className="absolute group"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                  disabled={locked}
                >
                  <div className="flex flex-col items-center" style={{ width: "108px" }}>
                    <div className="relative">
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full animate-ping" style={{ background: t.color, opacity: 0.25 }} />
                      )}
                      <div
                        className="relative w-[78px] h-[78px] rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{
                          background: locked ? "#E5E7EB" : t.color,
                          filter: locked ? "grayscale(0.4)" : "none",
                          boxShadow: locked
                            ? "inset 0 -4px 0 rgba(0,0,0,0.08)"
                            : `inset 0 -6px 0 rgba(0,0,0,0.18), 0 12px 22px -10px ${t.color}80`,
                        }}
                      >
                        {locked ? <Icon.Lock size={32} /> : <I size={36} />}
                      </div>
                      {t.stars && !locked && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow">
                          {[0, 1, 2].map((s) => (
                            <Icon.Star key={s} size={12} fill={s < t.stars ? "#FCD34D" : "#E5E7EB"} />
                          ))}
                        </div>
                      )}
                    </div>
                    <span
                      className={`mt-3 text-[13px] font-extrabold leading-tight text-center ${
                        locked ? "text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {t.name}
                    </span>
                    {!locked ? (
                      <span className="text-[11px] font-bold mt-0.5" style={{ color: t.color }}>
                        {t.progress}%
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold mt-0.5 text-gray-400">Bloqueada</span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* DogBerg with speech bubble */}
            <div className="absolute right-3 bottom-3 flex items-end gap-2">
              <SpeechBubble side="right" className="text-sm font-bold text-gray-700">
                Bora aprender? 🐾
              </SpeechBubble>
              <DogBerg size={92} />
            </div>
          </div>
        {/* Daily quest */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-yellow-200 p-4" style={{ background: "#FFFBEB" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-yellow-600 bg-yellow-200">
            <Icon.Bolt size={26} fill="#B45309" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-gray-900">Missão do dia</p>
            <p className="text-[13px] text-gray-600 font-medium">Complete 1 jogo de Matemática · +50 XP</p>
          </div>
          <span className="text-xs font-bold text-yellow-700">2/3</span>
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav active="home" />
    </div>
  );
}

function BottomNav({ active = "home" }) {
  const items = [
    { id: "home", label: "Início", I: Icon.Home },
    { id: "trophy", label: "Conquistas", I: Icon.Trophy },
    { id: "rank", label: "Ranking", I: Icon.Rank },
    { id: "shop", label: "Loja", I: Icon.Shop },
    { id: "parent", label: "Pais", I: Icon.Parent },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto grid grid-cols-5">
        {items.map((it) => {
          const I = it.I;
          const on = active === it.id;
          return (
            <button key={it.id} className="py-2.5 flex flex-col items-center gap-1">
              <I size={22} />
              <span className={`text-[11px] font-bold ${on ? "text-purple-700" : "text-gray-400"}`}>
                {it.label}
              </span>
              <span
                className="block w-6 h-1 rounded-full"
                style={{ background: on ? "#6B46C1" : "transparent" }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ====================================================================
// TELA 3 — TRILHA ABERTA (MATEMÁTICA)
// ====================================================================
function ScreenTrilha({ onBack, onOpenAula }) {
  const niveis = [
    {
      id: "facil", title: "Nível Fácil", state: "done",
      bg: "#D1FAE5", accent: "#10B981",
      stars: 3,
      items: ["Videoaula", "2 jogos", "Quiz"],
    },
    {
      id: "medio", title: "Nível Médio", state: "active",
      bg: "#DBEAFE", accent: "#3B82F6",
      stars: 1,
      progress: 50,
      items: [
        { l: "Videoaula", state: "done" },
        { l: "Jogo · Pega Frações", state: "done" },
        { l: "Jogo · Bolha Math", state: "locked" },
        { l: "Quiz Matemática", state: "locked" },
      ],
    },
    {
      id: "dificil", title: "Nível Difícil", state: "locked",
      bg: "#F3F4F6", accent: "#9CA3AF",
      stars: 0,
      items: ["Videoaula", "Jogo Matemágica", "Jogo Equação Express", "Quiz final"],
    },
  ];

  return (
    <div data-screen-label="03 Trilha Matematica" className="min-h-full bg-white pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700">
            <Icon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-gray-900">Matemática</h1>
            <p className="text-[13px] text-gray-500 font-bold">4º ano · Frações</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500">Progresso</p>
            <p className="text-base font-extrabold text-blue-600">35%</p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-5 pb-4">
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "35%", background: "linear-gradient(90deg,#60A5FA,#3B82F6)" }} />
          </div>
        </div>
      </header>

      {/* Niveis em escada visual ascendente */}
      <main className="max-w-2xl mx-auto px-5 pt-6 space-y-5">
        {niveis.map((n, i) => (
          <NivelCard key={n.id} nivel={n} indent={i} onContinue={onOpenAula} />
        ))}
      </main>
    </div>
  );
}

function NivelCard({ nivel, indent = 0, onContinue }) {
  const locked = nivel.state === "locked";
  const active = nivel.state === "active";
  const done = nivel.state === "done";

  return (
    <div
      className="relative rounded-3xl border-2 p-5 md:p-6"
      style={{
        marginLeft: `${indent * 16}px`,
        background: nivel.bg,
        borderColor: active ? nivel.accent : "transparent",
        opacity: locked ? 0.85 : 1,
      }}
    >
      {active && (
        <span
          className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
          style={{ boxShadow: `0 0 0 3px ${nivel.accent}30, 0 0 0 8px ${nivel.accent}15` }}
        />
      )}

      <div className="flex items-start gap-4">
        {/* Badge / Lock / Star */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0"
          style={{ background: locked ? "#9CA3AF" : nivel.accent }}
        >
          {locked ? (
            <Icon.Lock size={28} />
          ) : done ? (
            <Icon.Star size={32} fill="#FCD34D" />
          ) : (
            <span className="text-2xl font-extrabold">{nivel.id === "medio" ? "II" : "I"}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-xl font-extrabold ${locked ? "text-gray-500" : "text-gray-900"}`}>
              {nivel.title}
            </h3>
            {done && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                ✓ completo
              </span>
            )}
            {active && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">
                em andamento — {nivel.progress}%
              </span>
            )}
            {locked && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-300 text-gray-600">
                bloqueado
              </span>
            )}
          </div>

          {/* stars */}
          {!locked && (
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((s) => (
                <Icon.Star key={s} size={20} fill={s < nivel.stars ? "#FCD34D" : "#FFFFFF"} />
              ))}
            </div>
          )}

          {locked && (
            <p className="mt-2 text-sm font-semibold text-gray-500">
              Complete o nível Médio para desbloquear.
            </p>
          )}

          {/* items */}
          <ul className="mt-4 space-y-2">
            {(active ? nivel.items : nivel.items.map((l) => ({ l, state: done ? "done" : "locked" }))).map((it, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/70 border border-white"
              >
                {it.state === "done" ? (
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Icon.Check size={16} />
                  </span>
                ) : it.state === "locked" ? (
                  <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                    <Icon.Lock size={14} />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Icon.Play size={12} />
                  </span>
                )}
                <span className={`text-sm font-bold ${it.state === "locked" ? "text-gray-400" : "text-gray-800"}`}>
                  {it.l}
                </span>
              </li>
            ))}
          </ul>

          {active && (
            <button
              onClick={onContinue}
              className="mt-5 w-full h-14 rounded-2xl text-white font-extrabold text-lg shadow-md active:scale-[0.99]"
              style={{
                background: "linear-gradient(180deg,#7B52D6,#6B46C1)",
                boxShadow: "0 12px 24px -12px rgba(107,70,193,0.5)",
              }}
            >
              Continuar de onde parei →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenOnboarding, ScreenHome, ScreenTrilha });
