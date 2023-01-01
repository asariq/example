import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AuthandMain');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOCATION</Text>
      <Image source={require("../Images/wolf.png")} style={styles.img} />
      <Text style={styles.text}>BY WOLF</Text>


    </View>

  )
}


export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold"
  },
  img: {
    width: 250,
    height: 200
  }
})