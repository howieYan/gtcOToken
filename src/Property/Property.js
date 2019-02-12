import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage, BackHandler, ToastAndroid
} from 'react-native';
import Utils from '../Component/Utils';
import { Loading } from '../Component/Loading';
function TabName(record) {
    if (record.state.params){
        return record.state.params.language.app_tabBar_Property
    }
}
export default class Property extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: TabName(navigation)
    })
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: {},
            balance: null,
            list: [],
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData()
        if (Utils.size.os === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }
    async LoadData () {
        try {
            let pmId = await AsyncStorage.getItem('pmId');
            console.log(pmId)
            let lang = await AsyncStorage.getItem('lang');
            let language = await AsyncStorage.getItem('language');
            this.setState({
                language: JSON.parse(language)
            });
            this.props.navigation.setParams({language: this.state.language});
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let formData = new FormData();
            formData.append("pmId", pmId);
            formData.append("lang", lang);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            let formDataList = new FormData();
            formDataList.append("pmCode",resultList.result.pm_code);
            formDataList.append("lang",lang);
            let data = await Utils.postJSON(Utils.size.url + '/api/property/getIndex', formDataList);
            console.log(data);
            if (Number(resultList.code) === 0) {
                this.setState({
                    data: resultList.result,
                    list: data.result
                })
                Loading.hidden();
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    componentWillUnmount() {
        if (Utils.size.os === 'android') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
    }
    onBackPress = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show(this.state.language.app_close , ToastAndroid.SHORT);
        return true;
    };
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.BgImg}>
                    <ImageBackground source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534738322513&di=06713eb596ddcdc04769e401c1d5237c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a3f4589ea315a801219c77c63f72.jpg'}} style={styles.BgImgImage}>
                        <View style={styles.User}>
                            <View style={styles.UserImage}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={this.openUser.bind(this, this.state.data.pm_username)}>
                                    <Image source={require('../Image/UserLo.png')} style={styles.UserImg}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.UserName}>{this.state.data.pm_username}</Text>
                            <TouchableOpacity activeOpacity={0.5} style={styles.UserRight}
                                              onPress={this.onPenScanCom.bind(this)}>
                                <Image source={require('../Image/Sweep.png')} style={styles.UserRightImage}/>
                            </TouchableOpacity>
                            <View style={styles.PropertyList}>
                                <View style={styles.AllPropertyList}>
                                    <View style={styles.AllProperty}>
                                        <Text style={styles.AllPropertyApproximate}>
                                            ≈
                                        </Text>
                                        <Text numberOfLines={1} style={styles.AllPropertyNumber}>{this.state.data.price}</Text>
                                    </View>
                                    <Text style={styles.AllPropertyText}>{this.state.language.app_property_totalAssets}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.5}>
                                    <View style={styles.PropertyAdd}>
                                        <Image source={require('../Image/add.png')} style={styles.PropertyAddImg}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.PropertyCard}>
                        <Text style={[styles.PropertyCardPmCode, styles.PropertyCardPmCodeBg]}>{this.state.language.app_property_address}</Text>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.PropertyCardPmCode,styles.PropertyCardPmCodeFoot]}>{this.state.data.pm_code}</Text>
                        <View style={styles.PropertyCardBottom}>
                            <View style={{flex: 2,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={this.openTransfer.bind(this, this.state.language.app_property_transfer)}
                                >
                                    <View style={{flexDirection: 'row',paddingTop: 10,alignItems: 'center',justifyContent:'center'}}>
                                        <Image source={require('../Image/zhuanzhang.png')} style={styles.PropertyCardBottomImage}/>
                                        <Text style={[styles.PropertyCardPmCode, styles.PropertyCardPmCodePaddLe]}>{this.state.language.app_property_transfer}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 2,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={this.openMoneyCode.bind(this)}>
                                    <View style={{flexDirection: 'row',paddingTop: 10,alignItems: 'center',justifyContent:'center'}}>
                                        <Image source={require('../Image/jieshou.png')} style={styles.PropertyCardBottomImage}/>
                                        <Text style={[styles.PropertyCardPmCode,styles.PropertyCardPmCodePaddLe]}>{this.state.language.app_property_receive}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.container}>
                    <View style={{flex: 1}}>
                        {this.renderMoneyDetailsList()}
                    </View>
                </ScrollView>
            </View>
        );
    }
    renderMoneyDetailsList () {
        let list = [];
        this.state.list.forEach((v, i) => {
            list.push(
                <View style={styles.ProperyMain} key={i}>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.openMoneyDetails.bind(this, v.title)}>
                        <View style={styles.ProperyMainListConter}>
                            <Image source={{ uri: v.logo }} style={styles.ProperyCoinMarkImage}/>
                            <Text style={styles.ProperyCoinMarkText}>{v.title}</Text>
                            <View style={styles.ProperyCoinMarkMoney}>
                                <Text style={styles.ProperyCoinMarkMoneyNumber}>{v.number}</Text>
                                <View style={styles.ProperyCoinMarkMoneyDetails}>
                                    <Text style={styles.ProperyCoinMarkMoneyDetailsText}>≈</Text>
                                    <Text style={styles.ProperyCoinMarkMoneyDetailsText}>{v.price}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
        return list;
    }
    // 头像
    openUser (record) {
        this.props.navigation.navigate('UserDetails', {name: record, language: this.state.language, data: this.state.data,})
    }
    // 转账
    openTransfer (record) {
        let _this = this;
        this.props.navigation.navigate('Transfer',
            {
                name: record,
                language: this.state.language,
                data: this.state.data,
                ReceiveCode: () => {
                    _this.LoadData();
                }
            })
    }
    // 接收
    openMoneyCode () {
        this.props.navigation.navigate('MoneyCode',
            {
                name: this.state.language.app_code_title,
                language: this.state.language,
                data: this.state,
            })
    }
    // list详情
    openMoneyDetails (title) {
        let _this = this;
        this.props.navigation.navigate('MoneyDetails',
            {
                name: title,
                language: this.state.language,
                data: this.state.data,
                ReceiveCode: function () {
                    _this.LoadData();
                }
            })
    }
     //扫一扫
    onPenScanCom () {
        this.props.navigation.navigate('RichScanCom',
            {
                name: this.state.language.app_property_Flickinga,
                language: this.state.language,
                data: this.state.data,
            }
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    BgImg: {
        width: Utils.size.width,
    },
    BgImgImage: {
        width: Utils.size.width,
        height: Utils.size.os === 'ios' ? 280 : 260,
    },
    User: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    UserRight: {
        // alignItems: 'center',
        // justifyContent: 'center',
        position: 'absolute',
        top: Utils.size.os === 'ios' ? 50 : 20,
        right: 20,
    },
    UserRightImage: {
        width: 20,
        height: 20,
    },
    UserImage: {
        alignItems: 'center',
        width: Utils.size.width,
        paddingTop: Utils.size.os === 'ios' ? 70 : 48,
        justifyContent: 'center',
    },
    UserImg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    UserName: {
        paddingTop: 10,
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    UserMoney: {
        fontSize: Utils.setSpText(13),
        color: '#fff',
    },
    UserDetails: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        flexDirection: 'row',
    },
    UserMoneyImage: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    PropertyList: {
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        width: Utils.size.width - 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    AllPropertyList: {
        flex: 1
    },
    AllProperty: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    AllPropertyApproximate: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    AllPropertyNumber: {
        fontSize: Utils.setSpText(25),
        color: '#fff',
        paddingLeft: 10,
    },
    AllPropertyText: {
        paddingTop: 10,
        fontSize: Utils.setSpText(13),
        color: '#fff',
    },
    PropertyAdd: {
        width: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    PropertyAddImg: {
        width: 30,
        height: 30,
    },
    ProperyMain: {
        marginTop: 10,
        height: 80,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#ddd',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        borderColor: '#f6f6f6',
        borderWidth: 1,
        marginBottom: 10,
    },
    ProperyMainListConter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    ProperyCoinMarkImage: {
        width:50,
        height:50,
        borderRadius: 25,
        // borderColor: '#ececec',
        // borderWidth: 1,
    },
    ProperyCoinMarkText: {
        fontSize: Utils.setSpText(20),
        color: '#333',
        paddingLeft: 10,
    },
    ProperyCoinMarkMoney: {
        flex: 1,
    },
    ProperyCoinMarkMoneyNumber: {
        fontSize: Utils.setSpText(18),
        textAlign: 'right',
        color: '#333',
    },
    ProperyCoinMarkMoneyDetails: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    ProperyCoinMarkMoneyDetailsText: {
        fontSize: Utils.setSpText(13),
        color: '#c7ccd1',
    },
    MenuUserList: {
        marginTop: 50,
    },
    MenuUser: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: '#ECECEC',
        alignItems: 'center',
    },
    MenuUserLo: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    MenuUserName: {
        paddingLeft: 10,
        fontSize: Utils.setSpText(15),
        color: '#002F52',
    },
    MenuUserListMain: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ECECEC',
    },
    MenuUserListMainPa: {
        paddingLeft: 20,
        paddingTop: 30,
    },
    MenuUserListMainRichScan: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MenuUserListMainRichScanIm: {
        width: 20,
        height: 20,
    },
    MenuUserListMainRichScanTe: {
        paddingLeft: 20,
        fontSize: Utils.setSpText(15),
        color: '#002F52',
    },
    PropertyCard: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,height: 100,
        marginTop: -20,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#ddd',
        elevation: 3,
        borderColor: '#f6f6f6',
        borderWidth: 1,
    },
    PropertyCardPmCode: {
        color: '#292929',
        fontSize: Utils.setSpText(13),
    },
    PropertyCardBottom: {
        flexDirection: 'row',
    },
    PropertyCardPmCodeBg: {
        paddingTop: 10,
    },
    PropertyCardPmCodeFoot: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: Utils.setSpText(12)
    },
    PropertyCardBottomImage: {
        width: 20,
        height: 20,
    },
    MenuUserListBg: {
        flex: 1,
    },
    PropertyCardPmCodePaddLe: {
        paddingLeft: 10,
    }
});

