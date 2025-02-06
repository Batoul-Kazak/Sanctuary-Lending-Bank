

export type actionType = { type: string, payload?: string | undefined | null };

export type userType = {
    id: string;
    password: string;
    isActiveAccount: boolean;
    balance: number;
    loan: number;
    isRequestedLoan: boolean;
};

export type stateType = {
    numOfUsers: number;
    selectedUser: string | null | undefined;
    message: string | null;
    users: Array<userType>;
}