import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";
import supabase from "../context/supabaseClient";

export function Navbar() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  console.log("user", user);
  const handleLogout = () => {
    localStorage.removeItem("user");
    supabase.auth.signOut();
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 border-b">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">Z</span>
          </div>
          <span className="font-semibold text-xl">zonely</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Use Cases
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Pricing
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 p-2 rounded ${
            theme === "dark" ? "bg-magenta" : "bg-blue"
          }`}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
