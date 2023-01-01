import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { windowHeight,windowWidth } from '../Components/dimensions';
import strings from "./strings";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux'
import { info } from "../redux/action"

const ContentPage = () => {
  const dispatch = useDispatch()
  const  signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  const navigation = useNavigation()
  const data = useSelector((state) => state.info)

  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image source={require("../Images/wolf.png")} style={styles.img} />
        <Text style={styles.title}>LOCATION BY WOLF</Text>
      </View>

      <View style={styles.whiteView}>

        <View >
          <View >
            <Text style={styles.loginText}>{strings.login}</Text>
            <Text style={styles.nameText}>{data.firstname ? data.firstname : ""}</Text>
            <Text style={styles.fText}>{data.email ? data.email : ""}</Text>
            <Text style={styles.fText}>{data.phone ? data.phone : ""}</Text>
          </View>

          <TouchableOpacity 
          style={styles.touch}
            onPress={() => { navigation.navigate('Mapp') }} >
            <Text style={styles.text}>Locate your self</Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.touch}
            onPress={() => {navigation.navigate("AuthandMain") }} >
            <Text style={styles.text}>back to main Page</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout}
            onPress={() => {navigation.navigate("AuthandMain",
            Alert.alert("LOCATION BY WOLF",`user logged out from ${data.app}`)),signOut(),
            dispatch(info({}))}} >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black"
  },
  text: {
    color: "black",
    fontWeight: "bold"
  },
  logout: {
    marginTop: windowHeight * 0.24
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
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    height: windowHeight * 0.7,
    top: -windowHeight * 0.05,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  touch: {
    backgroundColor: "#4169E1",
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    borderRadius: 50,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  nameText: {
    color: "black",
    fontSize: 16,
    marginTop: 30
  },
  fText: {
    color: "black",
    fontSize: 16
  }
});

export default ContentPage;