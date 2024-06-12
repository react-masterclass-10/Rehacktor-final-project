import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

function useAuth() {
  const [sessione, setSessione] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessione(session);
    });
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessione(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    sessione,
    user,
  };
}

export default useAuth;
