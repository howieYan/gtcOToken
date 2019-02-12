import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Clipboard,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import QRCode from 'react-native-qrcode';
import {Loading} from "../../Component/Loading";
export default class MoneyCode extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerStyle: {
            backgroundColor: "#36b9c8",
            elevation: 0,
            borderBottomWidth: 0,
        },
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />,
        headerTintColor: '#fff',
    })
    constructor(props) {
        super(props);
        this.state = {
            text : '',
            money: '0',
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData();

    }
    async LoadData() {
        try {

            this.setState({
                language: this.props.navigation.state.params.language
            });
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let results = await AsyncStorage.getItem('lang');
            let result = await AsyncStorage.getItem('pmId');
            let formData = new FormData();
            formData.append("pmId", result);
            formData.append("lang", results);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            if (Number(resultList.code) === 0) {
                this.setState({
                    text: resultList.result.pm_code,
                })
                Loading.hidden();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.content}>
                {/*// <View style={styles.messageHeader}>*/}
                {/*//     <TouchableOpacity activeOpacity={0.8}*/}
                {/*//                       navigator={this.props.navigator}*/}
                {/*//                       onPress={this.onBackButton.bind(this)}>*/}
                {/*//         <View style={styles.headerLeft}>*/}
                {/*//             <Image*/}
                {/*//                 style={styles.messageHeaderBack}*/}
                {/*//                 source={{ uri: Back }}*/}
                {/*//             />*/}
                        {/*/!*</View>*!/*/}
                    {/*/!*</TouchableOpacity>*!/*/}
                    {/*/!*<Animated.Text numberOfLines={1} style={[styles.messageHeaderTitle]}>{this.props.name}</Animated.Text>*!/*/}
                    {/*/!*<TouchableOpacity activeOpacity={0.8}>*!/*/}
                        {/*/!*<View style={styles.headerRight} >*!/*/}
                            {/*/!*<Text style={styles.headerRightText}>{}</Text>*!/*/}
                        {/*/!*</View>*!/*/}
                    {/*/!*</TouchableOpacity>*!/*/}
                {/*/!*</View>*!/*/}
                <View style={styles.ContentHeader}/>
                <View style={styles.UserMain}>
                    <Image style={styles.UserLogo} source={require('../../Image/UserActiver.png')}/>
                </View>
                <View style={styles.MainList}>
                    <Text style={styles.MainMoneyBase}>
                        {this.state.text}
                    </Text>
                    <View style={styles.MainQrcode}>
                        <QRCode
                            value={this.state.text}
                            size={200}
                            bgColor="purple"
                            fgColor="white"
                        />
                    </View>
                    <View style={styles.MainQrcode}>
                        <TouchableOpacity  activeOpacity={0.5} onPress={this.copy.bind(this)}>
                            <View style={styles.BgColorBut}>
                                <Text style={styles.BgColorButText}>{this.state.language.app_code_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
    async copy(){
        Clipboard.setString(this.state.text);
        let str = await Clipboard.getString();
        Loading.Toast(this.state.language.app_Clipboard_true + str)
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    messageHeader: {
        height: (Utils.size.os === 'ios') ? 64 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 20 : 0,
        backgroundColor: '#36b9c8',
    },
    headerRightText: {
        color: '#36b9c8',
        fontSize: Utils.setSpText(14),
    },
    swipoutLineBgColor: {
        backgroundColor: '#fff',
    },
    messageHeaderTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: Utils.setSpText(15),
    },
    messageHeaderBack: {
        width: 20,
        height: 20,
    },
    headerLeft: {
        width: 50,
    },
    headerRight: {
        width: 50,
        flexDirection:'row-reverse',
    },
    ContentHeader: {
        backgroundColor: '#36b9c8',
        height: 70,
    },
    UserLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    UserMain: {
        alignItems: 'center',
        width: Utils.size.width,
        position: 'absolute',
        top: Utils.size.os === 'ios' ? 60 : 60,
    },
    MainList: {
        paddingLeft: 80,
        paddingRight: 80,
    },
    MainMoneyBase: {
        paddingTop: 60,
        fontSize: Utils.setSpText(13),
        color: '#8B93A6'
    },
    textInput: {
        height: 40,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#ececec',
        fontSize: Utils.setSpText(14),
    },
    MainQrcode: {
        paddingTop: 20,
        alignItems: 'center',
    },
    BgColorBut: {
        width: Utils.size.width - 160,
        backgroundColor: '#EFF1F2',
        paddingTop: Utils.size.os === 'ios' ? 18: 15,
        paddingBottom: Utils.size.os === 'ios' ? 18: 15,
        marginLeft: 20,
        alignItems: 'center',
        marginRight: 20,
    },
    BgColorButText: {
        color: '#767F8C',
        fontSize: Utils.setSpText(15)
    }
});
