/* eslint-disable no-param-reassign */
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(): Promise<User[]> {
        const user = await this.usersRepository.findAllUsers();

        user.forEach(element => {
            delete element.password;
        });

        return user;
    }
}
