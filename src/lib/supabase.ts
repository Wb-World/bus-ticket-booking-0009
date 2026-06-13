import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Public client — uses anon key.
 * Safe to use in browser-side code.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin/server client — uses service_role key.
 * MUST only be used in API routes (server-side).
 * This bypasses Row Level Security.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ── TypeScript Types matching the Supabase schema ─────────────
export interface DbUser {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  created_at?: string;
}

export interface DbBus {
  id: string;
  name: string;
  type: string;
  source: string;
  destination: string;
  price: number;
  duration: string;
  times: string[];
  created_at?: string;
}

export interface DbBooking {
  id: string;
  user_id: string;
  bus_id: string;
  bus_name: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  seats: string[];
  total_price: number;
  screenshot: string;
  status: 'pending' | 'approved' | 'denied';
  created_at: string;
}
