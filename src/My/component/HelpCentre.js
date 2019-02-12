import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, ScrollView, ToastAndroid, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";


// import HelpCentreDetails from './HelpCentreDetails';
export default class HelpCentre extends React.Component {
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
            total: null,
            list: {},
            page: 1,
            size: 10000,
            language: {},
        }
    }
    componentDidMount () {
        this.loadData();
    }
    async loadData () {
        try {
            this.setState({
                language: this.props.navigation.state.params.language
            });
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let formData = new FormData();
            let results = await AsyncStorage.getItem('lang');
            formData.append('page', this.state.page);
            formData.append('size', this.state.size);
            formData.append('lang', results);
            let data = await Utils.postJSON(Utils.size.url + '/api/Property/getHelpers', formData);
            if (Number(data.code) === 0) {
                this.setState({
                    list: data.result.list,
                    total: data.result.total
                })
                Loading.hidden();
            } else {
                Loading.hidden();
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.headerbgColor}>
                        <Text style={styles.headerbgColorText}>{this.state.language.app_my_helpCentre_title}</Text>
                    </View>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let list = [];
        if (Number(this.state.total) > 0) {
            this.state.list.forEach((v, i) => {
                list.push(
                    <TouchableOpacity key={i} activeOpacity={0.8} onPress={this.onMessageDetails.bind(this,  v.doubt_title, v.doubt_id)}>
                        <View style={styles.messageList}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.messageListHeight}>
                                    <Text style={styles.messageListText}>{ v.doubt_title}</Text>
                                    <Text style={styles.messageListTextTime}>{Utils.formatTs(v.doubt_time, 'YYYY年MM月DD')}</Text>
                                </View>
                                <Image style={styles.messageListHeightImage} source={{ uri: v.doubt_img}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        } else {
            list.push(
                <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}} key={this.state.total}>
                    <Text style={{fontSize: 20}}>{this.state.language.app_find_null}</Text>
                </View>
            )
        }
        return list;
    }
    onMessageDetails (title, doubt_id) {
        this.props.navigation.navigate('HelpCentreDetails', {name: title, language: this.state.language,  id: doubt_id})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    messageList: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
    messageListText: {
        fontSize: Utils.setSpText(14),
        color: '#2b2b2b'
    },
    messageListTextTime: {
        paddingTop: 10,
        fontSize: Utils.setSpText(12),
        color: '#333',
    },
    messageListHeight: {
        flex: 1,
    },
    messageListHeightImage: {
        width: 80,
        height: 50
    },
    headerbgColor: {
        backgroundColor: '#4094CA',
        height: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerbgColorText: {
        fontSize: Utils.setSpText(18),
        color: '#fff',
    }

});

