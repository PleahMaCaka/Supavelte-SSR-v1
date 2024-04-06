import { supabase } from "@lib/Supabase"
import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"


export const GET: RequestHandler = async ({ cookies }) => {
    cookies.delete("access-token", { path: "/" })
    cookies.delete("refresh-token", { path: "/" })

    await supabase.auth.signOut()

    return redirect(302, "/")
}