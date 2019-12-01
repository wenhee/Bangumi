/*
 * 自定义按钮
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-01 12:28:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { titleCase } from '@utils'
import { _ } from '@stores'
import { IOS } from '@constants'
import Flex from './flex'
import Text from './text'
import Touchable from './touchable'

function Button({
  style,
  styleText,
  type,
  size,
  shadow,
  radius,
  loading,
  children,
  onPress,
  ...other
}) {
  const styles = memoStyles(_.mode)
  const _wrap = [styles.button]
  const _text = [styles.text]

  // @notice 安卓的阴影要保证有背景颜色才能显示, 所以为了不覆盖type的bg, 放在type前面
  if (shadow) {
    _wrap.push(styles.shadow)
  }
  if (type) {
    _wrap.push(styles[type])
    _text.push(styles[`text${titleCase(type)}`])
  }
  if (size) {
    _wrap.push(styles[size])
    _text.push(styles[`text${titleCase(size)}`])
  }
  if (radius) {
    _wrap.push(styles.radius)
  }
  if (style) {
    _wrap.push(style)
  }

  const content = (
    <Flex justify='center'>
      {loading && (
        <View style={_.mr.xs}>
          <ActivityIndicator color='white' size='small' />
        </View>
      )}
      <Text
        style={[
          // @notice 部分安卓机不写具体width会导致文字显示不全
          size === 'sm' && {
            width: 32
          },
          _text,
          styleText
        ]}
        align='center'
        selectable={false}
      >
        {children}
      </Text>
    </Flex>
  )

  if (onPress) {
    return (
      <Touchable style={_wrap} onPress={onPress} {...other}>
        {content}
      </Touchable>
    )
  }

  return (
    <View style={_wrap} {...other}>
      {content}
    </View>
  )
}

Button.defaultProps = {
  style: undefined,
  styleText: undefined,
  type: 'plain',
  size: 'md',
  shadow: false,
  radius: true,
  loading: false
}

export default observer(Button)

let _mode
let _styles
function memoStyles(mode) {
  if (!_mode || !_styles || _mode !== mode) {
    _mode = mode
    _styles = StyleSheet.create({
      button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth
      },

      // type
      plain: {
        backgroundColor: _.colorPlain,
        borderColor: _.select('rgb(223, 223, 223)', _.colorPlain)
      },
      main: {
        backgroundColor: _.colorMain,
        borderColor: _.select('rgb(255, 54, 76)', _.colorMain)
      },
      primary: {
        backgroundColor: _.colorPrimary,
        borderColor: _.select('rgb(13, 156, 204)', _.colorPrimary)
      },
      warning: {
        backgroundColor: _.colorWarning,
        borderColor: _.select('rgb(249, 163, 80)', _.colorWarning)
      },
      wait: {
        backgroundColor: _.colorWait,
        borderColor: _.select('rgb(160, 160, 160)', _.colorWait)
      },
      disabled: {
        backgroundColor: _.colorDisabled,
        borderColor: _.select('rgb(80, 80, 80)', _.colorDisabled)
      },
      bid: {
        backgroundColor: _.colorBid,
        borderColor: _.colorBid
      },
      ask: {
        backgroundColor: _.colorAsk,
        borderColor: _.colorAsk
      },

      // ghost type
      ghostMain: {
        backgroundColor: _.colorMainLight,
        borderColor: _.colorMainBorder
      },
      ghostPrimary: {
        backgroundColor: _.select(
          _.colorPrimaryLight,
          _._colorDarkModeRiseLevel1
        ),
        borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeRiseLevel1)
      },
      ghostSuccess: {
        backgroundColor: _.select(
          _.colorSuccessLight,
          _._colorDarkModeRiseLevel1
        ),
        borderColor: _.select(_.colorSuccessBorder, _._colorDarkModeRiseLevel1)
      },
      ghostPlain: {
        backgroundColor: _.select(_.colorBg, _._colorDarkModeRiseLevel2),
        borderColor: _.select(_.colorBorder, _._colorDarkModeRiseLevel2)
      },

      // size
      sm: {
        width: 32,
        height: 32
      },
      md: {
        width: '100%',
        height: 40
      },

      // text
      text: {
        fontSize: 14 + _.fontSizeAdjust
      },
      textSm: {
        fontSize: 11 + _.fontSizeAdjust,
        fontWeight: 'bold'
      },
      textPlain: {
        color: _.colorDesc
      },
      textMain: {
        color: _.__colorPlain__
      },
      textPrimary: {
        color: _.__colorPlain__
      },
      textWarning: {
        color: _.__colorPlain__
      },
      textWait: {
        color: _.__colorPlain__
      },
      textDisabled: {
        color: _.__colorPlain__
      },
      textBid: {
        color: _.__colorPlain__
      },
      textAsk: {
        color: _.__colorPlain__
      },
      textGhostPlain: {
        color: _.colorSub
      },
      textGhostMain: {
        color: _.colorSub
      },
      textGhostPrimary: {
        color: _.colorSub
      },
      textGhostSuccess: {
        color: _.select(_.colorSub, _.colorSuccess)
      },

      // other
      shadow: IOS
        ? {
            shadowColor: _.colorShadow,
            shadowOffset: { height: 3 },
            shadowOpacity: 0.16,
            shadowRadius: 3
          }
        : {
            backgroundColor: _.colorPlain,
            elevation: 2
          },
      radius: {
        borderRadius: _.radiusXs
      }
    })
  }
  return _styles
}
