import { createContext, ReactNode, useEffect, useState } from "react";
import { UserInterface } from "../interface/user";
import supabase from "./supabaseClient";

type UserContext = {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<UserContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session", session);
      if (!session) return;
      setUser({
        id: session?.user.id,
        email: session?.user.email || "",
        avatar_url: session?.user.user_metadata.avatar_url,
        name: session?.user.user_metadata.full_name,
        access_token: session?.access_token,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) return;
      setUser({
        id: session?.user.id,
        email: session?.user.email || "",
        avatar_url: session?.user.user_metadata.avatar_url,
        name: session?.user.user_metadata.full_name,
        access_token: session?.access_token,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
