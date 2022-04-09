import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IEditUserDTO } from "./EditUserDTO";

export class EditUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        about_me,
        avatar,
        background,
        email,
        id,
        name,
    }: IEditUserDTO): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new Error("User not found");

        if (email !== user.email && email) {
            const verifyEmail = await this.usersRepository.findByEmail(email);
            if (verifyEmail) throw new Error("Email already used");
        }

        user.about_me = about_me ?? user.about_me;
        user.avatar = avatar ?? user.avatar;
        user.background = background ?? user.background;
        user.email = email ?? user.email;
        user.name = name ?? user.name;

        await this.usersRepository.save(user);
        delete user.password;
        return user;
    }
}
