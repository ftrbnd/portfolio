import { type Component } from 'solid-js';

interface Props {
	src: string;
	folder: string;
}

const EditImage: Component<Props> = (props) => {
	const imageName = props.src.split('/').at(-1);

	const revealModal = () => {
		(
			document.getElementById(`delete_modal_${imageName}`) as HTMLDialogElement
		)?.showModal();
	};

	const removeImage = () => {
		console.log('TODO');
	};

	return (
		<>
			<div class='flex gap-2 items-center'>
				<img
					class='h-1/2'
					src={props.src}
					alt={`photo from ${props.folder}`}
				/>
				<p>{imageName}</p>
			</div>
			<div class='flex gap-2 items-center'>
				<div
					class='tooltip'
					data-tip='Rotate'>
					<button class='btn btn-secondary'>
						<svg
							class='size-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'>
							<path d='M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z' />
						</svg>
					</button>
				</div>
				<div
					class='tooltip'
					data-tip='Delete'>
					<button
						class='btn btn-error'
						onclick={revealModal}>
						<svg
							class='size-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'>
							<path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z' />
						</svg>
					</button>
					<dialog
						id={`delete_modal_${imageName}`}
						class='modal modal-bottom sm:modal-middle'>
						<div class='modal-box text-zinc-100'>
							<h3 class='font-bold text-lg'>Delete {imageName}?</h3>
							<p class='py-4'>
								Confirm to remove the image from the collection.
							</p>
							<div class='modal-action'>
								<button
									onclick={removeImage}
									class='btn btn-danger'>
									Confirm
								</button>
							</div>
						</div>
						<form
							method='dialog'
							class='modal-backdrop'>
							<button>Close</button>
						</form>
					</dialog>
				</div>
			</div>
		</>
	);
};

export default EditImage;
