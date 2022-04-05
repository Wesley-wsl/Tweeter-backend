/* eslint-disable prettier/prettier */

export interface IBcryptProvider {
    compare(password: string, userPassword: string): Promise<boolean>;
}
