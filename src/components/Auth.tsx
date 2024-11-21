import { Show, type Component } from 'solid-js';
import { client, signIn } from '../utils/auth/client';
import toast from 'solid-toast';

const Auth: Component = () => {
	const session = client.useSession();

	return (
		<Show
			when={session().data}
			fallback={
				<div
					class='tooltip tooltip-left'
					data-tip='Sign in'>
					<button
						onClick={signIn}
						class='btn btn-ghost'>
						<svg
							class='size-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'>
							<path d='M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z' />
						</svg>
					</button>
				</div>
			}>
			<div class='flex items-center'>
				<p class='text-xs md:text-sm'>
					signed in as <span class='font-bold'>{session().data.user.name}</span>
				</p>
				<div
					class='tooltip tooltip-left'
					data-tip='Sign out'>
					<button
						onClick={() => {
							toast.promise(client.signOut(), {
								loading: 'Signing out...',
								success: () => <span>Successfully signed out</span>,
								error: <span>Failed to sign out!</span>,
							});
							window.location.reload();
						}}
						class='btn btn-ghost'>
						<svg
							class='size-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'>
							<path d='M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z' />
						</svg>
					</button>
				</div>
			</div>
		</Show>
	);
};

export default Auth;
