import {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import PokemonCardComponent from "./PokemonCardComponent";
import PokemonDetailScreen from "./PokemonDetailScreen";

export default function PokedexScreen() {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);

  const isFocused = useIsFocused();

  const getPokemonList = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const userData = JSON.parse(user);
        const pokemonIds = userData.pokemonCapturesIdList;
        const pokemonPromises = pokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => ({
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
            }))
        );
        const pokemonData = await Promise.all(pokemonPromises);
        console.log('Pokemon list:', pokemonData);
        setPokemonList(pokemonData);
      }
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      console.log('PokedexScreen is focused');
      setLoading(true);
      getPokemonList();
    }
  }
  , [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCardComponent pokemon={item} />
        )}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.description}>No Pokemon captured yet.</Text>
        }
      />
      {loading && <Text>Loading...</Text>}
      {!loading && pokemonList.length === 0 && (
        <Text style={styles.description}>No Pokemon captured yet.</Text>
      )}
      <Button
        title="Refresh"
        onPress={() => {
          setLoading(true);
          getPokemonList();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});