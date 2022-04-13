import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IFollowerUserDTO } from "./FollowerUserDTO";

export class FollowerUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ id, userId }: IFollowerUserDTO): Promise<void> {
        const userToFollow = await this.usersRepository.findById(id, true);
        const user = await this.usersRepository.findById(userId, true);

        if (!user) throw new Error("User not found");
        if (!userToFollow) throw new Error("User to follow not found");
        if (user.id === userToFollow.id)
            throw new Error("User can't follow themselves");

        delete user.password;
        delete userToFollow.password;

        user.following.push(userToFollow);
        user.followingCount += 1;
        userToFollow.followers.push(user);
        userToFollow.followersCount += 1;
        await this.usersRepository.save(user);
        await this.usersRepository.save(userToFollow);
    }
}
