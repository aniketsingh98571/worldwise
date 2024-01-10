import { useNavigate, useSearchParams } from 'react-router-dom'
import classes from './Map.module.css'
import { MapContainer, TileLayer, useMap,Popup,Marker, useMapEvents } from 'react-leaflet'
import { useState,useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'
export default function Map(){
const [mapPosition,setPosition]=useState([0,0])
const {isLoading:isLoadingPosition,position:geoLocationPosition,getPosition}=useGeolocation()
const {lat,lng}=useUrlPosition()
console.log("After")
useEffect(()=>{
    if(lat&&lng){
        console.log("in if")
        setPosition([lat,lng])
    }
},[lat,lng])
useEffect(()=>{
    if(geoLocationPosition){
        setPosition([geoLocationPosition.lat,geoLocationPosition.lng])
    }
},[geoLocationPosition])
 const context=useCities()
    return (
        <div className={classes.mapContainer}>
           { !geoLocationPosition&&<Button type="position" onClick={getPosition}>{isLoadingPosition?"Loading...":"Use your position"}</Button>}
         <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={false} className={classes.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {
                context.citiesData.map((city)=>{
                    return (
                        <Marker position={mapPosition} key={city.id}>
                            <Popup>
                              <span>{city.emoji} <span>{city.cityName}</span></span>
                            </Popup>
                        </Marker>
                    )
                })
            }
            
           <ChangeCenter position={mapPosition}/>
           <DetectClick/>
        </MapContainer>
       </div>
    )
    function ChangeCenter({position}){
        const map=useMap()
        map.setView(position)
        return null
    }
    function DetectClick(){
        const navigate=useNavigate()
        useMapEvents({
            click:e=>{
                navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
            }
        })
    }
}