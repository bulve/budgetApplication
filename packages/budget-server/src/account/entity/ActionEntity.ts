import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IAction } from "../interface";
import { ActionType } from "../enum";
import { AccountEntity } from "./AccountEntity";

@Entity("Action")
export class ActionEntity implements IAction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => AccountEntity)
    @Column()
    accountId: string;

    @Column("enum", { enum: ActionType })
    type: ActionType;

    @Column()
    timeStamp: Date;

    @Column("text")
    description: string;

    @Column('numeric')
    amount: number;
}
