import {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function DresseurScreen() {
    const [user, setUser] = useState(null);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                console.log('User retrieved:', JSON.parse(user));
                setUser(JSON.parse(user));
            } else {
                console.log('No user found');
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
        }
    }

    const freePokemons = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                const userData = JSON.parse(user);
                userData.pokemonApercus = 0;
                userData.pokemonApercusIdList = [];
                userData.pokemonCaptures = 0;
                userData.pokemonCapturesIdList = [];
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                console.log('User data reset:', userData);
            }
        } catch (error) {
            console.error('Error resetting user data:', error);
        }
    }

    useEffect(() => {
        if (isFocused) {
            console.log('DresseurScreen is focused');
            setLoading(true);
            getUser();
            setLoading(false);
        }
    }
    , [isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        pokemon aperçus: {user ? user.pokemonApercus : '0'}
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        pokemon capturés: {user ? user.pokemonCaptures : '0'}
      </Text>
      <Button 
        title="Effacer le pokedex"
        onPress={freePokemons}
        color="#FF3B30"
      />
    </View>
  );
}