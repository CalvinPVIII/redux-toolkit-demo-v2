import "./App.css";
import NewPlayerForm from "./assets/components/NewPlayerForm";

function App() {
  const players = [
    { name: "LeBron James", number: 23 },
    { name: "Michael Jordan", number: 23 },
    { name: "Anfernee Simons", number: 1 },
  ];

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
