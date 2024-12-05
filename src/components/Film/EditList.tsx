import { createSignal, For, Show, type Component } from 'solid-js';
import EditImage from './EditImage';
import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import toast from 'solid-toast';
import type { PhotoCollectionEntry } from '../../content.config';

interface Props {
	photos: PhotoCollectionEntry[];
	folder: string;
}

const EditList: Component<Props> = (props) => {
	const [checkedImages, setCheckedImages] = createSignal<string[]>([]);
	const amount = () => checkedImages().length;

	const removeImage = async (publicId: string) => {
		'use server';
		await toast.promise(
			actions.removeImage({
				publicId,
			}),
			{
				loading: `Removing ${publicId}...`,
				success: () => <span>Removed {publicId}</span>,
				error: <span>Failed to remove {publicId}</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const removeCheckedImages = async () => {
		'use server';

		await toast.promise(
			actions.batchRemoveImages({
				publicIds: checkedImages(),
			}),
			{
				loading: `Removing ${amount()} photos...`,
				success: () => <span>Removed {amount()} photos</span>,
				error: <span>Failed to remove {amount()} photos</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const saveRotation = async (publicId: string, angle: number) => {
		'use server';

		await toast.promise(
			actions.saveRotatedImage({
				publicId,
				angle,
			}),
			{
				loading: `Rotating ${publicId}...`,
				success: () => <span>Successfully rotated {publicId}!</span>,
				error: <span>Failed to rotate {publicId}</span>,
			}
		);

		await navigate(`/film/${props.folder}/edit`);
	};

	const updateCheckedImages = (publicId: string) => {
		setCheckedImages((prev) => {
			if (prev.includes(publicId)) {
				return prev.filter((id) => id !== publicId);
			}
			return prev.concat(publicId);
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
			<For each={props.photos}>
				{(photo) => (
					<EditImage
						photo={photo}
						removeImage={() => removeImage(photo.data.public_id)}
						saveRotation={saveRotation}
						isChecked={checkedImages().includes(photo.data.public_id)}
						onCheck={() => updateCheckedImages(photo.data.public_id)}
					/>
				)}
			</For>
		</ul>
	);
};

export default EditList;
