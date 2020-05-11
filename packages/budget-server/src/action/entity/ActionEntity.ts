import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IAction } from "../interface";
import { ActionType } from "../enum";
import { AccountEntity } from "../../account";
import { CategoryEntity } from "../../category";

@Entity("Action")
export class ActionEntity implements IAction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => AccountEntity)
    @Column()
    accountId: string;

    @OneToOne(type => CategoryEntity)
    @Column()
    categoryId: string;

    @Column("enum", { enum: ActionType })
    type: ActionType;

    @Column()
    timeStamp: Date;

    @Column("text")
    description: string;

    @Column('numeric')
    amount: number;
}
