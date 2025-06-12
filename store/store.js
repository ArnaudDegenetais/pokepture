import { configureStore } from "@reduxjs/toolkit";
import pokedexSlice from "./pokedexSlice";

const store = configureStore({
  reducer: {
    pokedex: pokedexSlice,
  },
});
export default store;