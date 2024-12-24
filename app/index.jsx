import { useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
// import { createDrawerNavigator } from '@react-navigation/drawer'; // Import drawer navigator
import HomeScreen from './(tabs)/home'; // Import your Home screen
import { Ionicons } from '@expo/vector-icons'; // Optional: for drawer icons

const logoImg = require("../assets/images/w12.jpg");

const Drawer = createDrawerNavigator(); // Create the Drawer Navigator

export default function App() {
  const router = useRouter();
  const { user } = useUser();

  const handlePressStarted = () => {
    router.push("(auth)/signIn");
  };

  // Automatically navigate to home when the user is signed in
  useEffect(() => {
    if (user) {
      router.push("(tabs)/home"); // Use replace to avoid back navigation to this screen
    }
  }, [user]);

  return (
    <>
      {user ? (
        // Render Drawer.Navigator only if the user is signed in
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen} // HomeScreen is your Home page component
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="home" size={size} color={focused ? '#7cc' : '#ccc'} />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        // Show welcome screen if user is not signed in
        <ImageBackground 
          source={logoImg} 
          style={styles.background}  
          resizeMode="cover" 
          imageStyle={{ opacity: 0.5 }}  
        >
          <View style={styles.container}>
            {/* Check if user is signed out */}
            <SignedOut>
              <Text style={styles.text}>Smart Fitness Pro</Text>
              <CustomButton 
                handlePress={handlePressStarted} 
                title="Get Started" 
                containerStyle="bg-red-500 p-2 rounded-md" 
                titleStyle="text-white" 
              />
            </SignedOut>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textSmall: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
