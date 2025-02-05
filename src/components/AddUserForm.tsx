import { useState } from "react";

function AddUserForm({ dispatch }) {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <form onSubmit={() => dispatch({ type: "addUser", payload: { id: id, password: password } })}>
            <h2>Add Account</h2>
            <input type="text" placeholder="User name or id" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Account Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">OK</button>
        </form>
    );
}

export default AddUserForm;