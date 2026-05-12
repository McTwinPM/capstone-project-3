import { useState } from "react";

function DeleteCondition({ characterId, setConditions, conditionId }) {
    const [message, setMessage] = useState("");

    const handleDelete = (event) => {
        fetch(`${import.meta.env.VITE_API_URL}/characters/${characterId}/conditions/${conditionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => {
                if (r.ok) {
                    setMessage("Condition deleted successfully");
                    setConditions((prev) => Array.isArray(prev) ? prev.filter((c) => c.id !== conditionId) : []);
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