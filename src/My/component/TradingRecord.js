import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import TabView from '../../Component/TabView/TabView';
export default class TradingRecord extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerTitleStyle:{
            flex:1,
            borderBottomWidth: 0,
            textAlign: 'center'
        },
        headerRight: <View />,
    })
    constructor(props) {
        super(props);
        this.state = {
            language: {},
        }
    }
    componentDidMount () {
    }
    render() {
        return (
            <View style={styles.content}>
               <TabView navigator={this.props.navigation} language={this.props.navigation.state.params.language}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
});

