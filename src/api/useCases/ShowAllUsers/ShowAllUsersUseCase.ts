/* eslint-disable no-param-reassign */
import { User } from "../../entities/User";
import { IPaginatedResponse } from "../../interfaces/Paginated";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IShowAllUserDTO } from "./ShowAllUsersDTO";

export class ShowAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        page,
        name,
    }: IShowAllUserDTO): Promise<IPaginatedResponse<User>> {
        const user = await this.usersRepository.findAllUsers(name);

        user.forEach(element => {
            delete element.password;
        });

        const total = user.length;
        let totalPages = Math.ceil(total / 10);
        const paginatedUser = user.slice(page * 10, page * 10 + 10);
        if (totalPages - 1 < 1) totalPages = 1;
        if (page > totalPages - 1) throw new Error("Page don't exists.");

        const response: IPaginatedResponse<User> = {
            data: paginatedUser,
            elements: paginatedUser.length,
            elementsPerPage: 10,
            firstPage: page === 0,
            lastPage: page === totalPages - 1,
            page,
            totalElements: total,
            totalPages,
        };

        return response;
    }
}
