
function AddCharacterForm({ name, setName, initiative, setInitiative, hp, setHp, ac, setAc, message, setMessage, setCharacters, onSubmit }) {

    function handleSubmit(e) {
        e.preventDefault();
        const newCharacter = {
            name,
            Initiative: parseInt(initiative),
            HitPoints: parseInt(hp),
            ArmorClass: parseInt(ac),
        };

        fetch(`${import.meta.env.VITE_API_URL}/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(newCharacter)
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    setMessage(`Error adding character: ${data.error}`);
                    console.error("Error adding character:", data.error);
                } else {
                    setMessage("Character added successfully!");
                    console.log("Character added:", data);
                    setCharacters(prev => [...prev, data.character]);
                }
            });
    }

    return (
        <div className="add-character-form">
            <h2>Add New Character</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Initiative"
                    value={initiative}
                    onChange={(e) => setInitiative(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="HP"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="AC"
                    value={ac}
                    onChange={(e) => setAc(e.target.value)}
                    required
                />
                <button type="submit">Add Character</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddCharacterForm;