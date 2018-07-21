import {Dimensions, PixelRatio} from 'react-native'
import {DESIGN_SIZE} from '@/const'

// const {width, height, scale} = Resolution.get()

export default class Resolution {
  static get (designSize) {
    designSize = designSize || DESIGN_SIZE
    let pxRatio = PixelRatio.get()
    let {width,height} = Dimensions.get("window")
    let w = PixelRatio.getPixelSizeForLayoutSize(width)
    let h = PixelRatio.getPixelSizeForLayoutSize(height)

    let scale = designSize.width / w
    let winSize = {width: designSize.width, height: h * scale}

    return {
      width: winSize.width,
      height: winSize.height,
      scale: (1 / scale) / pxRatio
    }
  }
}
