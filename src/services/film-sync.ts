import { ActionError } from 'astro:actions';
import { z } from 'astro:schema';

const schema = z.object({
	_id: z.string(),
	email_id: z.string(),
	download_link: z.string(),
	folder_name: z.string(),
	image_keys: z.string().array(),
});

export const fetchFilmScans = async () => {
	const res = await fetch(`${import.meta.env.FILM_SYNC_URL}/api/scans`);
	if (!res.ok) throw new Error('Failed to fetch film scans');

	const json = await res.json();
	const { data, error } = schema.array().safeParse(json);

	if (error)
		throw new ActionError({
			message: 'Failed to parse api response',
			code: 'INTERNAL_SERVER_ERROR',
		});

	return data;
};

export const fetchOneFilmScan = async (folder: string) => {
	const res = await fetch(
		`${import.meta.env.FILM_SYNC_URL}/api/scans/${folder}`
	);
	if (!res.ok) throw new Error(`Failed to fetch film scan "${folder}"`);

	const data = await res.json();
	const scan = schema.parse(data);

	return scan;
};
