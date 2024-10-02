import { describe, it, expect, beforeEach } from 'vitest';
import { clearDb, seedFixtures } from '../seed-helpers';
import { deleteAllUsersWithAgeUnderN } from './p10';
import { prisma } from './prisma';
import { filter, pipe, sortBy } from 'remeda';

describe('p10', () => {
	beforeEach(async () => {
		await clearDb();
	});
	it('deletaAllUsersWithAgeUnderN should exist', () => {
		expect(deleteAllUsersWithAgeUnderN).toBeInstanceOf(Function);
	});

	it("shouldn't explode due to foreign key constraint issues", async () => {
		await seedFixtures();

		const didFail = await Promise.resolve()
			.then(() => deleteAllUsersWithAgeUnderN(20))
			.catch(() => 'failed');

		expect(didFail).not.toBe('failed');
	});
	it('should delete all users with age under 20', async () => {
		const { users } = await seedFixtures();
		const usersNotUnder20 = pipe(
			Object.values(users),
			filter((user) => user.age >= 20),
			sortBy((user) => user.age)
		);

		await deleteAllUsersWithAgeUnderN(20);
		const usersAfterMutation = pipe(
			await prisma.user.findMany({}),
			sortBy((user) => user.age)
		);

		console.log({ usersNotUnder20: usersNotUnder20, usersAfterMutation });
		expect(usersAfterMutation).toEqual(usersNotUnder20);
	});
});
