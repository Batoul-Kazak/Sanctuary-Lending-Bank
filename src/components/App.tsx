import { FC, useReducer } from "react";
import AddUserForm from "./AddUserForm";
import Main from "./Main";
import { actionType, messageType, stateType } from "../types/shared-types";

const initialSate: stateType = {
    numOfUsers: 2,
    selectedUser: null,
    message: { msg: "", isError: false },
    users: [{
        id: "1",
        password: "123",
        balance: 0,
        loan: 0,
        isActiveAccount: true,
        isRequestedLoan: false,
    },
    {
        id: "n",
        password: "1234",
        balance: 1500,
        loan: 5000,
        isActiveAccount: true,
        isRequestedLoan: true,
    }
    ]
}

function reducer(state: stateType, action: actionType) {
    switch (action.type) {
        case "selectUser":
            {
                if (action.payload.id === undefined)
                    return { ...state, message: { msg: "undefined user id", isError: true }, selectedUser: "" };
                if (action.payload.password === undefined)
                    return { ...state, message: { msg: "undefined user password", isError: true }, selectedUser: "" };

                const userPassword = state.users.find(user => user.id === action.payload.id);

                if (userPassword?.password !== action.payload.password) {
                    return { ...state, message: { msg: "wrong password", isError: true }, selectedUser: "" };
                }
                return { ...state, selectedUser: action.payload.id, message: { msg: "", isError: false } };
            }
        case "openAccount": {
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    return { ...user, isActiveAccount: true, balance: 500 };
                }
                return user;
            });
            return { ...state, users, message: { msg: "", isError: false } };
        }
        case "closeAccount":
            {
                let m: messageType;
                const users = state.users.map(user => {
                    if (user.id == state.selectedUser) {
                        if (user.balance > 0 || user.loan) {
                            m = {
                                msg: `can't close account, because your ${user.balance > 0 ? "balance" : user.loan > 0 ? "loan" :
                                    "balance and loan"} is not zero`, isError: true
                            };
                            return user;
                        }
                        else {
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
            return { ...state, users, message: { msg: "deposit 150$ successfully", isError: false } };
        }
        case "withdraw": {
            let m: messageType = { msg: "", isError: false };
            const updatedUsers = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (user.balance > 0) {
                        m = { ...m, msg: "user withdraws 50$" };
                        return { ...user, balance: user.balance - 50 };
                    } else {
                        m = { msg: "user's balance is zero, you can't withdraw", isError: true };
                        return user;
                    }
                }
                return user;
            });

            return { ...state, users: updatedUsers, message: m };
        }
        case "requestLoan": {
            let m: messageType = { msg: "", isError: false };
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (!user.isRequestedLoan) {
                        m = { ...m, msg: "user requested 5000$ successfully" };
                        return {
                            ...user, balance: user.balance + 5000, loan: user.loan + 5000, isRequestedLoan: true
                        }
                    }
                    else {
                        m = { msg: "user can't request loan, you should first pay the loan that you already have", isError: true };
                        return user;
                    }
                }
                return user;
            });
            return { ...state, users: users, message: m };
        }
        case "payLoan": {
            let m: messageType = { msg: "", isError: false };
            const users = state.users.map(user => {
                if (user.id == state.selectedUser) {
                    if (user.isRequestedLoan) {
                        // if(user.b)
                        m = { ...m, msg: "user paid the loan successfully" }
                        return {
                            ...user, balance: user.balance - 5000, loan: user.loan - 5000, isRequestedLoan: false
                        }
                    }
                    else {
                        m = { msg: "user doesn't have loan to pay", isError: true };
                        return user;
                    }
                }
                return user;
            });
            return { ...state, users: users, message: m };
        }
        case "addUser": {
            let m: messageType = { msg: "", isError: false };
            const userData = action.payload;
            // const password = userData.password;

            if (userData === undefined && userData === null) {
                m = { msg: "fill user information", isError: true };
                return { ...state, message: m };
            }

            if (!(userData.password)) {
                m = { msg: "#user must have password", isError: true };
                return { ...state, message: m };
            }

            if (userData.password.length < 8) {
                m = { msg: "#user password must be more than 8 characters", isError: false };
                return { ...state, message: m };
            }

            const isExist = state.users.find(user => user.id == userData.id);
            if (isExist) {
                m = { msg: "#user already exists", isError: true };
                return { ...state, message: m };
            }

            if (!(userData.id)) {
                m = { msg: "#user must have an id", isError: true };
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
            m = { ...m, msg: `#use that id is ${userData.id} added successfully` }
            return { ...state, users: [...state.users, newUser], message: m };
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
        <AddUserForm dispatch={dispatch} message={message} />
        <Main dispatch={dispatch} users={users} message={message} selectedUser={selectedUser} />
    </section>
}

export default App;