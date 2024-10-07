import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = (n: number) => {
	return prisma.user.deleteMany({
		where: {
			age: {
				lt: n,
			},
		},
	});
};
