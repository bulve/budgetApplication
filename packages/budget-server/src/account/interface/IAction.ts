import { ActionType } from "../enum";

export interface IAction {
    id: string;
    accountId: string;
    type: ActionType;
    timeStamp: Date;
    description: string;
    amount: number;
}