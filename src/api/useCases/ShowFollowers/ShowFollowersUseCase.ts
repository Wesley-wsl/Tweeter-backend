/* eslint-disable no-param-reassign */
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowFollowersUseCase {
    constructor(private postgresUsersRepository: IUsersRepository) {}

    async execute(id: string) {
        const user = await this.postgresUsersRepository.findById(id, true);
        if (!user) throw new Error("User not found");

        const userWithoutPassword: User[] = [];
        if (!user.followers) throw new Error("Follower not found");

        user.followers.forEach(followers => {
            delete followers.password;
            userWithoutPassword.push(followers);
        });
        return userWithoutPassword;
    }
}
