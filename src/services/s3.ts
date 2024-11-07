import {
	ListObjectsV2Command,
	S3Client,
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	DeleteObjectsCommand,
	type ObjectIdentifier,
} from '@aws-sdk/client-s3';

const client = new S3Client({
	credentials: {
		accessKeyId: import.meta.env.MY_AWS_ACCESS_KEY_ID,
		secretAccessKey: import.meta.env.MY_AWS_SECRET_ACCESS_KEY,
	},
	region: import.meta.env.MY_AWS_REGION,
});

export const getImagesFromBucket = async (
	bucketName: string,
	folderPrefix?: string
) => {
	const listObjectsCommand = new ListObjectsV2Command({
		Bucket: bucketName,
		Prefix: folderPrefix,
	});
	const { Contents } = await client.send(listObjectsCommand);

	const region = import.meta.env.MY_AWS_REGION;

	const folders = new Map<string, string[]>();
	Contents?.forEach((file) => {
		if (file.Key?.endsWith('/')) {
			return folders.set(file.Key, []);
		}

		const folderPrefix = file.Key?.split('/')[0] ?? 'unknown';
		const link = `https://${bucketName}.s3.${region}.amazonaws.com/${file.Key?.replaceAll(
			'+',
			'%2B'
		).replaceAll(' ', '+')}`;

		const prev = folders.get(folderPrefix) ?? [];
		folders.set(folderPrefix, [...prev, link]);
	});

	return folders;
};

export const deleteImage = async (objectKey: string) => {
	const deleteCommand = new DeleteObjectCommand({
		Bucket: import.meta.env.MY_AWS_BUCKET_NAME,
		Key: objectKey,
	});

	await client.send(deleteCommand);
};

export const batchDeleteImages = async (objectKeys: string[]) => {
	const Objects = objectKeys.map((k) => {
		return { Key: k };
	});

	const deleteCommand = new DeleteObjectsCommand({
		Bucket: import.meta.env.MY_AWS_BUCKET_NAME,
		Delete: {
			Objects,
		},
	});

	await client.send(deleteCommand);
};

export const downloadImage = async (objectKey: string) => {
	const getCommand = new GetObjectCommand({
		Bucket: import.meta.env.MY_AWS_BUCKET_NAME,
		Key: objectKey,
	});

	const response = await client.send(getCommand);
	const bytes = await response.Body?.transformToByteArray();

	return bytes;
};

export const replaceImage = async (objectKey: string, buf: Buffer) => {
	const putCommand = new PutObjectCommand({
		Bucket: import.meta.env.MY_AWS_BUCKET_NAME,
		Key: objectKey,
		Body: buf,
	});

	const response = await client.send(putCommand);
	return response;
};
