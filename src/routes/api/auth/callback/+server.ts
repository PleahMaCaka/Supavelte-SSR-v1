import { supabase } from "@lib/Supabase"
import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"


export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get("code")

    if (!code) return new Response("Missing code", { status: 400 })

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) return new Response(error.message, { status: 500 })

    const { access_token, refresh_token } = data.session

    cookies.set("access-token", access_token, { path: "/", secure: true, httpOnly: true })
    cookies.set("refresh-token", refresh_token, { path: "/", secure: true, httpOnly: true })

    return redirect(302, "/app")
}