import { useEffect, useState } from "react";

function AddCondition({ characterId, conditions, setConditions }) {
    const [conditionInput, setConditionInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newConditions = [...conditions, conditionInput.trim()].filter((c) => c !== "");

        fetch(`/api/characters/${characterId}/conditions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ conditions: newConditions })
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error adding condition:", data.error);
                } else {
                    setConditions(newConditions);
                    setConditionInput("");
                }
            });
    }

    return (
        <form className="add-condition-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add condition"
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddCondition;