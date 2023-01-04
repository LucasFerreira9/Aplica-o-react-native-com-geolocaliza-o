import { TouchableOpacity,StyleSheet,Image,View} from "react-native";
import React, { useEffect } from "react";
import seta from '../Assets/seta.png';
import lixeira from '../Assets/lixeira.png';
import { useState } from "react";

//Componente que contem os botões de excluir um marker ou traçar uma rota para os mesmo. 
export default function Buttons({isVisible,setDestination,localDirection,deleteFunc}){


    if(isVisible){
        return(
            <View style = {styles.view}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>{setDestination(localDirection.coordenadas);}}>
                    <Image source = {seta} style = {styles.imageGo}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>{
                        deleteFunc({
                            place:null,
                            isAdd:false,
                            index:localDirection.id,
                        });
                    }}>
                    <Image source={lixeira} style = {styles.imageDelete}/>
                </TouchableOpacity>
            </View>
            
        );    
    }
    
}


const styles = StyleSheet.create({
    button:{
        width:60,
        height:60,
        backgroundColor:'#004999',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        elevation:20,
        marginTop:15,
        marginBottom:15
    },
    imageGo:{
        width:30,
        height:30,
    },
    imageDelete:{
        width:40,
        height:40,
    },
    view:{
        right:20,
        bottom:70,
        position:"absolute",
        alignItems:'center',
    }

});