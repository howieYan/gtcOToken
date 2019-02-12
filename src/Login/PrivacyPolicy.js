import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, TextInput,
    WebView, AsyncStorage
} from 'react-native';
import Utils from "../Component/Utils";
export default class PrivacyPolicy extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />,
    })
    constructor(props) {
        super(props);
        this.state = {
            list: {},
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData() {
        try{
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append("lang", results);
            let result = await  Utils.postJSON(Utils.size.url + '/api/account/privacy', formData);
            if (Number(result.code) === 0) {
                this.setState({
                    list: result.result
                })
            }
        }
        catch (e) {
            alert(e)
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.content}>
                    <View style={{width: Utils.size.width, height: Utils.size.height}}>
                        <WebView bounces={false}
                                 scalesPageToFit={Utils.size.os === 'ios' ? false : true}
                                 source={{html: this.state.list.new_content}}
                                 style={{width: Utils.size.width, height: Utils.size.height}}>
                        </WebView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
});

