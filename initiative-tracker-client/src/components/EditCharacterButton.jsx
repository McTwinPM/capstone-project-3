import { useState } from "react";

function EditCharacterButton({ character, setCharacter, editing, setEditing }) {
    const [editedCharacter, setEditedCharacter] = useState(character);
    const [errors, setErrors] = useState(null);

    function editCharacter() {
        if (!character  || !character.id) return;
        
        setEditing(true);
        setEditedCharacter({
            name: character.name,
            Initiative: character.Initiative,
            HitPoints: character.HitPoints,
            ArmorClass: character.ArmorClass,
            conditions: Array.isArray(character.conditions) ? character.conditions.join(", ") : ""
        })
    }

    const handleEdit = () => {
        fetch(`/api/characters/${character.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(editedCharacter)
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    return r.json().then((err) => Promise.reject(err));
                }
            })
            .then((data) => {
                setEditedCharacter(data.character);
                setEditing(false);
            })
            .catch((err) => setErrors(err.errors));
    };

    const handleCancel = () => {
        setEditedCharacter({});
        setEditing(false);
        setErrors(null);
    };

    return (
        editing ? (
            <div>
                <textarea
                    value={editedCharacter.name}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, name: e.target.value })}
                />
                <textarea
                    value={editedCharacter.Initiative}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, Initiative: e.target.value })}
                />
                <textarea
                    value={editedCharacter.HitPoints}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, HitPoints: e.target.value })}
                />
                <textarea
                    value={editedCharacter.ArmorClass}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, ArmorClass: e.target.value })}
                />
                <textarea
                    value={editedCharacter.conditions}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, conditions: e.target.value })}
                />
                {errors && <div className="error">{errors.join(", ")}</div>}
                <button onClick={handleEdit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        ) : (
            <button onClick={editCharacter}>Edit</button>
        )
    );
}

export default EditCharacterButton;