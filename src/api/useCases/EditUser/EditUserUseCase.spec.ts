import { InMemoryUsersRepository } from "../../../tests/repositories/In-memory-users-repository";
import { IUser } from "../../interfaces/User";
import { EditUserUseCase } from "./EditUserUseCase";

describe("#EditUser", () => {
    it("Should throw error if user is not found", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new EditUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "123453421342",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis10@gmail.com",
        };

        const response = sut.execute(user as IUser);

        await expect(response).rejects.toEqual(new Error("User not found"));
    });

    it("Should throw error if email already is used", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new EditUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1234",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis10@gmail.com",
        };

        const userWithAnotherEmail = {
            id: "1234",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis@gmail.com",
        };

        inMemoryUsersRepository.items.push(user as IUser);
        inMemoryUsersRepository.items.push(userWithAnotherEmail as IUser);

        const userEdited = {
            id: "1234",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis@gmail.com",
        };
        const response = sut.execute(userEdited as IUser);

        await expect(response).rejects.toEqual(new Error("Email already used"));
    });

    it("Should edit all field of user", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new EditUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1234",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis10@gmail.com",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const userEdited = {
            id: "1234",
            name: "AnotherJorkis10",
            about_me: "AnotherAbout",
            background: "AnotherBackgroundImage",
            avatar: "AnotherAvatarImage",
            email: "jorkis@gmail.com",
        };
        const response = await sut.execute(userEdited as IUser);

        expect(response).toBeTruthy();
        expect(response.name).toEqual(userEdited.name);
        expect(response.about_me).toEqual(userEdited.about_me);
        expect(response.avatar).toEqual(userEdited.avatar);
        expect(response.background).toEqual(userEdited.background);
        expect(response.email).toEqual(userEdited.email);
    });

    it("Should return user's fields if not provided something for edit", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const sut = new EditUserUseCase(inMemoryUsersRepository);

        const user = {
            id: "1234",
            name: "Jorkis10",
            about_me: "About10",
            background: "BackgroundImage10",
            avatar: "AvatarImage10",
            email: "jorkis10@gmail.com",
        };

        inMemoryUsersRepository.items.push(user as IUser);

        const userEdited = {
            id: "1234",
        } as IUser;
        const response = await sut.execute(userEdited);

        expect(response).toBeTruthy();
        expect(response.name).toEqual(user.name);
        expect(response.about_me).toEqual(user.about_me);
        expect(response.avatar).toEqual(user.avatar);
        expect(response.background).toEqual(user.background);
        expect(response.email).toEqual(user.email);
    });
});
