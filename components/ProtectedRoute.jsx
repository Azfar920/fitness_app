import React from 'react';
import { Redirect } from 'expo-router'; // Import redirect functionality
import { useAuth } from '@clerk/clerk-expo'; // Import Clerk hook to check user authentication status

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();  // Check if the user is authenticated

  if (!isSignedIn) {
    // If the user is not signed in, redirect to SignIn screen
    return <Redirect href="/(auth)/signIn" />;
  }

  // If user is signed in, render the children (protected screens)
  return <>{children}</>;
};

export default ProtectedRoute;

// import React from 'react';
// import { Redirect } from 'expo-router';
// import { useAuth } from '@clerk/clerk-expo';

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn } = useAuth();

//   // If the user is not signed in, redirect them to the sign-in screen
//   if (!isSignedIn) {
//     return <Redirect href="/(auth)/signIn" />;
//   }

//   // If the user is signed in, render the protected content
//   return <>{children}</>;
// };

// export default ProtectedRoute;
