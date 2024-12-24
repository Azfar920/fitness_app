import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

const asImg = require('../../assets/images/w14.jpg'); // Ensure the image path is correct

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time for stopwatch
  const [running, setRunning] = useState(false); // Running state for stopwatch
  const [isTimer, setIsTimer] = useState(false); // Switch between stopwatch and timer
  const [timerTime, setTimerTime] = useState(0); // Time for countdown timer
  const [timerRunning, setTimerRunning] = useState(false); // Timer running state

  // Stopwatch effect
  useEffect(() => {
    let interval;
    if (running && !isTimer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, isTimer]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning && isTimer && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, isTimer, timerTime]);

  const toggleStopwatch = () => {
    setRunning(!running);
  };

  const resetStopwatch = () => {
    setRunning(false);
    setTime(0);
  };

  const startTimer = (time) => {
    setIsTimer(true);
    setTimerTime(time);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimer(false);
    setTimerRunning(false);
    setTimerTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <ImageBackground source={asImg} style={styles.container} resizeMode="cover">
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{isTimer ? 'Timer' : 'Stopwatch'}</Text>

        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>
            {isTimer ? formatTime(timerTime) : formatTime(time)}
          </Text>
          <Text style={styles.subText}>{isTimer ? 'Time Remaining' : 'Elapsed Time'}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startPauseButton}
            onPress={isTimer ? () => setTimerRunning(!timerRunning) : toggleStopwatch}
          >
            <Text style={styles.buttonText}>{running || timerRunning ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={isTimer ? resetTimer : resetStopwatch}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={styles.stopwatchButton}
            onPress={() => setIsTimer(false)}
          >
            <Text style={styles.buttonText}>Stopwatch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => startTimer(300)}
          >
            <Text style={styles.buttonText}>Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to make text readable
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  timeDisplay: {
    marginBottom: 40,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    fontSize: 24,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  startPauseButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#607d8b',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  stopwatchButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    marginRight: 20,
  },
  timerButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
  },
});

export default Stopwatch;
