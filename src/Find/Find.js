import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl, AsyncStorage} from 'react-native';
import Utils from '../Component/Utils';
import Banner from './Banner/Banner'
import {Loading} from "../Component/Loading";
function TabName(record) {
    if (record.state.params){
        return record.state.params.language.app_tabBar_Find
    }
}
export default class Find extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: TabName(navigation)
    })
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            list: {},
            language: {},
            page: 1,
            size: 10000
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData () {
        try {
            let data = await AsyncStorage.getItem('language');
            this.setState({
                language: JSON.parse(data)
            });
            this.props.navigation.setParams({language: this.state.language});
            Loading.show(this.state.language.PrivacyPolicy_Loading_show);
            let results = await AsyncStorage.getItem('lang');
            let formData = new FormData();
            formData.append("lang", results);
            formData.append("page", results);
            formData.append("size", results);
            let result = await Utils.postJSON(Utils.size.url + '/api/Property/getDynamic', formData);
            result.result.list.forEach((v, i) => {
                v.new_time = Utils.formatTs(v.new_time)
            });
            this.setState({
                list: result.result,
            });
            Loading.hidden();
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.containeres}>
                <Banner name={this.props}/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.FindNews}>
                            <View style={styles.FindNewsT}>
                                <Text style={styles.FindNewsTitle}>{this.state.language.app_find_text}</Text>
                            </View>
                            {this.renderNews(0)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // 文章
    renderNews (index) {
        let listData = [];
        let data = this.state.list.list;
        if (Number(this.state.list.total) > 0) {
            data.forEach((v, i) => {
                listData.push(
                    <TouchableOpacity activeOpacity={0.5}
                                      key={i}
                                      onPress={this._openPage.bind(this, v.new_title, v.new_id)}
                    >
                        <View style={styles.FindNewsList}>
                            <View style={styles.FindNewsListLeft}>
                                <Text style={styles.FindNewsListLeftTiName} numberOfLines={2}>{v.new_title}</Text>
                                <View style={styles.FindNewsListLeftBott}>
                                    <Text style={styles.FindNewsListLeftOn}>{v.new_time}</Text>
                                    <Text style={styles.FindNewsListLeftOn}>{}</Text>
                                    <Text style={styles.FindNewsListLeftTime}/>
                                </View>
                            </View>
                            {v.new_img ?
                                <View style={styles.FindNewsListRight}>
                                    <Image source={{ uri: v.new_img }} style={styles.FindNewsListRightIM}/>
                                </View>
                                :
                                <Text/>
                            }

                        </View>
                    </TouchableOpacity>
                )
            })
        } else {
            return (
                <View key={index} style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                    <Text>{this.state.language.app_find_null}</Text>
                </View>
            )
        }
        return listData;
    }
    _openPage (title, newId) {
        this.props.navigation.navigate('FindDetails', {name: title, language: this.state.language, newId: newId,})
    }

}
const styles = StyleSheet.create({
    containeres: {
        flex: 1
    },
    ScrollViewMhei: {
        marginTop: -20,
    },
    container: {
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    containerHead: {
        color: '#757575',
        fontWeight: '600',
        fontSize: Utils.setSpText(15),
    },
    FindApply: {
        marginTop: 20,
        width: Utils.size.width - 20
    },
    FindApplyList: {
        width: Utils.size.width / 4 - 20,
        paddingRight: 10,
        alignItems: 'center',
        paddingBottom: 10,
    },
    FindApplyListImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    FindApplyListName: {
        paddingTop: 10,
        fontSize: Utils.setSpText(12),
        color: '#8893a5',
    },
    FindNews: {
        flex: 1,
        paddingBottom: Utils.size.os === 'ios' ? 50: 0
    },
    FindNewsT: {
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        paddingBottom: 20,
    },
    FindNewsTitle: {
        color: '#757575',
        fontWeight: '600',
        fontSize: Utils.setSpText(15),
    },
    FindNewsList: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
    },
    FindNewsListLeft: {
        width: Utils.size.width - 140,
    },
    FindNewsListRight: {
        width: 120,
        paddingLeft: 10,
        justifyContent: 'flex-end',
    },
    FindNewsListRightIM: {
        width:  110,
        height: 80,
    },
    FindNewsListLeftTiName: {
        lineHeight: 20,
        color: '#4e5d6f',
        fontSize: Utils.setSpText(14),
    },
    FindNewsListLeftOn: {
        fontSize: Utils.setSpText(12),
        color: '#8a95a6'
    },
    FindNewsListLeftBott: {
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    FindNewsListLeftTime: {
        fontSize: Utils.setSpText(12),
        color: '#8893a5'
    },
    FindNewsListLeftBottTime: {
        flexDirection: 'row-reverse',
    }
});

