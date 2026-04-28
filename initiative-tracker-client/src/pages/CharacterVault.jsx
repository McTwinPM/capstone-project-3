import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";


function CharacterVault() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    
    useEffect(() => {
        fetch("/api/characters", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => setCharacters(data));
    }, []);

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="title">Character Vault</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="character-vault">
                {filteredCharacters.map((character) => (
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