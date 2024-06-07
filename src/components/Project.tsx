import type { FavoriteProject } from '../utils/projects';
import { createResource, type Component } from 'solid-js';
import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: 'TOKEN',
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
		<div class='card w-96 h-64 bg-base-100 shadow-xl image-full'>
			<figure>
				<img
					src={props.screenshots[0]}
					alt='Screenshot'
				/>
			</figure>
			<div class='card-body'>
				<h2 class='card-title'>{props.project_name}</h2>
				<p>{data()?.description}</p>
				<div class='card-actions justify-end'>
					<a
						class='btn btn-primary'
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
