

export type actionType = { type: string, payload?: string | number };

export type userType = {
    id: number;
    password: string;
    isActiveAccount: boolean;
    balance: number;
    loan: number;
    isRequestedLoan: boolean;
};

export type stateType = {
    numOfUsers: number;
    selectedUser: string | number | null;
    message: string | null;
    users: Array<userType>;
}