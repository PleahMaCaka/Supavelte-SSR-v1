import { supabase } from "@lib/Supabase"
import type { Provider } from "@supabase/supabase-js"
import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"


export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password, provider } = await request.formData().then(data => {
		return {
			email: data.get("email")?.toString(),
			password: data.get("password")?.toString(),
			provider: data.get("provider")?.toString()
		}
	})

	if (provider) {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider as Provider,
			options: {
				redirectTo: import.meta.env.DEV ?
					"http://localhost:5173/api/auth/callback" :
					import.meta.env.PROD_URL + "/api/auth/callback"
			}
		})
		if (error) return new Response(error.message, { status: 500 })
		return redirect(302, data.url)
	}

	if (!email || !password) return new Response("Email and password are required", { status: 400 })

	const { data: user, error } = await supabase.auth.signInWithPassword({ email, password })

	if (error) return new Response(error.message, { status: 500 })

	const { access_token, refresh_token } = user.session

	cookies.set("access-token", access_token, {
		sameSite: "strict",
		path: "/",
		secure: true
	})

	cookies.set("refresh-token", refresh_token, {
		sameSite: "strict",
		path: "/",
		secure: true
	})

	return redirect(302, "/app")
}
