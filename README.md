# Testing Redux Toolkit

While Redux Toolkit recommends integration testing, you still can write unit tests for your reducers and selectors. Here is the general workflow of how that works:

**Since this project was created with Vite, it uses [Vitest](https://vitest.dev/) as it's testing runner. If you are familiar with Jest, it functions nearly exactly the same. If you used Create React App to setup your project, then Jest should already be configured and ready to go**

## Setting Up The Testing Environment

- To install Vitest, run the command `npm install -D vitest`
- To run our tests, we need to add a "test" script to the "package.json" file:

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest" // new line
  },

```

- Now lets create a test folder in the "src" folder of our project, as well as a test file for our reducer:

```shell
mkdir __tests__
cd __tests__
touch playersSlice.test.js
```

- Now inside the "playersSlice.test.js" file, let's import our reducer, our actions, and setup a the structure for a test

```js
import playersReducer, { addPlayer } from "../redux/playersSlice";
import { expect, describe, test } from "vitest";

describe("playersSlice", () => {
  test("should add a player to the list of players", () => {});
});
```

**Note: If you are using Create React App instead of Vite, you won't need to install any other packages. You also won't need to import `expect`, `describe`, and `test`. Rather than wrapping your test in the `test` function, you can wrap it in the `it` function. It would look something like this:**

```
  it("should add a player to the list of players", () => {});
```

## Testing our reducers

- Inside our test files, we want to test our reducer. Our reducer is just a pure function that takes in two parameters, the initial state, and the action that gets dispatched that will update our state. When the reducer is finished, it will return the newly updated state. With knowing how the reducer works, we can now start writing our test:

```js
describe("playersSlice", () => {
  test("add a player to the list of players", () => {
    const initialState = [];
    // playersReducer will take the initialState, and also the "addPlayer" action that will add the given player to the initialState. When it is done it will return the updated state with the added player
    const updatedState = playersReducer(initialState, addPlayer({ name: "Scoot Henderson", number: 0 }));
    expect(updatedState).toEqual([{ name: "Scoot Henderson", number: 0 }]);
  });
});
```

- After running the command `npm run test`, we can confirm that our test is passing.

- Here is another example for a "removePlayer" action. This time we will more closely follow TDD by writing the test first:

```js
test("remove a player from the list of players", () => {
  const initialState = [
    { name: "Scoot Henderson", number: 0 },
    { name: "Damian Lillard", number: 0 },
  ];
  const updatedState = playersReducer(initialState, removePlayer("Damian Lillard"));
  expect(updatedState).toEqual([{ name: "Scoot Henderson", number: 0 }]);
});
```

- Now, let's write the code to pass this test:

```js
const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.push(action.payload);
    },
    // new action
    removePlayer: (state, action) => {
      return state.filter((player) => player.name !== action.payload); // because we aren't writing mutating logic, we need to specifically return the updated state
    },
  },
});

export default playersSlice.reducer;

export const { addPlayer, removePlayer } = playersSlice.actions; // exporting the removePlayer action

export const playersSelector = (state) => state.players;
```

- Make sure to also update your import in the "playersSlice.test.js" file:
  `import playersReducer, { addPlayer, removePlayer } from "../redux/playersSlice";`

- After running `npm run test`, our code be passing

## Testing selectors

- With Redux Toolkit, the selectors we create to retrieve state are also pure functions, so we can test those as well. Let's create a new test file called "selectors.test.js". In this file, we will setup a basic test, and import the `playersSelector` from the `playersSlice`:

```js
import { playersSelector } from "../redux/playersSlice";
import { expect, describe, test } from "vitest";

describe("selectors", () => {
  test("should return all players in the playersSlice", () => {});
});
```

- Now that we have a test setup, let's add in our test. First, we need to create a mockup of what our state will look like in our store. We can do that by using our store as a reference. Let's take a look at the "store.js" file:

```js
export const store = configureStore({
  reducer: {
    players: playerReducer,
  },
});
```

- Write now our store has one slice of state, players. With this current setup, our state will will be structured in an object that looks like this:

```js
{
  players: [];
}
```

- Why is `players` set to an array? That is because in our `playersSlice`, when we are setting up this slice of state using the `createSlice`, we explicitly define the initial state to be an empty array:

playersSlice.js:

```js
const initialState = []; // initial state is an empty array

const playersSlice = createSlice({
  name: "players",
  initialState: initialState, // setting the initial state to be the empty array
  reducers: {
    addPlayer: (state, action) => {
      state.push(action.payload);
    },
    removePlayer: (state, action) => {
      return state.filter((player) => player.name !== action.payload);
    },
  },
});
```

- Since this slice of state is going to be an array containing all the current players, we know that it will be an array, and will eventually contain data for each player.

- Going back to the "selectors.test.js" file, we want to create a mockup of what our state looks like, so we can test our selectors against it.

selectors.test.js:

```js
import { playersSelector } from "../redux/playersSlice";
import { expect, describe, test } from "vitest";

// defining our "mock state"
const state = {
  // we know that the 'players' slice of state, is an array, and we know that it will contain information about each player, so we will create an array that will reflect what that structure looks like
  players: [{ name: "Scoot Henderson", number: 0 }],
};

describe("selectors", () => {
  test("should return all players in the playersSlice", () => {});
});
```

- Now that we've got a mock of our state to test our selectors against, let's finish writing our test:

```js
describe("selectors", () => {
  test("should return all players in the playersSlice", () => {
    const playersList = playersSelector(state);
    expect(playersList).toEqual([{ name: "Scoot Henderson", number: 0 }]);
  });
});
```

- Since our `playersSelector` function simply takes in the state object, and returns a specific piece of the object, all we need to do is call the function with our state argument.

- After running `npm run test`, our test should be passing.

- If we had multiple slices of state and multiple selectors, the process would be mostly the same. The main thing that would change would be our mock state object. For example, lets say our store looked like this:

```js
export const store = configureStore({
  reducer: {
    players: playerReducer,
    teams: teamsReducer,
  },
});
```

- Now our mock state object in our test would need to be updated to look like this:

```js
const state = {
  players: [{ name: "Scoot Henderson", number: 0 }],
  teams: [{ city: "Portland", name: "Trail Blazers" }],
};
```

- Again, this mock state object reflects the state of the entire store, not just a specific slice.
- And just to be thorough, here is what a test for for a `teamsSelector` would look like:

```js
test("should return all players in the playersSlice", () => {
  const playersList = teamsSelector(state);
  expect(playersList).toEqual([{ city: "Portland", name: "Trail Blazers" }]);
});
```
