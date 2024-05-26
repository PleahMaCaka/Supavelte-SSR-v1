<script lang="ts">
	import type { HTMLInputTypeAttribute } from "svelte/elements"

	export let type: HTMLInputTypeAttribute = "text"
	export let label: string = type
</script>

<span class="label-text text-sm font-semibold">
    {label}
</span>
<label class="input input-bordered flex items-center gap-2">
	<slot />
	<input class="grow" name={type}
		   required type={type}
	/>
</label>
