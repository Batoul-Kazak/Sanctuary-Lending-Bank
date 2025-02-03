import { useState } from "react";

function Main({ dispatch, users, selectedUser }) {
    const [selectedId, setSelectedId] = useState("");

    // alert(selectedId);

    const User = users.map(user => user.id === selectedUser);
    // alert(User);
    const isActive = User.isActive;
    const loan = User.loan;
    const balance = User.balance;

    return (
        <main>
            <div>
                <div>
                    <h2>Account</h2>
                    <input type="text" placeholder="Search Username or ID"
                        value={selectedId} onChange={(e) => setSelectedId(e.target.value)} />
                    <button onClick={() => dispatch({ type: "selectUser", payload: selectedId })}>select</button>
                </div>
                <p>message</p>
            </div>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>
            <button disabled={isActive} onClick={() => dispatch({ type: "openAccount" })}>Open account</button>
            <button disabled={!isActive} onClick={() => dispatch({ type: "deposit" })}>Deposit 150</button>
            <button disabled={!isActive} onClick={() => dispatch({ type: "withdraw" })} >Withdraw 50</button>
            <button disabled={!isActive} onClick={() => dispatch({ type: "RequestLoan" })}>Request a loan of 5000</button>
            <button disabled={!isActive} onClick={() => dispatch({ type: "payLoan" })}>Pay loan</button>
            <button disabled={!isActive} onClick={() => dispatch({ type: "closeAccount" })}>Close Account</button>
        </main>
    );
}

export default Main;