import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    ToastAndroid,
    TouchableOpacity,
    Image,
} from 'react-native';
import Utils from "../Utils";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import AccountEntry from './AccountEntry';
import TransferOut from './TransferOut';
export default class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10000,
            type: 2,
            list: [],
            total: null,
            language: {},
        }
    }
    componentDidMount () {

    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollableTabView
                    tabBarBackgroundColor='#fff'
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarInactiveTextColor='#2b2b2b'
                    tabBarActiveTextColor='#36b9c8'>
                    <AccountEntry navigator={this.props.navigation} language={this.props.language} style={styles.content} tabLabel={this.props.language.app_property_Entry}/>
                    <TransferOut navigator={this.props.navigation} language={this.props.language} style={styles.content} tabLabel={this.props.language.app_property_Out}/>
                </ScrollableTabView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    lineStyle: {
        width: Utils.size.width / 4,
        marginLeft: (Utils.size.width / 4) / 2,
        height: 2,
        backgroundColor: '#36b9c8',
    },
});

