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
  FlatList,
  Alert
} from 'react-native';
import {Header, Input} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';

const AlertMsg ='Seguro que quiere  eliminar esta tarea?';
const AlrtCncl='Ha cancelado el proceso de eliminacion'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tasksdb.db' });
class ViewAll extends PureComponent {
  state = {dataTodo: []}
  constructor(props) {
    super(props);
    this.state = {
        dataList: [],
      };
    db.transaction(tx => {
        tx.executeSql('select * from taskst',[],(transaction,results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            this.setState({
                dataList: temp,
            });
            console.log(this.state.dataList[14])
        });
    });
  }
  
  deleteTask(id){
      db.transaction((tx)=>{
        tx.executeSql('DELETE FROM taskst WHERE task_id=?',[id],(transaction,results)=>{
            Alert.alert(('Success', 'It has been removed Correctly'))
        }, function(transaction,err){
            Alert.alert('Warning','It has not been removed')
        });
      });
  }

  async handleDelete(id){
      await this.deleteTask(id);
      
  }

  ListViewItemSeparator = () =>{
      return(
          <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
      )
  }


  
  
  

  render() {
    return (
      <View>
        <FlatList
            data = {this.state.dataList}
            ItemSeparatorComponent = {this.ListViewItemSeparator}
            keyExtractor={(item,index) => index.toString()} 
            renderItem={({item}) => (
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Id: {item.task_id}</Text>
                    <Text>Tarea: {item.task}</Text>
                    <Button 
                    onPress={()=>
                        Alert.alert('Aviso',AlertMsg,[
                            {text: 'Cancel', onPress: ()=> Alert.alert(AlrtCncl)},
                            {text: 'Ok', onPress:()=> this.handleDelete(item.task_id).then(this.props.navigation.navigate('Home'))}
                        ])
                    }
                    title="Delete"/>
                </View>
            )}
        />
        
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
    backgroundColor: Colors.white,
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

export default ViewAll;
