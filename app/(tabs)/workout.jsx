import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Video from 'react-native-video';


// Local video files (make sure to replace with your actual file paths)
const videoUrls = {
  'Day 1: Bicep Curls': require('../../assets/Videos/Bicep.mp4'),
  'Day 2: Lats Pulldown': require('../../assets/Videos/Lats.mp4'),
  'Day 4: Seated Rowing': require('../../assets/Videos/Rowing.mp4'),
  'Day 5: Shoulder Press': require('../../assets/Videos/ShoulderPress.mp4'),
};

const Workout = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = (day) => {
    setSelectedVideo(videoUrls[day]);
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setSelectedVideo(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout</Text>
      <Text style={styles.subtitle}>Weekly Workout Routines:</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.weekContainer}>
          <Text style={styles.weekTitle}>Week 1:</Text>
          <Text style={styles.day}>- Day 1: Full Body</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleVideoPlay('Day 1: Full Body')}>
            <Text style={styles.buttonText}>Watch Video</Text>
          </TouchableOpacity>
          
          <Text style={styles.day}>- Day 2: Cardio</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleVideoPlay('Day 2: Cardio')}>
            <Text style={styles.buttonText}>Watch Video</Text>
          </TouchableOpacity>
          
          <Text style={styles.day}>- Day 3: Rest</Text>
          <Text style={styles.day}>- Day 4: Upper Body</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleVideoPlay('Day 4: Upper Body')}>
            <Text style={styles.buttonText}>Watch Video</Text>
          </TouchableOpacity>
          
          <Text style={styles.day}>- Day 5: Lower Body</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleVideoPlay('Day 5: Lower Body')}>
            <Text style={styles.buttonText}>Watch Video</Text>
          </TouchableOpacity>

          <Text style={styles.day}>- Day 6: Cardio</Text>
          <Text style={styles.day}>- Day 7: Rest</Text>
        </View>

        {/* Video Section */}
        {isVideoPlaying && selectedVideo && (
          <View style={styles.videoContainer}>
            <TouchableOpacity onPress={handleCloseVideo} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close Video</Text>
            </TouchableOpacity>
            <Video
              source={selectedVideo}
              style={styles.video}
              controls={true}
              resizeMode="contain"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 30,
  },
  weekContainer: {
    marginTop: 10,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  closeButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Workout;
