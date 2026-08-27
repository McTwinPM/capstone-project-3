
function PaginateButtons({ page, setPage, totalPages }) {

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