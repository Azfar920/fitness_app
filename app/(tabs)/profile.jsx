import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';


const profile = () => {
  return (
    <View className="flex-1 bg-white p-4">
    <Text className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</Text>
    <TouchableOpacity className="bg-blue-500 w-full p-4 rounded-lg">
      <Text className="text-white text-center">Share Workout Routine</Text>
    </TouchableOpacity>
    <TouchableOpacity className="bg-green-500 w-full p-4 rounded-lg mt-4">
      <Text className="text-white text-center">Share Diet Plan</Text>
    </TouchableOpacity>
  </View>
  )
}

export default profile