/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-06 14:42:16
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Iconfont, Touchable, CountDown } from '@components'
import { _ } from '@stores'
import { formatNumber, getTimestamp } from '@utils'
import { tinygrailOSS, getCoverLarge, caculateICO } from '@utils/app'
import { t } from '@utils/fetch'
import Bar from './bar'

const maxSize = _.window.width / 3

function Info(props, { $, navigation }) {
  const styles = memoStyles()
  const { icon, id, name, total, end = '' } = $.chara
  const { next, level, price, amount } = caculateICO($.chara)
  const endTime = getTimestamp(end.replace('T', ' '))
  const event = {
    id: 'ICO交易.封面图查看',
    data: {
      monoId: id
    }
  }
  return (
    <View style={styles.container}>
      {!!icon && (
        <Flex justify='center'>
          <Image
            style={styles.image}
            src={tinygrailOSS(getCoverLarge(icon))}
            autoSize={maxSize}
            shadow
            placholder={false}
            imageViewer
            imageViewerSrc={tinygrailOSS(getCoverLarge(icon), 480)}
            event={event}
          />
        </Flex>
      )}
      <Touchable
        style={_.mt.md}
        onPress={() => {
          t('ICO交易.跳转', {
            to: 'Mono',
            monoId: id
          })

          navigation.push('Mono', {
            monoId: `character/${id}`
          })
        }}
      >
        <Flex justify='center'>
          <Text type='tinygrailPlain' size={16} bold>
            #{id} - {name}
          </Text>
          <Iconfont
            style={_.ml.sm}
            name='right'
            size={16}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
      <Flex style={_.mt.md} justify='center'>
        <Text type='tinygrailText' size={16}>
          剩余时间:{' '}
        </Text>
        <CountDown
          style={{
            color: _.colorTinygrailText
          }}
          size={16}
          end={endTime}
        />
      </Flex>
      <Text style={_.mt.md} type='tinygrailPlain' align='center'>
        <Text type='warning'>已筹集 {formatNumber(total, 0)}</Text> /
        下一等级需要 {formatNumber(next, 0)}
      </Text>
      <Text style={_.mt.sm} type='tinygrailPlain' align='center'>
        预计发行量 约{formatNumber(amount, 0)}股 / 发行价 {formatNumber(price)}
      </Text>
      <Bar style={_.mt.md} total={total} level={level} next={next} />
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
