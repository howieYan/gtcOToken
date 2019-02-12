import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";
export default class UserDetails extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />
    })
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData () {
        try {
            this.setState({
                language: this.props.navigation.state.params.language
            });
            let results = await AsyncStorage.getItem('lang');
            let result = await AsyncStorage.getItem('pmId');
            let formData = new FormData();
            formData.append("pmId", result);
            formData.append("lang", results);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            this.setState({
                data: resultList.result
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.content}>
                    <View style={styles.MoneyDetailsHead}>
                        <Image source={require('../../Image/UserActiver.png')} style={styles.MoneyDetailsHeadUserL}/>
                        <View style={styles.MoneyDetailsHeadUserMoney}>
                            <Text style={styles.MoneyDetailsHeadUserMoneyNumber}>
                                {this.state.data.pm_money}
                            </Text>
                        </View>
                        <Text style={styles.MoneyDetailsBase} numberOfLines={1} ellipsizeMode='middle'>{this.state.data.money}</Text>
                    </View>
                    <View style={styles.MoneyDetailsMain}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onChangePassword.bind(this, this.state.language.app_userDetail_Pwd)}>
                            <View style={[styles.settingMain]}>
                                <View style={styles.settingMainLeft}>
                                    <Text style={styles.settingMainLeftText}>{this.state.language.app_userDetail_Pwd}</Text>
                                </View>
                                <View style={styles.settingMainRight}>
                                    <Image source={require('../../Image/rightImage.png')} style={styles.settingMainRiImage}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    // 修改密码
    onChangePassword (title) {
        this.props.navigation.navigate('ChangePassword', {name: title, language: this.state.language})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    MoneyDetailsHead: {
        paddingTop: 20,
        paddingLeft: 90,
        paddingRight: 90,
        paddingBottom: 20,
        backgroundColor: '#ececec',
        alignItems: 'center',
    },
    MoneyDetailsHeadUserL: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    MoneyDetailsHeadUserMoney: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    MoneyDetailsHeadUserMoneyNumber: {
        fontSize: Utils.setSpText(14),
    },
    MoneyDetailsHeadUserMoneyNumberEnglish: {
        paddingLeft: 10,
    },
    MoneyDetailsBase: {
        paddingTop: 10,
        color: '#c7ccd1',
    },
    MoneyDetailsMain: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    MoneyDetailsMainUser:{
        paddingTop: 10,
        fontSize: Utils.setSpText(13),
        fontWeight: 'bold',
        color: '#929da6'
    },
    textInput: {
        width: Utils.size.width - 20,
        height: 40,
        color:  '#86939e',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#f0f0f0',
        fontSize: Utils.setSpText(13),
    },
    settingMain: {
        width: Utils.size.width - 20,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1 * Utils.pixel,
        borderColor: '#ededed',
    },
    settingMainTop:{
        marginTop: 10,
    },
    settingMainLeft: {
        width: Utils.size.width - 60,
        justifyContent: 'center',
    },
    settingMainLeftText: {
        fontSize: Utils.setSpText(13),
        color: '#929da6'
    },
    settingMainRiImage: {
        width: 13,
        height: 13,
    },
    settingMainRight: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBottBar: {
        position: 'absolute',
        bottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#eff1f2',
        width: Utils.size.width - 20,
        marginRight: 10,
        marginLeft: 10,
    }
});

