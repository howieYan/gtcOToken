import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    WebView,
} from 'react-native';
import Utils from "../Component/Utils";

export default class BackupsCourse extends React.Component {
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
        }
    }
    componentDidMount () {
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.content}>
                    <WebView bounces={false}
                             scalesPageToFit={false}
                             source={{ uri: 'https://token.im/support/questions/how-to-backup-wallet?locale=zh-CN'}}
                             style={{width: Utils.size.width, height: Utils.size.height}}>
                    </WebView>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    migrinTop: {
        marginTop: -20,
    },
});
