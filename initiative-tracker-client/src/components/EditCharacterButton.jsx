import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditCharacterButton({ character, setCharacter, editing, setEditing }) {
    const [editedCharacter, setEditedCharacter] = useState(character);
    const [errors, setErrors] = useState(null);

    function editCharacter() {
        setEditing(true);
        setEditedCharacter({
            name: character.name,
            initiative: character.initiative,
            hp: character.hp,
            ac: character.ac,
            conditions: character.conditions.join(", ")
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
                setCharacter(data);
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
                <button onClick={handleEdit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        ) : (
            <button onClick={editCharacter}>Edit</button>
        )
    );
}

export default EditCharacterButton;