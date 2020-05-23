import {ActionType} from "../enum";

export interface IActionPerform {
    accountId: string;
    categoryId: string;
    type: ActionType;
    description?: string;
    amount: number;
}