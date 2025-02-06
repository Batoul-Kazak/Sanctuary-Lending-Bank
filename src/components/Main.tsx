import { useState } from "react";
import { Dispatch } from "react";
import { actionType, stateType } from "../types/shared-types";

type mostUsedProps = StrictOmit<stateType, "numOfUsers">;

type MainProps = mostUsedProps & {
    dispatch: Dispatch<actionType>;
};

function Main({ dispatch, users, message, selectedUser }: MainProps) {
    const [selectedId, setSelectedId] = useState("");
    const [password, setPassword] = useState("");
    const [requestedLoan, setRequestedLoan] = useState(0);

    console.log(selectedId, " ", selectedUser);

    const User = users.find(u => u.id.toString() === (selectedId).toString());
    console.log(User);
    const isActive = User?.isActiveAccount;
    const loan = User?.loan;
    const balance = User?.balance;
    // { isActive, loan, balance, isRequestedLoan } = User;

    function handleSelect() {
        if (!selectedId && !password) {
            return dispatch({ type: "selectUser", payload: { id: undefined, password: undefined } });
        }

        if (selectedId && !password)
            return dispatch({ type: "selectUser", payload: { id: selectedId, password: undefined } });

        return dispatch({ type: "selectUser", payload: { id: selectedId, password: password } });
    }

    return (
        <main>
            <div>
                <h2>Account</h2>
                <div className="flex gap-4">
                    <input type="text" placeholder="Search Username or ID"
                        value={selectedId} onChange={(e) => setSelectedId(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter user id" />
                    <button onClick={handleSelect}>select</button>
                </div>
                <p className="message" style={message.isError ? { color: "red" } : { color: "green" }}>{message.msg?.startsWith("#") ? "" : message.msg}</p>
            </div>
            {selectedUser && User &&
                <>
                    <p><span>Balance:</span> {balance}$</p>
                    <p><span>Loan:</span> {loan}$</p>
                    <button
                        disabled={isActive}
                        onClick={() => dispatch({ type: "openAccount" })}>Open account</button>
                    <button
                        disabled={!isActive}
                        onClick={() => dispatch({ type: "deposit" })}>Deposit 150</button>
                    <button
                        disabled={!isActive}
                        onClick={() => dispatch({ type: "withdraw" })} >Withdraw 50</button>
                    <div className="flex gap-4 p-5">
                        <p className="text">Select loan to request:</p>
                        <select value={requestedLoan} onChange={(e) => setRequestedLoan(e.target.value)}>
                            <option value="50">50$</option>
                            <option value="100">100$</option>
                            <option value="500">500$</option>
                            <option value="1000">1000$</option>
                            <option value="2000">2000$</option>
                            <option value="5000">5000$</option>
                            <option value="10000">10,000$</option>
                            <option value="20000">20,000$</option>
                            <option value="50000">50,000$</option>
                        </select>
                        <button disabled={!isActive}
                            onClick={() => dispatch({ type: "requestLoan", payload: requestedLoan })}>request loan of {requestedLoan}$</button>
                    </div>
                    <button
                        disabled={!isActive}
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