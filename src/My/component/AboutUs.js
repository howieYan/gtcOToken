import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Linking,
    AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from '../../Component/Loading';

export default class AboutUs extends React.Component {
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
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    componentWillMount () {

    }
    async LoadData () {
        try {
            this.setState({
                language: this.props.navigation.state.params.language
            });
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let formData = new FormData();
            let results = await AsyncStorage.getItem('lang');
            console.log(this.state.language);
            formData.append('lang', results);
            let result = await Utils.postJSON(Utils.size.url + '/api/account/about', formData);
            this.setState({
                list: result.result
            })
            Loading.hidden();
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.aboutUsHead}>
                    <Image source={{ uri: Utils.size.url + this.state.list.new_img }} style={styles.aboutUsHeadLogo}/>
                    {/*<Text style={styles.aboutUsHeadVersions}>当前版本:{this.state.versions}</Text>*/}
                    <Text style={[styles.aboutUsHeadVersions, styles.aboutUsHeadName]}>{this.state.list.new_brief}</Text>
                </View>
                <View style={styles.aboutUsMainList}>
                    { this.readerList() }
                </View>
            </View>
        );
    }
    // 列表
    readerList () {
        let allCell = [];
        let ArrayCell = [
            {name: this.state.language.app_my_avoutUs_usage, component: 'Usage'},
            {name: this.state.language.app_my_avoutUs_privacyPolicy, component: 'PrivacyPolicy'},
            // {name: '版本日志', component: VersionsLog},
            // {name: '产品向导', component: ProductGuide},
            {name: this.state.language.app_my_avoutUs_detection, isActive: 2}
        ];
        ArrayCell.forEach((v, i) => {
            allCell.push(
                <TouchableOpacity key={i} activeOpacity={0.8} onPress={this._openPage.bind(this, v)}>
                    <View style={[styles.settingMain]}>
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
    // 跳转多页面
    _openPage (record) {
        if (Number(record.isActive) === 2) {
            this.onUpgrade()
        } else {
            this.props.navigation.navigate(record.component, {name: record.name, language: this.state.language})
        }

    }
    async onUpgrade () {
        try {
            let data = await Utils.postJSON(Utils.size.url + '/api/account/upgraded');
            console.log(data.result);
            if (Number(data.result.downloadId) === Number(data.result.status)) {
                // this.refs.toast.show('亲，暂时没有更新的包！');
                Alert.alert(
                    this.state.language.BackUpsNextStep_alert_title,
                    this.state.language.app_updata_code,
                    [
                        {text: this.state.language.BackUpsNextStep_alert_main_button_left, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: this.state.language.BackUpsNextStep_alert_main_button_right, onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            } else {
                Linking.canOpenURL(data.result.downloadURI)
                    .then(supported => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + data.result.downloadURI);
                        } else {
                            return Linking.openURL(data.result.downloadURI)
                        }
                    }).catch(err => console.error('An error occurred', err));
            }
        }
        catch (e) {
            console.log(e);
        }
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
        fontSize: Utils.setSpText(14),
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
    aboutUsHead: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: Utils.size.width,
        alignItems: 'center'
    },
    aboutUsHeadLogo: {
        width: 50,
        height: 50,
    },
    aboutUsHeadVersions: {
        paddingTop: 20,
        fontSize: Utils.setSpText(12),
        color: '#333',
    },
    aboutUsHeadName: {
        paddingTop: 20,
        lineHeight: 20,
        fontSize: Utils.setSpText(14),
        color: '#333',
    },
    aboutUsMainList: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ececec',
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
    settingMainLeft: {
        width: Utils.size.width - 60,
        justifyContent: 'center',
    },
    settingMainLeftText: {
        fontSize: Utils.setSpText(14),
        color: '#000',
    },
    settingMainRiImage: {
        width: 10,
        height: 10,
    },
    settingMainRight: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

