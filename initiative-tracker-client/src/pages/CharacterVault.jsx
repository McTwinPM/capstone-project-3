import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddCharacterForm from "../components/AddCharacterForm";


function CharacterVault() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [initiative, setInitiative] = useState("");
    const [hp, setHp] = useState("");
    const [ac, setAc] = useState("");
    const [conditions, setConditions] = useState("");
    const [message, setMessage] = useState("");


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
            <AddCharacterForm
                name={name}
                setName={setName}
                initiative={initiative}
                setInitiative={setInitiative}
                hp={hp}
                setHp={setHp}
                ac={ac}
                setAc={setAc}
                conditions={conditions}
                setConditions={setConditions}
                message={message}
                setMessage={setMessage}
            />
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