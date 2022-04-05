import { User } from "../../api/entities/User";
import { PostgresUserRepository } from "../../api/repositories/implementations/PostgresUsersRepository";

export class InMemoryUsersRepository implements PostgresUserRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const userFind = this.items.find(user => user.email === email);
        if (!userFind) return null;

        return userFind;
    }

    async findById(id: string): Promise<User | null> {
        const userFind = this.items.find(user => user.id === id);
        if (!userFind) return null;

        return userFind;
    }

    async createUser(user: User): Promise<User> {
        const userCreated = user;
        this.items.push(user);
        return userCreated;
    }

    async save(user: User): Promise<User> {
        this.items.push(user);
        return user;
    }
}
