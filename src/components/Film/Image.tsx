import { createSignal, onMount, Show, type Component } from 'solid-js';

interface Props {
	src: string;
	rotation?: number;
	rounded?: boolean;
	isThumbnail?: boolean;
}

const Image: Component<Props> = (props) => {
	const [imageLoaded, setImageLoaded] = createSignal(false);
	let ref: HTMLImageElement;

	onMount(() => {
		if (ref.complete) setImageLoaded(true);
		else ref.onload = () => setImageLoaded(true);
	});

	return (
		<>
			<Show when={!imageLoaded()}>
				<div
					class={`skeleton ${
						props.isThumbnail ? 'h-24 md:h-36 w-full md:w-11/12' : 'h-64 w-4/5'
					} place-self-center  ${
						props.rounded ? 'rounded' : 'rounded-none'
					}`}></div>
			</Show>
			<img
				ref={(el) => (ref = el)}
				src={props.src}
				class={`${
					props.isThumbnail ? 'max-h-24 md:max-h-36' : 'max-h-64'
				} max-w-full place-self-center ${
					props.rounded ? 'rounded' : ''
				} transition-transform duration-500 object-contain`}
				style={{
					transform: `rotate(${props.rotation ?? 0}deg)`,
					display: imageLoaded() ? 'block' : 'none',
				}}
			/>
		</>
	);
};

export default Image;
