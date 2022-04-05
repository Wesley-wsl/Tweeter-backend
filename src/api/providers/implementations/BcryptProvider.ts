import { compare } from "bcrypt";

import { IBcryptProvider } from "../IBcryptProvider";

export class BcryptProvider implements IBcryptProvider {
    public async compare(
        password: string,
        userPassword: string,
    ): Promise<boolean> {
        return compare(password, userPassword);
    }
}
