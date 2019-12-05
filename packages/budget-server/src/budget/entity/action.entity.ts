import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum ActionType {
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
}

@Entity()
export class Action {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    budgetId: string;

    @Column("enum", { enum: ActionType })
    type: ActionType;

    @Column()
    timeStamp: Date;

    @Column("text")
    description: string;

    @Column('double')
    amount: number;
}


export class ActionDTO {


    constructor(public type: ActionType, public description: string, public amount: number){
            
    }
}