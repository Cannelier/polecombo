
import Auth from '@/components/auth/Auth';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/frontend/services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootStack() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ThemedView>
      <Auth />
      { false && session && session.user &&
        <Redirect href="/(tabs)/combo" />
      }
    </ThemedView>
  );
}