import { For, type Component } from 'solid-js';
import EditImage from './EditImage';
import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { client } from '../../utils/auth/client';
import toast from 'solid-toast';

interface Props {
	images: string[];
	folder: string;
}

const EditList: Component<Props> = (props) => {
	const session = client.useSession();

	const removeImage = async (imageUrl: string) => {
		'use server';
		const imageName = imageUrl.split('/').at(-1);

		await toast.promise(
			actions.removeImage({
				objectKey: `${props.folder}/${imageName}`,
				userId: session().data.user.id,
			}),
			{
				loading: `Removing ${imageName}...`,
				success: () => <span>Removed {imageName}</span>,
				error: <span>Failed to remove {imageName}</span>,
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

	return (
		<ul class='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 items-center'>
			<For each={props.images}>
				{(imageSrc) => (
					<EditImage
						src={imageSrc}
						folder={props.folder}
						removeImage={() => removeImage(imageSrc)}
						saveRotation={saveRotation}
					/>
				)}
			</For>
		</ul>
	);
};

export default EditList;
