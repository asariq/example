import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux'

import strings from '../screens/strings';
import { info } from "../redux/action"
import { clientId } from './constants';
import { windowHeight,windowWidth } from '../Components/dimensions';


const GoogleLogin = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const googleLogin = () => {

        GoogleSignin.configure({
            androidClientId: clientId,
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    navigation.navigate("ContentPage"),
                        dispatch(info({

                            "firstname": JSON.stringify(userInfo.user.name),
                            "email": JSON.stringify(userInfo.user.email),
                            "app":"google"
                        }))
                }).catch((e) => {
                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
        })
    }
   


    return (

        <TouchableOpacity onPress={googleLogin} style={styles.touch}>
            <Text style={styles.text}>{strings.google}</Text>
        </TouchableOpacity>

    )
}

export default GoogleLogin;

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
        backgroundColor: "#c24e00",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        elevation: 7.5
    },
})