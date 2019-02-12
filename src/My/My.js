import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Image, ScrollView, StatusBar, AsyncStorage, DeviceEventEmitter} from 'react-native';
import Utils from '../Component/Utils';
let tradingRecord = 'data:image/png;base64,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';
let tailyCash = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADRElEQVR4Xu2aS6iNURTHf3+hZCCFhFuiJM8oAwwo5ZHXjBQlSkl5FMnERMmEEpkoipKBgUciZOA9IQMRZhh4vxWJpcU+dbvOud93zv0699v37D26t7P3/tb67fXaD9HiTS2uPwlAsoAWJ5BcoMUNIAXB5ALJBXISMLNhwCigd84h3dXtO/BE0vs8AmS6gJkNBU4Cs/JMWKI+54H1kp53JlOnAMysL3APGF8ixeoR5ZakmV0BsB44FCa4BVyu5+vd2HcDMCh8f46kq7VkybKAY8CqMHispMfdqFTuT5vZUuB0GLBT0q5GAZwBloTBQyS9yS1FN3Y0sxnAzSDCXklbE4AaBLJcIFlAcoEUA1IQLDwLmNloYDYwArq8I70i6Ub7GFfqLGBm24DdBe4pnkoaEwUAM5se8nPmHqSOMuK8pEWxANgPbAzC7gDu1KFora53JX2JBcAFYH4QdqCkjwUA+G+K0sYAM7sIzAsSD5D0OQEIBMxsarAO34K/Bk40aiFRWYCZeUDcB2zqkBJfAsslXavXSmID4MHQ02K19tUPYyQ9qwdCNACAH8A7oD/wK2QI/98zhW9pvR2WtK6nAhgH3A7KHZG01v82s37AJ6AP8EiS98vdYrKAScD1oNlRSWuqALgvaUpu7f8BLOeBSMc0CPwE/JTJXeA34IWSn+ZuARYGpQ9IqhRPuThEA8DrADPbDuypoZlXeBN6bBAMADwN7gU2d0iDr4BlPT4NVlY+FEILQuBzt/BC6EMum+/QKSoXaETBrDFlBnAWWBwUaJP0IkuZRn4vMwAPdh70vF1pd3bfiJ6djWkD/qZUjy+luRcws5HAQ8ALnWa18gAIRY5vh48Aft3ejFYuAAFCr/DWYHgBh6LVIPpt9sHSuUAzljsALmcpnAA0iUBp02CT9C/vbjABaBKBIl3gOLAyyD1R0oMm6dClz5iZ3xSdC5N06YlM+726vw/y53IxtBVA5b5wrqSaj7uyXogMBlzxgTFoXUXGS5IqFzFVVci8pDSzaX4yC0yODMIpYLWkb53JnQmgMjiip7J+1O5X5m/zLFhuAHkmi7FPAhDjqhUpc7KAImnGOFeygBhXrUiZkwUUSTPGuVreAv4Ai9IwXzt08scAAAAASUVORK5CYII=';
let helpCenter = 'data:image/png;base64,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';
let AboutUs = 'data:image/png;base64,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';
function TabName(record) {
    if (record.state.params){
        return record.state.params.language.app_tabBar_My
    }
}
export default class My extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: TabName(navigation)
    })
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            data: {},
            language: {}
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let data = await AsyncStorage.getItem('language');
            this.setState({
                language: JSON.parse(data)
            });
            this.props.navigation.setParams({language: this.state.language});
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
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerCompon}>
                    <Text style={styles.userName} numberOfLines={1}>
                        {this.state.data.pm_username}
                    </Text>
                    <View style={styles.headerRow}>
                        { this.readerHeaderList() }
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <ScrollView style={styles.ScrollViewMarginTop}>
                        { this.componentCell() }
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={this.onCloseLogin.bind(this)}>
                            <View style={styles.buttomClose}>
                                <Text style={styles.buttomCloseText}>{this.state.language.app_my_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                </View>
            </View>

        );
    }
    readerHeaderList () {
        let headerList = [];
        let arrayList = [
            {img: tailyCash, name: this.state.language.app_my_adminBurse,  component: 'AdminBurse'},
            {img: tradingRecord, name: this.state.language.app_my_tradingRecord,  component: 'TradingRecord'},
        ];
        arrayList.forEach((v, i) => {
            headerList.push(
                <TouchableOpacity activeOpacity={0.5}
                                  key={i}
                                  onPress={this._openPage.bind(this, v.component, v.name)}>
                    <View style={styles.headerCol}>
                        <Image source={{uri: v.img}} style={styles.headerColIm}/>
                        <Text style={styles.headerColText}>
                            {v.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return headerList;
    }
    // cell组件
    componentCell () {
        let allCell = [];
        let arrayCell = [
            // {title: '消息中心', imgUrl: messageCenter, component: Message},
            // {title: '联系人', imgUrl: linkMan, component:  Linkman},
            {title: this.state.language.app_my_Setting, imgUrl: helpCenter, component: 'SystemSettings', isImg: true},
            // {title: '个人中心', imgUrl: personalCenter, component: PersonageCenter},
            {title: this.state.language.app_my_helpCentre, imgUrl: helpCenter, component: 'HelpCentre'},
            {title: this.state.language.app_my_avoutUs, imgUrl: AboutUs, component: 'AboutUs'},
            // {title: this.state.language.app_Stting_FindPwd, imgUrl: FindPwd, component: FindPwd, isImg: true},
        ];
        for (let i = 0; i < arrayCell.length; i++) {
            allCell.push(
                <TouchableHighlight activeOpacity={0.8} key={i}
                                    style={i === 3 ? styles.mainHeight : i === 4 ? styles.mainHeight : ''}
                                    navigator={this.props.navigator}
                                    onPress={this._openPage.bind(this, arrayCell[i].component, arrayCell[i].title)}
                >
                    <View style={[styles.mainCell,]}>
                        <View style={styles.mainCellPadd}>
                            <View style={styles.mainCellPaddWidth}>
                                <Image source={ arrayCell[i].isImg ?  require('../Image/FindPwd.png'): {uri: arrayCell[i].imgUrl } } style={styles.mainCellImage}/>
                                <Text style={styles.mainCellText}>{ arrayCell[i].title }</Text>
                            </View>
                            <View style={[styles.mainCellPaddWidth, styles.textAlignR]}>
                                <Image source={require('../Image/rightImage.png')} style={styles.mainCellRight}/>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        return allCell;
    }
    _openPage (component, title) {
        this.props.navigation.navigate(component, {name: title, language: this.state.language})
    }
    // 退出登录
    onCloseLogin () {
        AsyncStorage.removeItem('pmId');
        this.props.navigation.navigate('LoginHome', {language: this.state.language})
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerCompon: {
        backgroundColor: '#36b9c8',
        alignItems: 'center',
        paddingTop: 30,
    },
    contentContainer: {
        // marginTop: Utils.size.os ? -20 : 0,
    },
    userName: {
        paddingTop: 40,
        color: '#fff',
        fontSize: Utils.setSpText(16),
        fontWeight: 'bold',
    },
    headerRow: {
        width: Utils.size.width,
        paddingTop: 40,
        flexDirection: 'row',
        paddingBottom: 40,
    },
    headerCol: {
        width: Utils.size.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerColText: {
        color: '#fff',
        fontSize: Utils.setSpText(12),
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#ececec',
    },
    ScrollViewMarginTop: {
        // marginTop: Utils.size.os === 'ios' ? -20 : 0,
    },
    mainCellPadd: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ededed',
    },
    headerColIm: {
        height: 45,
        width: 45,
    },
    mainCell: {
        backgroundColor: '#fff',
    },
    mainCellImage: {
        width: 20,
        height: 20,
    },
    mainCellText: {
        paddingLeft: 10,
        color: '#4e5d6f',
        fontSize: Utils.setSpText(15),
    },
    mainCellBadge: {
        height: 20,
        width: 30,
        backgroundColor: '#ef5350',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10,
    },
    mainCellBadgeNumber: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    mainCellPaddWidth: {
        width: Utils.size.width / 2,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    textAlignR: {
        flexDirection: 'row-reverse',
        marginRight: -20,
    },
    mainCellRight: {
        width: 15,
        height: 15,
    },
    mainHeight: {
        marginTop: 10,
    },
    disblock: {
        opacity: 1,
    },
    disnone: {
        opacity: 0,
    },
    buttomClose: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: Utils.size.width - 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36b9c8',
        height: 40,
        borderRadius: 3,
    },
    buttomCloseText: {
        fontSize: Utils.setSpText(18),
        color: '#fff',
    }
});

