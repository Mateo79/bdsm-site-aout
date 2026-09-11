import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rgrjvcurqsgsatcvrxtq.supabase.co";
const supabaseAnonKey = "sb_publishable_W_Kf9CwdzuzbmnmXmtmq5w_rabrUL8u";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
