

type obj = { id: string | undefined, password: string | undefined }
export type actionType = { type: string, payload?: string | undefined | null | obj | number };

export type userType = {
    id: string;
    password: string;
    isActiveAccount: boolean;
    balance: number;
    loan: number;
};

export type messageType = { msg: string | null, isError: boolean };

export type stateType = {
    numOfUsers: number;
    selectedUser: string | null | undefined;
    message: messageType;
    users: Array<userType>;
}