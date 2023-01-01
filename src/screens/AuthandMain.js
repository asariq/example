import React, { useState } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'

import { windowHeight, windowWidth } from '../Components/dimensions';
import GoogleLogin from '../Components/googleLogin';
import FbLogin from '../Components/fbLogin';
import Linkedin from '../Components/Linkedin';
import Apple from '../Components/apple'
import strings from './strings';


const AuthandMain = () => {

  const data = useSelector((state) => state.info)
  const navigation = useNavigation();
  const [langVisible, setLangVisible] = useState(false);
  const [lang, setLang] = useState("en")

  strings.setLanguage(lang)
  const alreadyIn=() => {
    Object.keys(data).length === 0 ? Alert.alert("login error", "you are not logged in") :
      navigation.navigate("ContentPage")
  }


  return (

    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../Images/wolf.png")} style={styles.img} />
          
        </View>

        <View style={styles.whiteView}>
          <Text style={styles.text1}>{strings.member}</Text>

          <GoogleLogin />
          <FbLogin />
          <Linkedin />
          
          <TouchableOpacity
            onPress={() => { navigation.navigate("RegistrationPage") }}
            style={[styles.touch, { backgroundColor: "#4169E1" }]}>
            <Text style={styles.secondText1}>{strings.register}</Text>
          </TouchableOpacity>
          <Apple />
          <Text style={styles.text2}>{strings.registered}</Text>

          <TouchableOpacity
            onPress={alreadyIn}
            style={styles.already}>
            <Text style={styles.secondText1}>{strings.click}</Text>
          </TouchableOpacity>

          <Text style={styles.langText}>Choose a language</Text>

          <TouchableOpacity onPress={() => { setLangVisible(!langVisible) }}
            style={[styles.already, { marginBottom: 20 }]}>

            <Text style={styles.secondText1}>{strings.selectLang}</Text>
          </TouchableOpacity>

          {langVisible &&
            <View style={styles.btnContainer}>

              <Button title={"english"} onPress={() => { setLang("en") }} />
              <Button title={"italian"} onPress={() => { setLang("it") }} />
              <Button title={"french"} onPress={() => { setLang("fr") }} />

            </View>
          }

        </View>
      </View>

    </ScrollView>
  )
}

export default AuthandMain;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  langText:
  {
    color: "gray",
    fontSize: 20,
    marginTop: 20
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  img: {
    width: 250,
    height: 200
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold"
  },
  whiteView: {
    alignItems: "center",
    width: windowWidth,
    height: windowHeight * 0.9,
    top: -windowHeight * 0.05,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,

  },
  text1: {
    marginBottom: 10,
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: "black"
  },
  secondText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white"
  },
  secondText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
    color: "white"
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 26,
    color: "gray"
  },

  touch: {
    marginTop: 20,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    backgroundColor: "#4267B2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    elevation: 7.5
  },
  already: {
    backgroundColor: "#4169E1",
    width: "46%",
    height: "8%",
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
})