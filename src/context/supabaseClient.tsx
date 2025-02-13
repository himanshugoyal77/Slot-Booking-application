import { createClient } from "@supabase/supabase-js";

console.log(import.meta.env);
const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL!,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
