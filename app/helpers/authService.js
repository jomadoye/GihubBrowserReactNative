import buffer from 'buffer';
import {
  AsyncStorage,
} from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';
export default class AuthService {
  getAuthInfo(cb) {
    console.log(1)
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      console.log(2)
      if (err) {
        return cb(err);
      }
      
      console.log(3)
      if(!val) {
        return cb();
      }
      
      let zippedObj = _.zipObject(val);
      
      console.log(4)
      console.log(val, 'val')
      console.log(zippedObj, 'zippedObj')
      console.log(zippedObj[authKey], 'zippedObj[authKey]')
      if(!zippedObj[authKey]) {
        return cb();
      }

      console.log(5)
      let authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }
      console.log(6);

      console.log(authInfo, 'authInfo')

      return cb(null, authInfo);
    });
  }

  login(creds, cb) {

    console.log('login')
    const b = new buffer.Buffer(`${creds.username}:${creds.password}`);
    const encodedAuth = b.toString('base64');
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        let results = response.json();
        cb({success: true, errorMessage: ' '});
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], err => {
          if(err) {
            throw err;
          }
        })
      } else if (response.status === 401) {
        cb({
          success: false,
          errorMessage: 'Invalid credentials'
        });
      }
    })
    .catch(err => cb(err))
    .finally(() => {
      cb({
        showProgress: false
      });
    })
  }
}