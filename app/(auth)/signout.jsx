import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const asImg = require('../../assets/images/workout2.jpg'); // Ensure the image path is correct

export default function SignUp() {
  const router = useRouter(); // Initialize useRouter to navigate between screens
  const { isLoaded, signUp, setActive } = useSignUp(); // Clerk hooks

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      // Start sign-up process
      await signUp.create({
        emailAddress,
        password,
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error('Sign-up error:', err);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      // Attempt email verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/'); // Redirect on success
      } else {
        console.error('Verification incomplete:', signUpAttempt);
      }
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  const handleSignInRedirect = () => {
    router.push('/(auth)/signIn'); // Navigate to the SignIn page
  };

  // Render verification form if pending verification
  if (pendingVerification) {
    return (
      <ImageBackground source={asImg} style={{ flex: 1 }} resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Verify Your Email</Text>
          <TextInput
            placeholder="Enter verification code"
            placeholderTextColor="white"
            style={styles.input}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Render sign-up form
  return (
    <ImageBackground source={asImg} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="white"
          style={styles.input}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignInRedirect}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
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

