/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Navigator,
  Alert
} from 'react-native';
import {Header, Input} from 'react-native-elements';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tasksdb.db' });
class Add extends PureComponent {
  state = {data:'',
    description:''
  }
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='taskst'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS taskst', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS taskst(task_id INTEGER PRIMARY KEY AUTOINCREMENT, task text, description text)',
                []
              );
            }
          }
        );
      });
  }
  
  handleSave(){
    const {data, description} = this.state;
    console.log(data)
    if(data !='' && description!=''){
      this.insert(data,description);
    }else{
      Alert.alert('Warning', 'Has not been saved')
    }

  }

  insert(data,description){
    console.log(data,description)
    db.transaction(function (tx) {
      tx.executeSql('insert into taskst(task,description) values(?,?)',[data,description],(transaction, results) => {
        console.log(results);
        Alert.alert('Success', 'It has been Saved');
      }, function(transaction,err) {
        Alert.alert('Warning', 'It has not been Saved');
        return;
      });
    });
  }
  

  render() {
    return (
      <View>
        <Input onChangeText={(val)=> this.setState({ data:val })} value={this.state.data}
        placeholder='Book'
        leftIconContainerStyle={{marginRight:15}}
        inputContainerStyle={{marginTop:45, width:330, marginLeft:30}}
        />
        <Input onChangeText={(val)=> this.setState({ description:val })} value={this.state.description}
        placeholder='Description'
        leftIconContainerStyle={{marginRight:15}}
        inputContainerStyle={{marginTop:45, width:330, marginLeft:30}}
        />
        <View>
          <Button
            onPress={() => {
              this.handleSave();
            }}
            title="Save" />
          
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#52f',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Add;
