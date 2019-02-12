import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, TextInput, AsyncStorage, ToastAndroid,
} from 'react-native';
import Utils from "../Component/Utils";
import {TextInputLayout} from 'rn-textinputlayout';
import {Loading} from "../Component/Loading";

export default class PrivateKeyFind extends React.Component {
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
        this.state= {
            type: 2,
            isPwd: /^[a-zA-Z0-9]{6,20}$/,
            pwd: '',
            secretKey: '',
            language: {}
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
                <View style={styles.aboutUsMainList}>
                    <View style={styles.NewMoneyMain}>
                        <View style={styles.editMainMomy}>
                            <TextInputLayout
                                style={styles.inputLayout}>
                                <TextInput
                                    style={styles.textInputs}
                                    onChangeText={(text) =>this.setState({secretKey: text})}
                                    value={this.state.secretKey}
                                    placeholder={this.state.language.base_login_key_input_one}
                                />
                            </TextInputLayout>
                        </View>
                        <View style={styles.editMainMomy}>
                            <TextInputLayout
                                style={styles.inputLayout}
                                checkValid={t => this.state.isPwd.test(t)}>
                                <TextInput
                                    style={styles.textInputs}
                                    onChangeText={(text) =>this.setState({pwd: text})}
                                    value={this.state.pwd}
                                    secureTextEntry={true}
                                    placeholder={this.state.language.reg_new_button_input_two}
                                />
                            </TextInputLayout>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this._onPressLearnMore.bind(this)}>
                            <View style={[styles.NewMoneyButtonBgCol]}>
                                <Text style={styles.NewMoneyButtonText}>{this.state.language.reg_backUpsNextStep_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    _onPressLearnMore () {
        if (!this.state.secretKey) {
            Loading.Toast(this.state.language.api_auth_private_key)
        } else if (!this.state.pwd) {
            Loading.Toast(this.state.language.api_account_new_pwd_required)
        } else {
            Loading.show(this.state.language.app_LoginKey_code);
            this.LoadLogin();
        }
    }
    async LoadLogin () {
        try {
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append('type', this.state.type);
            formData.append('secretKey', this.state.secretKey);
            formData.append('pwd', this.state.pwd);
            formData.append("lang", results);
            let data = await Utils.postJSON(Utils.size.url + '/api/auth/findPwd' , formData);
            if (Number(data.code) === 0) {
                Loading.hidden();
                Loading.Toast(this.state.language.app_PrivateKeyFind_code_true);
                this.onBackButton();
            } else {
                Loading.hidden();
                Loading.Toast(data.message)
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // 返回
    onBackButton () {
       this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    editMainMomy: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: Utils.size.os === 'ios' ? 1 : 0,
        borderBottomColor: '#ececec',
    },
    inputLayout: {
        flex: 1,
    },
    textInputs: {
        fontSize: 16,
        height: 40
    },
    NewMoneyMain: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    NewMoneyButtonBgCol: {
        marginTop: 20,
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
});

