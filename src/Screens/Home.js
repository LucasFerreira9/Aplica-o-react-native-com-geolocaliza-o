import React,{useState,useReducer, useEffect} from 'react';
import useLocation from '../Hooks/useLocation';
import MapView from 'react-native-maps';
import {View } from 'react-native';
import Markers from '../Components/Markers';
import Form from '../Components/form';
import Buttons from '../Components/Buttons';
import MapViewDirections from 'react-native-maps-directions';

export default function Home(){
    
    //Armazena o ponto de destino da rota
    const [localDirection, setLocalDirection] = useState(null);

    const KEY = 'minha chave da api do google';
    
    //Utilizando o hook personalizado que armazena a localização do usuário(caso seja permitido)
    const {coords,errorMsg} = useLocation();
 
    //Armazena um array de marcadores.
    const [marcadores,setMarcadores] = useReducer((state,element)=>{
      let new_markers = [...state];

      //verifica se a operação deve ser de excluir ou adicionar um novo marcador
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

    //Estado do formulário de entrada e dos botões de opções(visível ou não)
    const [form,showForm] = useState(false); //Aparece ao clicar em um local qualquer do mapa, solicitando informações para criar um novo marcador
    const [buttons,showButtons] = useState(false); //Aparece ao clicar em um marcador qualquer. 

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
           //O click no mapa mostra o formulário de entrada e armazena a coordenada do local. 
           onPress = {(event)=>{
                setClicked({
                  latitude: event.nativeEvent.coordinate.latitude,
                  longitude: event.nativeEvent.coordinate.longitude
                });
                showForm(!form);
                showButtons(false);
           }} 
           //O arrastar do mapa faz o formulário desaparecer. 
           onPanDrag = {()=>{showForm(false)}}   
           //Mapa oculpa toda a tela.    
           style={{
             height: '100%',
             width: '100%',
             position: 'absolute',		
           }}	
           //Região inicial do mapa e os níveis de zoom iniciais.
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







