import type { FavoriteProject } from '../../utils/projects';
import { createResource, type Component } from 'solid-js';
import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: import.meta.env.GITHUB_TOKEN,
});

const fetchRepository = async (repository_name: string) => {
	const res = await octokit.request(`GET /repos/{owner}/{repo}`, {
		owner: 'ftrbnd',
		repo: repository_name,
	});

	return res.data;
};

const Project: Component<FavoriteProject> = (props) => {
	const [data] = createResource(props.repository_name, fetchRepository);

	return (
		<div class='card w-full flex-1 bg-base-100 shadow-xl image-full'>
			<figure>
				<img
					src={props.screenshots[0]}
					alt='Screenshot'
					class='max-h-72 min-h-72'
				/>
			</figure>
			<div class='card-body'>
				<h2 class='card-title'>{props.project_name}</h2>
				<p>{data()?.description}</p>
				<div class='card-actions justify-end'>
					<a
						class='btn btn-secondary'
						href={data()?.homepage ?? data()?.html_url}
						target='_blank'>
						Visit
					</a>
				</div>
			</div>
		</div>
	);
};

export default Project;
