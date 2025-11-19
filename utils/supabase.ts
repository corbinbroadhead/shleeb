import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';

const supabaseUrl = 'https://btlxodkpbfeijmwmkkmp.supabase.co';
const supabasePublishableKey = 'sb_publishable_LcYRCSlBPJybBWSolBCzsA_I1GIi91n';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
