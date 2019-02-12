import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
} from 'react-native';
import Utils from "../../Component/Utils";
import {TextInputLayout} from 'rn-textinputlayout';
// import RichScanCom from "../../My/MyComponent/Linkman/RichScan";
import {Loading} from "../../Component/Loading";

export default class Transfer extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View/>
    })
    constructor(props) {
        super(props);
        this.state= {
            address: '',
            number: '',
            pmPwd: '',
            isPmPwd: /^[a-zA-Z0-9]{6,20}$/,
            data: {},
            language: {},
        }
    }
    componentDidMount () {
        this.props.navigation.setParams({rightOnPress: this.openRchScan.bind(this)});
        this.LoadData();
    }
    async LoadData() {
        try {
            this.setState({
                language: this.props.navigation.state.params.language,
                address: this.props.navigation.state.params.address
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
                    data: resultList.result,
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
                <View style={styles.editMain}>
                    <View style={styles.editMainMomy}>
                        <TextInputLayout
                            style={styles.inputLayout}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.language.app_transfer_input_one}
                                onChangeText={(text) =>this.setState({address: text})}
                                value={this.state.address}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={styles.editMainMomy}>
                        <TextInputLayout
                            style={styles.inputLayout}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.language.app_transfer_input_two}
                                onChangeText={(text) =>this.setState({number: text})}
                                value={this.state.number}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={styles.editMainMomy}>
                        <TextInputLayout
                            style={styles.inputLayout}
                            checkValid={t => this.state.isPmPwd.test(t)}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.language.reg_new_button_input_two}
                                onChangeText={(text) =>this.setState({pmPwd: text})}
                                value={this.state.pmPwd}
                                secureTextEntry={true}/>
                        </TextInputLayout>
                    </View>
                    <Text style={{paddingTop: 10,paddingBottom: 10}}>{this.state.language.app_transfer_text_one}:{this.state.data.pm_money}</Text>
                    <Text style={{paddingTop: 10,paddingBottom: 10}}>{this.state.language.app_transfer_text_two}:{this.state.data.balance}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onOkButton.bind(this)}>
                        <View style={styles.BottomBotton} >
                            <Text style={styles.BottomBottonText}>{this.state.language.app_changePwd_title_right}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    openRchScan () {
        this.props.navigation.navigate('RichScanCom',
            {
                name: this.state.language.app_property_Flickinga,
                language: this.state.language,
                data: this.state.data,
            }
        )
    }
    // 返回
    onBackButton () {
        this.props.navigation.state.params.ReceiveCode()
        this.props.navigation.goBack()
    }
    onOkButton () {
        if (!this.state.address) {
            Loading.Toast(this.state.language.toast_Transfer_address);
        } else if (!this.state.number) {
            Loading.Toast(this.state.language.toast_Transfer_number);
        } else if (!this.state.pmPwd) {
            Loading.Toast(this.state.language.api_auth_pwd_required);
        } else {
            this.editPwd();
        }
    }
    async editPwd () {
        try {
            let listData = JSON.parse(this.props.data);
            let pmCode = listData.pm_code;
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append("address", this.state.address);
            formData.append("pmCode", pmCode);
            formData.append("pmPwd", this.state.pmPwd);
            formData.append("number", this.state.number);
            formData.append("lang", results);
            let data = await Utils.postJSON(Utils.size.url + '/api/property/transfer' , formData);
            console.log(data);
            if (Number(data.code) === 0) {
                Loading.Toast(this.state.language.toast_Transfer_code_true);
                this.onBackButton();
            } else {
                Loading.Toast(data.message);
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
    // 内容
    editMain: {
        width: Utils.size.width,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
    },
    editMainMomy: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#ececec',
    },
    inputLayout: {
        flex: 1,
    },
    textInput: {
        width: Utils.size.width- 20,
        height: 40,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        fontSize: Utils.setSpText(14),
    },
    BottomBotton: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36b9c8',
        height: 40,
        borderRadius: 3,
    },
    BottomBottonText: {
        color: '#fff',
        fontSize: Utils.setSpText(17),
    },
    headerRightImg: {
        width: 20,
        height: 20,
    },
});

