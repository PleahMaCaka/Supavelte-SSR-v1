import type { Database } from "@lib/types/supabase"
import { createClient, type User } from "@supabase/supabase-js"
import type { RequestEvent } from "@sveltejs/kit"

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
)

export async function isAuthorizedUser(event: RequestEvent): Promise<User | null> {
    const { cookies } = event

    const token = cookies.get("auth")

    const { data, error } = await supabase.auth.getUser(token)

    if (error) return null

    return data.user
}