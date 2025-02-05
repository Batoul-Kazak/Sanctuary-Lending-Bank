import { useState } from "react";
import { Dispatch } from "react";
import { actionType, userType } from "../types/shared-types";

interface MainProps {
    dispatch: Dispatch<actionType>;
    users: Array<userType>;
    selectedUser: string;
};

function Main({ dispatch, users, message, selectedUser }: MainProps) {
    const [selectedId, setSelectedId] = useState("");

    const User = users.find(u => u.id == Number(selectedId));
    console.log(User)
    const isActive = User?.isActiveAccount;
    const loan = User?.loan;
    const balance = User?.balance;
    const isRequestedLoan = User?.isRequestedLoan;

    function handleChange(e) {
        if (e.target.value === "") {
            setSelectedId(e.target.value);
            return dispatch({ type: "selectUser", payload: "" });
        }
        setSelectedId(e.target.value);
    }

    return (
        <main>
            <div>
                <div>
                    <h2>Account</h2>
                    <input type="text" placeholder="Search Username or ID"
                        value={selectedId} onChange={(e) => handleChange(e)} />
                    <button onClick={() => dispatch({ type: "selectUser", payload: selectedId })}>select</button>
                </div>
                <p>{message}</p>
            </div>
            {selectedUser &&
                <>
                    <p>Balance: {balance}</p>
                    <p>Loan: {loan}</p>
                    <button
                        disabled={isActive}
                        onClick={() => dispatch({ type: "openAccount" })}>Open account</button>
                    <button
                        disabled={!isActive}
                        onClick={() => dispatch({ type: "deposit" })}>Deposit 150</button>
                    <button
                        disabled={!isActive}
                        onClick={() => dispatch({ type: "withdraw" })} >Withdraw 50</button>
                    <button
                        disabled={!isActive || isRequestedLoan}
                        onClick={() => dispatch({ type: "requestLoan" })}>Request a loan of 5000</button>
                    <button
                        disabled={!isActive || !isRequestedLoan}
                        onClick={() => dispatch({ type: "payLoan" })}>Pay loan</button>
                    <button
                        disabled={!isActive}
                        onClick={() => dispatch({ type: "closeAccount" })}>Close Account</button>
                </>
            }
        </main>
    );
}

export default Main;