import {
  Dimensions,
  PixelRatio
} from 'react-native'
import {DESIGN_SIZE} from '@/const'
const {width, height} = Dimensions.get('window')

export default class Px {
  static set (size) {
    return size * width / DESIGN_SIZE.width
  }
}
