import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUser } from "../interface";
import { UserRole } from "../enum";

@Entity("User")
export class UserEntity implements IUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 500,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column()
    timestamp: string
}