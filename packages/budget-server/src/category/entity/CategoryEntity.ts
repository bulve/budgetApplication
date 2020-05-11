import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AccountEntity} from "../../account/entity";
import {ICategory} from "../interface";
import {UserEntity} from "../../user/entity";

@Entity("Category")
export class CategoryEntity implements ICategory{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => AccountEntity)
    accountId: string;

    @ManyToOne(type => UserEntity)
    userId: string;

    @Column()
    name: string;

    @Column()
    description: string;
}