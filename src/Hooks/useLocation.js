import { PermissionsAndroid} from "react-native";
import React, { useEffect } from 'react';
import { useState } from "react";
import Geolocation from "react-native-geolocation-service";

export default function useLocation(){

    //Armazenando o estado da localização do usuário e uma mensagem de erro. O estado defualt é a localização da ufop
    const [coords,setCoords] = useState({latitude:-20.398259,longitude:-43.507726});
    const [errorMsg,setErrorMsg] = useState(null);

    //Ao ser invocada pela primeira vez, a função solicita a localização do dispositivo, retornando a localização do usuário ou uma mensagem de erro.
    useEffect(()=>{

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((resposta)=>{
            if(resposta===PermissionsAndroid.RESULTS.GRANTED){
                Geolocation.getCurrentPosition(
                    ({coords})=>{
                        setCoords({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                          });
                    },
                    (error) => {
                        setErrorMsg('Não foi possível obter a localização');
                    }, 
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true } 
                    

                );
            }
            else{
                setErrorMsg('Solicitação negada');
            }
        });
    },[]);   
      
    return {coords,errorMsg}
    
}
