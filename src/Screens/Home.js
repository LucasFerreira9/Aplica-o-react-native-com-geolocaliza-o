import React,{useState,useReducer, useEffect} from 'react';
import useLocation from '../Hooks/useLocation';
import MapView from 'react-native-maps';
import {View } from 'react-native';
import Markers from '../Components/Markers';
import Form from '../Components/form';
import Buttons from '../Components/Buttons';
import MapViewDirections from 'react-native-maps-directions';

export default function Home(){
    
    const [localDirection, setLocalDirection] = useState(null);

    const KEY = 'AIzaSyDpv2fuLdLd8gvE6ng9D5xPPzYWUQA6BPY';
    
    const {coords,errorMsg} = useLocation();
 
    const [marcadores,setMarcadores] = useReducer((state,element)=>{
      let new_markers = [...state];

      if(element.isAdd){
        new_markers.push(element.place);
        return new_markers;
      } 
      else{
        let first = new_markers.splice(0,element.index);
        let last = new_markers.splice(1,new_markers.length-1);
        return first.concat(last);

      }    

    },[]);

    const [form,showForm] = useState(false);
    const [buttons,showButtons] = useState(false);

    //Coordenadas do ultimo ponto clicado
    const [lastClicked,setClicked] = useState(null);
    //coordenadas do ultimo marcador clicado. 
    const [lastMarker,setLastMarker] = useState({
      id:null,
      coordenadas:{
        latitude:null,
        longitude:null
      },
    });
  
    return( 
      <View style={{width:"100%",height:"100%",alignItems:'center'}}>
        <MapView
           showsUserLocation={true}		
           showsMyLocationButton={false} 
           toolbarEnabled={false}	
           onPress = {(event)=>{
                setClicked({
                  latitude: event.nativeEvent.coordinate.latitude,
                  longitude: event.nativeEvent.coordinate.longitude
                });
                showForm(!form);
                showButtons(false);
           }} 
           onPanDrag = {()=>{showForm(false)}}      
           style={{
             height: '100%',
             width: '100%',
             position: 'absolute',		
           }}	
           initialRegion={{
             ...coords,
             latitudeDelta: 0.195,  	
             longitudeDelta: 0.1921,	
           }}
         >
          <MapViewDirections
              strokeWidth={3}	
              strokeColor="blue"
              origin={coords}
              destination = {localDirection}
              apikey = {KEY}
              mode = 'DRIVING'/>

           <Markers markers={marcadores} showButtons = {showButtons} setLastMarker={setLastMarker}/>

         </MapView>
         <Form editable={form} setEditable = {showForm} addMarker = {setMarcadores} newMarker = {lastClicked}/>
         <Buttons isVisible = {buttons} setDestination = {setLocalDirection} localDirection = {lastMarker} deleteFunc = {setMarcadores} />
        
      </View>
      
    ) 
}







