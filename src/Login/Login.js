import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, AsyncStorage
} from 'react-native';
import Utils from "../Component/Utils";

// import LoginUser from './NavTabView/LoginUser';
// import LoginKey from './NavTabView/LoginKey';
// import LoginWord from './NavTabView/LoginWord';
export default class Login extends React.Component {
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
            index: null,
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
                    { this.readerList() }
                </View>
            </View>
        );
    }
    // 列表
    readerList () {
        let allCell = [];
        let ArrayCell = [
            {name: this.state.language.base_login_account, component: 'LoginUser'},
            {name: this.state.language.base_login_key, component: 'LoginKey'},
            {name: this.state.language.app_LoginWord_name, component: 'LoginWord'},
        ];
        ArrayCell.forEach((v, i) => {
            allCell.push(
                <TouchableOpacity key={i} activeOpacity={0.8} onPress={this._openPage.bind(this, v)}>
                    <View style={[styles.settingMain]}>
                        <View style={styles.settingMainLeft}>
                            <Text style={styles.settingMainLeftText}>{ v.name }</Text>
                        </View>
                        <View style={styles.settingMainRight}>
                            <Image source={require('../Image/rightImage.png')} style={styles.settingMainRiImage}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return allCell;
    }
    _openPage (record) {
        this.props.navigation.navigate(record.component, {name: record.name, language: this.state.language})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    container: {
        flex: 1,
    },
    lineStyle: {
        width: Utils.size.width / 4,
        marginLeft: (Utils.size.width / 4) / 2,
        height: 2,
        backgroundColor: '#36b9c8',
    },
    textStyle: {
        flex: 1,
        fontSize: Utils.setSpText(20),
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutUsMainList: {
    },
    settingMain: {
        paddingLeft: 20,
        paddingRight: 20,
        width: Utils.size.width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1 * Utils.pixel,
        borderColor: '#ededed',
    },
    settingMainLeft: {
        width: Utils.size.width - 60,
        justifyContent: 'center',
    },
    settingMainLeftText: {
        fontSize: Utils.setSpText(14),
        color: '#000',
    },
    settingMainRiImage: {
        width: 10,
        height: 10,
    },
    settingMainRight: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

