import { For, type Component } from 'solid-js';
import EditImage from './EditImage';
import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { client } from '../../utils/auth/client';

interface Props {
	images: string[];
	folder: string;
}

const EditList: Component<Props> = (props) => {
	const session = client.useSession();

	const removeImage = async (imageSrc: string) => {
		'use server';

		const imageName = imageSrc.split('/').at(-1);
		const { error } = await actions.removeImage({
			objectKey: `${props.folder}/${imageName}`,
			userId: session().data.user.id,
		});

		if (!error) {
			navigate(`/film/${props.folder}/edit`);
		} else {
			console.error(error);
		}
	};

	return (
		<ul class='flex flex-col items-center'>
			<For each={props.images}>
				{(imageSrc) => (
					<li class='flex gap-1 w-full max-h-48'>
						<EditImage
							src={imageSrc}
							folder={props.folder}
							removeImage={() => removeImage(imageSrc)}
						/>
					</li>
				)}
			</For>
		</ul>
	);
};

export default EditList;
