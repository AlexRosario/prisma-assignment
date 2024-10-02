import { maxBy, minBy } from 'remeda';
import { prisma } from './prisma';

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
	const criticScores = await prisma.starRating.groupBy({
		by: ['userId'],
		_avg: {
			score: true,
		},
	});
	const grumpiestCritic = await prisma.user.findUnique({
		where: {
			id: minBy(criticScores, (critic) => critic._avg?.score ?? 0)?.userId,
		},
	});
	return grumpiestCritic?.id;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
	const criticScores = await prisma.starRating.groupBy({
		by: ['userId'],
		_avg: {
			score: true,
		},
	});
	const nicestCritic = await prisma.user.findUnique({
		where: {
			id: maxBy(criticScores, (critic) => critic._avg?.score ?? 0)?.userId,
		},
	});
	return nicestCritic?.id;
};
