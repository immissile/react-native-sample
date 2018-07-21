import {
  Navigation
} from 'react-native-navigation'
import {
  registerScreens
} from '@/screens'

module.exports = () => {
  registerScreens()
  Navigation.events().onAppLaunched(() => {
    Navigation.setRoot({
      stack: {
        children: [
          {
            component: {
              name: 'nb.navigation.Home',
              options: {
                topBar: {
                  hidden: true,
                  animateHide: true
                }
              }
            }
          }
        ]
      }
    })
  })
}
