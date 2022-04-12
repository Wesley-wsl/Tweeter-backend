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
        const followersFiltered = userToUnfollow.followers.filter(
            followers => followers.id !== user.id,
        );

        user.following = followingFiltered;
        user.followingCount -= 1;
        userToUnfollow.followers = followersFiltered;
        userToUnfollow.followersCount -= 1;
        await this.usersRepository.save(user);
        await this.usersRepository.save(userToUnfollow);
    }
}
