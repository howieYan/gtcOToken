import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, ScrollView,
    Switch, StatusBar, AsyncStorage, ToastAndroid,
} from 'react-native';
import Utils from "../../Component/Utils";
import Transfer from './Transfer';
import {Loading} from "../../Component/Loading";
import TabView from '../../Component/TabView/TabView';
export default class MoneyDetails extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />,
        // headerLeft: (
        //     <TouchableOpacity activeOpacity={0.5} onPress={navigation.state.params.rightOnPress}>
        //         <Image source={require('../../Image/Back.png')} style={{width: 20, height: 20,marginLeft: 10,}}/>
        //     </TouchableOpacity>
        // )
    })
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            language: {},
        }
    }
    componentDidMount () {
        this.props.navigation.setParams({rightOnPress: this.onBackButton.bind(this)});
        this.setState({
            language: this.props.navigation.state.params.language
        });
        this.LoadData();
    }
    async LoadData() {
        try {
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let results = await AsyncStorage.getItem('lang');
            let result = await AsyncStorage.getItem('pmId');
            let formData = new FormData();
            formData.append("pmId", result);
            formData.append("lang", results);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            if (Number(resultList.code) === 0) {
                this.setState({
                    data: resultList.result,
                })
                Loading.hidden();
            } else {
                Loading.hidden();
                Loading.Toast(resultList.message, ToastAndroid.SHORT);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <StatusBar
                    backgroundColor="#001941"
                    barStyle="dark-content"
                />
                {/*<View style={styles.messageHeader}>*/}
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*navigator={this.props.navigator}*/}
                                      {/*onPress={this.onBackButton.bind(this)}>*/}
                        {/*<View style={styles.headerLeft}>*/}
                            {/*<Image*/}
                                {/*style={styles.messageHeaderBack}*/}
                                {/*source={{ uri: Back }}*/}
                            {/*/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<Animated.Text numberOfLines={1} style={[styles.messageHeaderTitle]}>{this.props.name}</Animated.Text>*/}
                    {/*<TouchableOpacity activeOpacity={0.8} >*/}
                        {/*<View style={styles.headerRight} >*/}
                            {/*<Text style={styles.headerRightText}>{}</Text>*/}
                        {/*</View>*/}

                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
                <View style={[styles.content, styles.PriceBg]}>
                    <View style={styles.EthDetails}>
                        <Text style={styles.EthDetailsTitle}>{this.state.data.pm_money}</Text>
                        {/*<View style={{flexDirection: 'row'}}>*/}
                        {/*<Text style={styles.EthDetailsTitleHe}>≈</Text>*/}
                        {/*<Text style={styles.EthDetailsTitleHe}>￥</Text>*/}
                        {/*<Text style={styles.EthDetailsTitleHe}>{Math.floor(this.state.data.pm_money)}</Text>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.content}>
                        <View style={[styles.EthDetailsMainList, styles.content]}>
                            <Text>{this.state.language.app_property_list}</Text>
                            <View style={{flex: 1,}}>
                                <TabView navigator={this.props.navigation} language={this.props.navigation.state.params.language}/>
                            </View>
                        </View>
                        <View style={styles.tabBottBar}>
                            {this.renaderTabBar()}
                        </View>
                    </View>

                </View>
            </View>
        );
    }
    // 返回
    onBackButton () {
        this.props.navigation.state.params.ReceiveCode()
        this.props.navigation.goBack()
    }
    renaderTabBar () {
        let list = [];
        let array = [
            {name: this.state.language.app_property_transfer, url: require('../../Image/money.png'), component: 'Transfer' },
            {name: this.state.language.app_property_button_MoneyCode, url: require('../../Image/toLead.png'), component: 'MoneyCode'},
        ];
        array.forEach((v, i) => {
            list.push(
                <TouchableOpacity activeOpacity={0.8} key={i} onPress={this.newMoney.bind(this, v.component, v.name)}>
                    <View style={[ i === 0 ? styles.tabBottBarLeft : styles.tabBottBarRight]}>
                        <View style={styles.tabBottBarLeftBox}>
                            <Image source={ v.url } style={styles.tabBottBarLeftImg}/>
                        </View>
                        <Text style={styles.tabBottBarText}>{v.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return list;
    }
    newMoney (component, title) {
        let _this = this;
        this.props.navigation.navigate(component,
            {
                name: title,
                language: this.state.language,
                data: this.state.data,
                ReceiveCode: () => {
                    _this.LoadData();
                }
            })
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
    },
    swipoutLineBgColor: {
        backgroundColor: '#fff',
    },
    PriceBg: {
        backgroundColor: '#fff',
    },
    messageHeaderTitle: {
        color: '#4e5d6f',
        fontWeight: 'bold',
        fontSize: Utils.setSpText(16),
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
    EthDetails: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    EthDetailsTitle: {
        fontSize: Utils.setSpText(25),
        color: '#2b2b2b',
    },
    EthDetailsTitleHe: {
        fontSize: Utils.setSpText(12),
        color: '#333',
    },
    EthDetailsMainList: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    RecordList: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec'
    },
    RecordCard: {
        borderRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    RecordCardTitle: {
        fontSize: Utils.setSpText(15),
        color: '#333',
    },
    RecordCardMain: {
        paddingTop: 10,
        fontSize: Utils.setSpText(14),
        color: '#333',
    },
    RecordCardBottom: {
        paddingTop: 10,
        flexDirection: 'row',
    },
    RecordCardBottomTime: {
        flex: 1,
        fontSize: Utils.setSpText(12),
        color: '#333',
    },
    RecordCardBottomType: {
        fontSize: Utils.setSpText(12),
        color: '#333',
    },
    tabBottBar: {
        justifyContent: 'flex-end',
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
});

