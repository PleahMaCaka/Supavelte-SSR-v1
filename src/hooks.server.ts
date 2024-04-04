import { isAuthorizedUser } from "@lib/Supabase"
import { type Handle, redirect } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = await isAuthorizedUser(event)

    if (event.url.pathname.startsWith("/app")) {
        if (!event.locals.user)
            throw redirect(303, "/login")
        // More rules ...
    }

    return resolve(event)
}