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

	const removeImage = async (imageSrc: string) => {
		'use server';

		const imageName = imageSrc.split('/').at(-1);

		toast.promise(
			actions.removeImage({
				objectKey: `${props.folder}/${imageName}`,
				userId: session().data.user.id,
			}),
			{
				loading: 'Removing...',
				success: () => <span>Removed {imageName}</span>,
				error: <span>Failed to remove {imageName}</span>,
			}
		);

		navigate(`/film/${props.folder}/edit`);
	};

	return (
		<ul class='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 items-center'>
			<For each={props.images}>
				{(imageSrc) => (
					<EditImage
						src={imageSrc}
						folder={props.folder}
						removeImage={() => removeImage(imageSrc)}
					/>
				)}
			</For>
		</ul>
	);
};

export default EditList;
