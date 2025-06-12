import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokedexScreen from './PokedexScreen';
import PokemonDetailScreen from './PokemonDetailScreen';

export default function PokedexNavigationContainer() {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator initialRouteName="Pokedex" options={{ headerShown: false}}>
        <Stack.Screen
          name="Pokedex"
          component={PokedexScreen}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={({ route }) => ({ title: route.params.pokemon.name })}
        />
      </Stack.Navigator>
  );
}