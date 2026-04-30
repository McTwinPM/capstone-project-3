import { useState, useEffect } from "react";

function DeleteCondition({ characterId, setConditions, conditionId }) {
    const [condition, setCondition] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = (event) => {
        fetch(`/api/characters/${characterId}/conditions/${conditionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => {
                if (r.ok) {
                    setMessage("Condition deleted successfully");
                    setConditions(null);
                } else {
                    return r.json().then((err) => Promise.reject(err));
                }
            })
            .catch((err) => setMessage(err.error));
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Condition</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteCondition;