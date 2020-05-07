import { hash, compare, compareSync, hashSync } from "bcrypt"

const saltRounds = 10;

export const encryptPassword = (plainPassword: string): Promise<string> => {
    return hash(plainPassword, saltRounds)
};

export const encryptPasswordSync = (plainPassword: string): string => {
    return hashSync(plainPassword, saltRounds)
};

export const comparePasswords = (plainPassword: string, encryptedPassowrd: string): Promise<boolean> => {
    return compare(plainPassword, encryptedPassowrd)
};

export const comparePasswordsSync = (plainPassword: string, encryptedPassowrd: string): boolean => {
    return compareSync(plainPassword, encryptedPassowrd)
};

