import "./App.css";
import NewPlayerForm from "./assets/components/NewPlayerForm";
import { useSelector } from "react-redux";
import { playersSelector } from "./redux/playersSlice";
function App() {
  const players = useSelector(playersSelector);

  return (
    <>
      <h1>Players:</h1>
      <ul>
        {players.map((player) => (
          <li key={player.name + player.number}>
            #{player.number} - {player.name}
          </li>
        ))}
      </ul>
      <NewPlayerForm />
    </>
  );
}

export default App;
