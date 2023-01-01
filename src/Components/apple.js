import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { useDispatch } from 'react-redux'

import { info } from "../redux/action";
import { windowHeight, windowWidth } from '../Components/dimensions';
import { rawNonce, state,clientid,redirecturi} from './constants'

function App() {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  async function onAppleButtonPress() {
    appleAuthAndroid.configure({
      clientId: clientid,
      redirectUri: redirecturi,
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state,
    });

    const response = await appleAuthAndroid.signIn();
    navigation.navigate("ContentPage"),
    dispatch(info({ "firstname":response.name, "email": response.email}))

  }

  return (
    <View>
      {appleAuthAndroid.isSupported && (
        <TouchableOpacity style={styles.touch} onPress={onAppleButtonPress}>
          <Text style={styles.text}>Sign in with Apple</Text>
        </TouchableOpacity>

      )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white"
  },
  touch: {
    marginTop: 20,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    elevation: 7.5
  },
})