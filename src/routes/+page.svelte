<!-- main contents -->
<script>
	import { createActor as createPostActor } from '$lib/idlfactories/posts_canister';
	import { identity as identityStore } from '$lib/store';
	import { CANISTER_HOST, POST_CANISTER_ID } from '$lib/config';
	import { HttpAgent } from '@dfinity/agent';
	import { toasts } from 'svelte-toasts';
	// let post_actor
	let post_text = '';
	let identity = null;

    let loading_promise = false
	identityStore.subscribe((v) => {
		if (!v) {
			return;
		}

		identity = v;
	});

	function create_post() {
		let task = async () => {
            if (!identity) throw Error("You are authenticated")
            if (post_text.length == 0) {
                toasts.error("You cannot create empty post")
                return
            }
			let post_actor = createPostActor(POST_CANISTER_ID, {
				agent: new HttpAgent({ host: CANISTER_HOST, identity })
			});

            loading_promise = true
            let rslt = await post_actor.create_post({
				content: [post_text],
				post_type: {
					"NORMAL_POST": null
				},
				photos: []
			})

            console.log(rslt)

            if(rslt.Ok) {
                toasts.success("Post created successfully")
                post_text = ""
            } else {
                throw Error("Error posting to canister")
            }

		}

        task().catch(err => {
            console.log(err)
            toasts.error("Could not Send Post")
        }).finally(f => {
            loading_promise = false
        })
	}
</script>

<main
	id="site__main"
	class="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
