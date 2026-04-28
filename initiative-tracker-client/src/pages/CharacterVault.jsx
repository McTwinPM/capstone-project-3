import { useEffect, useInsertionEffect, useState } from "react";


function CharacterVault() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch("/api/characters", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => setCharacters(data));
    }, []);

    return (
        <>
            <h1 className="title">Character Vault</h1>
            <div className="character-vault">
                {characters.map((character) => (
                    <div key={character.id} className="character-card">
                        <h2>{character.name}</h2>
                        <p>Initiative: {character.initiative}</p>
                        <p>HP: {character.hp}</p>
                        <p>AC: {character.ac}</p>
                        <p>Conditions: {character.conditions.join(", ")}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CharacterVault;