import { useDispatch } from "react-redux";
import { addPlayer } from "../../redux/playersSlice";

export default function NewPlayerForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPlayer({ name: e.target.playerName.value, number: parseInt(e.target.number.value) }));
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
