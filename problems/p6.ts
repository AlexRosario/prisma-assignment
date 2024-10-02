import { prisma } from './prisma';

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
	const userMovies = await prisma.starRating.findMany({
		where: {
			userId: userId,
		},
	});

	return await prisma.movie.findMany({
		where: {
			id: {
				in: userMovies.map((userMovie) => userMovie.movieId),
			},
		},
	});
};
