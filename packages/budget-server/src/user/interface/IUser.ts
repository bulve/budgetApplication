import { UserRole } from "../enum";

export interface IUser {
    id: string;
    email: string
    password: string
    role: UserRole
    timestamp: string
}