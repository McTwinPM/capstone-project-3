import { use, useEffect, useMemo, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import "../styles/Initiative.css";

function Initiative() {
    const [characters, setCharacters] = useState([]);
    const [activeInitiative, setActiveInitiative] = useState(-1);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/characters?sort=initiative&min_initiative=0`, {
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

    const orderedCharacters = useMemo(() => {
        return [...characters].sort((a, b) => Number(b.Initiative ?? 0) - Number(a.Initiative ?? 0));
    }, [characters]);

    useEffect(() => {
        if (orderedCharacters.length === 0) {
            setActiveInitiative(-1);
        }
        if (activeInitiative >= orderedCharacters.length) {
            setActiveInitiative(0);
        }
    }, [orderedCharacters.length, activeInitiative]);

    function nextTurn() {
        if (orderedCharacters.length === 0) return;
        setActiveInitiative((prev) => (prev + 1) % orderedCharacters.length);
    }

    return (
        <>
            <h1 className="title">Initiative Tracker</h1>
            <div className="initiative-controls">
                <button onClick={nextTurn} disabled={orderedCharacters.length === 0}>Next Turn</button>
            </div>
            <div className="initiative-tracker">
                {orderedCharacters.map((character, index) => (
                    <div key={character.id} className={`initiative-row ${index === activeInitiative ? "active-turn" : ""}`}>
                        <CharacterCard character={character} setCharacters={setCharacters}/>
                    </div>
              ))}
            </div>
        </>
    );
}

export default Initiative;