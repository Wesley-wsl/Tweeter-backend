/* eslint-disable no-await-in-loop */
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowWhoFollowUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(userId: string) {
        const userAuthenticated = await this.usersRepository.findById(
            userId,
            true,
        );

        if (!userAuthenticated) throw new Error("User not found.");

        const queue = [...userAuthenticated.following_id];
        const readed: string[] = [];
        const whoFollow: string[] = [];

        if (queue.length === 0) {
            let allUsers = await this.usersRepository.findAllUsers("");

            allUsers = allUsers.sort((a, b) => {
                if (a.followersCount > b.followersCount) return -1;
                if (a.followersCount < b.followersCount) return 1;
                return 0;
            });

            allUsers = allUsers.filter(user => user.id !== userId);
            return allUsers.slice(0, 5);
        }

        while (queue.length > 0) {
            let i = 0;

            const thisElement = await this.usersRepository.findById(queue[i]);

            thisElement?.following_id.forEach(followingId => {
                let alreadyReaded = false;

                if (followingId === userId) return;
                for (let j = 0; j < readed.length; j++) {
                    if (readed[j] === followingId) alreadyReaded = true;
                }

                if (!alreadyReaded) queue.push(followingId);
                if (
                    !alreadyReaded &&
                    !userAuthenticated.following_id.some(
                        userFollowing => userFollowing === followingId,
                    )
                )
                    whoFollow.push(followingId);
                readed.push(followingId);
            });
            queue.shift();
            i++;
        }

        const whoFollowUsers: User[] = [];

        for (let i = 0; i < whoFollow.length; i++) {
            const whoFollowUser = await this.usersRepository.findById(
                whoFollow[i],
            );
            if (whoFollowUser) whoFollowUsers.push(whoFollowUser);
        }

        return whoFollowUsers;
    }
}
