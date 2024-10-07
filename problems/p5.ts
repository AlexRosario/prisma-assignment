import { groupBy, map, reduce, sumBy } from 'remeda';
import { prisma } from './prisma';
import { StarRating } from '@prisma/client';
import { s } from 'vitest/dist/env-afee91f0';

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
	const moviesByStarRating = await prisma.starRating.groupBy({
		by: ['movieId'],
		having: {
			score: {
				_avg: {
					gt: n,
				},
			},
		},
	});

	return await prisma.movie.findMany({
		where: {
			id: {
				in: moviesByStarRating.map((m) => m.movieId),
			},
		},
	});
};
