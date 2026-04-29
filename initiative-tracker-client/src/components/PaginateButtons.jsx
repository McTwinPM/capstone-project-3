import { useEffect, useState } from "react";

function PaginateButtons({ page, setPage, totalPages, setTotalPages }) {

    const handleLoadMore = () => {
        fetch(`/api/characters?page=${page + 1}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((r) => r.json())
            .then((data) => {
                setPage(page + 1);
                setTotalPages(data.totalPages);
            });
    };

    const handleLoadPrevious = () => {
        if (page > 1) {
            fetch(`/api/characters?page=${page - 1}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((r) => r.json())
                .then((data) => {
                    setPage(page - 1);
                    setTotalPages(data.totalPages);
                });
        }
    };

    return (
        <div className = "paginate-buttons">
            {page > 1 && (
                <button className = "paginate-previous-button" onClick={handleLoadPrevious}>Previous</button>
            )}
            {page < totalPages && (
                <button className = "paginate-next-button" onClick={handleLoadMore}>Next</button>
            )}
        </div>
    );
}

export default PaginateButtons;