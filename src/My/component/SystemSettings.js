import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    TextInput, AsyncStorage,
} from 'react-native';
import Utils from "../../Component/Utils";

// import Language from './Language/Language';
// import Currency from './Currency/Currency';
// import EditTradePwd from './EditTradePwd/EditTradePwd';
// import WebSetting from './WebSetting/WebSetting';
export default class SystemSettings extends React.Component {
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
            surname: '',
            name: '',
            money: '',
            phone: '',
            mailBox: '',
            remark: '',
            language: {},
        }
    }
    componentDidMount () {
        this.setState({
            language: this.props.navigation.state.params.language
        });

    }
    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.content, styles.bgColor]}>
                    { this.readerList() }
                </View>
            </View>
        );
    }
    // 列表
    readerList () {
        let allCell = [];
        let ArrayCell = [
            // {name: this.state.language.app_my_Setting_Language, component: Language},
            {name: this.state.language.app_EditTradePwd_title, component: 'EditTradePwd'},
            // {name: '货币单位', component: Currency},
            // {name: 'web3设置', component: WebSetting}
        ];
        ArrayCell.forEach((v, i) => {
            allCell.push(
                <TouchableOpacity key={i} activeOpacity={0.8} onPress={this._openPage.bind(this, v.component, v.name)}>
                    <View style={[styles.settingMain, i === 0 ? styles.settingMainTop : styles.settingMain]}>
                        <View style={styles.settingMainLeft}>
                            <Text style={styles.settingMainLeftText}>{ v.name }</Text>
                        </View>
                        <View style={styles.settingMainRight}>
                            <Image source={require('../../Image/rightImage.png')} style={styles.settingMainRiImage}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return allCell;
    }
    // 跳转页面
    _openPage (component, title) {
        this.props.navigation.navigate(component, {name: title, language: this.state.language})
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
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 20 : 0,
        backgroundColor: '#fff',
    },
    headerRightText: {
        color: '#36b9c8',
        fontSize: Utils.setSpText(12),
    },
    swipoutLineBgColor: {
        backgroundColor: '#fff',
    },
    messageHeaderTitle: {
        color: '#4e5d6f',
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
    // 内容
    bgColor: {
        backgroundColor: '#ececec',
    },
    settingMain: {
        paddingLeft: 20,
        paddingRight: 20,
        width: Utils.size.width,
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
        fontSize: Utils.setSpText(14),
        color: '#000',
    },
    settingMainRiImage: {
        width: 15,
        height: 15,
    },
    settingMainRight: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

