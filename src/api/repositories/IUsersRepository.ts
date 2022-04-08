import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/CreateUser/CreateUserDTO";

export interface IUsersRepository {
    findByEmail(email: string, relation?: boolean): Promise<User | null>;
    findById(id: string, relation?: boolean): Promise<User | null>;
    createUser(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
