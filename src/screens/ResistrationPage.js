import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
}
  from "react-native"
import { info } from "../redux/action"
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import strings from "./strings";
import { windowHeight,windowWidth } from '../Components/dimensions';




const RegistrationPage = () => {


  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
    );
  };

  const handleSubmit = () => {
    if (name != "" && email != "" && phone != "") {
      if (!validateEmail(email) && email !== email.toLowerCase) {
        Alert.alert("wrong Email", "Use Valid Email")
      }
      else if (phone.toString().length !== 10) {
        Alert.alert("wrong Phone", "Use Valid Phone Number")
      }
      else {
        navigation.navigate("ContentPage"),
          dispatch(info({ "firstname": name, "email": email, "phone": phone,"app":"Location by Wolf" }))
      }
    }
    else {
      Alert.alert("YOUR RIDE", "Fill all section")
    }
  }

  return (
    <ScrollView style={styles.mainContainer}>

      <View style={styles.container}>

        <View style={styles.logo}>
          <Image source={require("../Images/wolf.png")} style={styles.img} />
          <Text style={styles.title}>LOCATION BY WOLF</Text>
        </View>

        <View style={styles.whiteView}>
          <Text style={styles.detailTitle}>Please Enter Your Detail</Text>

          <Text style={styles.text}>{strings.name}</Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text)
            }}
            style={styles.input} />

          <Text style={styles.text}>{strings.email}</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text)
            }}
            style={styles.input} />

          <Text style={styles.text}>{strings.phone}</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={10}
            value={phone}
            onChangeText={(text) => { setPhone(text) }}
            style={styles.input} />

          <TouchableOpacity
            style={[styles.touch, { backgroundColor: phone && email && name !== "" ? "#4169E1" : "gray" }]}
            onPress={handleSubmit} >
            <Text style={styles.sub}>{strings.sub}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}
export default RegistrationPage;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    alignItems: "center"
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
  text: {
    color: "gray",
    marginTop: 10,
    fontSize: 17,
    width: "100%",
    textAlign: "left",
    marginLeft: 89,
    fontWeight: "bold"
  },
  whiteView: {
    alignItems: "center",
    width: windowWidth,
    height: windowHeight * 0.7,
    top: -windowHeight * 0.05,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 40

  },
  input: {
    fontSize: 25,
    color: "black",
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 15,
    elevation: 10

  },
  touch: {
    width: "80%",
    height: "9%",
    borderRadius: 50,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  detailTitle: {
    fontSize: 24,
    color: "gray"
  },
  sub: {
    color: "black",
    fontWeight: "bold"
  }

})
