import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
	const usersTooYoung = await prisma.user.findMany({
		where: {
			age: {
				lt: n,
			},
		},
	});
	const userIds = usersTooYoung.map((user) => user.id);

	return await Promise.all([
		prisma.starRating.deleteMany({
			where: {
				userId: {
					in: userIds,
				},
			},
		}),
		prisma.user.deleteMany({
			where: {
				id: {
					in: userIds,
				},
			},
		}),
	]);
};
