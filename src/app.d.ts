// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@supabase/supabase-js"

declare global {
	namespace App {
		// interface Error {}
		// noinspection JSUnusedGlobalSymbols
		interface Locals {
			user: User | null
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
