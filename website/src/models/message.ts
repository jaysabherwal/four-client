import { Action } from "./action";

export interface Message {
    action: Action;
    data: string;
}