import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { IAccount } from "../interface";
import { UserEntity } from "../../user";

@Entity("Account")
export class AccountEntity implements IAccount {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    @Column()
    userId: string;

    @Column({
        type: "numeric",
        default: 0
    })
    balance: number;

    @Column({
        type: "timestamp"
    })
    timestamp: Date;
}