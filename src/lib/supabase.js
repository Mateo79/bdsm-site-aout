import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "COLLE_TON_PROJECT_URL_ICI";
const supabaseAnonKey = "COLLE_TA_CLE_ANON_ICI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
