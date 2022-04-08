import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PostgresUserRepository implements IUsersRepository {
    public async findByEmail(
        email: string,
        relation?: boolean,
    ): Promise<User | null> {
        const user = await User.findOne({
            where: { email },
            relations: relation ? ["following", "followers"] : [],
        });
        return user;
    }

    public async findById(
        id: string,
        relation?: boolean,
    ): Promise<User | null> {
        return User.findOne({
            where: { id },
            relations: relation ? ["following", "followers"] : [],
        });
    }

    public async createUser({ name, email, password }: User): Promise<User> {
        const user = User.create({ name, email, password });
        await User.save(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        return User.save(user);
    }
}
