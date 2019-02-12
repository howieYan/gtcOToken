import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView, AsyncStorage, Clipboard, ToastAndroid
} from 'react-native';
import Utils from "../../Component/Utils";
import { Loading } from "../../Component/Loading";
// import MoneyDetails from './MoneyDetails/MoneyDetails';
// import NewMoney from './NewMoney/NewMoney';
// import ToLeadBurse from './ToLeadBurse/ToLeadBurse';
export default class AdminBurse extends React.Component {
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
            data: [],
            balance: null,
            language: {},
        }
    }
    componentDidMount () {
        this.setState({
            language: this.props.navigation.state.params.language
        });
        this.LoadAsync();
    }
    async LoadAsync () {
        try {
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let results = await AsyncStorage.getItem('lang');
            let result = await AsyncStorage.getItem('pmId');
            let formData = new FormData();
            formData.append("pmId", result);
            formData.append("lang", results);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            this.setState({
                data: resultList.result
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
                <View style={[styles.content, styles.moneyBgColor]}>
                    <ScrollView>
                        { this.readerCarList() }
                    </ScrollView>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={this.copy.bind(this)}>
                    <View style={{width: Utils.size.width, height: 45, alignItems: 'center',justifyContent: 'center', backgroundColor: '#36b9c8'}}>
                        <Text style={{color: '#fff', fontSize: Utils.setSpText(16)}}>{this.state.language.app_code_button}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    async copy(){
        Clipboard.setString(this.state.data.pm_secretkey);
        let str = await Clipboard.getString();
        Loading.Toast(this.state.language.app_Clipboard_true + str)
    }
    // 中间
    readerCarList () {
        let list = [];
        list.push(
            <TouchableOpacity activeOpacity={0.8} key={this.state.data}
                              onPress={this.onCardList.bind(this, this.state.data.pm_username, this.state.data)}>
                <View style={styles.adminBurseMainList}>
                    <View style={styles.adminBurseMainListCard}>
                        <View style={styles.ListCardHeader}>
                            <Image source={require('../../Image/UserActiver.png')} style={styles.ListCardHeaderUserL}/>
                            <View style={styles.ListCardHeaderUserR}>
                                <Text style={styles.ListCardHeaderUserRName}>{this.state.data.pm_username}</Text>
                                <Text style={styles.ListCardHeaderUserRMoeny} numberOfLines={1} ellipsizeMode='middle'>{this.state.data.pm_code}</Text>
                            </View>
                        </View>
                        <View style={styles.ListCardBott}>
                            <Text style={styles.ListCardBottMoney}>{this.state.data.pm_money}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return list;
    }
    // 钱包详情
    onCardList (record, data) {
        this.props.navigation.navigate('UserDetails', {name: record, language: this.state.language, data: data,})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    moneyBgColor: {
        backgroundColor: '#ececec',
    },
    tabBottBar: {
        position: 'absolute',
        bottom: 0,
        width: Utils.size.width,
        flexDirection: 'row',
    },
    tabBottBarLeft:{
        width: Utils.size.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#36b9c8',
    },
    tabBottBarRight:{
        width: Utils.size.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#046fb8',
    },
    tabBottBarText: {
        paddingLeft: 10,
        fontSize: Utils.setSpText(13),
        color: '#fff',
    },
    tabBottBarLeftBox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    tabBottBarLeftImg: {
        width: 18,
        height: 18
    },
    adminBurseMainList: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    adminBurseMainListCard: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    ListCardHeader: {
        flexDirection: 'row',
    },
    ListCardHeaderUserL: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    ListCardHeaderUserR: {
        paddingLeft: 10,
    },
    ListCardHeaderUserRName: {
        color: '#5a6879',
        fontSize: Utils.setSpText(13),
    },
    ListCardHeaderUserRMoeny: {
        width: Utils.size.width - 100,
        paddingTop: 10,
        color: '#c7ccd1',
    },
    ListCardBott: {
        marginTop: 20,
        borderTopWidth: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopColor: '#ececec',
        flexDirection: 'row',
    },
    ListCardBottMoney: {
        fontSize: Utils.setSpText(15),
        color: '#4e5d6f',
    },
    ListCardBottEther: {
        paddingLeft: 10,
        fontSize: Utils.setSpText(12),
        color: '#c3c8ce',
    }
});

