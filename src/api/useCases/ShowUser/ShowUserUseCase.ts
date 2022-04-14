import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new Error("User not found");
        delete user.password;
        return user;
    }
}
