import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated, Modal, ScrollView,
} from 'react-native';
import Utils from "../Component/Utils";
// import BackUpsNextStep from './BackUpsNextStep';
export default class BackupThePurseNet extends React.Component {
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
            modalVisible: true,
            data: null,
            list: [],
            listString: '',
            isPmWord: false,
            language: {},
        }
    }
    componentDidMount () {
        let list =  this.props.navigation.state.params.data;
        let data = list.list.pm_word.join('   ');
        let listData = list.list.pm_word.join();
        this.setState({
            listString: listData,
            data: data,
            list: list.list.pm_word,
            language: this.props.navigation.state.params.language
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.BackupsMain}>
                        <Text style={styles.BackupsMainTitle}>{this.state.language.reg_backupsBear_main_title}</Text>
                        <Text style={styles.BackupsMainTitlehead}>{this.state.language.reg_backupsBear_main_text}</Text>
                        <View style={styles.BackupsMainPmWord}>
                            <Text style={styles.BackupsMainPmWordText}>{this.state.data}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={this.onBackupsNextStep.bind(this)}
                        >
                            <View style={styles.BackupsMainBottButton}>
                                <Text style={styles.BackupsMainBottButtonText}>{this.state.language.reg_backupsBear_button}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={this.state.modalVisible ? styles.modalBgColor : styles.modal}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        presentationStyle="overFullScreen"
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.ModalData}>
                            <View style={styles.ModalDataPadd}>
                                <Image source={require('../Image/camera.png')} style={styles.ModalImage}/>
                                <Text style={styles.ModalDataPaddText}>{this.state.language.reg_backupsBear_modal_title}</Text>
                                <Text style={styles.ModalDataPaddTextMain}>{this.state.language.reg_backupsBear_modal_text}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <View style={styles.ModalDataButton}>
                                        <Text style={styles.ModalDataButtonText}>
                                            {this.state.language.reg_backupsBear_modal_button}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }

    onBackupsNextStep () {
        this.props.navigation.navigate('BackUpsNextStep',
            {
                name: this.state.language.reg_backUpsNextStep_title,
                language: this.state.language,
                data: this.props.navigation.state.params.data,
                list: this.state.listString,
            }
        )
    }
}

const styles = StyleSheet.create({
    // 自定义头部导航开始
    content: {
        flex: 1,
    },
    migrinTop: {
        marginTop: -20,
    },
    messageHeader: {
        height: (Utils.size.os === 'ios') ? 64 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 20 : 0,
        backgroundColor: '#fff',
    },
    headerRightText: {
        color: '#36b9c8',
        fontSize: Utils.setSpText(12),
    },
    swipoutLineBgColor: {
        backgroundColor: '#fff',
    },
    messageHeaderTitle: {
        color: '#4e5d6f',
        fontWeight: 'bold',
        fontSize: Utils.setSpText(16),
    },
    messageHeaderBack: {
        width: 20,
        height: 20,
    },
    headerLeft: {
        width: 50,
    },
    headerRight: {
        width: 50,
        flexDirection:'row-reverse',
    },
    // 自定义头部导航结束
    // modal 开始
    modalBgColor: {
        position: 'absolute',
        zIndex: 10,
        width: Utils.size.width,
        height: Utils.size.height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalData: {
        width: Utils.size.width - 80,
        position: 'absolute',
        top: Utils.size.height / 2 - Utils.size.height / 8,
        left: Utils.size.width / 2 -  (Utils.size.width - 80) / 2,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    ModalDataPadd: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    ModalImage: {
        width: 40,
        height: 40,
    },
    ModalDataPaddText: {
        fontSize: Utils.setSpText(18),
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ModalDataPaddTextMain: {
        fontSize: Utils.setSpText(15),
        color: '#4e5d6f',
        paddingBottom: 20,
        lineHeight: 25,
    },
    ModalDataButton: {
        width: Utils.size.width - 80,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ModalDataButtonText: {
        fontSize: Utils.setSpText(14),
        color: '#fff',
    },
    // modal 结束
    // 内容 开始
    BackupsMain: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    BackupsMaina: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    BackupsMainTitle: {
        fontSize: Utils.setSpText(17),
        color: '#5E5E5E',
        paddingTop: 50,
    },
    BackupsMainTitlehead: {
        fontSize: Utils.setSpText(15),
        color: '#A8A8A8',
        lineHeight: 20,
        paddingTop: 20,
    },
    BackupsMainPmWord: {
        marginTop: 30,
        backgroundColor: '#ECECEC',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        width: Utils.size.width - 40,
        paddingTop: 10,
    },
    BackupsMainPmWordText: {
        fontSize: Utils.setSpText(15),
        paddingRight: 10,
        color: '#6F6F6F',
    },
    BackupsMainBottButton: {
        marginTop: 40,
        backgroundColor: '#56B9C7',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 3,
    },
    BackupsMainBottButtona: {
        marginTop: 40,
        backgroundColor: '#56B9C7',
        height: 50,
        width: 70,
        marginLeft: Utils.size.width / 2 - 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    BackupsMainBottButtonText: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    renderBottomMain: {
        marginTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
    },
    renderButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    renderButtonText: {
        textDecorationLine: 'underline',
        fontSize: Utils.setSpText(15),
        color: '#595959',
    }
});
