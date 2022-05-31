import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/CreateUser/CreateUserDTO";

export interface IUsersRepository {
    findByEmail(email: string, relation?: boolean): Promise<User | null>;
    findById(id: string, relation?: boolean): Promise<User | null>;
    findAllUsers(name: string): Promise<User[]>;
    createUser(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
