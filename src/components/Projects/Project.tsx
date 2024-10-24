import type { FavoriteProject } from '../../utils/constants';
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
						href={data()?.html_url}
						target='_blank'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width={1.5}
							stroke='currentColor'
							class='size-6'>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5'
							/>
						</svg>
						Repo
					</a>
					<a
						class='btn btn-primary'
						href={data()?.homepage ?? data()?.html_url}
						target='_blank'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width={1.5}
							stroke='currentColor'
							class='size-6'>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
							/>
						</svg>
						Visit
					</a>
				</div>
			</div>
		</div>
	);
};

export default Project;
