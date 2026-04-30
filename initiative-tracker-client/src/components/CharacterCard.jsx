import { useState, useEffect, use } from "react";
import AddCondition from "./AddCondition";
import EditCharacterButton from "./EditCharacterButton";
import DeleteCharacterButton from "./DeleteCharacterButton";

function CharacterCard({ character }) {
    const [character, setCharacter] = useState(null);
        // const [showDetails, setShowDetails] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState({});
    const [errors, setErrors] = useState(null);
    const [conditions, setConditions] = useState(character.conditions);

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
            <p>Initiative: {character.initiative}</p>
            <p>HP: {character.hp}</p>
            <p>AC: {character.ac}</p>
            <p>Conditions: {conditions.join(", ") || "None"}</p>
            <AddCondition characterId={character.id} setConditions={setConditions} />
            <EditCharacterButton
                character={editedCharacter}
                setCharacter={setEditedCharacter}
                editing={editing}
                setEditing={setEditing}
            />
            <DeleteCharacterButton 
                characterId={character.id} 
                setCharacter={setCharacter} />            
        </div>
    );
}

export default CharacterCard;