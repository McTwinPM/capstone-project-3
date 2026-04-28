import { useState } from 'react';

function AddCharacterForm({ name, setName, initiative, setInitiative, hp, setHp, ac, setAc, conditions, setConditions, message, setMessage, onSubmit }) {
    const [conditionInput, setConditionInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newCharacter = {
            name,
            initiative: parseInt(initiative),
            hp: parseInt(hp),
            ac: parseInt(ac),
            conditions: conditions.split(",").map((c) => c.trim()).filter((c) => c !== "")
        };

        fetch("/api/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newCharacter)
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    setMessage(`Error adding character: ${data.error}`);
                    console.error("Error adding character:", data.error);
                } else {
                    setMessage("Character added successfully!");
                    console.log("Character added:", data);
                }
            });
    }

    return (
        <div className="add-character-form">
            <h2>Add New Character</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Initiative"
                    value={initiative}
                    onChange={(e) => setInitiative(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="HP"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="AC"
                    value={ac}
                    onChange={(e) => setAc(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Conditions (comma separated)"
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                />
                <button type="submit">Add Character</button>
            </form>
            {message && <p className="message">{message}</p>}
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default AddCharacterForm;