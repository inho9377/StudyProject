import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native'
import * as Location from 'expo-location'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function App() {
  const [region, setRegion] = useState('Loading...')
  const [location, setLocation] = useState()
  const [ok, setOk] = useState(true)
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) {
      setOk(false) // 권한 요청 권한
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )
    setRegion(location[0].region)
  }

  useEffect(() => {
    ask()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{region}</Text>
      </View>
      <ScrollView
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 68,
    fontWeight: '500',
  },
  weather: {
    // flex: 3, // 스크린을 넘겨서 스크롤해야하므로 스크롤에서 사용 불가
    backgroundColor: 'tomato',
  },
  day: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // backgroundColor: 'teal',
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
})
