import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  Image,
  WebView,
  TouchableHighlight,
  ProgressBarAndroid,
  Animated,
  Easing,
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native'
import {
  Navigation
} from 'react-native-navigation'
import {merge, isEqual} from 'lodash'
import px from '@/common/px'
import { Bubbles} from 'react-native-loader'

const {
  width, height
} = Dimensions.get('window')
const {
  width: viewPortWidth,
  height: viewPortHeight
} = Dimensions.get('screen')

class Home extends Component {
  constructor(props) {
    super(props)
    Navigation.setOptions(this.props.componentId, {
      // portrait / landscape
      orientation: 'landscape',
      topBar: {
        hidden: true,
        animateHide: false
      }
    })

    this.animatedValue = new Animated.Value(0)

    this.state = {
      pageLoaded: true,
      progress: 0,
      activeMenu: null,
      activeUri: null,
      urls: {
        feed: 'http://10.5.7.108:4001/',
        market: 'https://www.zhihu.com/',
        bi: 'https://m.jd.com/'
      }
    }
  }

  componentDidMount () {
    this.animate()
  }
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  clickHandlerDemo () {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'nb.navigation.Demo',
        options: {
          animated: true,
          animationType: 'fade'
        }
      }
    })
  }

  clickHandlerWebview () {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'nb.navigation.WebView',
        options: {
          animated: true,
          animationType: 'fade'
        }
      }
    })
  }

  clickHandlerMenu (menu) {
    console.log(11111, menu)
    this.setState({
      activeUri: this.state.urls[menu.id],
      activeMenu: menu.id
    })
  }

  pageLoadStart () {
    console.log('webview: onLoadStart...')
    this.setState({pageLoaded: false})
  }

  pageLoadEnd () {
    console.log('webview: onLoadEnd...')
    this.setState({pageLoaded: true})
  }

  pageLoadError (e) {
    console.log('webview: onError...', e.nativeEvent.description)
  }

  render() {
    const menus = [
      {
        id: 'feed',
        title: '动态',
        icon: 'home',
      },
      {
        id: 'market',
        title: '增值服务',
        icon: 'bag',
      },
      {
        id: 'bi',
        title: 'IM TOP',
        icon: 'chat',
      }
    ]
    const scale1 = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1.2, 0.3]
    })
    const scale2 = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1.2, 0.3, 1.2]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.2, 1, 0.2]
    })
    return (
      <View style={styles.page}>

        <View style={styles.layout.nav}>
          <View style={styles.avatar.wrapper}>
            <Image
              resizeMode={'stretch'}
              roundAsCircle={true}
              style={styles.avatar.img}
              source={require('../../img/4096.jpeg')}
            />
          </View>
          <View style={styles.nav.wrapper}>
            {
              menus.map((menu, index) => {
                let isActive = isEqual(this.state.activeMenu || 'feed', menu.id)
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor={'#eee'}
                    onPress={this.clickHandlerMenu.bind(this, menu)}
                  >
                    <View
                      style={ merge({}, styles.nav.item, isActive ? styles.nav.active.bg : {}) }
                    >
                      <View style={styles.nav.icon}>

                      </View>
                      <View style={styles.nav.title}>
                        <Text style={ merge({}, styles.nav.text, isActive ? styles.nav.active.color : {}) }>{menu.title}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Animated.View
                          style={{
                            display: isActive && !this.state.pageLoaded ? 'flex' : 'none',
                            transform: [{scaleX: scale1}, {scaleY: scale1}],
                            marginRight: px.set(20),
                            marginTop: px.set(10),
                            height: px.set(20),
                            width: px.set(20),
                            opacity,
                            borderRadius: px.set(50),
                            backgroundColor: 'white'}}>
                        </Animated.View>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </View>

        <View style={styles.layout.container}>
          <WebView
            source={{uri: this.state.activeUri || this.state.urls.feed}}
            style={styles.layout.webview}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            onLoad={ () => {} }
            onLoadStart={this.pageLoadStart.bind(this)}
            onLoadEnd={this.pageLoadEnd.bind(this)}
            onError={this.pageLoadError.bind(this)}
            renderError={ () => {} }
            renderLoading={ () => {} }
          />
        </View>

      </View>
    )
  }

}

export default Home

const styles = {
  page: {
    width,
    height,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  layout: {
    nav: {
      width: px.set(400),
      height,
      backgroundColor: 'white',
      borderRightWidth: px.set(1),
      borderRightColor: '#EDEDEE'
    },
    container: {
      flex: 1,
      height,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    webview: {
      width: width - px.set(400),
      height,
      // display: 'none',
      backgroundColor: '#fff'
    }
  },
  avatar: {
    wrapper: {
      height: px.set(240),
      alignItems: 'center',
      borderBottomWidth: px.set(1),
      borderBottomColor: '#EDEDEE'
    },
    img: {
      width: px.set(120),
      height: px.set(120),
      marginTop: px.set(60),
      backgroundColor: '#ddd',
      borderRadius: px.set(120/2),
      borderColor: '#eee',
      borderWidth: px.set(1)
    }
  },
  nav: {
    wrapper: {
      // backgroundColor: '#ddd'
    },
    item: {
      flexDirection: 'row',
      padding: px.set(30),
      paddingRight: 0,
      height: px.set(100),
      justifyContent: 'center',
      borderBottomColor: '#fff',
      borderBottomWidth: px.set(1)
    },
    icon: {
      width: px.set(40),
      height: px.set(40),
      marginLeft: px.set(10),
      backgroundColor: 'orange'
    },
    title: {
      flex: 1,
      marginLeft: px.set(20),
    },
    text: {
      fontSize: px.set(28),
      color: '#2E3039',
      fontFamily: 'PingFangSC-Regular'
    },
    active: {
      bg: {
        backgroundColor: '#1F8EFA'
      },
      color: {
        color: '#fff'
      }
    }
  }
}

/*
<Button title='Test WebView' onPress={this.clickHandlerWebview.bind(this)} />
<Button title='Demo' onPress={this.clickHandlerDemo.bind(this)} />
<Text style={styles.h1}>React Native Demo</Text>

<View style={{height: px.set(10), width: width - px.set(400), backgroundColor: 'orange'}}></View>

<View style={{
  position: 'absolute',
  zIndex: 1,
  top: (height - px.set(100)) / 2,
  left: (width - px.set(400) - px.set(100)) / 2,
  width: px.set(100),
  height: px.set(100),
  backgroundColor: '#000',
  opacity: 0.7,
  borderRadius: px.set(15)
}}>
  <ProgressBarAndroid styleAttr='Inverse' color='blue' />
</View>
*/
