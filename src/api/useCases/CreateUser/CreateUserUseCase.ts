import { hash } from "bcrypt";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) throw new Error("User already exists");
        if (!password) throw new Error("Password is required");

        const passwordHashed = await hash(password as string, 8);
        const userCreated = await this.usersRepository.createUser({
            name,
            email,
            password: passwordHashed,
        });

        await this.usersRepository.save(userCreated);
        delete userCreated.password;
        return userCreated;
    }
}
