/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-01 02:15:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function Logo({ navigation }) {
  return (
    <Touchable onPress={() => _.toggleMode(navigation)}>
      <Iconfont
        size={32}
        name='logo'
        color={_.select(_.colorTitle, _.colorDesc)}
      />
    </Touchable>
  )
}

export default observer(Logo)
