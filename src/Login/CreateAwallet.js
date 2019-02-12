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
import Utils from "../Component/Utils";
import {TextInputLayout} from 'rn-textinputlayout';
import {Loading} from '../Component/Loading';
export default class CreateAwallet extends React.Component {
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
            name: '',
            isName: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
            password: '',
            isPassword: /^[a-zA-Z0-9]{6,20}$/,
            repeatPassword: '',
            isRepeatPassword: /^[a-zA-Z0-9]{6,20}$/,
            isRadio: false,
            wallet: null,
            list: null,
            isLoading: false,
            language: {},
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData () {
        this.setState({
            language: this.props.navigation.state.params.language
        });
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.content}>
                    <View style={styles.NewMoneyTitle}>
                        <View style={styles.NewMoneyTitleH}>
                            <View style={styles.NewMoneyTitleL}>
                            </View>
                            <Text style={styles.NewMoneyTitleText}>{this.state.language.reg_new_button_text_one}</Text>
                        </View>
                        <View style={styles.NewMoneyTitleH}>
                            <View style={styles.NewMoneyTitleL}>
                            </View>
                            <Text style={styles.NewMoneyTitleText} numberOfLines={1}>{this.state.language.reg_new_button_text_two}</Text>
                        </View>
                    </View>
                    <View style={styles.NewMoneyMain}>
                        <View style={styles.editMainMomy}>
                            <TextInputLayout
                                style={styles.inputLayout}
                                checkValid={t => this.state.isName.test(t)}>
                                <TextInput
                                    style={styles.textInputs}
                                    onChangeText={(text) =>this.setState({name: text})}
                                    value={this.state.name}
                                    placeholder={this.state.language.reg_new_button_input_one}
                                />
                            </TextInputLayout>

                        </View>
                        <View style={styles.editMainMomy}>
                            <TextInputLayout
                                style={styles.inputLayout}
                                checkValid={t => this.state.isPassword.test(t)}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={this.state.language.reg_new_button_input_two}
                                    onChangeText={(text) =>this.setState({password: text})}
                                    value={this.state.password}
                                    secureTextEntry={true}
                                />
                            </TextInputLayout>
                        </View>
                        <View style={styles.editMainMomy}>
                            <TextInputLayout style={styles.inputLayout}
                                             checkValid={t => this.state.isRepeatPassword.test(t)}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={this.state.language.reg_new_button_input_three}
                                    onChangeText={(text) =>this.setState({repeatPassword: text})}
                                    secureTextEntry={true}
                                    value={this.state.repeatPassword}
                                />
                            </TextInputLayout>
                        </View>
                        <View style={styles.NewMoneyText}>
                            { this.state.isRadio ?
                                <TouchableOpacity activeOpacity={0.8} onPress={this._openIsRadio.bind(this, 0)}>
                                    <View style={styles.NewMoneyRadioIm}>
                                        <Image source={require('../Image/okName.png')} style={styles.NewMoneyRadio}/>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.8} onPress={this._openIsRadio.bind(this, 1)}>
                                    <View style={styles.NewMoneyRadioIm}>
                                        <Image source={require('../Image/noName.png')} style={styles.NewMoneyRadio}/>
                                    </View>
                                </TouchableOpacity>
                            }
                            <Text style={styles.NewMoneyRadioText}>{this.state.language.reg_new_button_bottom_text}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this._onPrivacyPolicy.bind(this, this.state.language.reg_new_button_bottom_color_text)}>
                                <Text style={styles.onNewMoneyRadioText}>{this.state.language.reg_new_button_bottom_color_text}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this._onPressLearnMore.bind(this)}>
                            <View style={[this.state.isRadio ? styles.NewMoneyButtonBgCol : styles.NewMoneyButton]}>
                                <Text style={styles.NewMoneyButtonText}>{this.state.language.reg_login_button}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }

    // 创建钱包
    _onPressLearnMore () {
        if (this.state.isRadio) {
            if (this.state.name === '') {
                Loading.Toast(this.state.language.api_auth_username_required);
            } else if (this.state.password === ''){
                Loading.Toast(this.state.language.api_auth_pwd_required);
            } else if (this.state.repeatPassword === ''){
                Loading.Toast(this.state.language.toast_New_repeatPassword);
            } else if (this.state.password === this.state.repeatPassword) {
                this.createAccount();
            } else {
                Loading.Toast(this.state.language.toast_New_isRepeatPassword);
            }
        }
    }
    createAccount () {
        Loading.show(this.state.language.toast_New_Loading_show);
        AsyncStorage.setItem('pmPwd', this.state.password);
        this.walltJson();
    }
    async walltJson () {
        try {
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append("username", this.state.name);
            formData.append("pwd", this.state.password);
            formData.append("lang", results);
            let result = await Utils.postJSON(Utils.size.url + '/api/auth/created', formData);
            Loading.hidden();
            console.log(result)
            if (Number(result.code) === 0) {
                Loading.hidden();
                this.setState({
                    list: result.result
                });
                this.onCopyWallet();
            } else {
                Loading.Toast(result.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    onCopyWallet () {
        this.props.navigation.navigate('BackupThePurse',
            {
                name: this.state.language.reg_copy_title,
                language: this.state.language,
                data: this.state
            }
        )
    }
    // 点击隐私条款
    _onPrivacyPolicy (record) {
        this.props.navigation.navigate('PrivacyPolicy', {name: record, language: this.state.language})
    }
    // 选择单选
    _openIsRadio (index) {
        if (index === 1) {
            this.setState({
                isRadio: true,
            })
        } else {
            this.setState({
                isRadio: false,
            })
        }

    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    migrinTop: {
        marginTop: -20,
    },
    // 文本
    NewMoneyTitle: {
        backgroundColor: '#076bb8',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    NewMoneyTitleText: {
        color: '#fff',
        paddingLeft: 10,
    },
    NewMoneyTitleH: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
    },
    NewMoneyTitleL: {
        width: 6,
        height: 6,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#fff',
    },
    NewMoneyMain: {
        paddingLeft: 20,
        paddingRight: 20,
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
    NewMoneyText: {
        flexDirection: 'row',
        height: 40,
        paddingLeft: 10,
        alignItems: 'center',
    },
    NewMoneyRadioIm: {
        width: 30,
        height: 40,
        justifyContent: 'center',
    },
    NewMoneyRadio: {
        width: 15,
        height: 15,
    },
    NewMoneyRadioText: {
        fontSize: Utils.setSpText(14),
        color: '#8d99a8'
    },
    onNewMoneyRadioText: {
        paddingLeft: 5,
        color: '#52c2cf',
        fontSize: Utils.setSpText(14),
        fontWeight: '500',
    },
    NewMoneyButton: {
        backgroundColor: '#d6d6d6',
        paddingTop:15,
        paddingBottom: 15,
        alignItems: 'center',
        borderRadius: 4,
    },
    NewMoneyButtonBgCol: {
        backgroundColor: '#52c2cf',
        paddingTop:15,
        paddingBottom: 15,
        alignItems: 'center',
        borderRadius: 4,
    },
    NewMoneyButtonText: {
        fontSize: Utils.setSpText(14),
        color: '#fff',
    },
    textInputs: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        flex: 1,
    }
});
