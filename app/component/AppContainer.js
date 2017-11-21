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
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  TabBarIOS
} from 'react-native';
import Feed from './Feed';
import inbox from '../assets/images/inbox.png';
import search from '../assets/images/search.png';
import star from '../assets/images/star.png';

export default class AppContainer extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    };

  }

  render() {

    return (
        <TabBarIOS style={styles.container}>
          <TabBarIOS.Item 
            title="Feed"
            selected={this.state.selectedTab == 'feed'}
            icon={inbox}
            onPress={() => this.setState({selectedTab: 'feed'})}
          >
              <Feed />
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            title="Search"
            selected={this.state.selectedTab == 'search'}
            icon={search}
            onPress={() => this.setState({selectedTab: 'search'})}
          >
              <Text style={styles.welcome}>
                Tab 2
              </Text>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

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
    marginTop: 150,
    paddingTop: 100,
    // maxWidth: '50%',
  },
});
