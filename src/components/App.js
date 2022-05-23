import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import HomeScreen from '../screens/HomeScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HomeScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
  },
})
