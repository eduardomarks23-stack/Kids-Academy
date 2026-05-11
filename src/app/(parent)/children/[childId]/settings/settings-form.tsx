'use client';

import { useState, useTransition } from 'react';
import { saveSettingsAction, savePinAction } from './settings-actions';

interface Props {
  childId: string;
  dailyMinutesLimit: number;
  preferredVoice: string;
  audioEnabled: boolean;
  hasPin: boolean;
}

export function SettingsForm({
  childId,
  dailyMinutesLimit,
  preferredVoice,
  audioEnabled,
  hasPin,
}: Props) {
  const [minutes, setMinutes] = useState(dailyMinutesLimit);
  const [voice, setVoice] = useState(preferredVoice);
  const [audio, setAudio] = useState(audioEnabled);
  const [pin, setPin] = useState('');
  const [savingSettings, startSaveSettings] = useTransition();
  const [savingPin, startSavePin] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSaveSettings = () => {
    setFeedback(null);
    startSaveSettings(async () => {
      const fd = new FormData();
      fd.set('childId', childId);
      fd.set('dailyMinutesLimit', String(minutes));
      fd.set('preferredVoice', voice);
      fd.set('audioEnabled', audio ? 'true' : 'false');
      try {
        await saveSettingsAction(fd);
        setFeedback('Configurações salvas.');
      } catch (e) {
        setFeedback(e instanceof Error ? e.message : 'erro ao salvar');
      }
    });
  };

  const handleSavePin = () => {
    setFeedback(null);
    if (!/^\d{4}$/.test(pin)) {
      setFeedback('PIN deve ter exatamente 4 dígitos numéricos.');
      return;
    }
    startSavePin(async () => {
      const fd = new FormData();
      fd.set('childId', childId);
      fd.set('pin', pin);
      try {
        await savePinAction(fd);
        setFeedback('PIN salvo.');
        setPin('');
      } catch (e) {
        setFeedback(e instanceof Error ? e.message : 'erro ao salvar PIN');
      }
    });
  };

  return (
    <div className="mt-6 space-y-8">
      {feedback ? <p className="text-sm text-green-700">{feedback}</p> : null}

      {/* Limite de tempo diário */}
      <section className="rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium">Limite de tempo diário</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sessões somam até o limite. Depois, a tela &ldquo;vamos descansar?&rdquo; aparece.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-base font-medium">{minutes} min</span>
        </div>
      </section>

      {/* Voz preferida */}
      <section className="rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium">Voz dos personagens</h2>
        <p className="mt-1 text-sm text-gray-500">
          Quem fala mais — Lolinha ou Garuzinho. (TTS placeholder enquanto vozes reais não estão prontas.)
        </p>
        <div className="mt-4 flex gap-3">
          {[
            { id: 'voice_lola', label: 'Lolinha' },
            { id: 'voice_garu', label: 'Garuzinho' },
          ].map((v) => (
            <label
              key={v.id}
              className={`flex-1 cursor-pointer rounded-2xl border p-4 text-center ${
                voice === v.id ? 'border-purple-700 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="voice"
                value={v.id}
                checked={voice === v.id}
                onChange={(e) => setVoice(e.target.value)}
                className="sr-only"
              />
              <span className="text-base font-medium">{v.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Áudio toggle */}
      <section className="rounded-2xl border border-gray-200 p-6">
        <label className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Áudio</h2>
            <p className="mt-1 text-sm text-gray-500">Ligar ou desligar narração.</p>
          </div>
          <input
            type="checkbox"
            checked={audio}
            onChange={(e) => setAudio(e.target.checked)}
            className="h-6 w-6"
          />
        </label>
      </section>

      <button
        type="button"
        onClick={handleSaveSettings}
        disabled={savingSettings}
        className="rounded-full bg-purple-700 px-6 py-3 text-base font-medium text-white disabled:opacity-50"
      >
        {savingSettings ? 'Salvando...' : 'Salvar configurações'}
      </button>

      {/* PIN parental */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-medium">PIN parental</h2>
        <p className="mt-1 text-sm text-gray-600">
          PIN de 4 dígitos que protege a saída do modo criança e o acesso ao painel.
          {hasPin ? ' (Um PIN já foi configurado — você pode substituí-lo.)' : ''}
        </p>
        <div className="mt-4 flex gap-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="0000"
            className="w-32 rounded-xl border border-gray-300 px-4 py-2 text-center text-lg tracking-widest"
          />
          <button
            type="button"
            onClick={handleSavePin}
            disabled={savingPin}
            className="rounded-full bg-amber-700 px-6 py-3 text-base font-medium text-white disabled:opacity-50"
          >
            {savingPin ? 'Salvando...' : hasPin ? 'Alterar PIN' : 'Definir PIN'}
          </button>
        </div>
      </section>
    </div>
  );
}
