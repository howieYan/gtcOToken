import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import Utils from "../Component/Utils";
// import PrivacyPolicy from "../../MyComponent/AboutUs/PrivacyPolicy/PrivacyPolicy";


// import BackupsCourse from './BackupsCourse'
// import BackupsBear from './BackupsBear'
export default class BackupThePurse extends React.Component {
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
            language: {},
            data: {}
        }
    }
    componentDidMount () {
        this.setState({
            data: this.props.navigation.state.params.data,
            language: this.props.navigation.state.params.language
        });
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.mainCopy}>
                    <Image source={require('../Image/copyImage.png')} style={styles.mainCopyImage}/>
                    <Text style={styles.mainCopyText}>{this.state.language.reg_copy_text_one}</Text>
                    <Text style={styles.mainCopyTextState}>{this.state.language.reg_copy_text_two}</Text>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.onBackupsBear.bind(this, this.state.language.reg_copy_title)}
                    >
                        <View style={styles.mainCopyButton}>
                            <Text style={styles.mainCopyButtonText}>{this.state.language.reg_copy_title}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.onBackupsCourse.bind(this, this.state.language.reg_copy_button_text)}
                    >
                        <Text style={styles.mainCopyTextWallet}>{this.state.language.reg_copy_button_text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onBackupsBear (record) {
        this.props.navigation.navigate('BackupThePurseNet',{name: record, data: this.state.data, language: this.state.language})
    }
    onBackupsCourse (record) {
        this.props.navigation.navigate('BackupsCourse',{name: record,})
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
    mainCopy: {
        paddingLeft: 20,
        paddingRight: 20,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    mainCopyImage: {
        marginTop: 30,
        marginBottom: 30,
        width: 50,
    },
    mainCopyText: {
        paddingTop: 10,
        paddingBottom: 30,
        fontWeight: 'bold',
        fontSize: Utils.setSpText(18),
        color: '#737373',
    },
    mainCopyTextState: {
        color: '#7C859B',
        fontSize: Utils.setSpText(16),
        lineHeight: 30,
        paddingBottom: 40,
    },
    mainCopyButton: {
        backgroundColor: '#56B9C7',
        paddingBottom: 18,
        paddingTop: 18,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.size.width -40
    },
    mainCopyButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    },
    mainCopyTextWallet: {
        color: '#42B7C5',
        fontSize: Utils.setSpText(15),
        paddingTop: 40,
    }

});
