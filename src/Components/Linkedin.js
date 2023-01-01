import React from 'react'
import LinkedInModal from "@smuxx/react-native-linkedin"
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'

import { info } from "../redux/action"
import { windowHeight, windowWidth } from './dimensions';
import { clientID, clientSecret, redirectUri } from './constants'

const Linkedin = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const onLoggedin = (token) => {

    Promise.all([
      fetch('https://api.linkedin.com/v2/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
        }
      }).then(value => value.json()),
      fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
        }
      }).then(value => value.json())
    ])
      .then((value) => {
        const { 'handle~': handleEmail } = value[1].elements[0]
        console.log("email", handleEmail.emailAddress)
        console.log("name", value[0].localizedFirstName + " " + value[0].localizedLastName)
        navigation.navigate("ContentPage"),
          dispatch(info({
            "firstname": value[0].localizedFirstName + " " + value[0].localizedLastName,
            "email": handleEmail.emailAddress,
            "app":"LinkedIn"
          }))
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (

    <View style={styles.touch}>
      <LinkedInModal
        clientID={clientID}
        clientSecret={clientSecret}
        redirectUri={redirectUri}
        onSuccess={onLoggedin}
      />
    </View>

  )
}

export default Linkedin;

const styles = StyleSheet.create({

  touch: {
    marginTop: 20,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    backgroundColor: "#0077b5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    elevation: 7.5,
    

  },
})