import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function PokemonDetailScreen() {
  const route = useRoute();
  const { pokemon } = route.params || {};
  const [pokemonDetails, setPokemonDetails] = useState(pokemon);
  const [loading, setLoading] = useState(false);
  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>Pokemon data not found</Text>
      </View>
    );
  }

  console.log("PokemonDetailScreen params:", pokemon);

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      // console.log('Fetched Pokemon details:', data);
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        types: data.types.map((typeInfo) => typeInfo.type.name),
      };
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPokemonDetails(pokemon.id);
      console.log("Fetched details:", details);
      if (details) {
        setPokemonDetails(details);
      }
    };
    fetchDetails();
  }, [pokemon.id]);

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {!loading && (
        <>
          <Image
            source={{
              uri: pokemonDetails.image
                ? pokemonDetails.image
                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4d/back/132.png",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{pokemonDetails.name}</Text>
          <Text style={styles.detail}>
            Height:{" "}
            {pokemonDetails.height ? `${pokemonDetails.height / 10} m` : "N/A"}
          </Text>
          <Text style={styles.detail}>
            Weight:{" "}
            {pokemonDetails.weight ? `${pokemonDetails.weight / 10} kg` : "N/A"}
          </Text>
          <Text style={styles.detail}>
            Base Experience: {pokemonDetails.base_experience || "N/A"}
          </Text>
          <Text style={styles.detail}>
            Types:{" "}
            {Array.isArray(pokemonDetails.types)
              ? pokemonDetails.types.join(", ")
              : "N/A"}
          </Text>
        </>
      )}
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
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});
