<script lang="ts">
    import { stateStore } from "@stores/StateStore"
    import { get } from "svelte/store"
</script>

<div class="navbar bg-base-100 shadow-xl rounded-b-box gap-2 px-4">
    <div class="flex-none">
        <button class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-5 h-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">The App</a>
    </div>
    <div class="navbar-end">
        <!-- Notification -->
        <div class="dropdown dropdown-end">
            <button class="btn btn-ghost btn-circle" tabindex="0">
            <span class="indicator">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor"><path
                         stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                {#if get(stateStore).unreadNotify}
                    <span class="badge badge-xs badge-primary indicator-item"/>
                {/if}
            </span>
            </button>
            <div class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-96">
                <div class="card-body">
                    <div role="alert" class="alert shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             class="stroke-info shrink-0 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h3 class="font-bold">New message!</h3>
                            <div class="text-xs">You have 1 unread message</div>
                        </div>
                        <button class="btn btn-sm">See</button>
                    </div>
                    <p class="self-center bg-zinc-900 px-2 py-0.5 mt-1 rounded-box"><a href="/app/notify">See all >></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- Profile-->
    <div class="flex-none">
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt="User Profile"
                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                </div>
            </div>
            <!-- Profile Dropdown-->
            <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
                <li><a href="/app/settings#profile">Profile</a></li>
                <li><a href="/app/settings">Settings</a></li>
                <li><a href="/api/auth/logout">Logout</a></li>
            </ul>
        </div>
    </div>
</div>