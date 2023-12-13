export default function NewPlayerForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Player Name:
        <input type="text" name="playerName" />
      </label>
      <label>
        Player Number:
        <input type="number" name="number" min="0" max="99" />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}
