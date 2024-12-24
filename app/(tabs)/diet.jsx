import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Image } from 'react-native';
import axios from 'axios';

// Your Edamam API credentials
const appId = 'b0f34494';  // Your API ID
const appKey = 'e3a2cb157d7a5a175c72b26d1a5650a3';  // Your API Key

const DietScreen = () => {
  const [foodItem, setFoodItem] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch food data from Edamam API
  const fetchFoodData = async () => {
    if (!foodItem) {
      alert('Please enter a food item!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Making the API request to Edamam
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
          app_id: appId,
          app_key: appKey,
          ingr: foodItem,  // The ingredient the user wants to search for
        },
      });

      // Check if the API returned food data
      if (response.data.hints && response.data.hints.length > 0) {
        setFoodData(response.data.hints[0].food);
      } else {
        setError('No food found. Try a different search.');
      }
    } catch (err) {
      // Log and display the error message
      console.error('Error fetching data:', err.response ? err.response.data : err.message);
      setError('Error fetching data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f4f4f4' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Diet Plan Search</Text>

      <TextInput
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
        placeholder="Enter food item (e.g., apple)"
        value={foodItem}
        onChangeText={(text) => setFoodItem(text)}
      />

      <Button title="Search Food" onPress={fetchFoodData} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}

      {foodData && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Food: {foodData.label}</Text>
          {foodData.image && (
            <Image source={{ uri: foodData.image }} style={{ width: 200, height: 200, marginTop: 10 }} />
          )}
          <Text style={{ fontSize: 16, marginTop: 10 }}>Calories: {foodData.nutrients.ENERC_KCAL} kcal</Text>
          <Text style={{ fontSize: 16 }}>Fat: {foodData.nutrients.FAT}g</Text>
          <Text style={{ fontSize: 16 }}>Protein: {foodData.nutrients.PROCNT}g</Text>
          <Text style={{ fontSize: 16 }}>Carbohydrates: {foodData.nutrients.CHOCDF}g</Text>
        </View>
      )}
    </View>
  );
};

export default DietScreen;
