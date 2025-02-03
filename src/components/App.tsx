import { useReducer } from "react";
import AddUserForm from "./AddUserForm";
import Main from "./Main";

type actionType = { type: string, payload: string | number | null | undefined };

interface userType {
    id: number;
    password: string;
    isActiveAccount: boolean;
    balance: number;
    loan: number;
    isRequestedLoan: boolean;
};

interface stateType {
    selectedUser: string | number | null;
    users: Array<userType>;
}

const initialSate: stateType = {
    selectedUser: null,
    users: [{
        id: 2,
        password: "123",
        balance: 0,
        loan: 0,
        isActiveAccount: false,
        isRequestedLoan: false,
    }]
}

function changeAccountStatus(state: stateType, goal: boolean) {
    const userIdToUpdate = state.selectedUser;
    const updatedUsers = state.users.map(user => {
        // console.log(typeof user.id, " ", typeof userIdToUpdate)
        if (user.id == userIdToUpdate) {
            return { ...user, isActiveAccount: goal };
        }
        // console.log("updatedUser: ", user.isActiveAccount)
        return user;
    });
    return updatedUsers;
}

function reducer(state: stateType, action: actionType) {
    switch (action.type) {
        case "selectUser":
            {
                const info = action.payload;
                console.log(info)
                return { ...state, selectedUser: action.payload };
            }
        case "openAccount": {
            const updatedUsers = changeAccountStatus(state, true);
            console.log(updatedUsers);
            return { ...state, users: updatedUsers };
        }
        case "closeAccount":
            {
                const updatedUsers = changeAccountStatus(state, false);
                return { ...state, users: updatedUsers };
            }
        case "deposit": {
            const updatedUsers = state.users.map(user => {
                if (user.id === state.selectedUser)
                    return { ...user, balance: user.balance + 150 };
            });
            return { ...state, updatedUsers };
        }
        case "withdraw": {
            const updatedUsers = state.users.map(user => {
                if (user.id === state.selectedUser)
                    return { ...user, balance: user.balance - 50 };
            });
            return { ...state, updatedUsers };
        }
        case "requestLoan": {
            const updatedUsers = state.users.map(user => {
                if (user.id === state.selectedUser) {
                    if (user.isRequestedLoan) {
                        alert(`${user.id} is already requested a loan`);
                        return;
                    }
                    return { ...user, balance: user.balance + 5000, loan: user.loan + 5000 };
                }
            });
            return { ...state, updatedUsers };
        }
        case "payLoan": {
            const updatedUsers = state.users.map(user => {
                if (user.id === state.selectedUser) {
                    if (!user.isRequestedLoan) {
                        alert(`there is no loan for ${user.id}`);
                        return;
                    }
                    return { ...user, balance: user.balance - 5000, loan: user.loan - 5000 };
                }
            });
            return { ...state, updatedUsers };
        }
    }
}
function App() {
    const [{ users, selectedUser }, dispatch] = useReducer(reducer, initialSate);

    return <section className="app">
        <AddUserForm />
        <Main dispatch={dispatch} users={users} selectedUser={selectedUser} />
    </section>
}

export default App;