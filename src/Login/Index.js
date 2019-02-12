import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Utils from '../Component/Utils';
export default class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            /*
             初始化动画值
             * */
            animValue: new Animated.Value(1),
            currentValue: 1, //标志位
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData () {
        try {
            let language = await AsyncStorage.getItem('language');
            this.setState({
                language: JSON.parse(language)
            });
            this.state.currentValue = this.state.currentValue === 1 ? 0 : 1;
            Animated.timing(this.state.animValue, {
                toValue: this.state.currentValue,
                duration: 1500,
            }).start()
        }
        catch (e) {
            console.log(e)
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../Image/timg.png')} style={styles.appNameBg}>
                    <Animated.View style={[styles.app, {
                        transform: [{
                            translateY: this.state.animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 500]})},
                        ]}]}>
                        <Text style={styles.appName}>OToken</Text>
                        <Text style={styles.appNameText}>{this.state.language.reg_login_text}</Text>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={this.openName.bind(this, this.state.language.reg_login_button)}
                        >
                            <View style={styles.appButton}>
                                <Text style={styles.appButtonText}>{this.state.language.reg_login_button}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={this.ImportName.bind(this, this.state.language.base_login_button)}>
                            <View style={[styles.appButton, styles.appButton1]}>
                                <Text style={styles.appButtonText}>{this.state.language.base_login_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </ImageBackground>
            </View>
        )
    }
    openName (record) {
        this.props.navigation.navigate('CreateAwallet', {name: record, language: this.state.language})
    }
    ImportName (record) {
        this.props.navigation.navigate('Login', {name: record, language: this.state.language})
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    app: {
        height: Utils.size.height,
        width: Utils.size.width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    appNameBg: {
        width: Utils.size.width,
        height: Utils.size.height,
    },
    appName: {
        fontSize: Utils.setSpText(25),
        color: '#fff',
    },
    appNameText: {
        paddingTop: 20,
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    appButton: {
        marginTop: 30,
        height: 50,
        width: 200,
        backgroundColor: '#7EA5C5',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appButton1: {
        marginTop: 15,
    },
    appButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(18),
    }
});

