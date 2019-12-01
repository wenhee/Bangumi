/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-01 02:11:05
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import BottomTabBar from '@components/@/react-navigation-tabs/BottomTabBar'
import {
  Anitama,
  Award,
  Calendar,
  Character,
  Discovery,
  Friends,
  Group,
  Login,
  LoginAssist,
  LoginV2,
  Mono,
  Notify,
  Qiafan,
  Rakuen,
  RakuenHistory,
  RakuenSetting,
  Random,
  Rank,
  Say,
  Search,
  Setting,
  Subject,
  Tag,
  Tags,
  Timeline,
  Tinygrail,
  TinygrailBid,
  TinygrailCharaAssets,
  TinygrailDeal,
  TinygrailICO,
  TinygrailICODeal,
  TinygrailLogs,
  TinygrailNew,
  TinygrailSacrifice,
  TinygrailOverview,
  TinygrailRich,
  TinygrailSearch,
  TinygrailTrade,
  TinygrailTree,
  TinygrailTreeRich,
  TinygrailValhall,
  Topic,
  UGCAgree,
  User,
  // Video,
  WebView,
  Zone
} from '@screens'
import { BlurView } from '@screens/_'
import { IOS } from '@constants'
import { _ } from '@stores'
import navigationsParams, { initialHomeTabName } from '../navigations'
import HomeScreen from './screens/home'
import config from './stacks/config'

const TabBarComponent = props => <BottomTabBar {...props} />

const HomeTab = observer(
  createBottomTabNavigator(
    {
      Discovery,
      Timeline,
      Home: HomeScreen,
      Rakuen,
      User
    },
    {
      initialRouteName: initialHomeTabName,
      tabBarComponent: props => {
        if (IOS) {
          return (
            <BlurView style={styles.blurView}>
              <TabBarComponent {...props} style={styles.tabBarComponent} />
            </BlurView>
          )
        }
        return (
          <View style={styles.tarBarView}>
            <TabBarComponent {...props} style={styles.tabBarComponent} />
          </View>
        )
      },
      // tabBarOptions: {
      //   activeTintColor: _.colorMain,
      //   inactiveTintColor: _.colorDesc
      // },
      navigationOptions: ({ navigation, screenProps }) =>
        getActiveChildNavigationOptions(navigation, screenProps)
    }
  )
)

const HomeStack = createStackNavigator(
  {
    Anitama,
    Award,
    Calendar,
    Character,
    Discovery,
    Friends,
    Group,
    HomeTab,
    Login,
    LoginAssist,
    LoginV2,
    Mono,
    Notify,
    Qiafan,
    Rakuen,
    RakuenHistory,
    RakuenSetting,
    Random,
    Rank,
    Say,
    Search,
    Setting,
    Subject,
    Tag,
    Tags,
    Timeline,
    Tinygrail,
    TinygrailBid,
    TinygrailCharaAssets,
    TinygrailDeal,
    TinygrailICO,
    TinygrailICODeal,
    TinygrailLogs,
    TinygrailNew,
    TinygrailOverview,
    TinygrailRich,
    TinygrailSacrifice,
    TinygrailSearch,
    TinygrailTrade,
    TinygrailTree,
    TinygrailTreeRich,
    TinygrailValhall,
    Topic,
    UGCAgree,
    User,
    // Video,
    WebView,
    Zone
  },
  {
    ...navigationsParams,
    ...config
  }
)

export default createAppContainer(HomeStack)

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },
  tarBarView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain
  },
  tabBarComponent: IOS
    ? {
        borderTopWidth: 0,
        backgroundColor: 'transparent'
      }
    : {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: _.colorBorder
      }
})
