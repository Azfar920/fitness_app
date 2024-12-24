import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"

const CustomInputField = ({ title, value, handleTextChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="space-y-1 my-2">
      <Text className="text-lg font-semibold">{title}</Text>
      <View className="flex flex-row w-full shadow-sm border border-gray-400">
        <TextInput className="flex-1 h-auto text-base p-2" value={value} onChangeText={handleTextChange} secureTextEntry={title === "Password" && showPassword === false} />
        <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}>
          {title === "Password" && <Ionicons name={showPassword ? "eye-off" : "eye"} size={25} style={{ margin: "auto", paddingRight: 10 }} />}
        </TouchableOpacity>
      </View>
      <Text>{value}</Text>
    </View>
  )
}

export default CustomInputField