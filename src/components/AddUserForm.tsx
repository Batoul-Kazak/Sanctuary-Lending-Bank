import { useState } from "react";
import { Dispatch } from "react";
import { actionType, messageType } from "../types/shared-types";

type AddUser = { dispatch: Dispatch<actionType>; message: messageType };

function AddUserForm({ dispatch, message }: AddUser) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!id || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const userData = {
            id: id,
            password: password,
        };

        dispatch({ type: "addUser", payload: userData });

        // Clear the form after submission (optional):
        setId("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Account</h2>
            <input type="text" placeholder="User name or id" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Account Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="message" style={message.isError ? { color: "red" } : { color: "green" }}>{message.msg?.startsWith("#") ? message.msg : ""}</p>
            <button type="submit">OK</button>
        </form>
    );
}

export default AddUserForm;