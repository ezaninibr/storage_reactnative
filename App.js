import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      nome: ''
    };
    this.gravar = this.gravar.bind(this);
  };

  // componentDidMount() - executa toda vez que o app for carregado...
  async componentDidMount(){
    const nome = this.state.nome;
    await AsyncStorage.getItem('nome').then((value)=>{
      this.setState({nome:value});
    });
  }

  // componentDidUpdate() - executa toda vez que um state for alterado...
  async componentDidUpdate(_,prevState){
    const nome = this.state.nome;
    if(prevState !== nome){
      await AsyncStorage.setItem('nome',nome);
    }
  }

  gravar(){
    this.setState({nome:this.state.input})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Async Storage</Text>
        <View style={styles.header}>
          <TextInput
            style={styles.caixaTexto}
            value={this.state.input}
            onChangeText={(texto)=>this.setState({input:texto})}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity  
            style={styles.botao}
            onPress={this.gravar}
          >
            <Text style={styles.textoBotao}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.resultado}>{this.state.nome}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40
  },
  header:{
    flexDirection:'row',
    marginVertical:15,
    justifyContent:'center',
    alignItems:'center'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  caixaTexto: {
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:5,
  },
  botao:{
    width: 30,
    backgroundColor:'#009900',
    borderRadius:5,
    marginLeft:5,
    height: 30,
    justifyContent:'center',
    alignItems:'center'
  },
  textoBotao:{
    color: "#fff",
    fontWeight:'bold'
  },
  resultado:{
    fontSize:20,
    color: "#0099AA"
  }
});
