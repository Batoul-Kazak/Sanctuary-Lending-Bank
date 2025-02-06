import { FC, useReducer } from "react";
import AddUserForm from "./AddUserForm";
import Main from "./Main";
import { actionType, stateType } from "../types/shared-types";

const initialSate: stateType = {
    numOfUsers: 2,
    selectedUser: null,
    message: "",
    users: [{
        id: "1",
        password: "123",
        balance: 0,
        loan: 0,
        isActiveAccount: true,
        isRequestedLoan: false,
    },
    {
        id: "2",
        password: "1234",
        balance: 5000,
        loan: 5200,
        isActiveAccount: true,
        isRequestedLoan: true,
    }
    ]
}

function reducer(state: stateType, action: actionType) {
    switch (action.type) {
        case "selectUser":
            {
                if (state.selectedUser === undefined || state.selectedUser === null)
                    return { ...state, message: "undefined user id", selectedUser: "" };
                return { ...state, selectedUser: action.payload, message: "" };
            }
        case "openAccount": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    return { ...user, isActiveAccount: true, balance: 500 };
                }
                return user;
            });
            return { ...state, users, message: "" };
        }
        case "closeAccount":
            {
                let m: string = "";
                const users = state.users.map(user => {
                    if (user.id == state.selectedUser) {
                        if (user.balance > 0 || user.loan) {
                            m = `can't close account, because your ${user.balance > 0 ? "balance" : user.loan > 0 ? "loan" : "balance and loan"} is not zero`;
                            return user;
                        }
                        else {
                            // m = "";
                            return { ...user, isActiveAccount: false };
                        }
                    }
                    return user;
                });
                return { ...state, users, message: m };
            }
        case "deposit": {
            const users = state.users.map(user =>
                user.id == state.selectedUser ? { ...user, balance: user.balance + 150 } : user);
            return { ...state, users, message: "" };
        }
        case "withdraw": {
            let message = "";
            const updatedUsers = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (user.balance > 0) {
                        return { ...user, balance: user.balance - 50 };
                    } else {
                        message = "user's balance is zero, you can't withdraw";
                        return user;
                    }
                }
                return user;
            });

            return { ...state, users: updatedUsers, message };
        }
        case "requestLoan": {
            let m: string = "";
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (!user.isRequestedLoan) {
                        m = "user requested 5000$ successfully"
                        return {
                            ...user, balance: user.balance + 5000, loan: user.loan + 5000, isRequestedLoan: true
                        }
                    }
                    else {
                        m = "user can't request loan, you should first pay the loan that you already have";
                        return user;
                    }
                }
                return user;
            });
            return { ...state, users: users, message: m };
        }
        case "payLoan": {
            let m: string = "";
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (user.isRequestedLoan) {
                        m = "user paid the loan successfully"
                        return {
                            ...user, balance: user.balance - 5000, loan: user.loan - 5000, isRequestedLoan: false
                        }
                    }
                    else {
                        m = "user doesn't have loan to pay";
                        return user;
                    }
                }
                return user;
            });
            return { ...state, users: users, message: m };
        }
        case "addUser": {
            let m: string = "";
            const userData = action.payload;
            // const password = userData.password;

            if (userData === undefined && userData === null) {
                m = "fill user information";
                return { ...state, message: m };
            }

            if (!(userData.password)) {
                m = "#user must have password";
                return { ...state, message: m };
            }

            if (userData.password.length < 8) {
                m = "#user password must be more than 8 characters";
                return { ...state, message: m };
            }

            const isExist = state.users.find(user => user.id == userData.id);
            if (isExist) {
                m = "#user already exists";
                return { ...state, message: m };
            }

            if (!(userData.id)) {
                m = "#user must have an id";
                return { ...state, message: m };
            }

            console.log(userData.id, " ", userData.password);

            const newUser = {
                id: userData.id,
                password: userData.password,
                balance: 0,
                loan: 0,
                isActiveAccount: true,
                isRequestedLoan: false,
            }
            console.log("password: ", action.payload);
            return { ...state, users: [...state.users, newUser] };
        }
    }
}

// type myType = {
//     x: Pick<string, "anchor" | "big">
//     y: Omit<string, "boiuyt">
//     z: StrictOmit<string, "bigw">
// };

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