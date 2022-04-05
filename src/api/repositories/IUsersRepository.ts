import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/CreateUser/CreateUserDTO";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
