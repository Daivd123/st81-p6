import React, {Component} from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Text,
} from 'react-native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {ref,set} from 'firebase/database';
import db from '../config';

import {RFValue} from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import {RFValue} from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
    'Bubblegum-Sans' : requestAnimationFrame("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require('../assets/logo.png');

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            fonstLoaded: false,
        };
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    registerUser = (email, password, confirmPassword, first_name, last_name) => {
        if(password == confirmPassword) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential) => {
                Alert.alert('User registered!');
                console.log(userCredential.user.uid);
                this.props.navigation.replace('Login');
            }
        }
    }
}