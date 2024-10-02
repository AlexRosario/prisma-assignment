import { groupBy, map, reduce, sumBy } from 'remeda';
import { prisma } from './prisma';
import { StarRating } from '@prisma/client';
import { s } from 'vitest/dist/env-afee91f0';

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
	const stars = await prisma.starRating.findMany({
		include: {
			movie: true,
		},
	});

	const starTotals = stars.reduce((acc, star) => {
		if (!acc[star.movieId]) {
			acc[star.movieId] = { totalScore: 0, count: 0 };
		}
		acc[star.movieId].totalScore += star.score;
		acc[star.movieId].count += 1;
		return acc;
	}, {} as Record<number, { totalScore: number; count: number }>);

	const moviesWithAverageScoreOverN = Object.entries(starTotals)
		.filter(([_, { totalScore, count }]) => totalScore / count > n)
		.map(([movieId]) => parseInt(movieId));

	const movieObjects = await prisma.movie.findMany({
		where: {
			id: {
				in: moviesWithAverageScoreOverN,
			},
		},
	});
	return movieObjects;
};
