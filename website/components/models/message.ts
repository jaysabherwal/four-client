export interface Message {
    action: Action,
    data: any;
}

export enum Action {
    CREATE = 'create',
    JOIN = 'join',
    MOVE = 'move'
}