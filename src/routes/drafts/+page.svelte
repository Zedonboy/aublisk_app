<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import {createActor, idlFactory} from "$lib/idlfactories/aublisk_icp_backend"
	import type { NftType, NftDataValue, Extension } from "$lib/idlfactories/aublisk_icp_backend/aublisk_icp_backend.did";
	import {NFT_CANISTER_ID, CANISTER_HOST} from "$lib/config"
	import { v4 as uuidv4 } from 'uuid';
	import type { Identity} from '@dfinity/agent';
	import { Actor, HttpAgent} from '@dfinity/agent';
	import {dev} from "$app/environment"
	import { AuthClient, } from "@dfinity/auth-client";
	import type { Stores } from 'svelte/store';
	let nft_actor = createActor(NFT_CANISTER_ID, {agent: new HttpAgent({host : CANISTER_HOST})})
	let articles = [];
	let identityContext : Stores = getContext("identity")
	onMount(() => {
		let request = window.indexedDB.open('aublisk_db');
		request.onsuccess = (event) => {
			let db = event.target.result;
			let article_store = db.transaction('article_store', 'readwrite').objectStore('article_store');
			let all_req = article_store.getAll();
			all_req.onsuccess = (ev) => {
				console.log(ev.target.result);
				articles = ev.target.result;
			};
		};
	});

	async function on_mint() {
		if (identityContext) {
			let r = await nft_actor.dip721_mint($identityContext.getPrincipal(), uuidv4(), [], [{
				content: {BlobContent: []},
				nft_type: {"ARTICLE" : null},
				extension: {DEFAULT : null}
			}])

			console.log(r)
		}
	}
</script>

<main
	id="site__main"
	class="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
>

{#if articles.length == 0}
          <div class="w-full h-full flex items-center justify-center">
        <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
            <div class="mt-2">
              <button type="button" class="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                New Project
              </button>
            </div>
          </div>
    </div>
	{:else}
	<aside aria-label="Related articles" class="py-8 lg:py-24 bg-white dark:bg-gray-900 antialiased">
		<div class="px-4 mx-auto max-w-screen-xl">
			<h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Saved Articles</h2>
			<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        
				{#each articles as article}
					<article class="max-w-xs">
						<a href="#">
							<img
								src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
								class="mb-5 rounded-lg"
								alt="Image 1"
							/>
						</a>
						<h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
							<a href="#">Our first office</a>
						</h2>
						<p class="mb-4 text-gray-500 dark:text-gray-400">
							Over the past year, Volosoft has undergone many changes! After months of preparation.
						</p>
						<button
						on:click={on_mint}
							class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
						>
							Convert To NFT
            </button>
					</article>
				{/each}
			</div>
		</div>
	</aside>
        {/if}
	
	
</main>
