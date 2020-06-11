/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 14:59:04
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { Tag, Stars, Cover } from '@screens/_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function ItemRecents(
  { index, id, cover, name, nameJP, type, info, star, starInfo, actors = [] },
  { navigation }
) {
  const styles = memoStyles()
  const isFirst = index === 0
  const onPress = () => {
    t('收藏的人物.跳转', {
      to: 'Subject',
      subjectId: id
    })
    navigation.push('Subject', {
      subjectId: id,
      _jp: nameJP,
      _cn: name,
      _image: cover
    })
  }
  return (
    <View style={styles.container}>
      <Flex align='start' style={[styles.wrap, !isFirst && styles.border]}>
        <View style={styles.imgContainer}>
          {!!cover && (
            <Cover
              style={styles.image}
              src={cover}
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              radius
              shadow
              onPress={onPress}
            />
          )}
        </View>
        <Flex.Item style={_.ml.wind}>
          <Touchable onPress={onPress}>
            <Flex direction='column' justify='between' align='start'>
              <View>
                <Flex align='start' style={{ width: '100%' }}>
                  <Flex.Item>
                    {!!name && (
                      <Text size={15} numberOfLines={2} bold>
                        {HTMLDecode(name)}
                      </Text>
                    )}
                    {!!nameJP && (
                      <Text
                        style={_.mt.xs}
                        type='sub'
                        size={12}
                        numberOfLines={1}
                      >
                        {HTMLDecode(nameJP)}
                      </Text>
                    )}
                  </Flex.Item>
                  {!!type && (
                    <Tag
                      style={_.ml.sm}
                      value={MODEL_SUBJECT_TYPE.getTitle(type)}
                    />
                  )}
                </Flex>
                {!!info && (
                  <Text style={_.mt.sm} size={12}>
                    {HTMLDecode(info)}
                  </Text>
                )}
              </View>
              {!!star && !!starInfo && (
                <Flex style={_.mt.sm}>
                  {!!star && (
                    <Stars style={_.mr.xs} value={star} color='warning' />
                  )}
                  <Text style={_.mr.sm} type='sub' size={13}>
                    {starInfo}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Touchable>
          <Flex style={_.mt.sm} wrap='wrap'>
            {actors.map(item => (
              <Flex key={item.id} style={[styles.actors, _.mt.sm]}>
                <Cover
                  src={item.avatar}
                  size={32}
                  border
                  radius
                  shadow
                  onPress={() => {
                    t('收藏的人物.跳转', {
                      to: 'Mono',
                      monoId: item.id
                    })

                    navigation.push('Mono', {
                      monoId: item.id
                    })
                  }}
                />
                <Flex.Item style={_.ml.sm}>
                  <Text size={12} numberOfLines={1} bold>
                    {item.name}
                  </Text>
                  <Text style={_.mt.xs} size={12} type='sub' numberOfLines={1}>
                    {item.info}
                  </Text>
                </Flex.Item>
              </Flex>
            ))}
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

ItemRecents.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ItemRecents)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: IMG_WIDTH
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  actors: {
    width: '50%'
  }
}))