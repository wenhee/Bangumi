/*
 * @Author: czy0729
 * @Date: 2020-05-04 20:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 14:34:07
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'

function Discuss(props, { $, navigation }) {
  const styles = memoStyles()
  const { discuss } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>最新讨论</SectionTitle>
      <View style={_.mt.sm}>
        {discuss.map((item, index) => (
          <Touchable
            key={item.id}
            style={styles.item}
            onPress={() => {
              t('频道.跳转', {
                to: 'Topic',
                from: 'discuss',
                type: $.type,
                topicId: item.id
              })

              navigation.push('Topic', {
                topicId: item.id,
                _title: item.title,
                _replies: item.replies,
                _userName: item.userName,
                _userId: item.userId,
                _time: item.time
              })
            }}
          >
            <View style={[styles.wrap, index !== 0 && styles.border]}>
              <Flex style={styles.content}>
                <Flex.Item>
                  <Text size={15} bold>
                    {item.title}{' '}
                    <Text type='main' size={12} lineHeight={14}>
                      {item.replies}
                    </Text>
                  </Text>
                  <Text style={_.mt.xs} type='sub' size={12}>
                    {findSubjectCn(item.subjectName)}
                  </Text>
                </Flex.Item>
                <View style={_.ml.md}>
                  <Text size={12} align='right'>
                    {item.userName}
                  </Text>
                  <Text style={_.mt.xs} type='sub' size={12} align='right'>
                    {item.time}
                  </Text>
                </View>
              </Flex>
            </View>
          </Touchable>
        ))}
      </View>
    </View>
  )
}

Discuss.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Discuss)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _._wind
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
