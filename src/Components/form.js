import React,{useState} from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';

export default function Form({editable,setEditable,addMarker,newMarker}){

    [inCenter,setInCenter] = useState(true);

    if(editable){
        let title = '';
        let description = '';
        return(
        <View style={styles.form}>
            <Text style = {styles.title}>Novo Local</Text>
            <View style = {styles.content}>
                <Text style = {styles.label}>Digite um nome para o local:</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="nome"
                    onChangeText={(text)=>{
                        title = text;
                    }}/>
                <Text style = {styles.label}>Digite uma descrição:</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="descrição"
                    onChangeText={(text)=>{
                        description = text;
                    }}/>
                <View style = {styles.options}>
                    <TouchableOpacity 
                        style = {styles.buttons}
                        onPress = {()=>{
                            addMarker(
                                {
                                    place:{
                                        title:title,
                                        description:description,
                                        ...newMarker,
                                    },
                                    isAdd:true,
                                    index:null,
                                },
                            );
                            setEditable(false);
                        }}>
                        <Text style = {styles.texteBtn}>salvar</Text>
                    </TouchableOpacity>
                       
                    <TouchableOpacity style = {styles.buttons}
                    onPress={()=>{
                        setEditable(false);
                    }}>
                        <Text style = {styles.texteBtn}>cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
    form:{
        //flex:1,
        backgroundColor:"white",
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,     
        marginVertical:130,
        width:"70%"  
    },
    content:{
       marginBottom:70,
       justifyContent:'center',
       alignContent:'center'
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:30,
        color:'#0055B3'
    },
    label:{
        fontSize:15,
    },
    input:{
        backgroundColor:'#D3D3D3',
        marginVertical:13,
        borderRadius:5,
    },
    options:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10,
        marginHorizontal:15,
    },
    buttons:{
        backgroundColor:'#4A638D',
        borderRadius:5,
        width:65,
        height:35,
        alignItems:'center',
        justifyContent:'center',
        elevation:10,
    },
    texteBtn:{
        color:'white',
    }
})