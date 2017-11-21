/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Octocat from '../assets/images/Octocat.png';
import AuthService from '../helpers/authService';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showProgress: false,
      error: '',
      success: false,
      errorMessage: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({
      showProgress: true
    }); 
    let authService =  new AuthService();
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      results.success && this.props.onLogin();
      this.setState(results);
    })
  }

  render() {
    let errorView = <View />;
    if(this.state.errorMessage === 'Invalid credentials') {
      errorView = <Text style={styles.error}> 
        Invalid credentials </Text>;
    };

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={Octocat} />
        <Text style={styles.loginText}>
          Signin to github
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={username => this.setState({username})}
          placeholder="Github username/email" />
        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({password})}
          placeholder="Github password"
          secureTextEntry={true} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleLogin} >
            <Text style={styles.buttonText}>
              Login
            </Text>
        </TouchableHighlight>

        {this.state.errorMessage && errorView}

        <ActivityIndicator
          animating={this.state.showProgress}
          style={styles.loader}
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    color: '#FFF',
    fontSize: 30,
    marginTop: 10,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  input: {
    color: '#333',
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#FFF',
  },
  loader: {
    marginTop: 20,
  }, 
  error: {
    color: 'red',
    paddingTop: 10,
    fontSize: 20,
  }
});
