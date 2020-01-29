import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import api from '../services/api';

//urlAPI: /convert?q=USD_BRL&compact=ultra&apiKey=edf0e3f42384e6de9b2f

export default class Conversor extends Component{
    constructor(props){
        super(props);
        this.state = {
            moedaA:props.moedaA,
            moedaB:props.moedaB,
            moedaB_valor:0,
            moedaA_valor:0,
            valorConvertido:0
        };
        this.converter=this.converter.bind(this);
    }

    async converter(){
        let de_para = this.state.moedaA + '_' + this.state.moedaB
        const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=edf0e3f42384e6de9b2f`);
        let cotacao = response.data[de_para];
        
        let resultado = (cotacao * parseFloat(this.state.moedaB_valor));

        
        this.setState({
            valorConvertido: resultado.toFixed(2)
        });
        Keyboard.dismiss();

    }

    render(){
        const { moedaA, moedaB } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{moedaA} para {moedaB}</Text>

                <TextInput
                placeholder="digite o valor a ser convertido"
                style={styles.input}
                onChangeText={(moedaB_valor)=>{this.setState({moedaB_valor})}}
                keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={this.converter}>
                    <Text style={styles.buttonText}>Converter</Text>
                </TouchableOpacity>

                <Text style={styles.convertedValue}>
                    {(this.state.valorConvertido == 0)?'':this.state.valorConvertido}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#000'
    },

    input:{
        width:290,
        height:45,
        backgroundColor:'#ccc',
        textAlign:'center',
        fontSize:20,
        marginTop:15,
        color:'#000',
        borderRadius:5
    },

    button:{
        width:150,
        height:45,
        backgroundColor:'#ff0000',
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
    },

    buttonText:{
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
    },

    convertedValue:{
        fontSize: 30,
        fontWeight:'bold',
        color:'#000',


    }
})