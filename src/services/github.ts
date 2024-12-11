import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: import.meta.env.GITHUB_TOKEN,
});

export const username = 'ftrbnd';

export const fetchRepository = async (repository_name: string) => {
	const res = await octokit.request(`GET /repos/{owner}/{repo}`, {
		owner: username,
		repo: repository_name,
	});

	return res.data;
};
