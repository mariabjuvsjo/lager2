import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './componets/Home';
import Pick from './componets/orders/Pick';
import Deliveries from './componets/deliveries/Deliveries';
import authModel from './models/auth';
import Auth from './componets/auth/Auth'
import Invoices from './componets/invoices/Invoices';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();



// 72f9bba02fae6b6f226cf148ed5f9e8c 
export default function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    async function fetchAuth() {
      setIsLoggedIn(await authModel.loggedIn())
    }

    fetchAuth()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

              const routeIcons = {
                "Lager": "home",
                "Plock": "list",
                "Inleveranser": "car",
                'Logga in': 'lock-closed',
                'Faktura': 'cash-outline'
              };

              let inx = route.name
              let iconName = routeIcons[inx] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />

            }, tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false

          })}>

          <Tab.Screen name="Lager" >{() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">{() => <Pick setProducts={setProducts} />}</Tab.Screen>
          <Tab.Screen name="Inleveranser">{() => <Deliveries setProducts={setProducts} />}</Tab.Screen>
          {isLoggedIn ?

            <Tab.Screen name='Faktura'>{() => <Invoices setIsLoggedIn={setIsLoggedIn} />}</Tab.Screen>

            :
            <Tab.Screen name='Logga in'>{() => <Auth setIsLoggedIn={setIsLoggedIn} />}</Tab.Screen>
          }

        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  }
});

