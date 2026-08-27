import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddCharacterForm from "../components/AddCharacterForm";
import PaginateButtons from "../components/PaginateButtons";
import CharacterCard from "../components/CharacterCard";
import "../styles/CharacterVault.css";


function CharacterVault() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [initiative, setInitiative] = useState("");
    const [hp, setHp] = useState("");
    const [ac, setAc] = useState("");
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const params = new URLSearchParams({
            sort: "name",
            page: page,
            search: searchTerm
        });
        
        fetch(`${import.meta.env.VITE_API_URL}/characters?${params.toString()}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => {
                setCharacters(data.characters);
                setPage(data.current_page);
                setTotalPages(data.pages);
            });
    }, [searchTerm, page]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); // Reset to the first page when a new search is performed
    };

    // const filteredCharacters = characters.filter((character) =>
    //     character.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <>
            <h1 className="title">Character Vault</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
            <AddCharacterForm
                name={name}
                setName={setName}
                initiative={initiative}
                setInitiative={setInitiative}
                hp={hp}
                setHp={setHp}
                ac={ac}
                setAc={setAc}
                message={message}
                setMessage={setMessage}
                setCharacters={setCharacters}
            />
            <div className="character-vault">
                {characters.map((character) => (
                    <CharacterCard 
                    key={character.id} 
                    character={character} 
                    setCharacters={setCharacters} />
                ))}
            </div>
            <PaginateButtons className="pagination-buttons"
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                // setTotalPages={setTotalPages}
                // setCharacters={setCharacters}
                // searchTerm={searchTerm}
            />
        </>
    );
}

export default CharacterVault;