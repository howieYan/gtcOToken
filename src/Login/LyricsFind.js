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

export default class LyricsFind extends React.Component {
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
            type: 1,
            word: '',
            language: {},
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
                <View style={styles.content}>
                    <View style={styles.aboutUsMainList}>
                        <View style={styles.NewMoneyMain}>
                            <View style={styles.editMainMomy}>
                                <View style={styles.inputLayout}>
                                    <TextInput
                                        multiline = {true}
                                        numberOfLines = {4}
                                        textAlignVertical={'top'}
                                        style={styles.textInputsa}
                                        onChangeText={(text) =>this.setState({word: text})}
                                        value={this.state.word}
                                        placeholder={this.state.language.app_LyricsFind_Input}
                                    />
                                </View>
                            </View>
                            <View style={styles.editMainMomy}>
                                <TextInputLayout
                                    style={styles.inputLayout}>
                                    <TextInput
                                        style={styles.textInputs}
                                        onChangeText={(text) =>this.setState({pwd: text})}
                                        value={this.state.pwd}
                                        secureTextEntry={true}
                                        placeholder={this.state.language.reg_new_button_input_two}
                                    />
                                </TextInputLayout>
                            </View>
                            <Text style={{fontSize: 12,paddingTop: 10,}}>{this.state.language.BackUpsNextStep_alert_title}: {this.state.language.app_LyricsFind_text}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this._onPressLearnMore.bind(this)}>
                                <View style={[styles.NewMoneyButtonBgCol]}>
                                    <Text style={styles.NewMoneyButtonText}>{this.state.language.reg_backUpsNextStep_button}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    _onPressLearnMore() {
        if (!this.state.word) {
            Loading.Toast(this.state.language.app_LyricsFind_word_null);
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
            formData.append('word', this.state.word);
            formData.append('pwd', this.state.pwd);
            formData.append("lang", results);
            let data = await Utils.postJSON(Utils.size.url + '/api/auth/findPwd' , formData);
            console.log(data);
            if (Number(data.code) === 0) {
                Loading.hidden();
                Loading.Toast(this.state.language.app_PrivateKeyFind_code_true);
                this.props.navigation.goBack()
            } else {
                Loading.hidden();
                Loading.Toast(data.message)
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
    textInputsa: {
        fontSize: 16,
        height: 120
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

