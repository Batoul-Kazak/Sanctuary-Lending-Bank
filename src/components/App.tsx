import { FC, useReducer } from "react";
import AddUserForm from "./AddUserForm";
import Main from "./Main";
import { actionType, stateType } from "../types/shared-types";

const initialSate: stateType = {
    numOfUsers: 1,
    selectedUser: null,
    message: "",
    users: [{
        id: 2,
        password: "123",
        balance: 0,
        loan: 0,
        isActiveAccount: false,
        isRequestedLoan: false,
    },
    {
        id: 2,
        password: "1234",
        balance: 10,
        loan: 20,
        isActiveAccount: true,
        isRequestedLoan: false,
    }
    ]
}

// type myType = {
//     x: Pick<string, "anchor" | "big">
//     y: Omit<string, "boiuyt">
//     z: StrictOmit<string, "bigw">
// };

function reducer(state: stateType, action: actionType) {
    switch (action.type) {
        case "selectUser":
            {
                if (state.selectedUser === undefined)
                    return { ...state, selectedUser: "" };
                return { ...state, selectedUser: action.payload };
            }
        case "openAccount": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    return { ...user, isActiveAccount: true, balance: 500 };
                }
                return user;
            });
            return { ...state, users };
        }
        case "closeAccount":
            {
                const users = state.users.map(user => {
                    if (user.id == state.selectedUser) {
                        if (user.balance > 0 || user.loan) {
                            state.message = `can't close account, because your ${user.balance > 0 ? "balance" : user.loan > 0 ? "loan" : "balance and loan"} is not zero`;
                            return user;
                        }
                        else
                            return { ...user, isActiveAccount: false };
                    }
                    return user;
                });
                return { ...state, users };
            }
        case "deposit": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser)
                    return { ...user, balance: user.balance + 150 }
            });
            return { ...state, users };
        }
        case "withdraw": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser)
                    return { ...user, balance: user.balance > 0 ? user.balance - 50 : user.balance }
                if (user.balance == 0) {
                    state.message = "your balance is zero, you can't withdraw";
                    return user;
                }
            });
            return { ...state, users };
        }
        case "requestLoan": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    return {
                        ...user, balance: user.isRequestedLoan === true ? user.balance : user.balance + 5000,
                        loan: user.isRequestedLoan === true ? user.loan : user.loan + 5000,
                        isRequestedLoan: true
                    }
                }
                if (user.isRequestedLoan) {
                    state.message = "you can't request loan, you should first pay the loan that you already have";
                    return user;
                }
                else {
                    console.log("you requested 5000$ successfully");
                }
            });
            return { ...state, users };
        }
        case "payLoan": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    return {
                        ...user, balance: user.isRequestedLoan === false ? user.balance : user.balance - 5000,
                        loan: user.isRequestedLoan === false ? user.loan : user.loan - 5000,
                        isRequestedLoan: false
                    }
                }
                if (user.isRequestedLoan === false) {
                    state.message = "you can't request loan, you should first pay the loan that you already have";
                    return user;
                }
                else {
                    state.message = "you payed the loan successfully";
                }
            });
            return { ...state, users };
        }
        case "addUser": {
            const newUser = {
                id: state.numOfUsers + 1,
                password: action.payload,
                balance: 0,
                loan: 0,
                isActiveAccount: false,
                isRequestedLoan: false,
            }
            console.log("password: ", action.payload);
            return { ...state, users: [...state.users, newUser] }
        }
    }
}

type AppProps = React.PropsWithChildren<{
    name: string;
}>;

const App: FC<AppProps> = ({ children }) => {
    const [{ users, selectedUser, message }, dispatch] = useReducer(reducer, initialSate);

    return <section className="app">
        <AddUserForm dispatch={dispatch} />
        <Main dispatch={dispatch} users={users} message={message} selectedUser={selectedUser} />
    </section>
}

export default App;