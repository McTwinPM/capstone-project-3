import { useState } from "react";
import AddCondition from "./AddCondition";

function CharacterCard({ character }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="character-card" onClick={() => setShowDetails(!showDetails)}>
            <h2>{character.name}</h2>
            <p>Initiative: {character.initiative}</p>
            {showDetails && (
                <div className="character-details">
                    <p>HP: {character.hp}</p>
                    <p>AC: {character.ac}</p>
                    <p>Conditions: {character.conditions.join(", ") || "None"}</p>
                    <AddCondition characterId={character.id} />
                </div>
            )}
        </div>
    );
}

export default CharacterCard;