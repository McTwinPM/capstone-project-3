import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function DeleteCharacterButton({ characterId, setCharacter }) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to delete this character?")) {
            event.preventDefault();
            fetch(`/api/characters/${characterId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((r) => {
                    if (r.ok) {
                        setError(null);
                        console.log("Character deleted successfully");
                        setCharacter(null);
                    } else {
                        return r.json().then((err) => Promise.reject(err));
                    }
                })
                .catch((err) => setError(err.error));
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default DeleteCharacterButton