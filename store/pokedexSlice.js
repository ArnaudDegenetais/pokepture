import { createSlice } from "@reduxjs/toolkit";

const initialeState = {
  pokemonApercus: 0,
  pokemonApercusIdList: [],
  pokemonCaptures: 0,
  pokemonCapturesIdList: [],
  pokemonList: [],
  pokemonListLoaded: false
};
const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: initialeState,
  reducers: {
    setPokemonApercus: (state, action) => {
      state.pokemonApercus = action.payload;
    },
    setPokemonApercusIdList: (state, action) => {
      state.pokemonApercusIdList = action.payload;
    },
    setPokemonCaptures: (state, action) => {
      state.pokemonCaptures = action.payload;
    },
    setPokemonCapturesIdList: (state, action) => {
      state.pokemonCapturesIdList = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
      state.pokemonListLoaded = true;
    },
  },
});
export const {
  setPokemonApercus,
  setPokemonApercusIdList,
  setPokemonCaptures,
  setPokemonCapturesIdList,
  setPokemonList,
} = pokedexSlice.actions;
export default pokedexSlice.reducer;
export const selectPokemonApercus = (state) => state.pokedex.pokemonApercus;
export const selectPokemonApercusIdList = (state) => state.pokedex.pokemonApercusIdList;
export const selectPokemonCaptures = (state) => state.pokedex.pokemonCaptures;
export const selectPokemonCapturesIdList = (state) => state.pokedex.pokemonCapturesIdList;
export const selectPokemonList = (state) => state.pokedex.pokemonList;
export const selectPokemonListLoaded = (state) => state.pokedex.pokemonListLoaded;
export const selectPokemonById = (state, id) => {
  return state.pokedex.pokemonList.find(pokemon => pokemon.id === id);
};
export const selectPokemonByName = (state, name) => {
  return state.pokedex.pokemonList.find(pokemon => pokemon.name === name);
};
export const selectPokemonByIds = (state, ids) => {
  return state.pokedex.pokemonList.filter(pokemon => ids.includes(pokemon.id));
};
export const selectPokemonByNames = (state, names) => {
  return state.pokedex.pokemonList.filter(pokemon => names.includes(pokemon.name));
};
export const selectPokemonByPartialName = (state, partialName) => {
  return state.pokedex.pokemonList.filter(pokemon => pokemon.name.includes(partialName));
};
export const selectPokemonByPartialNames = (state, partialNames) => {
  return state.pokedex.pokemonList.filter(pokemon => 
    partialNames.some(partialName => pokemon.name.includes(partialName))
  );
};
export const selectPokemonByType = (state, type) => {
  return state.pokedex.pokemonList.filter(pokemon => 
    pokemon.types.some(pokemonType => pokemonType.type.name === type)
  );
};
export const selectPokemonByTypes = (state, types) => {
  return state.pokedex.pokemonList.filter(pokemon => 
    pokemon.types.some(pokemonType => types.includes(pokemonType.type.name))
  );
};
export const selectPokemonByAbility = (state, ability) => {
  return state.pokedex.pokemonList.filter(pokemon => 
    pokemon.abilities.some(pokemonAbility => pokemonAbility.ability.name === ability)
  );
};
export const selectPokemonByAbilities = (state, abilities) => {
  return state.pokedex.pokemonList.filter(pokemon => 
    pokemon.abilities.some(pokemonAbility => abilities.includes(pokemonAbility.ability.name))
  );
};