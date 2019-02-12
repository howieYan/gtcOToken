/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Swiper from './src/Component/Swiper';
import TabBarItem from './src/Component/TabBarItem';
import Property from './src/Property/Property'; //资产
import UserDetails from './src/Property/component/UserDetails'; // 个人头像
import ChangePassword from './src/Property/component/ChangePassword'; // 修改密码
import Transfer from './src/Property/component/Transfer'; // 转账
import RichScanCom from './src/Property/component/RichScanCom'; // 扫一扫
import MoneyCode from './src/Property/component/MoneyCode'; // 接收
import MoneyDetails from './src/Property/component/MoneyDetails'; // omo详情
import Price from './src/Price/Price';
import Find from './src/Find/Find';
import FindDetails from './src/Find/FindDetails'; // 发现详情

import My from './src/My/My'; // 我的
import SystemSettings from './src/My/component/SystemSettings'; // 系统设置
import EditTradePwd from './src/My/component/EditTradePwd'; // 修改交易密码
import HelpCentre from './src/My/component/HelpCentre'; // 帮助中心
import HelpCentreDetails from './src/My/component/HelpCentreDetails'; // 帮助中心详情
import AboutUs from './src/My/component/AboutUs'; // 关于我们
import Usage from './src/My/component/Usage'; // 使用协议
import AdminBurse from './src/My/component/AdminBurse'; // 管理钱包
import TradingRecord from './src/My/component/TradingRecord'; // 交易记录

import LoginHome from './src/Login/Index' //登录首页
import CreateAwallet from './src/Login/CreateAwallet';  // 创建钱包
import PrivacyPolicy from './src/Login/PrivacyPolicy'; //隐私条款
import BackupThePurse from './src/Login/BackupThePurse'; // 备份钱包
import BackupsCourse from './src/Login/BackupsCourse'; // 查看备份详情
import BackupThePurseNet from './src/Login/BackupThePurseNet'; // 备份钱包下一步
import BackUpsNextStep from './src/Login/BackUpsNextStep'; // 备份记住词
import Login from './src/Login/Login'; //登录
import LoginUser from './src/Login/LoginUser'; //账号登录
import FindPwd from './src/Login/FindPwd'; //找回密码
import LyricsFind from './src/Login/LyricsFind'; //助记词找回
import PrivateKeyFind from './src/Login/PrivateKeyFind'; //私钥找回
import LoginKey from './src/Login/LoginKey'; //私钥登录
import LoginWord from './src/Login/LoginWord'; //助记词登录
// 底部tabBar
const TabBar = createBottomTabNavigator(
    {
        CourseItem: {
            screen: Property,
            navigationOptions: () => ({
                tabBarLabel: '资产',
                tabBarIcon:({focused, tintColor}) => (
                    <TabBarItem
                        normalImage={require('./src/Image/TabBar/Property.png')}
                        selectedImage={require('./src/Image/TabBar/PropertyActiver.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            })
        },
        VipItem: {
            screen: Price,
            navigationOptions: () => ({
                tabBarLabel: '行情',
                tabBarIcon:({focused, tintColor}) => (
                    <TabBarItem
                        normalImage={require('./src/Image/TabBar/Price.png')}
                        selectedImage={require('./src/Image/TabBar/PriceActiver.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            })
        },
        FindItem: {
            screen: Find,
            navigationOptions: () => ({
                tabBarLabel: '发现',
                tabBarIcon:({focused, tintColor}) => (
                    <TabBarItem
                        normalImage={require('./src/Image/TabBar/Find.png')}
                        selectedImage={require('./src/Image/TabBar/FindActiver.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            })
        },
        MyItem: {
            screen: My,
            navigationOptions: () => ({
                tabBarLabel: '我的',
                tabBarIcon:({focused, tintColor}) => (
                    <TabBarItem
                        normalImage={require('./src/Image/TabBar/My.png')}
                        selectedImage={require('./src/Image/TabBar/MyActiver.png')}
                        focused={focused}
                        tintColor={tintColor}
                    />
                )
            })
        }
    },
    {
        navigationOptions: {
            gesturesEnabled: false
        },
        backBehavior: 'CourseItem',
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#5BA8C6',
            inactiveTintColor: '#979797',
            style: {backgroundColor: '#fff'}
        }
    }
)
export default function configAppNavigator(isLoggedIn, isSwiper) {
    const AppNavigator = createStackNavigator(
        {
            Swiper: {
                screen: Swiper,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 底部导航
            TabBar:{
                screen: TabBar,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //登录首页
            LoginHome:{
                screen: LoginHome,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 创建钱包
            CreateAwallet: {
                screen: CreateAwallet,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //隐私条款
            PrivacyPolicy: {
                screen: PrivacyPolicy,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 备份钱包
            BackupThePurse: {
                screen: BackupThePurse,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 查看备份详情
            BackupsCourse: {
                screen: BackupsCourse,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 备份钱包下一步
            BackupThePurseNet: {
                screen: BackupThePurseNet,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 备份记住词
            BackUpsNextStep: {
                screen: BackUpsNextStep,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 个人头像
            UserDetails: {
                screen: UserDetails,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 修改密码
            ChangePassword: {
                screen: ChangePassword,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 转账
            Transfer: {
                screen: Transfer,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 扫一扫
            RichScanCom : {
                screen: RichScanCom,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 接收
            MoneyCode: {
                screen: MoneyCode,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // omo详情
            MoneyDetails: {
                screen: MoneyDetails,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 发现详情
            FindDetails: {
                screen: FindDetails,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 系统设置
            SystemSettings: {
                screen: SystemSettings,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 修改交易密码
            EditTradePwd: {
                screen: EditTradePwd,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 帮助中心
            HelpCentre: {
                screen: HelpCentre,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 帮助中心详情
            HelpCentreDetails: {
                screen: HelpCentreDetails,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 关于我们
            AboutUs: {
                screen: AboutUs,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 使用协议
            Usage:  {
                screen: Usage,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //登录
            Login: {
                screen: Login,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //账号登录
            LoginUser: {
                screen: LoginUser,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 找回密码
            FindPwd: {
                screen: FindPwd,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //助记词找回
            LyricsFind: {
                screen: LyricsFind,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //私钥找回
            PrivateKeyFind: {
                screen: PrivateKeyFind,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //私钥导入
            LoginKey: {
                screen: LoginKey,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //助记词登录
            LoginWord: {
                screen: LoginWord,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 管理钱包
            AdminBurse: {
                screen: AdminBurse,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 交易记录
            TradingRecord: {
                screen: TradingRecord,
                navigationOptions: {
                    headerBackTitle: null,
                }
            }
        },
        {
            initialRouteName: isSwiper ? !isLoggedIn ? 'TabBar' : 'LoginHome' : 'Swiper',
            navigationOptions: {
                headerTintColor: '#333333',
                showIcon: true,
                gesturesEnabled: false,
            },
        }
    )
    return createAppContainer(AppNavigator);
}
