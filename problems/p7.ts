import { prisma } from './prisma';

// get average score for a user
export const getAverageScoreForUser = (userId: number) => {
	return prisma.starRating
		.aggregate({
			where: {
				userId: userId,
			},
			_avg: {
				score: true,
			},
		})
		.then((result) => {
			return result._avg.score;
		});
};
