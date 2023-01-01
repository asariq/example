import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk';
import { useDispatch } from 'react-redux'

import { info } from "../redux/action";
import strings from '../screens/strings';
import { windowHeight,windowWidth } from '../Components/dimensions';



const FbLogin = () => {
    
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name,  first_name,email, last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    navigation.navigate("ContentPage"),
                    dispatch(info({ "firstname":result.name, "email": result.email,"app":"facebook"}))
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    const loginFB = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("==> Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        getInfoFromToken(accessToken)
                    })
                }
            },
            function (error) {
                console.log("==> Login fail with error: " + error);
            }
        );
    }

    return (
        <TouchableOpacity onPress={loginFB} style={styles.touch}>
            <Text style={styles.text}>{strings.fb}</Text>
        </TouchableOpacity>
    )
}

export default FbLogin;

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
        backgroundColor: "#4267B2",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        elevation: 7.5
    },

})