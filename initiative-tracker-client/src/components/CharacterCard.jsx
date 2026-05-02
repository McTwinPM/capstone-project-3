import { useState, useEffect, use } from "react";
import AddCondition from "./AddCondition";
import EditCharacterButton from "./EditCharacterButton";
import DeleteCharacterButton from "./DeleteCharacterButton";
import DeleteCondition from "./DeleteCondition";

function CharacterCard({ character }) {
    const [editing, setEditing] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState({});
    const [errors, setErrors] = useState(null);
    const [conditions, setConditions] = useState(Array.isArray(character.conditions) ? character.conditions : []);

    useEffect(() => {
        fetch(`/api/characters/${character.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => setEditedCharacter(data));
    }, [character.id]);

    return (
        <div className="character-card">
            <h2>{character.name}</h2>
            <p>Initiative: {character.Initiative}</p>
            <p>HP: {character.HitPoints}</p>
            <p>AC: {character.ArmorClass}</p>
            <p>Conditions: {conditions.length > 0 ? conditions.map((condition) => 
                condition.name).join(", ")(
                <DeleteCondition className="delete-condition-button"
                    key={condition.id}
                    characterId={character.id}
                    conditionId={condition.id}
                    setConditions={setConditions}
                />) : "None"}</p>
            <AddCondition className="add-condition-button" 
            characterId={character.id} 
            setConditions={setConditions}
             />
            <EditCharacterButton className="edit-character-button"
                character={editedCharacter}
                setCharacter={setEditedCharacter}
                editing={editing}
                setEditing={setEditing}
            />
            <DeleteCharacterButton className="delete-character-button"
                characterId={character.id} 
                setConditions={setConditions} />            
        </div>
    );
}

export default CharacterCard;