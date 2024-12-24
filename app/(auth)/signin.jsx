import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

const asImg = require('../../assets/images/workout2.jpg'); // Ensure the image path is correct

export default function SignIn() {
  const router = useRouter(); // Initialize the router
  const { signIn, setActive, isLoaded } = useSignIn(); // Clerk hooks

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    try {
      // Start the sign-in process using the email and password provided
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/'); // Redirect to the home screen
      } else {
        console.error('Sign-in incomplete:', signInAttempt);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  }, [isLoaded, emailAddress, password]);

  const navigateToSignUp = () => {
    router.push('/(auth)/signUp'); // Navigate to the SignUp page
  };

  return (
    <ImageBackground source={asImg} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          style={styles.input}
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to make text readable
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 15,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  linkText: {
    color: 'white',
  },
});
