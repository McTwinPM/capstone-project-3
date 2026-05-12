import { useState, useEffect } from "react";
import AddCondition from "./AddCondition";
import DeleteCharacterButton from "./DeleteCharacterButton";
import DeleteCondition from "./DeleteCondition";

function CharacterCard({ character, setCharacters } ) {
    const [editing, setEditing] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState({});
    const [errors, setErrors] = useState(null);
    const [conditions, setConditions] = useState([]);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/characters/${character.id}/conditions`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => setConditions(data))
            .catch((err) => console.error("Error fetching conditions:", err));
    }, [character.id]);

    if (!character) return <div>No character found</div>;

    function editCharacter() {
        
        setEditing(true);
        setEditedCharacter({
            name: character.name,
            Initiative: character.Initiative,
            HitPoints: character.HitPoints,
            ArmorClass: character.ArmorClass,
        })
    }

    const handleEdit = () => {
        fetch(`${import.meta.env.VITE_API_URL}/characters/${character.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(editedCharacter)
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    setErrors(`Error editing character: ${data.error}`);
                    console.error("Error editing character:", data.error);
                } else {
                    setCharacters(prev => prev.map(c => c.id === data.character.id ? data.character : c));
                    setEditing(false);
                    setErrors(null);
                }
            })
            .catch((err) => setErrors(`Error editing character: ${err.message}`));
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
                    value={editedCharacter.name || character.name}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, name: e.target.value })}
                />
                <textarea
                    value={editedCharacter.Initiative || character.Initiative}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, Initiative: e.target.value })}
                />
                <textarea
                    value={editedCharacter.HitPoints || character.HitPoints}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, HitPoints: e.target.value })}
                />
                <textarea
                    value={editedCharacter.ArmorClass || character.ArmorClass}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, ArmorClass: e.target.value })}
                />
                <textarea
                    value={editedCharacter.conditions || (Array.isArray(character.conditions) ? character.conditions.join(", ") : "")}
                    onChange={(e) => setEditedCharacter({ ...editedCharacter, conditions: e.target.value })}
                />
                {errors && <div className="error">{errors}</div>}
                <button onClick={handleEdit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        ) : (
        <div className="character-card">
            <h2>{character.name}</h2>
            <p>Initiative: {character.Initiative}</p>
            <p>HP: {character.HitPoints}</p>
            <p>AC: {character.ArmorClass}</p>
            <p>Conditions: </p>
                <ul>
                    {conditions.length > 0 ? conditions.map((condition) => (
                <li key={condition.id}>
                    {condition.name}
                        <DeleteCondition className="delete-condition-button"
                            characterId={character.id}
                            conditionId={condition.id}
                            setConditions={setConditions}
                />
                </li>
                )) : <li>"None"</li>}
                </ul>
            <AddCondition className="add-condition-button" 
                characterId={character.id}
                conditions={conditions} 
                setConditions={setConditions}
             />
            <button onClick={editCharacter}>Edit</button>
            <DeleteCharacterButton className="delete-character-button"
                characterId={character.id} 
                setCharacters={setCharacters} />
        </div>
    ));
}

export default CharacterCard;