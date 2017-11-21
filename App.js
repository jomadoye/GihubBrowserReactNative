/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import Login from './app/component/Login';
import AppContainer from './app/component/AppContainer';
import AuthService from './app/helpers/authService';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    }

    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const authService = new AuthService();
    authService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    }
    if(this.state.isLoggedIn) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  }
  onLogin() {
    this.setState({
      isLoggedIn: true,
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
