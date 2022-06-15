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
            const allUsers = await this.usersRepository.findAllUsers("");

            let swap;
            const last = allUsers.length - 1;

            do {
                swap = false;
                for (let i = 0; i < last; ) {
                    if (
                        allUsers[i].followersCount <
                        allUsers[i + 1].followersCount
                    ) {
                        [allUsers[i], allUsers[i + 1]] = [
                            allUsers[i + 1],
                            allUsers[i],
                        ];
                        swap = true;
                    }

                    i += 1;
                }
            } while (swap);

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
