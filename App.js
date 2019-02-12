import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    BackHandler
} from 'react-native';
import configAppNavigator from './AppNavigator';
import SplashScreen from "react-native-splash-screen";
import Utils from "./src/Component/Utils";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            pmId: null,
            language: {},
            isSwiper: false,
            isLoggedIn: false,
            checkedLogin: false
        }
    }
    componentDidMount() {
        // AsyncStorage.clear();
        this.LoadLanguage()
    }
    async LoadLanguage () {
        try {
            let results = await AsyncStorage.getItem('lang');
            if (!results) {
                AsyncStorage.setItem('lang', 'tw');
            }
            let formData = new FormData();
            formData.append("lang", results);
            let data = await Utils.postJSON(Utils.size.url + '/api/account/getLang', formData);
            if (Number(data.code) === 0) {
                this.setState({
                    language: data.result,
                });
                this.LoadData(data.result)
                AsyncStorage.setItem('language', JSON.stringify(data.result));
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async LoadData (record) {
        try {
            let result = await AsyncStorage.getItem('isSwiper');
            let pmId = await AsyncStorage.getItem('pmId');
            if (record instanceof Array) {
                this.LoadLanguage()
            } else {
                SplashScreen.hide()
                if (result === 'yes') {
                    this.setState({isSwiper: true, isLoggedIn: false })
                } else if (pmId  === null) {
                    this.setState({ isSwiper: false, isLoggedIn: true })
                }

            }
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        // const { dispatch, nav } = this.props;
        // const navigation = addNavigationHelpers({
        //     dispatch,
        //     state: nav,
        // });

        const AppNavigator = configAppNavigator(this.state.isLoggedIn, this.state.isSwiper, this.state.language);
        return (
            <View style={styles.container}>
                <AppNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default App;
