/**
 * 侧边主导航组件
 */

import React from 'react'
import {Dimensions} from 'react-native'
import {Button as RneButton} from 'react-native-elements'
const {width} = Dimensions.get('window')

export default ({
  menus,
  ...props
}) => {
  const buttonInline = {
    backgroundColor: '#00c67b',
    borderRadius: 100,
    height: 50,
    width: width * 0.8
  }
  const buttonOutline = {
    backgroundColor: 'transparent',
    height: 50,
    width: width * 0.8,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#00c67b'
  }
  const defaultStyle = inline ? buttonInline : outline ? buttonOutline : {}
  const styles = {
    backgroundColor: '#00c67b',
    width: width * 0.8,
    ...defaultStyle,
    ...style
  }
  const textStyles = {
    textAlign: 'center',
    ...textStyle
  }
  return (
    <RneButton
      raised
      title={title}
      buttonStyle={styles}
      textStyle={textStyles}
      {...props}>
      {children}
    </RneButton>
  )
}
