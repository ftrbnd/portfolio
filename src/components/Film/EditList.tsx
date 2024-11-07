import { createSignal, For, Show, type Component } from 'solid-js';
import EditImage from './EditImage';
import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import toast from 'solid-toast';

interface Props {
	images: string[];
	folder: string;
}

const EditList: Component<Props> = (props) => {
	const [checkedImages, setCheckedImages] = createSignal<string[]>([]);
	const amount = () => checkedImages().length;

	const removeImage = async (imageUrl: string) => {
		'use server';
		const imageName = imageUrl.split('/').at(-1);

		await toast.promise(
			actions.removeImage({
				objectKey: `${props.folder}/${imageName}`,
			}),
			{
				loading: `Removing ${imageName}...`,
				success: () => <span>Removed {imageName}</span>,
				error: <span>Failed to remove {imageName}</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const removeCheckedImages = async () => {
		'use server';
		const objectKeys = checkedImages().map((url) => {
			const imageName = url.split('/').at(-1);
			return `${props.folder}/${imageName}`;
		});

		await toast.promise(
			actions.batchRemoveImages({
				objectKeys,
			}),
			{
				loading: `Removing ${amount()} photos...`,
				success: () => <span>Removed {amount()} photos</span>,
				error: <span>Failed to remove {amount()} photos</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const saveRotation = async (imageUrl: string, degrees: number) => {
		'use server';
		const imageName = imageUrl.split('/').at(-1);

		await toast.promise(
			actions.saveRotatedImage({
				objectKey: `${props.folder}/${imageName}`,
				degrees,
			}),
			{
				loading: `Rotating ${imageName}...`,
				success: () => <span>Successfully rotated {imageName}!</span>,
				error: <span>Failed to rotate {imageName}</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const updateCheckedImages = (imageUrl: string) => {
		setCheckedImages((prev) => {
			if (prev.includes(imageUrl)) {
				return prev.filter((url) => url !== imageUrl);
			}
			return prev.concat(imageUrl);
		});
	};

	return (
		<ul class='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 items-center'>
			<Show when={amount() > 0}>
				<div class='flex gap-1 self-end md:place-self-end md:col-span-full'>
					<button
						onclick={() => setCheckedImages([])}
						class='btn btn-info'>
						Deselect all
					</button>
					<button
						onclick={removeCheckedImages}
						class='btn btn-error'>
						Delete {amount()} {amount() > 1 ? 'images' : 'image'}
					</button>
				</div>
			</Show>
			<For each={props.images}>
				{(imageUrl) => (
					<EditImage
						src={imageUrl}
						folder={props.folder}
						removeImage={() => removeImage(imageUrl)}
						saveRotation={saveRotation}
						isChecked={checkedImages().includes(imageUrl)}
						onCheck={() => updateCheckedImages(imageUrl)}
					/>
				)}
			</For>
		</ul>
	);
};

export default EditList;
