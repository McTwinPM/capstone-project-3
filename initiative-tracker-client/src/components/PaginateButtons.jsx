
function PaginateButtons({ page, setPage, totalPages, setTotalPages, setCharacters }) {

    const handleLoadMore = () => {
        fetch(`${import.meta.env.VITE_API_URL}/characters?page=${page + 1}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => {
                setPage(data.current_page);
                setTotalPages(data.pages);
                setCharacters(data.characters);
            });
    };

    const handleLoadPrevious = () => {
        if (page > 1) {
            fetch(`${import.meta.env.VITE_API_URL}/characters?page=${page - 1}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((r) => r.json())
                .then((data) => {
                    setPage(data.current_page);
                    setTotalPages(data.pages);
                    setCharacters(data.characters);
                });
        }
    };

    return (
        <div className = "pagination-buttons">
            {page > 1 && (
                <button className = "pagination-previous-button" onClick={handleLoadPrevious}>Previous</button>
            )}
            {page < totalPages && (
                <button className = "pagination-next-button" onClick={handleLoadMore}>Next</button>
            )}
        </div>
    );
}

export default PaginateButtons;