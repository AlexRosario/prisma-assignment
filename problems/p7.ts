import { prisma } from './prisma';

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
	const avgScores = await prisma.starRating.aggregate({
		where: {
			userId: userId,
		},
		_avg: {
			score: true,
		},
	});
	console.log(avgScores._avg?.score);
	return avgScores._avg?.score;
};
