import { type Component } from 'solid-js';

interface Props {
	title: string;
	urls: string[];
}

const FolderPreview: Component<Props> = (props) => {
	return (
		<div class='hover:opacity-50 hover:cursor-pointer flex flex-col gap-2'>
			<h3 class='text-sm text-muted-foreground text-center'>{props.title}</h3>
			<div class='gap-4 md:gap-4 grid grid-cols-2 grid-rows-2 max-w-screen-2xl'>
				<img
					src={props.urls[0]}
					alt={`photo from ${props.title}`}
				/>
				<img
					src={props.urls[1]}
					alt={`photo from ${props.title}`}
				/>
				<img
					src={props.urls[2]}
					alt={`photo from ${props.title}`}
				/>
				<img
					src={props.urls[3]}
					alt={`photo from ${props.title}`}
				/>
			</div>
		</div>
	);
};

export default FolderPreview;
