import { IBcryptProvider } from "../../api/providers/IBcryptProvider";

export class InMemoryBcryptProvider implements IBcryptProvider {
    public async compare(
        password: string,
        userPassword: string,
    ): Promise<boolean> {
        if (password === userPassword) return true;
        return false;
    }
}
