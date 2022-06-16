import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUnfollowUserDTO } from "./UnfollowUserDTO";

export class UnfollowUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ id, userId }: IUnfollowUserDTO): Promise<void> {
        const userToUnfollow = await this.usersRepository.findById(id, true);
        const user = await this.usersRepository.findById(userId, true);

        if (!user) throw new Error("User not found");
        if (!userToUnfollow) throw new Error("User to unfollow not found");

        delete user.password;
        delete userToUnfollow.password;

        const followingFiltered = user.following.filter(
            following => following.id !== userToUnfollow.id,
        );
        if (!userToUnfollow.followers) throw new Error("Followers not found");

        const alreadyFollowing = userToUnfollow.followers_id.some(
            Id => Id === userId,
        );
        if (!alreadyFollowing)
            throw new Error("You already don't follow this user.");

        const followersFiltered = userToUnfollow.followers.filter(
            followers => followers.id !== user.id,
        );

        const followingIdFiltered = user.following_id.filter(
            following => following !== userToUnfollow.id,
        );
        const followersIdFiltered = userToUnfollow.followers_id.filter(
            follower => follower !== user.id,
        );

        user.following = followingFiltered;
        user.following_id = followingIdFiltered;
        user.followingCount -= 1;
        userToUnfollow.followers = followersFiltered;
        userToUnfollow.followers_id = followersIdFiltered;
        userToUnfollow.followersCount -= 1;
        await this.usersRepository.save(user);
        await this.usersRepository.save(userToUnfollow);
    }
}
