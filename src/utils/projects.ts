export interface FavoriteProject {
	repository_name: string;
	project_name: string;
	screenshots: string[];
}

export const favorites: FavoriteProject[] = [
	{
		repository_name: 'on-tour',
		project_name: 'On Tour',
		screenshots: [
			'https://camo.githubusercontent.com/be17da803ee8d680b933bf521907c7540b211c5e4d4986ace7db2d2329b7c60c/68747470733a2f2f692e696d6775722e636f6d2f64344942524a462e706e67',
			'https://camo.githubusercontent.com/39d52c4047c92a54a421e603241641d1ba502a1e89ebe639f739320ff2c8277d/68747470733a2f2f692e696d6775722e636f6d2f5548356d5242612e706e67',
			'https://camo.githubusercontent.com/36ea055fcb537f74e5fe6454cc9a50a25a37f39b0112904f5dbde055da07e6f8/68747470733a2f2f692e696d6775722e636f6d2f4763615a6e766a2e706e67',
			'https://camo.githubusercontent.com/2e6db8a0d1a8b6eb56619a5d2c2b565e1dc6df9417a5fd53fc5371c9df1f139b/68747470733a2f2f692e696d6775722e636f6d2f4f4e4d523050392e706e67',
		],
	},
	{
		repository_name: 'eden-heardle',
		project_name: 'EDEN Heardle',
		screenshots: [
			'https://camo.githubusercontent.com/06c7ac9fcc287880299483bead7d1caeb9e5c9e22904a9a066bcfe366252215f/68747470733a2f2f692e696d6775722e636f6d2f4f7a45545778532e706e67',
			'https://camo.githubusercontent.com/71a00e9781cadd280157f3f6f2eab7e0a32d3c7b79fd5876526d5c04d450770c/68747470733a2f2f692e696d6775722e636f6d2f64567234414f422e706e67',
			'https://camo.githubusercontent.com/4f64fc7dd918be78a86cdb46c29fbcabaad981223c78d4a71fe80cb5f0ab9e00/68747470733a2f2f692e696d6775722e636f6d2f7730573443464e2e706e67',
		],
	},
	{
		repository_name: 'futurebound-bot',
		project_name: 'Futurebound Bot',
		screenshots: [
			'https://camo.githubusercontent.com/1cb2507ba4920c8655a9567eae7c2460c6b1d620827b44a1b5f114d5f70faacf/68747470733a2f2f692e696d6775722e636f6d2f33547954494b652e706e67',
			'https://camo.githubusercontent.com/2689524ab953ff61da04ae7a61c45f0a0a6b6b55eae554beab6449f09e2d045b/68747470733a2f2f692e696d6775722e636f6d2f305364326b58572e706e67',
		],
	},
];
