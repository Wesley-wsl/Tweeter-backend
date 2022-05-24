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

        if (!userToFollow.followers) throw new Error("Follower not found");

        const alreadyFollowing = userToFollow.followers_id.some(
            followersId => followersId === userId,
        );
        if (alreadyFollowing) throw new Error("You already follow this user.");

        user.following.push(userToFollow);
        user.following_id.push(userToFollow.id);
        user.followingCount += 1;
        userToFollow.followers.push(user);
        userToFollow.followers_id.push(user.id);
        userToFollow.followersCount += 1;
        await this.usersRepository.save(user);
        await this.usersRepository.save(userToFollow);
    }
}
