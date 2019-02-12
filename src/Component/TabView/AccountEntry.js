import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView, AsyncStorage, ToastAndroid, TouchableOpacity, Image,
} from 'react-native';
import Utils from "../Utils";
import {Loading} from "../Loading";

export default class AccountEntry extends React.Component {
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
        this.LoadData();
    }
    async LoadData () {
        try {
            this.setState({
                language: this.props.language
            });
            let results = await AsyncStorage.getItem('lang');
            let result = await AsyncStorage.getItem('pmId');
            let formData = new FormData();
            formData.append("pmId", result);
            formData.append("lang", results);
            let resultList = await Utils.postJSON(Utils.size.url + '/api/account/getInfo', formData);
            let formDataList = new FormData();
            console.log(resultList.result.pm_code);
            formDataList.append("page", this.state.page);
            formDataList.append("size", this.state.size);
            formDataList.append("type", this.state.type);
            formDataList.append("lang", results);
            formDataList.append("pmCode", resultList.result.pm_code);
            let data = await Utils.postJSON(Utils.size.url + '/api/property/getTransfer', formDataList);
            if (Number(data.code) === 0) {
                this.setState({
                    list: data.result.list,
                    total: data.result.total,
                })
            } else {
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
                <ScrollView style={styles.content}>
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
                    <View style={[v.recept_code ? styles.messageList: styles.messageListBG]} key={i}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[ styles.messageListHeight]}>
                                <Text style={styles.messageListText}>{ v.coin_remark}</Text>
                                <Text style={[styles.messageListText, styles.messageListTextPaddTop]}>{ v.recept_code}</Text>
                                <View style={{flexDirection: 'row', paddingTop: 10}}>
                                    <Text style={[styles.messageListText]}>{v.recept_code ? this.state.language.app_AccountEntry_zhuan : this.state.language.app_AccountEntry_kuang }:{ v.coin_num}</Text>
                                    <Text style={styles.messageListTextTime}>{Utils.formatTs(v.coin_addtime, 'YYYY年MM月DD')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
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
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    messageList: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
    messageListBG: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
    messageListText: {
        fontSize: Utils.setSpText(14),
        color: '#2b2b2b',
        flex: 1,
    },
    messageListTextTime: {
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
    messageListTextPaddTop: {
        paddingTop: 10,
    }
});

