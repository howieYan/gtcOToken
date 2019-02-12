import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, TextInput, AsyncStorage,
} from 'react-native';
import Utils from "../Component/Utils";
export default class FindPwd extends React.Component {
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
                    {this.componentCell()}
                </View>
            </View>
        );
    }
    componentCell () {
        let allCell = [];
        let arrayCell = [
            {title: this.state.language.app_LyricsFind_name, component: 'LyricsFind'},
            {title: this.state.language.app_PrivateKeyFind_name, component: 'PrivateKeyFind'},
        ];
        for (let i = 0; i < arrayCell.length; i++) {
            allCell.push(
                <TouchableOpacity activeOpacity={0.8} key={i}
                                  onPress={this._openPage.bind(this, arrayCell[i].component, arrayCell[i].title)}
                >
                    <View style={[styles.mainCell,]}>
                        <View style={styles.mainCellPadd}>
                            <View style={styles.mainCellPaddWidth}>
                                <Text style={styles.mainCellText}>{ arrayCell[i].title }</Text>
                            </View>
                            <View style={[styles.mainCellPaddWidth, styles.textAlignR]}>
                                <Image source={require('../Image/rightImage.png')} style={styles.mainCellRight}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return allCell;
    }
    _openPage (component, title) {
        this.props.navigation.navigate(component, {name: title, language: this.state.language})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    // 内容
    mainCell: {
        backgroundColor: '#fff',
    },
    mainCellPadd: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ededed',
    },
    mainCellImage: {
        width: 20,
        height: 20,
    },
    mainCellText: {
        paddingLeft: 10,
        color: '#4e5d6f',
        fontSize: Utils.setSpText(15),
    },
    mainCellBadge: {
        height: 20,
        width: 30,
        backgroundColor: '#ef5350',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10,
    },
    mainCellBadgeNumber: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    mainCellPaddWidth: {
        width: Utils.size.width / 2,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    textAlignR: {
        flexDirection: 'row-reverse',
        marginRight: -20,
    },
    mainCellRight: {
        width: 15,
        height: 15,
    },
});

