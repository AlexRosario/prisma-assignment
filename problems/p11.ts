import { prisma } from './prisma';

export const createUserWithData = async ({
	username,
	age,
}: {
	username: string;
	age: number;
}) => {
	return await prisma.user.create({
		data: {
			username: username,
			age: age,
		},
	});
};
