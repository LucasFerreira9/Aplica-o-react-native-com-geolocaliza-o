import React from 'react';
import {Marker,Callout} from 'react-native-maps';
import {Text,StyleSheet, ScrollView,StatusBar} from 'react-native';

//componente que retorna uma lista de markers com base em um vetor de objetos que representam marcadores
export default function Markers({markers,showButtons,setLastMarker}){

    return markers.map((place,index)=>{
        return <Marker 
            tracksViewChanges={false}	
            key={index}	
            coordinate={{	
            latitude: place.latitude,
            longitude: place.longitude
            }}
            onPress = {()=>{
                showButtons(true);
                setLastMarker({
                    id:index,
                    coordenadas:{
                        latitude: place.latitude,
                        longitude: place.longitude
                    }
                });
            }}
            >  

        <Callout tooltip = {true}>           
            <ScrollView style = {styles.view}>
                <Text style = {styles.title}>{place.title}</Text>
                <Text style = {styles.description}>{place.description}</Text>
            </ScrollView>           
        </Callout>

        </Marker>
    });   
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        
    },
    description:{
        fontSize:15,
    },
    view:{
        width:200,
        height:150,
        backgroundColor:"#ACB7CA",
        borderRadius:15,
        paddingHorizontal:10,
        borderColor:'#000137',
        borderWidth:10,
    }
});


