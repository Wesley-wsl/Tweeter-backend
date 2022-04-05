export interface IBcryptProvider {
    compare(password: string, userPassword: string): Promise<boolean>;
}