>
	<!-- timeline -->
	<div class="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto" id="js-oversized">
		<div class="max-w-[680px] mx-auto">
			

			<!-- feed story -->
			<div class="md:w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
				<!-- add story -->
				<div
					class="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2"
				>
					<div class="flex items-center md:gap-3 gap-1">
						<div
							class="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3"
							uk-toggle="target: #create-status"
						>
							<div class="py-2.5 text-center dark:text-white">What do you have in mind?</div>
						</div>
						<div
							class="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20"
							uk-toggle="target: #create-status"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8 stroke-pink-600 fill-pink-200/70"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="#2c3e50"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M15 8h.01" />
								<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
								<path d="M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5" />
								<path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5" />
							</svg>
						</div>
						<div
							class="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20"
							uk-toggle="target: #create-status"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8 stroke-sky-600 fill-sky-200/70"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="#2c3e50"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"
								/>
								<path
									d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
								/>
							</svg>
						</div>
					</div>
                    {#if loading_promise}
                    <div class='w-full'>
                        <div class='h-1 w-full bg-current overflow-hidden'>
                          <div class='progress w-full h-full bg-primary left-right'></div>
                        </div>
                  </div>
                    {/if}
                    
				</div>

				<!-- post text-->

				<!-- placeholder -->
				<div
					class="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2"
				>
					<div class="flex gap-3">
						<div class="w-9 h-9 rounded-full bg-slate-300/20"></div>
						<div class="flex-1 space-y-3">
							<div class="w-40 h-5 rounded-md bg-slate-300/20"></div>
							<div class="w-24 h-4 rounded-md bg-slate-300/20"></div>
						</div>
						<div class="w-6 h-6 rounded-full bg-slate-300/20"></div>
					</div>

					<div class="w-full h-52 rounded-lg bg-slate-300/10 my-3"></div>

					<div class="flex gap-3">
						<div class="w-16 h-5 rounded-md bg-slate-300/20"></div>

						<div class="w-14 h-5 rounded-md bg-slate-300/20"></div>

						<div class="w-6 h-6 rounded-full bg-slate-300/20 ml-auto"></div>
						<div class="w-6 h-6 rounded-full bg-slate-300/20"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- sidebar -->
		<div class="flex-1 mt-8">
			<div
				class="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
				uk-sticky="media: 1024; end: #js-oversized; offset: 80"
			>
				<!-- Trends -->
				<div class="box p-5 px-6 border1 dark:bg-dark2">
					<div class="flex justify-between text-black dark:text-white">
						<h3 class="font-bold text-base">Trends for you</h3>
						<button type="button">
							<ion-icon name="sync-outline" class="text-xl"></ion-icon>
						</button>
					</div>

					<div
						class="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80"
					>
						<a href="#">
							<div class="flex items-center gap-3 p">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5 -mt-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
									/>
								</svg>
								<div class="flex-1">
									<h4 class="font-semibold text-black dark:text-white text-sm">
										artificial intelligence
									</h4>
									<div class="mt-0.5">1,245,62 post</div>
								</div>
							</div>
						</a>
						<a href="#" class="block">
							<div class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5 -mt-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
									/>
								</svg>
								<div class="flex-1">
									<h4 class="font-semibold text-black dark:text-white text-sm">Web developers</h4>
									<div class="mt-0.5">1,624 post</div>
								</div>
							</div>
						</a>
						<a href="#" class="block">
							<div class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5 -mt-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
									/>
								</svg>
								<div class="flex-1">
									<h4 class="font-semibold text-black dark:text-white text-sm">Ui Designers</h4>
									<div class="mt-0.5">820 post</div>
								</div>
							</div>
						</a>
						<a href="#" class="block">
							<div class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5 -mt-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
									/>
								</svg>
								<div class="flex-1">
									<h4 class="font-semibold text-black dark:text-white text-sm">
										affiliate marketing
									</h4>
									<div class="mt-0.5">480 post</div>
								</div>
							</div>
						</a>
					</div>
				</div>

				<!-- latest marketplace items -->
				<div class="box p-5 px-6 border1 dark:bg-dark2">
					<div class="flex justify-between text-black dark:text-white">
						<h3 class="font-bold text-base">Premium Photos</h3>
						<button type="button">
							<ion-icon name="sync-outline" class="text-xl"></ion-icon>
						</button>
					</div>

					<div
						class="relative capitalize font-medium text-sm text-center mt-4 mb-2"
						tabindex="-1"
						uk-slider="autoplay: true;finite: true"
					>
						<div class="overflow-hidden uk-slider-container">
							<ul class="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
								<li class="w-1/2 pr-2">
									<a href="#">
										<div class="relative overflow-hidden rounded-lg">
											<div class="relative w-full h-40">
												<img
													src="assets/images/product/product-1.jpg"
													alt=""
													class="object-cover w-full h-full inset-0"
												/>
											</div>
											<div
												class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"
											>
												$12
											</div>
										</div>
										<div class="mt-3 w-full">Chill Lotion</div>
									</a>
								</li>
								<li class="w-1/2 pr-2">
									<a href="#">
										<div class="relative overflow-hidden rounded-lg">
											<div class="relative w-full h-40">
												<img
													src="assets/images/product/product-3.jpg"
													alt=""
													class="object-cover w-full h-full inset-0"
												/>
											</div>
											<div
												class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"
											>
												$18
											</div>
										</div>
										<div class="mt-3 w-full">Gaming mouse</div>
									</a>
								</li>
								<li class="w-1/2 pr-2">
									<a href="#">
										<div class="relative overflow-hidden rounded-lg">
											<div class="relative w-full h-40">
												<img
													src="assets/images/product/product-5.jpg"
													alt=""
													class="object-cover w-full h-full inset-0"
												/>
											</div>
											<div
												class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"
											>
												$12
											</div>
										</div>
										<div class="mt-3 w-full">Herbal Shampoo</div>
									</a>
								</li>
							</ul>

							<button
								type="button"
								class="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
								uk-slider-item="previous"
							>
								<ion-icon name="chevron-back" class="text-2xl"></ion-icon></button
							>
							<button
								type="button"
								class="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
								uk-slider-item="next"
							>
								<ion-icon name="chevron-forward" class="text-2xl"></ion-icon></button
							>
						</div>
					</div>
				</div>

				<!-- online friends -->

				<!-- Pro Members -->
			</div>
		</div>
	</div>
</main>

<!-- open chat box -->
<div>
	<button
		uk-toggle="target: #create-status"
		type="button"
		class="sm:m-10 m-5 px-4 py-2.5 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow fixed bottom-0 right-0 group flex items-center gap-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>

		<div class="text-base font-semibold max-sm:hidden">Post</div>

		<svg
			class="w-6 h-6 -mr-1 hidden group-aria-expanded:block"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>

<!-- post preview modal -->
<div class="hidden lg:p-20 max-lg:!items-start" id="preview_modal" uk-modal="">
	<div
		class="uk-modal-dialog tt relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]"
	>
		<!-- image previewer -->
		<div
			class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative"
		>
			<div class="relative z-10 w-full h-full">
				<img
					src="assets/images/post/post-1.jpg"
					alt=""
					class="w-full h-full object-cover absolute"
				/>
			</div>

			<!-- close button -->
			<button
				type="button"
				class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- right sidebar -->
		<div
			class="lg:w-[400px] w-full bg-white h-full relative overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between"
		>
			<div class="p-5 pb-0">
				<!-- story heading -->
				<div class="flex gap-3 text-sm font-medium">
					<img src="assets/images/avatars/avatar-5.jpg" alt="" class="w-9 h-9 rounded-full" />
					<div class="flex-1">
						<h4 class="text-black font-medium dark:text-white">Steeve</h4>
						<div class="text-gray-500 text-xs dark:text-white/80">2 hours ago</div>
					</div>

					<!-- dropdown -->
					<div class="-m-1">
						<button type="button" class="button__ico w-8 h-8">
							<ion-icon class="text-xl" name="ellipsis-horizontal"></ion-icon>
						</button>
						<div
							class="w-[253px]"
							uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true"
						>
							<nav>
								<a href="#">
									<ion-icon class="text-xl shrink-0" name="bookmark-outline"></ion-icon> Add to favorites
								</a>
								<a href="#">
									<ion-icon class="text-xl shrink-0" name="notifications-off-outline"></ion-icon> Mute
									Notification
								</a>
								<a href="#">
									<ion-icon class="text-xl shrink-0" name="flag-outline"></ion-icon> Report this post
								</a>
								<a href="#">
									<ion-icon class="text-xl shrink-0" name="share-outline"></ion-icon> Share your profile
								</a>
								<hr />
								<a href="#" class="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50">
									<ion-icon class="text-xl shrink-0" name="stop-circle-outline"></ion-icon> Unfollow
								</a>
							</nav>
						</div>
					</div>
				</div>

				<p class="font-normal text-sm leading-6 mt-4">
					Photography is the art of capturing light with a camera. it can be fun, challenging. It
					can also be a hobby, a passion. 📷
				</p>

				<div class="shadow relative -mx-5 px-5 py-3 mt-3">
					<div class="flex items-center gap-4 text-xs font-semibold">
						<div class="flex items-center gap-2.5">
							<button type="button" class="button__ico text-red-500 bg-red-100 dark:bg-slate-700">
								<ion-icon class="text-lg" name="heart"></ion-icon>
							</button>
							<a href="#">1,300</a>
						</div>
						<div class="flex items-center gap-3">
							<button type="button" class="button__ico bg-slate-100 dark:bg-slate-700">
								<ion-icon class="text-lg" name="chatbubble-ellipses"></ion-icon>
							</button>
							<span>260</span>
						</div>
						<button type="button" class="button__ico ml-auto">
							<ion-icon class="text-xl" name="share-outline"></ion-icon>
						</button>
						<button type="button" class="button__ico">
							<ion-icon class="text-xl" name="bookmark-outline"></ion-icon>
						</button>
					</div>
				</div>
			</div>

			<div class="p-5 h-full overflow-y-auto flex-1">
				<!-- comment list -->
				<div class="relative text-sm font-medium space-y-5">
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-2.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Steeve </a>
							<p class="mt-0.5">What a beautiful, I love it. 😍</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-3.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Monroe </a>
							<p class="mt-0.5">You captured the moment.😎</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-7.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Alexa </a>
							<p class="mt-0.5">This photo is amazing!</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-4.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> John </a>
							<p class="mt-0.5">Wow, You are so talented 😍</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-5.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Michael </a>
							<p class="mt-0.5">I love taking photos 🌳🐶</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-3.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Monroe </a>
							<p class="mt-0.5">Awesome. 😊😢</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-5.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Jesse </a>
							<p class="mt-0.5">Well done 🎨📸</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-2.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Steeve </a>
							<p class="mt-0.5">What a beautiful, I love it. 😍</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-7.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Alexa </a>
							<p class="mt-0.5">This photo is amazing!</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-4.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> John </a>
							<p class="mt-0.5">Wow, You are so talented 😍</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-5.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Michael </a>
							<p class="mt-0.5">I love taking photos 🌳🐶</p>
						</div>
					</div>
					<div class="flex items-start gap-3 relative">
						<img
							src="assets/images/avatars/avatar-3.jpg"
							alt=""
							class="w-6 h-6 mt-1 rounded-full"
						/>
						<div class="flex-1">
							<a href="#" class="text-black font-medium inline-block dark:text-white"> Monroe </a>
							<p class="mt-0.5">Awesome. 😊😢</p>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-white p-3 text-sm font-medium flex items-center gap-2">
				<img src="assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full" />

				<div class="flex-1 relative overflow-hidden">
					<textarea
						placeholder="Add Comment...."
						rows="1"
						class="w-full resize- px-4 py-2 focus:!border-transparent focus:!ring-transparent resize-y"
					></textarea>

					<div class="flex items-center gap-2 absolute bottom-0.5 right-0 m-3">
						<ion-icon class="text-xl flex text-blue-700" name="image"></ion-icon>
						<ion-icon class="text-xl flex text-yellow-500" name="happy"></ion-icon>
					</div>
				</div>

				<button
					type="submit"
					class="hidden text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
				>
					Replay</button
				>
			</div>
		</div>
	</div>
</div>

<!-- create status -->
<div class="hidden lg:p-20 uk- open" id="create-status" uk-modal="">
	<div
		class="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2"
	>
		<div class="text-center py-4 border-b mb-0 dark:border-slate-700">
			<h2 class="text-sm font-medium text-black">Create Status</h2>

			<!-- close button -->
			<button type="button" class="button-icon absolute top-0 right-0 m-2.5 uk-modal-close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="space-y-5 mt-3 p-2">
			<textarea
				class="w-full !text-black placeholder:!text-black !bg-white !border-transparent focus:!border-transparent focus:!ring-transparent !font-normal !text-xl dark:!text-white dark:placeholder:!text-white dark:!bg-slate-800"
				name=""
				id=""
				rows="6"
                bind:value={post_text}
                maxlength="280"
				placeholder="What do you have in mind?"
			></textarea>
		</div>

		<div class="flex items-center gap-2 text-sm py-2 px-4 font-medium flex-wrap">
			<button
				type="button"
				class="flex items-center gap-1.5 bg-sky-50 text-sky-600 rounded-full py-1 px-2 border-2 border-sky-100 dark:bg-sky-950 dark:border-sky-900"
			>
				<ion-icon name="image" class="text-base"></ion-icon>
				Image
			</button>
			<button
				type="button"
				class="flex items-center gap-1.5 bg-teal-50 text-teal-600 rounded-full py-1 px-2 border-2 border-teal-100 dark:bg-teal-950 dark:border-teal-900"
			>
				<ion-icon name="videocam" class="text-base"></ion-icon>
				Video
			</button>
			<button
				type="button"
				class="flex items-center gap-1.5 bg-orange-50 text-orange-600 rounded-full py-1 px-2 border-2 border-orange-100 dark:bg-yellow-950 dark:border-yellow-900"
			>
				<ion-icon name="happy" class="text-base"></ion-icon>
				Feeling
			</button>
			<button
				type="button"
				class="flex items-center gap-1.5 bg-red-50 text-red-600 rounded-full py-1 px-2 border-2 border-rose-100 dark:bg-rose-950 dark:border-rose-900"
			>
				<ion-icon name="location" class="text-base"></ion-icon>
				Check in
			</button>
			<button
				type="button"
				class="grid place-items-center w-8 h-8 text-xl rounded-full bg-secondery"
			>
				<ion-icon name="ellipsis-horizontal"></ion-icon>
			</button>
		</div>

		<div class="p-5 flex justify-between items-center">
			<div>
				<button
					class="inline-flex items-center py-1 px-2.5 gap-1 font-medium text-sm rounded-full bg-slate-50 border-2 border-slate-100 group aria-expanded:bg-slate-100 aria-expanded: dark:text-white dark:bg-slate-700 dark:border-slate-600"
					type="button"
				>
					Everyone
					<ion-icon
						name="chevron-down-outline"
						class="text-base duration-500 group-aria-expanded:rotate-180"
					></ion-icon>
				</button>

				<div
					class="p-2 bg-white rounded-lg shadow-lg text-black font-medium border border-slate-100 w-60 dark:bg-slate-700"
					uk-drop="offset:10;pos: bottom-left; reveal-left;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left ; mode:click"
				>
					<form>
						<label>
							<input
								type="radio"
								name="radio-status"
								id="monthly1"
								class="peer appearance-none hidden"
								checked
							/>
							<div
								class=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3"
							>
								<div class="text-sm">Everyone</div>
								<ion-icon
									name="checkmark-circle"
									class="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up"
								></ion-icon>
							</div>
						</label>
						<label>
							<input
								type="radio"
								name="radio-status"
								id="monthly1"
								class="peer appearance-none hidden"
							/>
							<div
								class=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3"
							>
								<div class="text-sm">Friends</div>
								<ion-icon
									name="checkmark-circle"
									class="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up"
								></ion-icon>
							</div>
						</label>
						<label>
							<input
								type="radio"
								name="radio-status"
								id="monthly"
								class="peer appearance-none hidden"
							/>
							<div
								class=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3"
							>
								<div class="text-sm">Only me</div>
								<ion-icon
									name="checkmark-circle"
									class="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up"
								></ion-icon>
							</div>
						</label>
					</form>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<button type="button" on:click={create_post} class="button bg-blue-500 text-white py-2 px-12 text-[14px] uk-modal-close">
					Create</button
				>
			</div>
		</div>
	</div>
</div>

<!-- create story -->
<div class="hidden lg:p-20" id="create-story" uk-modal="">
	<div
		class="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white p-7 shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2"
	>
		<div class="text-center py-3 border-b -m-7 mb-0 dark:border-slate-700">
			<h2 class="text-sm font-medium">Create Status</h2>

			<!-- close button -->
			<button type="button" class="button__ico absolute top-0 right-0 m-2.5 uk-modal-close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="space-y-5 mt-7">
			<div>
				<label for="" class="text-base">What do you have in mind? </label>
				<input type="text" bind:value={post_text} class="w-full mt-3" maxlength="280" />
			</div>

			<div>
				<div
					class="w-full h-72 relative border1 rounded-lg overflow-hidden bg-[url('../images/ad_pattern.png')] bg-repeat"
				>
					<label
						for="createStatusUrl"
						class="flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 w-full pb-6 pt-10 cursor-pointer bg-gradient-to-t from-gray-700/60"
					>
						<input id="createStatusUrl" type="file" class="hidden" />
						<ion-icon name="image" class="text-3xl text-teal-600"></ion-icon>
						<span class="text-white mt-2">Browse to Upload image </span>
					</label>

					<img
						id="createStatusImage"
						src="#"
						alt="Uploaded Image"
						accept="image/png, image/jpeg"
						style="display:none;"
						class="w-full h-full absolute object-cover"
					/>
				</div>
			</div>

			<div class="flex justify-between items-center">
				<div class="flex items-start gap-2">
					<ion-icon
						name="time-outline"
						class="text-3xl text-sky-600 rounded-full bg-blue-50 dark:bg-transparent"
					></ion-icon>
					<p class="text-sm text-gray-500 font-medium">
						Your Status will be available <br /> for <span class="text-gray-800"> 24 Hours</span>
					</p>
				</div>

				<button type="button" class="button bg-blue-500 text-white px-8"> Create</button>
			</div>
		</div>
	</div>
</div>
