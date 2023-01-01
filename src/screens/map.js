import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import strings from "./strings";
import { windowHeight } from '../Components/dimensions';
import { key } from '../Components/constants';


const Mapp = () => {

  const navigation = useNavigation();

  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [city, setCity] = useState({})
  
  function getAddressFromCoordinates(latitude, longitude) {

    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}
    &lon=${longitude}&type=postcode&format=json&apiKey=${key}`)
      .then((response) => {
        response.json().then((json) => {
          setCity({
            city: json?.results[0].city,
            country: json?.results[0].country,
            state: json?.results[0].state,
            formatted: json?.results[0].formatted,
          })
        })
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      })
    // 
  }

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLat(location.latitude)
        setLong(location.longitude)
        console.log(location.latitude, location.longitude);
        getAddressFromCoordinates(location.latitude, location.longitude)

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [])

  const GoogleMap = () => {
    return (
      <View style={[styles.container, { top: windowHeight * -0.05 }]}>

        <TouchableOpacity
          onPress={() => { navigation.navigate("ContentPage") }}
          style={styles.back}>
          <Text style={styles.backText}>{strings.back}</Text>
        </TouchableOpacity>

        {!lat && <Text style={styles.turnOn}> {strings.turn}</Text>}

        {lat && <MapView
          style={styles.map}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.001,
            longitudeDelta: 0
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: long }} />
        </MapView>
        }
      </View>

    )
  }

  return (

    <View style={styles.container}>
      <>
        < GoogleMap />

        <View style={styles.containerDetail}>
          <Text style={styles.textDetail}>{city?.city}</Text>
          <Text style={styles.textDetail}>{city?.state}</Text>
          <Text style={styles.textDetail}>{city?.formatted}</Text>
          <Text style={styles.textDetail}>{city?.country}</Text>
          <Text style={styles.textDetail}>{lat}</Text>
          <Text style={styles.textDetail}>{long}</Text>
        </View>
      </>
    </View>
  )
}
export default Mapp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black"
  },
  map: {
    flex: 1, justifyContent: "flex-start",
    height: 700, width: 400
  },
  backText: {
    color: "black",
    fontSize: 19
  },
  back: {
    left: -160,
    top: 40,
    marginTop: 80,
    zIndex: 22,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    height: 28,
    width: 70,
    backgroundColor: "#29C5F6"
  },
  turnOn: {
    color: "white",
    fontSize: 20,
    marginTop: 80,
    textAlign: "center"
  },
  textDetail: {
    color: "white",
    fontSize: 15
  },
  containerDetail: {
    top: -20,
    justifyContent: "center",
    alignItems: "center"
  }

});

