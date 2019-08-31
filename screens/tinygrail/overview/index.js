/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-31 15:29:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconHeader } from '@screens/_'
import { open } from '@utils'
import { inject, withHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '小圣杯'

export default
@inject(Store)
@withHeader()
@observer
class Tinygrail extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open('https://bgm.tv/rakuen')
              break
            default:
              break
          }
        }
      },
      extra: (
        <IconHeader
          name='planet'
          onPress={() =>
            navigation.push('Group', {
              groupId: 'tinygrail'
            })
          }
        />
      )
    })

    hm('tinygrail', title)
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <View style={_.container.flex}>
        <Tabs style={_.container.flex} $={$}>
          {tabs.map((item, index) => (
            <List key={item.key} index={index} />
          ))}
        </Tabs>
      </View>
    )
  }
}