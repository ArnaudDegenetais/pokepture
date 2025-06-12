import {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Alert, Animated, useAnimatedValue, Easing } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import pokeball from '../assets/pokeball.png'; 

export default function CapureScreen() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({
        id: null,
        name: '',
        image: ''
    });
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null);
    const [isPokeballThrown, setIsPokeballThrown] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const pokeballAnimatedValue = new Animated.Value(300);
    const pokeballAnimatedSize = new Animated.Value(1);
    const pokeballAnimatedRotation = new Animated.Value(0);

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                console.log('User retrieved:', JSON.parse(user));
                const userData = JSON.parse(user);
                setUser({
                    pokemonApercus: userData.pokemonApercus || 0,
                    pokemonApercusIdList: userData.pokemonApercusIdList || [],
                    pokemonCaptures: userData.pokemonCaptures || 0,
                    pokemonCapturesIdList: userData.pokemonCapturesIdList || [],
                });
            } else {
                console.log('No user found');
                setUser({
                    pokemonApercus: 0,
                    pokemonApercusIdList: [],
                    pokemonCaptures: 0,
                    pokemonCapturesIdList: [],
                });
            }
        }
        catch (error) {
            console.error('Error retrieving user:', error);
        }
    }

    const getPokemon = async () => {
        const id = Math.floor(Math.random() * 1000) + 1;
        try {
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            const formattedPokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
            };
            console.log('Pokemon data:', formattedPokemon);
            setPokemon(formattedPokemon);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
        }
    }

    const displayAlert = (isSuccess, pokemonName) => {
        const message = isSuccess
            ? `Vous avez attrapé ${pokemonName}!`
            : `Vous avez raté ${pokemonName}. Essayez encore!`;
        Alert.alert(
            isSuccess ? "Succès!" : "Échec!",
            message,
            isSuccess?[{ text: "un autre", onPress: () => getPokemon() }]:[{text: "OK", onPress: () => console.log("ok")},{ text: "un autre", onPress: () => getPokemon() }]
        );
    }

    const animatePokeball = () => {
        pokeballAnimatedValue.setValue(300);
        
        Animated.timing(pokeballAnimatedValue, {
            toValue: -50,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        Animated.timing(pokeballAnimatedSize, {
            toValue: 4,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        Animated.sequence([
        Animated.delay(2500),
        Animated.loop(
            Animated.sequence([
                Animated.timing(pokeballAnimatedRotation, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(pokeballAnimatedRotation, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ]),
            { iterations: 3 }
        )
    ]).start();
    }

    const pokeballCooldown = () => {
        setTimeout(() => {
            setIsPokeballThrown(false);
            displayAlert(isSuccess, pokemon.name);
        }, 5000);
    }
    useEffect(() => {
        if (isPokeballThrown) {
            animatePokeball();
            pokeballCooldown();
        }
    }
    , [isPokeballThrown]);

    const tryToCatchPokemon = useCallback(() => {
        setIsPokeballThrown(true);
        const catchChance = Math.random();
        if (catchChance < 0.5) {
            if (!user.pokemonCapturesIdList.some(p => p.id === pokemon.id)) {
                console.log(`You caught ${pokemon.name}!`);
                setIsSuccess(true);
                setUser(prevUser => ({
                    ...prevUser,
                    pokemonCaptures: prevUser.pokemonCaptures + 1,
                    pokemonCapturesIdList: [...prevUser.pokemonCapturesIdList, pokemon.id],
                    pokemonApercus: prevUser.pokemonApercus + 1,
                    pokemonApercusIdList: [...prevUser.pokemonApercusIdList, pokemon.id],
                }));
                AsyncStorage.setItem('user', JSON.stringify({
                    pokemonApercus: user.pokemonApercus + 1,
                    pokemonApercusIdList: user.pokemonApercusIdList,
                    pokemonCaptures: user.pokemonCaptures + 1,
                    pokemonCapturesIdList: [...user.pokemonCapturesIdList, pokemon.id],
                }));
            }
            console.log(`You have now captured ${user.pokemonCaptures + 1} Pokemon.`);
        } else {
            console.log(`You missed ${pokemon.name}. Try again!`);
            setIsSuccess(false);
            setUser(prevUser => ({
                ...prevUser,
                pokemonApercus: prevUser.pokemonApercus + 1,
                pokemonApercusIdList: [...prevUser.pokemonApercusIdList, pokemon.id],
            }));
            AsyncStorage.setItem('user', JSON.stringify({
                pokemonApercus: user.pokemonApercus + 1,
                pokemonApercusIdList: [...user.pokemonApercusIdList, pokemon.id],
                pokemonCaptures: user.pokemonCaptures,
                pokemonCapturesIdList: user.pokemonCapturesIdList,
            }));
        }
    }
    , [pokemon.name]);

    useEffect

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getPokemon();
            getUser();
        }
        if (!loading) {
            setPokemon({
        id: null,
        name: '',
        image: ''
    });
        }
    }
    , [isFocused]);

  return (
    <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && (
            <>
                <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150, marginBottom: 20 }} />
                <Text style={styles.title}>{pokemon.name}</Text>
                {!isPokeballThrown && (
                <Button
                    title="Jeter la Pokéball"
                    onPress={tryToCatchPokemon}
                    color="#841584"
                    disabled={isPokeballThrown}
                />)}

            </>
        )}
        {isPokeballThrown && (
            <Animated.View style={[
                    styles.pokeballContainer,
                    {
                        transform: [{ translateY: pokeballAnimatedValue }, { scale: pokeballAnimatedSize },{ 
                            rotate: pokeballAnimatedRotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '35deg']
                            })
                        }],
                    }
                ]}>
                    <Image source={pokeball} style={styles.pokeballImage} />
                </Animated.View>
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
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "capitalize",
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    pokeballContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    pokeballImage: {
        width: 100,
        height: 100,
    },
});