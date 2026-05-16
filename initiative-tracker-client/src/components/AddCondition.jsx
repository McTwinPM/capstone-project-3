import {  useState } from "react";

function AddCondition({ characterId, conditions, setConditions }) {
    const [condition, setCondition] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newConditions = [...conditions, condition.trim()].filter((c) => c !== "");

        fetch(`${import.meta.env.VITE_API_URL}/characters/${characterId}/conditions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name: condition.trim(), character_id: characterId })
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error adding condition:", data.error);
                } else {
                    setConditions(prev => [...prev, data.condition]);
                    setCondition("");
                }
            });
    }

    return (
        <form className="add-condition-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
            />
            <button type="submit">Add Condition</button>
        </form>
    );
}

export default AddCondition;