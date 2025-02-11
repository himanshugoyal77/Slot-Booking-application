import { useEffect, useContext } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthContext } from "../context/AuthContext";
import supabase from "../context/supabaseClient";

export default function AuthPage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { setUser, user } = authContext;
  console.log("user in AuthPage", user);

  if (!user) {
    console.log("here");
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    console.log("here 2");
    return (
      <div>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}
