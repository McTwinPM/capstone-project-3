import { useEffect, useRef } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form className='search-bar' onSubmit={handleSearch}>
            <input
                className='search-input'
                type='text'
                placeholder='Search characters...'
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
}

export default SearchBar;