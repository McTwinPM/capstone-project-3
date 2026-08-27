
function PaginateButtons({ page, setPage, totalPages, setTotalPages, setCharacters, searchTerm }) {

    // const loadPage = (nextPage) => {
    //     const params = new URLSearchParams({
    //         sort: "name",
    //         page: nextPage,
    //         search: searchTerm
    //     });

    //     fetch(`${import.meta.env.VITE_API_URL}/characters?${params.toString()}`, {
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setPage(data.current_page);
    //             setTotalPages(data.pages);
    //             setCharacters(data.characters);
    //         });
    // };

    // const handleLoadMore = () => {
    //     loadPage(page + 1);
    // };

    // const handleLoadPrevious = () => {
    //     if (page > 1) {
    //         loadPage(page - 1);
    //     }
    // };

    return (
        <div className = "pagination-buttons">
            {page > 1 && (
                <button className = "pagination-previous-button" onClick={() => setPage((currentPage) => currentPage - 1)}>Previous</button>
            )}
            {page < totalPages && (
                <button className = "pagination-next-button" onClick={() => setPage((currentPage) => currentPage + 1)}>Next</button>
            )}
        </div>
    );
}

export default PaginateButtons;