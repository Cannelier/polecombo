
import { supabase } from "@/frontend/services/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  userId: string | null;
  user: User | null;
  session: Session | null;
  isUserLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  user: null,
  session: null,
  isUserLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUserId(data.session.user.id);
        setUser(data.session.user);
        setSession(data.session);
      }
      setIsUserLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id ?? null);
      setUser(session?.user ?? null);
      setSession(session ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userId, user, session, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);