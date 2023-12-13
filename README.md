# Redux Toolkit Demo

This repo contains an example of how to setup and use Redux with the Redux Toolkit.

The steps followed are similar to the steps outlined in the [quickstart guide](https://redux-toolkit.js.org/tutorials/quick-start)

## Installation/Setup Instructions:

- Clone this repo using the command: `git clone https://github.com/CalvinPVIII/redux-toolkit-demo-v2.git`
- Run the command `cd redux-toolkit-demo-v2`
- Run the command `npm install`
- To launch the dev server, run `npm run dev`
- To build the project for production, run `npm run build`

## Overview of using Redux Toolkit

- To use Redux and Redux toolkit in your project, you will need to install two packages via the command `npm install @reduxjs/toolkit react-redux`

- Our state is going to be managed in a store, so we need to create that. Let's make a "redux" folder, and inside that folder a file called "store.js". The "store.js" file will look like this:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // this is where each slice of state will live
});
```

- Now that the store is setup, lets create a slice of state. In the example, I created a slice of state to handle a list of players. Let's create a file called "playersSlice.js". It will look like this:

```js
import { createSlice } from "@reduxjs/toolkit"; // this function we import does a lot of heavy lifting for us, and will allow us to easily create a reducer and actions in one object

const initialState = [];

const playersSlice = createSlice({
  // create slice takes an argument of an object
  name: "players", // the name property is what we want to call this slice of state
  initialState: initialState, // initial state is the data we want our store to start with.
  reducers: {
    // this is where we will define the logic that updates our state, also known as our actions. Each action is an object where the keys will be the action's name, and the values will the logic that updates our state
    addPlayer: (state, action) => {
      // addPlayer is the name of the action, the arrow function is where we define the logic to update our state

      // the 'action' object is automatically created for us, and is structured like this: {type: "sliceName/actionName", payload:"data given to action"}
      state.push(action.payload);
      // we can write code that mutates state directly because of Redux toolkit's use of the Immer library
    },
  },
});

export default playersSlice.reducer; // exporting the reducer, this is created via the `createSlice` function

export const { addPlayer } = playersSlice.actions; // exporting our actions
```

- Next we will add this slice of state to our main store. In "store.js":

```js
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playersSlice"; // importing our reducer

export const store = configureStore({
  reducer: {
    players: playerReducer, // the "players" slice of state will be handled by the "playerReducer"
  },
});
```

- Next we will configure our React app to use our Redux store. In "main.jsx" (or "index.js" if using Create React App):

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux"; // new line
import { store } from "./redux/store.js"; // new line

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* We wrap the entire app with the "Provider", and the store we want to provide our app is the store that we created earlier */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

- Now we will update our React app to use our state from the Redux store. In "App.jsx":

```js
import "./App.css";
import NewPlayerForm from "./assets/components/NewPlayerForm";
import { useSelector } from "react-redux"; // useSelector is a hook that will let us grab specific parts of our state

function App() {
  const players = useSelector((state) => state.players); // this line is where we are pulling from our state. useSelector takes in a function as an argument that will return a specific slice from our state, in this case the "players" slice. This is directly referencing the name of the key in the "reducers" object of our store in "store.js".

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
```

- Now if we want to add something to our state, we will need to dispatch an action. This will be done on "NewPlayerForm.jsx":

```js
import { useDispatch } from "react-redux"; // this is the hook that will let us dispatch actions to update state
import { addPlayer } from "../../redux/playersSlice"; // this is the action that we will dispatch

export default function NewPlayerForm() {
  const dispatch = useDispatch(); // we need to setup the "dispatch" function by calling "useDispatch"

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {{ name: e.target.playerName.value, number: parseInt(e.target.number.value) }} // creating our player from user input
    dispatch(addPlayer(newPlayer)); // dispatching the "addPlayer" action. The argument we give "addPlayer" will become the "payload"
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
```

- And with that we can now dispatch actions to update our state.

- One extra thing we can do to make our code even more reusable is to create our selector, rather than defining inside the component itself. In "redux/playersSlice.js":

```js
// at the end of our file:

export const playersSelector = (state) => state.players; // "state" refers to the state of the entire store, and we specifically want to return the "players" slice from our overall state
```

- Now that we have this reusable selector, lets update "App.jsx":

```js
import { playersSelector } from "./redux/playersSlice"; // import our reusable selector
function App() {
  const players = useSelector(playersSelector); // using our selector with the "useSelector" hook to retrieve our players


  //rest of logic here
```

- Now we have our state being managed by Redux
