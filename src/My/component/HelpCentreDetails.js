import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    WebView,
    AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class HelpCentreDetails extends React.Component {
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
            list: {},
            language: {},
        }
    }
    componentDidMount () {
        this.listData();
    }
    async listData() {
        try{
            this.setState({
                language: this.props.navigation.state.params.language,
                id: this.props.navigation.state.params.id
            });
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append('hpId', this.state.id);
            formData.append('lang', results);
            let result = await Utils.postJSON(Utils.size.url + '/api/Property/getHelperDetail', formData);
            if (Number(result.code) === 0) {
                this.setState({
                    list: result.result
                })
                Loading.hidden();
            }
        }
        catch (e) {
            alert(e)
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.aboutUsMainList}>
                    <View style={{width: Utils.size.width, height: Utils.size.height}}>
                        <Image style={styles.headerImg} source={{uri : this.state.list.doubt_img}}/>
                        <Text style={styles.headerTime}>{Utils.formatTs(this.state.list.doubt_time, 'YYYY年MM月DD')}</Text>
                        <WebView bounces={false}
                                 scalesPageToFit={Utils.size.os === 'ios' ? false : true}
                                 source={{html: this.state.list.doubt_content}}
                                 style={{width: Utils.size.width, height: Utils.size.height}}>
                        </WebView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    header: {
        flex: 1
    },
    aboutUsMainList: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerImg: {
        height: 150,
        width:  Utils.size.width - 20,
    },
    headerTime: {
        paddingTop: 10,
        fontSize: Utils.setSpText(15),
    }
});

