// =============================================================
// /children/[childId]/settings — settings parentais por criança
// =============================================================
// Limite diário, voz preferida, áudio toggle, PIN parental.
// =============================================================

import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SettingsForm } from './settings-form';

interface PageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildSettingsPage({ params }: PageProps) {
  const { childId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: child } = await supabase
    .from('children')
    .select('id, display_name')
    .eq('id', childId)
    .is('deleted_at', null)
    .maybeSingle();

  if (!child) notFound();

  const { data: settings } = await supabase
    .from('parent_settings')
    .select('daily_minutes_limit, preferred_voice, audio_enabled, parental_pin_hash')
    .eq('child_id', childId)
    .maybeSingle();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settingsData = (settings as any) ?? {
    daily_minutes_limit: 30,
    preferred_voice: 'voice_lola',
    audio_enabled: true,
    parental_pin_hash: null,
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        Configurações de {(child as any).display_name}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Ajuste limite de tempo, voz preferida e PIN parental.
      </p>

      <SettingsForm
        childId={childId}
        dailyMinutesLimit={settingsData.daily_minutes_limit ?? 30}
        preferredVoice={settingsData.preferred_voice ?? 'voice_lola'}
        audioEnabled={settingsData.audio_enabled ?? true}
        hasPin={Boolean(settingsData.parental_pin_hash)}
      />
    </div>
  );
}
