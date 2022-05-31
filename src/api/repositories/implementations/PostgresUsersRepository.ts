import { Like } from "typeorm";

import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PostgresUserRepository implements IUsersRepository {
    public async findAllUsers(name: string): Promise<User[]> {
        return User.find({
            where: {
                name: Like(`%${name}%`),
            },
        });
    }

    public async findByEmail(
        email: string,
        relation?: boolean,
    ): Promise<User | null> {
        const user = await User.findOne({
            where: { email },
            relations: relation ? ["following", "followers", "tweets"] : [],
        });
        return user;
    }

    public async findById(
        id: string,
        relation?: boolean,
    ): Promise<User | null> {
        return User.findOne({
            where: { id },
            relations: relation
                ? [
                      "following",
                      "followers",
                      "tweets",
                      "bookmarks",
                      "bookmarks.author",
                  ]
                : [],
        });
    }

    public async createUser({ name, email, password }: User): Promise<User> {
        const user = User.create({ name, email, password });
        return user;
    }

    public async save(user: User): Promise<User> {
        return User.save(user);
    }
}
