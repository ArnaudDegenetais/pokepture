import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PokemonDetailScreen({ pokemon }) {
    console.log('PokemonDetailScreen props:', pokemon);
  return (
    <View style={styles.container}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
        />
        <Text style={styles.title}>{pokemon.name}</Text>
        {/* <Text style={styles.detail}>Height: {pokemon.height}</Text>
        <Text style={styles.detail}>Weight: {pokemon.weight}</Text>
        <Text style={styles.detail}>Base Experience: {pokemon.base_experience}</Text> */}
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