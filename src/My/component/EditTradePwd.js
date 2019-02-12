import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    TextInput, AsyncStorage, ToastAndroid
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";
import {TextInputLayout} from 'rn-textinputlayout';
export default class EditTradePwd extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableOpacity activeOpacity={0.5} onPress={navigation.state.params.rightOnPress}>
                <View>
                    <Text style={styles.headerRightTextC}>{navigation.state.params.language.app_changePwd_title_right}</Text>
                </View>
            </TouchableOpacity>
        ),
    })
    constructor(props) {
        super(props);
        this.state = {
            isPassword: /^[a-zA-Z0-9]{6,20}$/,
            pmId: '',
            pmPwd: '',
            pmCode: '',
            oldPwd: '',
            pwd: '',
            RepeatNewPassword: '',
            language: {},
        }
    }
    componentDidMount () {
        this.props.navigation.setParams({rightOnPress: this.onOkButton.bind(this)});
        this.LoadData();
    }
    async LoadData () {
        try {
            this.setState({
                language: this.props.navigation.state.params.language
            });
            console.log(this.state.language);
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let result = await AsyncStorage.getItem('pmPwd');
            let resultList = await AsyncStorage.getItem('pmId');
            this.setState({
                pmId: resultList,
                pmPwd: result
            })
            Loading.hidden();
            console.log(this.state);
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
                                placeholder={this.state.language.app_EditTradePwd_pmCode}
                                onChangeText={(text) =>this.setState({pmCode: text})}
                                value={this.state.pmCode}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={styles.editMainMomy}>
                        <TextInputLayout
                            style={styles.inputLayout}
                            checkValid={t => this.state.isPassword.test(t)}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.language.app_changePwd_input_two}
                                onChangeText={(text) =>this.setState({pwd: text})}
                                value={this.state.pwd}
                                secureTextEntry={true}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={styles.editMainMomy}>
                        <TextInputLayout
                            style={styles.inputLayout}
                            checkValid={t => this.state.isPassword.test(t)}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.language.app_changePwd_input_three}
                                onChangeText={(text) =>this.setState({RepeatNewPassword: text})}
                                value={this.state.RepeatNewPassword}
                                secureTextEntry={true}
                            />
                        </TextInputLayout>
                    </View>
                </View>
            </View>
        );
    }

    // 完成
    onOkButton () {
        if (!this.state.pmCode) {
           Loading.Toast(this.state.language.app_EditTradePwd_Toast_pmCode);
        } else if (!this.state.pwd) {
            Loading.Toast(this.state.language.toast_ChangePassword_newPassword);
        } else if (this.state.RepeatNewPassword === '') {
            Loading.Toast(this.state.language.toast_ChangePassword_RepeatNewPassword);
        } else if (this.state.pwd === this.state.RepeatNewPassword) {
            this.editPwd();
        } else {
            Loading.Toast(this.state.language.toast_ChangePassword_isRepeatNewPassword);
        }
    }
    async editPwd () {
        try {
            AsyncStorage.setItem('pmPwd', this.state.pwd);
            console.log(this.state);
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append("pmId", this.state.pmId);
            formData.append("pmCode", this.state.pmCode);
            formData.append("pwd", this.state.pwd);
            formData.append("lang", results);
            let result = await Utils.postJSON(Utils.size.url + '/api/account/editTradePwd', formData);
            if (Number(result.code) === 0) {
                Loading.Toast(this.state.language.toast_ChangePassword_code_true);
            } else {
                Loading.Toast(result.message);
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
    headerRightTextC: {
        color: '#36b9c8',
        paddingRight: 15,
        fontSize: Utils.setSpText(14),
    },
    // 文本
    editMain: {
        width: Utils.size.width,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 20,
    },
    editUser: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    editUserImg: {
        width: 70,
        height: 70,
        justifyContent: 'center',
    },
    UserImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    editUserName: {
        height: 40,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#ececec',
    },
    textInput: {
        width: Utils.size.width - 120,
        height: 40,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        fontSize: Utils.setSpText(14),
    },
    paddingT: {
        paddingTop: 8,
    },
    editMainMomy: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#ececec',
    },
    editWidth: {
        width: Utils.size.width - 60,
    },
    editSweep: {
        width: 20,
        height: 20,
    },
    inputLayout: {
        flex: 1,
    }
});

