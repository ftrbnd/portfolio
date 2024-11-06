import { For, type Component } from 'solid-js';
import EditImage from './EditImage';

interface Props {
	images: string[];
	folder: string;
}

const EditList: Component<Props> = (props) => {
	return (
		<ul class='flex flex-col items-center'>
			<For each={props.images}>
				{(imageSrc) => (
					<li class='flex gap-1 w-full max-h-48'>
						<EditImage
							src={imageSrc}
							folder={props.folder}
						/>
					</li>
				)}
			</For>
		</ul>
	);
};

export default EditList;
