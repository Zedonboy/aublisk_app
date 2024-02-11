<script lang="ts">
	import { onMount} from 'svelte';
	import {identity as identityStore} from "$lib/store"
	import { createActor } from '$lib/idlfactories/aublisk_icp_backend';
	import { createActor as createMarketPlaceActor } from '$lib/idlfactories/marketplace_canister';
	import type { NFTData } from '$lib/idlfactories/aublisk_icp_backend/aublisk_icp_backend.did';
	import { NFT_CANISTER_ID, CANISTER_HOST, MARKETPLACE_CANISTER_ID } from '$lib/config';
	import { Actor, HttpAgent } from '@dfinity/agent';
	import { toasts } from 'svelte-toasts';
	
	let nfts_vec: NFTData[] = [];
	let deposit_address = 'xxxxx';

	identityStore.subscribe((identity) => {
		if(!identity) return
		let nft_actor = createActor(NFT_CANISTER_ID, {
				agent: new HttpAgent({ host: CANISTER_HOST, identity })
			});
			let market_actor = createMarketPlaceActor(MARKETPLACE_CANISTER_ID, {
				agent: new HttpAgent({ host: CANISTER_HOST, identity })
			});
			nft_actor.owner_nftdata().then(d => {
				nfts_vec = d
			});
			market_actor.get_nft_deposit_address().then(addr => {
				deposit_address = addr
			});
			
	})
	
</script>

<main
	id="site__main"
	class="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
>
	<div
		class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
		role="alert"
	>
		<svg
			class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path
				d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
			/>
		</svg>
		<span class="sr-only">Info</span>
		<div>
			<span class="font-medium">To sell your Content as NFT</span>
			<ol class="mt-1.5 list-decimal list-inside">
				<li>Transfer Your Content to this icrc address {deposit_address}</li>
				<li>Go to Marketplace, find your content place a Sell Order</li>
				<!-- <li>Inclusion of at least one special character, e.g., ! @ # ?</li> -->
			</ol>
		</div>
	</div>
	{#if nfts_vec.length == 0}
		<div class="w-full h-full flex items-center justify-center">
			<div class="text-center">
				<svg
					class="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						vector-effect="non-scaling-stroke"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/>
				</svg>
				<h3 class="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
				<p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
				<div class="mt-2">
					<button
						type="button"
						class="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						<svg
							class="-ml-0.5 mr-1.5 h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
						New Project
					</button>
				</div>
			</div>
		</div>
	{:else}
		<aside
			aria-label="Related articles"
			class="py-8 lg:py-12 bg-white dark:bg-gray-900 antialiased"
		>
			<div class="px-4 mx-auto max-w-screen-xl">
				<h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Minted NFTs</h2>
				<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
					{#each nfts_vec as article}
						<article class="max-w-xs">
							<a href="#">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
									class="mb-5 rounded-lg"
									alt="Image 1"
								/>
							</a>
							<h2
								class="mb-2 text-xl flex justify-between items-center font-bold leading-tight text-gray-900 dark:text-white"
							>
								<a href="#">Our first office</a>
								<button type="button" class="button-icon w-8 h-8">
									<ion-icon class="text-xl" name="ellipsis-horizontal"></ion-icon>
								</button>
								<div
									class="w-[245px] shadow"
									uk-dropdown="pos: top-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
								>
									<nav>
										<button class="flex items-center hover:text-primary w-full border border-primary p-1">
											 Transfer to icrc address
										</button>
										<button class="flex items-center hover:text-primary w-full border border-primary p-1">
											Export to another blockchain
									   </button>
									   <button class="flex items-center hover:text-primary w-full border border-primary p-1">
										Transfer Ownership
								   </button>
								   <button class="flex items-center text-red-500 hover:text-red-700 w-full border border-primary p-1">
									Burn
							   </button>
									</nav>
								</div>
							</h2>
							<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
								Over the past year, Volosoft has undergone many changes! After months of
								preparation.
							</p>
							<button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Read</button>
						</article>
					{/each}
				</div>
			</div>
		</aside>
	{/if}
</main>
