/* eslint-disable no-param-reassign */
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowFollowingUseCase {
    constructor(private postgresUsersRepository: IUsersRepository) {}

    async execute(id: string) {
        const user = await this.postgresUsersRepository.findById(id, true);
        if (!user) throw new Error("User not found");

        const userWithoutPassword: User[] = [];
        user.following.forEach(following => {
            delete following.password;
            userWithoutPassword.push(following);
        });

        return userWithoutPassword;
    }
}
