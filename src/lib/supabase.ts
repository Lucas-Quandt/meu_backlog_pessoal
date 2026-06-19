import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://saqopdrixlrqtnemdsmd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcW9wZHJpeGxycXRuZW1kc21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODk4MTAsImV4cCI6MjA5NzQ2NTgxMH0.aGELvoyucn6QrkWQ7SG17v9psW_UJiXSq27SpJVc0JA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
