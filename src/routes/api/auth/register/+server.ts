import { supabase } from "@lib/Supabase"
import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"


export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.formData().then(data => {
        return {
            email: data.get("email")?.toString(),
            password: data.get("password")?.toString()
        }
    })

    if (!email || !password) return new Response("Missing email or password", { status: 400 })

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) return new Response(error.message, { status: 400 })

    return redirect(302, "/signin")
}