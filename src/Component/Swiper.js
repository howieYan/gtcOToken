import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, ScrollView, StatusBar, Image, AsyncStorage
} from 'react-native';
import Utils from "./Utils";

export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            isButt: false,
            data: '',
            language: {}
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let language = await AsyncStorage.getItem('language');
            let data = await AsyncStorage.getItem('pmId');
            this.setState({
                data: data,
                language: JSON.parse(language)
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ width: Utils.size.width * 5}}
                    ref="scrollView"
                    // 水平方向
                    horizontal={true}
                    // 弹动效果
                    automaticallyAdjustContentInsets={false}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    // // 滚动动画结束时
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    // // 当用户开始拖动此视图时调用此函数。
                    // onScrollBeginDrag={()=>this.onScrollBeginDrag()}
                    // // 当用户停止拖动此视图时调用此函数。
                    // onScrollEndDrag={()=>this.onScrollEndDrag()}
                >
                    <View style={styles.slide}>
                        <Image style={styles.slideImg} source={require('../Image/SwiperA.png')}/>
                        {/*<Text style={styles.slideText}>自我掌控资产</Text>*/}
                        {/*<View style={styles.slideTextTitle}>*/}
                        {/*<Text style={styles.slideTextHead}>区块链钱包，赋予人人的权利</Text>*/}
                        {/*<Text style={styles.slideTextHead}>私钥即资产，请做好双重备份</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.slideTextMain}>*/}
                        {/*<Image style={styles.slideTextMainImg} source={require('../Image/1.png')}/>*/}

                        {/*</View>*/}
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImg} source={require('../Image/SwiperB.png')}/>
                        {/*<Text style={styles.slideText}>点对点自由转账</Text>*/}
                        {/*<View style={styles.slideTextTitle}>*/}
                        {/*<Text style={styles.slideTextHead}>无需第三方中介</Text>*/}
                        {/*<Text style={styles.slideTextHead}>地球两端，瞬间完成</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.slideTextMain}>*/}
                        {/*<Image style={styles.slideTextMainImg} source={require('../Image/2.png')}/>*/}

                        {/*</View>*/}
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImg} source={require('../Image/SwiperC.png')}/>
                        {/*<Text style={styles.slideText}>OToken浏览器</Text>*/}
                        {/*<View style={styles.slideTextTitle}>*/}
                        {/*<Text style={styles.slideTextHead}>集成智能合约交互</Text>*/}
                        {/*<Text style={styles.slideTextHead}>体验一下互联网应用</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.slideTextMain}>*/}
                        {/*<Image style={styles.slideTextMainImg} source={require('../Image/3.png')}/>*/}

                        {/*</View>*/}
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.slideImg} source={require('../Image/SwiperD.png')}/>
                        {/*<Text style={styles.slideText}>轻松交易资产</Text>*/}
                        {/*<View style={styles.slideTextTitle}>*/}
                        {/*<Text style={styles.slideTextHead}>内置交易市场</Text>*/}
                        {/*<Text style={styles.slideTextHead}>随时随地查看行情，完成交易</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.slideTextMain}>*/}
                        {/*<Image style={styles.slideTextMainImg} source={require('../Image/4.png')}/>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.slide}>
                        {/*<Text style={styles.slideText}>欢迎来到新世界</Text>*/}
                        {/*<View style={styles.slideTextTitle}>*/}
                        {/*<Text style={styles.slideTextHead}>必不可少的，前往帮助中心</Text>*/}
                        {/*<Text style={styles.slideTextHead}>学习掌握新世界的技能</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.slideTextMain}>*/}
                        {/*<Image style={styles.slideTextMainImg} source={require('../Image/5.png')}/>*/}
                        {/*</View>*/}
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={this.openButton.bind(this)}
                        >
                            <Image style={styles.slideImg} source={require('../Image/SwiperE.png')}/>
                            {/*<View style={styles.SwiperButton}>*/}
                            {/*<Text style={styles.btn}>马上体验</Text>*/}
                            {/*</View>*/}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/*返回指示器 */}
                <View style={styles.containerDot}>
                    { this.renderPageCircle() }
                </View>
            </View>
        );
    }
    onScrollEndDrag () {
    }
    // 滚动动画结束时调用
    onAnimationEnd (e) {
        // 水平方向的偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        // 当前的页数
        // 更新状态
        let currentPage = 0;
        if ( Utils.size.os === 'ios'){
            currentPage = Math.floor(offsetX / Utils.size.width);
        } else {
            if (currentPage === 3) {
                currentPage = Math.floor(offsetX / Utils.size.width);
            } else {
                currentPage = Math.ceil(offsetX / Utils.size.width);
            }

        }
        this.setState({
            currentPage: currentPage
        })
    }
    openButton () {
        AsyncStorage.setItem('isSwiper', 'yes')
        if (!this.state.data) {
            this.props.navigation.navigate('LoginHome', {language: this.state.language})
        } else {
            this.props.navigation.navigate('TabBar', {language: this.state.language})
        }
    }
    renderPageCircle () {
        let allCircle = [];
        for (let i = 0; i < 5; i++) {
            // 判断
            allCircle.push(
                <View key={i} style={i !== this.state.currentPage ? styles.dot : styles.activeDot}/>
            )
        }
        return allCircle;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        flex: 1,
    },
    slideImg: {
        width: Utils.size.width,
        height: Utils.size.height,
    },
    slideText: {
        paddingTop: Utils.size.os === 'ios' ?  55 : 30,
        fontSize: Utils.setSpText(25),
        textAlign: 'center',
        color: '#3c454d',
        fontWeight: 'bold',
    },
    slideTextTitle: {
        paddingTop: Utils.size.os === 'ios' ?  15 : 10,
    },
    slideTextHead: {
        color: '#7c8a94',
        fontSize: Utils.setSpText(15),
        textAlign: 'center',
    },
    slideTextMain: {
        paddingTop: 50,
        paddingBottom: 50,
        width: Utils.size.width,
        alignItems: 'center',
        // marginLeft: 100,
        // marginRight: 100,
    },
    slideTextMainImg: {
        width: Utils.size.width,
        height: 220,
    },
    slideTextMainImgBG: {
        width: Utils.size.width,
        height: 270,
    },
    slideTextMainIm: {
        fontSize: 60,
    },
    containerDot: {
        position: 'absolute',
        bottom: Utils.size.os !== 'ios' ? 50 : 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Utils.size.width,
        zIndex: -10,
    },
    dot: {
        width: 10,
        height: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#ebeced',
    },
    activeDot: {
        width: 10,
        height: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#37aab8',
    },
    pagination: {
        // bottom: Utils.size.os === 'ios' ? 70 : 80,
        // zIndex: 10,
    },
    SwiperButton: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: Utils.size.os === 'ios' ? 100 : 100,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#ee375c',
        borderColor: '#ee375c',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 3,
    },
    btn: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
    }
});

