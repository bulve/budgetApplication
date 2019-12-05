import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Budget {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    userId: string;

    @Column({
        type: "double",
        default: 0
    })
    balance: number;

    @Column({
        type: "datetime"
    })
    openDate: Date;
}

export class BudgetDTO {
    public name: string;
    public balance: number;
    public openDate: Date;
    constructor(name: string, balance?: number, openDate?: Date){
        this.name = name;
        this.balance = balance ? balance : 0;
        this.openDate = openDate ? openDate : new Date();
    }
}
