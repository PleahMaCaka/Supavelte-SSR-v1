import type { Database } from "@lib/types/supabase"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
)