import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        nullable: false
    })
    userName: string;

    @Column({
        nullable: true
    })
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column({
        nullable: false
    })
    password: string

    @Column({
        type: "enum",
        enum: Role, 
        default: Role.USER
    })
    role: Role
    
    @Column({
        length: 500,
        nullable: false
    })
    email: string
}

export class UserDTO {
    constructor(public userName: string, public password: string, email: string, public role: Role, public firstName?: string, public lastName?: string){}
}