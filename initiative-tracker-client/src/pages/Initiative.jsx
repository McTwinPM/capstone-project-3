import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import React from "react";

function Initiative() {
    const [characters, setCharacters] = useState([]);
    const [initiative, setInitiative] = useState("");

    useEffect(() => {
        fetch("/api/characters?sort=initiative&min_initiative=0", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(async (r) => {
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || `Request failed: ${r.status}`);
    return data;
  })
  .then((data) => setCharacters(Array.isArray(data.characters) ? data.characters : []))
  .catch(() => setCharacters([]));
    }, []);

    return (
        <>
            <h1 className="title">Initiative Tracker</h1>
            <div className="initiative-tracker">
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </>
    );
}

export default Initiative;