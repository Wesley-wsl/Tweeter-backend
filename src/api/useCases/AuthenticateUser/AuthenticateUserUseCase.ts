import { sign } from "jsonwebtoken";

import { User } from "../../entities/User";
import { IBcryptProvider } from "../../providers/IBcryptProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "./AuthenticateUserDTO";

export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private bcryptProvider: IBcryptProvider,
    ) {}

    async execute({
        email,
        password,
    }: IAuthenticateUserDTO): Promise<{ token: string; user: User }> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new Error("Email/password incorrect");
        if (!password) throw new Error("Password is required");

        const passwordMatch = await this.bcryptProvider.compare(
            password,
            user.password as string,
        );

        if (!passwordMatch) throw new Error("Email/password incorrect");

        const token = sign(
            {
                id: user.id,
            },
            `${process.env.JWT_SECRET}`,
            {
                subject: `${user.id}`,
                expiresIn: "1d",
            },
        );

        delete user.password;
        return {
            token,
            user,
        };
    }
}
