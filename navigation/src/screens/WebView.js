import React, {Component} from 'react'
import {
  Dimensions,
  View,
  Text,
  Button,
  BackHandler,
  Platform,
  WebView as WV
} from 'react-native'
import {
  Navigation
} from 'react-native-navigation'

const {
  width: viewPortWidth,
  height: viewPortHeight
} = Dimensions.get('screen')

class WebView extends Component {
  static get options() {
    return {
      topBar: {
        title: 'Test View',
        textColor: 'black',
        textFontSize: 16
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.setOptions(this.props.componentId, {
      topBar: {
        hidden: false,
        animateHide: false
      }
    })
    this.addBackHandler = this.addBackHandler.bind(this);
    this.removeBackHandler = this.removeBackHandler.bind(this);
    this.backHandler = () => {
      this.setState({
        backPress: 'Back button pressed!'
      });
      return true;
    };
    this.state = {
      backPress: ''
    };
  }

  render() {
    return (
      <WV
        source={{uri: 'http://10.5.7.108:4001/'}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 70, width: viewPortWidth, height: viewPortHeight}}
        javaScriptEnabled={true}
        scalesPageToFit={true}
      />
    );
  }

  addBackHandler() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  removeBackHandler() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }
}

const styles = {
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  h2: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10
  },
  footer: {
    fontSize: 10,
    color: '#888',
    marginTop: 10
  }
};

export default WebView
