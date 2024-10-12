import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
	credentials: {
		accessKeyId: import.meta.env.MY_AWS_ACCESS_KEY_ID,
		secretAccessKey: import.meta.env.MY_AWS_SECRET_ACCESS_KEY,
	},
	region: import.meta.env.MY_AWS_REGION,
});

export const getImagesFromBucket = async (bucketName: string) => {
	const listObjectsCommand = new ListObjectsV2Command({ Bucket: bucketName });
	const { Contents } = await client.send(listObjectsCommand);
	if (!Contents || Contents.length == 0) return [];

	const region = import.meta.env.MY_AWS_REGION;
	const links = Contents.map((file) => {
		if (file.Key?.endsWith('/')) return '';

		const link = `https://${bucketName}.s3.${region}.amazonaws.com/${file.Key?.replaceAll(
			'+',
			'%2B'
		).replaceAll(' ', '+')}`;
		console.log({ link });

		return link;
	}).filter((link) => link !== '');

	return links;
};
