import { prisma } from './prisma';

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
	return prisma.user
		.findUnique({
			where: {
				id: userId,
			},
			include: {
				starRatings: {
					select: {
						movie: true,
					},
				},
			},
		})
		.then((user) => {
			return user?.starRatings.map((sr) => sr.movie) || [];
		});
};
