import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User";
import { ShowBookmarksUseCase } from "./ShowBookmarksUseCase";

describe("#ShowBookmarks", () => {
    it("Should show bookmarks by user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowBookmarksUseCase(inMemoryUsersRepository);

        const user = {
            id: "2",
            bookmarks: [
                {
                    id: "3",
                    name: "Jorkis",
                },
            ] as User[],
        };

        inMemoryUsersRepository.items.push(user as unknown as IUser);

        const response = await sut.execute("2");

        expect(response[0].id).toEqual("3");
    });

    it("Shouldn't show bookmarks by user if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new ShowBookmarksUseCase(inMemoryUsersRepository);

        const response = sut.execute("2");

        await expect(response).rejects.toEqual(new Error("User not found"));
    });
});
