import { prisma } from './prisma';

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = async () => {
	return await prisma.user.findMany({
		orderBy: [{ username: 'asc' }],
	});
};
