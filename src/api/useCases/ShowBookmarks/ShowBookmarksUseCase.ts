import { IUsersRepository } from "../../repositories/IUsersRepository";

export class ShowBookmarksUseCase {
    constructor(private postgresUsersRepository: IUsersRepository) {}

    async execute(id: string) {
        const user = await this.postgresUsersRepository.findById(id, true);
        if (!user) throw new Error("User not found");
        return user.bookmarks;
    }
}
