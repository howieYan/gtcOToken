import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, Alert, AsyncStorage, ScrollView, ToastAndroid
} from 'react-native';
import Utils from "../Component/Utils";
import {Loading} from '../Component/Loading';
export default class BackUpsNextStep extends React.Component {
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
            list: [],
            listString: '',
            data: [],
            language: {},
        }
    }
    componentDidMount () {
        let list =  this.props.navigation.state.params.data;
        let listString = this.props.navigation.state.params.list;
        let listData = [];
        if (list.list.pm_word) {
            list.list.pm_word.forEach((v, i) => {
                listData.push({
                    name: v,
                    isButton: false,
                })
            })
        }
        this.setState({
            listString: listString,
            list: listData,
            language: this.props.navigation.state.params.language
        })
    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.BackupsMaina}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.BackupsMainTitle}>{this.state.language.reg_backUpsNextStep_main_title}</Text>
                            <Text style={styles.BackupsMainTitlehead}>{this.state.language.reg_backUpsNextStep_main_text}</Text>
                            <View style={styles.BackupsMainPmWord}>
                                <View style={styles.BackupsMainWrap}>
                                    {this.renderbutton()}
                                </View>
                            </View>
                        </View>
                        <View style={styles.renderBottomMain}>
                            {this.renderBottom()}
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onBackupsNextStep.bind(this)}>
                            <View style={styles.BackupsMainBottButtona}>
                                <Text style={styles.BackupsMainBottButtonText}>{this.state.language.reg_backUpsNextStep_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    renderBottom () {
        let list = [];
        this.state.list.forEach((v, i) => {
            list.push(
                <TouchableOpacity key={i}
                                  activeOpacity={0.8}
                                  onPress={this.onBackRenderBottom.bind(this, v, i)}
                >
                    <View style={[v.isButton ? styles.renderIsButton : styles.renderButton]} >
                        <Text style={[v.isButton ? styles.renderIsButtonText : styles.renderButtonText]}>{v.name}</Text>
                    </View>
                </TouchableOpacity>

            )
        })
        return list;
    }
    renderbutton () {
        let list = [];
        this.state.data.forEach((v, i) => {
            if (v.isButton) {
                list.push(
                    <TouchableOpacity key={i}
                                      activeOpacity={0.8}
                                      onPress={this.onBackIsButon.bind(this, v, i)}>
                        <View style={[v.isButton ? styles.BackupsMainTitleButt : styles.BackupsISMainTitleButt]}>
                            <Text style={styles.BackupsMainTitlehead}>{v.name}</Text>
                        </View>
                    </TouchableOpacity>

                )
            }
        })
        return list;
    }
    // 点击选择的助记词
    onBackIsButon (record, index) {
        record.isButton = false;
        this.state.data.splice(this.state.data.findIndex(v => v.name === record.name),1);
        this.forceUpdate()
    }
    // 选择助记词
    onBackRenderBottom (record, index) {
        record.isButton = true;
        this.state.data.push(record);
        this.randomArray(this.state.list);
        this.forceUpdate()
    }
    // 助记词打乱
    randomArray (arr){
        arr.sort(function(){return Math.random()-0.5;});
        return arr;
    }
    // 确认
    onBackupsNextStep () {
        console.log(this.state.listString);
        let data= [];
        this.state.data.forEach((v, i) => {
            if (v.isButton) {
                data.push(v.name)
            } else {
                Loading.Toast(this.state.language.BackUpsNextStep_Loading_show);
            }
        })
        data = data.join();
        if (data === this.state.listString) {
            Alert.alert(
                this.state.language.BackUpsNextStep_alert_title,
                this.state.language.BackUpsNextStep_alert_main,
                [
                    {text: this.state.language.BackUpsNextStep_alert_main_button_left, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: this.state.language.BackUpsNextStep_alert_main_button_right, onPress: () => {this.onBackupLogin()}},
                ],
                { cancelable: false }
            )
        } else {
            Loading.Toast(this.state.language.BackUpsNextStep_Loading_show_error);
        }
    }
    // alert确认
    onBackupLogin () {
        let list = this.props.navigation.state.params.data;
        let pmId = list.list.pm_id;
        AsyncStorage.setItem('pmId', pmId);
        this.navigatorHome();
    }
    navigatorHome () {
        this.props.navigation.navigate('TabBar')
    }
}

const styles = StyleSheet.create({
    // 自定义头部导航开始
    content: {
        flex: 1,
    },
    migrinTop: {
        marginTop: -20,
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
    // 自定义头部导航结束
    // modal 开始
    modalBgColor: {
        position: 'absolute',
        zIndex: 10,
        width: Utils.size.width,
        height: Utils.size.height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalData: {
        width: Utils.size.width - 80,
        position: 'absolute',
        top: Utils.size.height / 2 - Utils.size.height / 8,
        left: Utils.size.width / 2 -  (Utils.size.width - 80) / 2,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    ModalDataPadd: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    ModalImage: {
        width: 40,
        height: 40,
    },
    ModalDataPaddText: {
        fontSize: Utils.setSpText(18),
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ModalDataPaddTextMain: {
        fontSize: Utils.setSpText(15),
        color: '#4e5d6f',
        paddingBottom: 20,
        lineHeight: 25,
    },
    ModalDataButton: {
        width: Utils.size.width - 80,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ModalDataButtonText: {
        fontSize: Utils.setSpText(14),
        color: '#fff',
    },
    // modal 结束
    // 内容 开始
    BackupsMain: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    BackupsMaina: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    BackupsMainTitle: {
        fontSize: Utils.setSpText(17),
        color: '#5E5E5E',
        paddingTop: 50,
    },
    BackupsMainTitlehead: {
        fontSize: Utils.setSpText(15),
        color: '#A8A8A8',
        lineHeight: 20,
    },
    BackupsMainPmWord: {
        marginTop: 30,
        backgroundColor: '#ECECEC',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        width: Utils.size.width - 40,
        paddingTop: 10,
    },
    BackupsMainPmWordText: {
        fontSize: Utils.setSpText(15),
        paddingRight: 10,
        color: '#6F6F6F',
    },
    BackupsMainBottButton: {
        marginTop: 40,
        backgroundColor: '#56B9C7',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 3,
    },
    BackupsMainBottButtona: {
        marginTop: 40,
        backgroundColor: '#56B9C7',
        height: 50,
        width: 70,
        marginLeft: Utils.size.width / 2 - 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    BackupsMainBottButtonText: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    renderBottomMain: {
        marginTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
    },
    BackupsMainWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    renderButton: {
        backgroundColor: '#fff',
        marginRight: 5,
        height: 30,
        marginTop: 5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    renderIsButton: {
        backgroundColor: '#6AB9C6',
        marginRight: 5,
        height: 30,
        marginTop: 5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    renderButtonText: {
        textDecorationLine: 'underline',
        fontSize: Utils.setSpText(15),
        color: '#595959',
    },
    renderIsButtonText: {
        fontSize: Utils.setSpText(15),
        color: '#fff',
    },
    BackupsMainTitleButt: {
        marginTop: 5,
        marginRight: 5,
        borderRadius: 3,
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    BackupsISMainTitleButt: {
        marginTop: 5,
        marginRight: 5,
        borderRadius: 3,
        backgroundColor: '#ECECEC',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    }
});
