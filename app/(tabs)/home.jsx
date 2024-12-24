import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, Animated, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useRouter } from 'expo-router';  // Import useRouter for navigation

const asImg = require('../../assets/images/workout2.jpg'); // Ensure the image path is correct

export default function Home() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [hasPermission, setHasPermission] = useState(null); 
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
  });
  const [calories, setCalories] = useState(null);

  // Animation values
  const opacity = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  // Get Image Picker Permissions
  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Check Camera permissions
      console.log("Camera permission status:", status); // Debugging output
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  // Handle Image Picker interaction
  const handleCapture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri); // Capture the image URI
      setImage(result.uri);
      Alert.alert('Image Captured!', 'Your image has been captured successfully.');
    } else {
      console.log('Image capture cancelled');
    }
  };

  // Calculate Maintenance Calories
  const calculateCalories = () => {
    const { weight, height, age, gender } = userData;
    if (!weight || !height || !age || !gender) {
      Alert.alert('Missing information', 'Please provide all the details.');
      return;
    }

    // Use a basic Mifflin-St Jeor formula for calculation
    let BMR = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // Calculate maintenance calories, surplus, and deficit
    const maintenance = BMR * 1.55; // Assuming moderate activity level
    const surplus = maintenance + 500; // Surplus for muscle gain
    const deficit = maintenance - 500; // Deficit for weight loss

    setCalories({ maintenance, surplus, deficit });

    // Start the animation when calories are calculated
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000, // Duration for the fade-in
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000, // Duration for the slide-up effect
      useNativeDriver: true,
    }).start();
  };

  // Navigation Functions
  const goToProfile = () => {
    router.push("(tabs)/profile"); // Navigate to profile screen
  };
  
  const goToDiet = () => {
    router.push("(tabs)/diet"); // Navigate to diet screen
  };

  const goToWorkout = () => {
    router.push("(tabs)/workout"); // Navigate to workout screen
  };

  const goToStopwatch = () => {
    router.push("/stopwatch"); // Navigate to stopwatch screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Tab</Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Calorie Catch</Text>
        <Pressable style={styles.boxButton} onPress={handleCapture}>
          <Ionicons name="camera" size={50} color="#000000" /> {/* Camera Icon */}
        </Pressable>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
          />
        )}
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Maintenance Calorie Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={userData.weight}
          onChangeText={(text) => setUserData({ ...userData, weight: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={userData.height}
          onChangeText={(text) => setUserData({ ...userData, height: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={userData.age}
          onChangeText={(text) => setUserData({ ...userData, age: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender (male/female)"
          value={userData.gender}
          onChangeText={(text) => setUserData({ ...userData, gender: text })}
        />

        <Pressable style={styles.calculateButton} onPress={calculateCalories}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </Pressable>

        {calories && (
          <Animated.View style={[styles.resultContainer, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.resultText}>Maintenance Calories: {calories.maintenance.toFixed(2)} kcal</Text>
            <Text style={styles.resultText}>Surplus Calories: {calories.surplus.toFixed(2)} kcal</Text>
            <Text style={styles.resultText}>Deficit Calories: {calories.deficit.toFixed(2)} kcal</Text>
          </Animated.View>
        )}
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Profile Button */}
        <Pressable style={styles.button} onPress={goToProfile}>
          <Text style={styles.buttonText}>Profile</Text>
        </Pressable>

        {/* Diet Button */}
        <Pressable style={styles.button} onPress={goToDiet}>
          <Text style={styles.buttonText}>Diet</Text>
        </Pressable>

        {/* Workout Button */}
        <Pressable style={styles.button} onPress={goToWorkout}>
          <Text style={styles.buttonText}>Workout</Text>
        </Pressable>

        {/* Stopwatch Button */}
        <Pressable style={styles.button} onPress={goToStopwatch}>
          <Text style={styles.buttonText}>Stopwatch</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  box: {
    width: '100%',
    backgroundColor: '#e30606',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  boxButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    color: 'white',
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  calculateButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Allow buttons to wrap to the next line if needed
    justifyContent: 'space-around',  // Distribute buttons evenly
    width: '100%',
  },
  button: {
    backgroundColor: '#e30606', // Green button for visibility
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '40%', // Adjust width to make the buttons smaller
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,  // Smaller font size to fit the layout
  },
});
