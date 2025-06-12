import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DresseurScreen from './components/DresseurScreen';
import PokedexNavigationContainer from './components/PokedexNavigationContainer';
import CapureScreen from './components/CaptureScreen';
import pokeball from './assets/pokeball.png';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

function CaptureTabIcon() {
  const isFocused = useIsFocused();
  
  if (!isFocused) {
    return <Image source={pokeball} style={{ width: 150, height: 150, marginBottom: 40 }} />;
  }
  return null;
}

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ff373b',
          height: 80,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: 10,
          color: 'black',
        },
        headerShown: false,
      }}>
        <Tab.Screen name="Profil de Dresseur" component={DresseurScreen} options={{
          tabBarIcon: () => (
            <AntDesign name="user" size={24}  />
          ),
        }}/>
        <Tab.Screen name="Capture" component={CapureScreen} options={{
          tabBarLabel: '',
          tabBarIcon: () => <CaptureTabIcon />,
        }}/>
        <Tab.Screen name="Pokedex" component={PokedexNavigationContainer} options={{
          tabBarIcon: () => (
            <AntDesign name="book" size={24} />
          ),
        }} />
      </Tab.Navigator>
      <StatusBar style={{backgroundColor:'red'}} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
