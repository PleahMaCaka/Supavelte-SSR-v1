import { writable } from "svelte/store"

export interface StateStore {
    unreadNotify: boolean
}

export const stateStore = (() => {
    const { set, subscribe, update } = writable<StateStore>({
        unreadNotify: true
    })

    return {
        subscribe,
        set,
        update
    }
})()