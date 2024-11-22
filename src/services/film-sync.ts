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

	const data = await res.json();
	const scans = schema.array().parse(data);

	return scans;
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
