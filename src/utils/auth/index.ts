import dotenv from 'dotenv';
dotenv.config();

import { betterAuth } from 'better-auth';
import pg from 'pg';
const { Pool } = pg;

export const auth = betterAuth({
	database: new Pool({
		connectionString: import.meta.env.DATABASE_URL,
	}),
	socialProviders: {
		github: {
			clientId: import.meta.env.GITHUB_CLIENT_ID,
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
		},
	},
});
