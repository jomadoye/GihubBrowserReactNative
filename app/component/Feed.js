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
  TabBarIOS,
  ListView
} from 'react-native';
import AuthService from '../helpers/authService';

export default class Feed extends Component<{}> {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(['A','B','C'])
    };

    this.renderRow = this.renderRow.bind(this);

  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    let authService =  new AuthService();
    authService.getAuthInfo((err, authInfo) => {
      console.log(authInfo, 'authInfo-fetchFeed')
      let url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
      fetch(url, {
        headers: authInfo.header
      })
      .then(response => response.json())
      .then(responseData => {
        let FeedItems = responseData.filter((ev) => ev.type == 'PushEvent')
      })
    })
  }

  renderRow(rowData) {
    return <Text style={{
      color: '#333',
      backgroundColor: '#fff',
      alignSelf: 'center'
    }}>{rowData}
    </Text>

  }

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    );
  }
}
