import { useState } from "react";
import { Dispatch } from "react";
import { actionType, stateType } from "../types/shared-types";

type mostUsedProps = StrictOmit<stateType, "numOfUsers">;

type MainProps = mostUsedProps & {
    dispatch: Dispatch<actionType>;
};

function Main({ dispatch, users, message, selectedUser }: MainProps) {
    const [selectedId, setSelectedId] = useState("");

    console.log(selectedId, " ", selectedUser);

    const User = users.find(u => u.id.toString() === (selectedId).toString());
    console.log(User);
    const isActive = User?.isActiveAccount;
    const loan = User?.loan;
    const balance = User?.balance;
    const isRequestedLoan = User?.isRequestedLoan;

    function handleChange(e) {
        if (e.target.value === "") {
            setSelectedId(e.target.value);
            message = "";
            return dispatch({ type: "selectUser", payload: null });
        }
        else {
            setSelectedId(e.target.value);
            return dispatch({ type: "selectUser", payload: selectedId });
        }
    }

    return (
        <main>
            <div>
                <div className="flex gap-4">
                    <h2>Account</h2>
                    <input type="text" placeholder="Search Username or ID"
                        value={selectedId} onChange={(e) => handleChange(e)} />
                    <button onClick={() => dispatch({ type: "selectUser", payload: selectedId })}>select</button>
                </div>
                <p className="red">{message}</p>
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