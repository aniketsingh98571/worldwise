import { useNavigate, useSearchParams } from 'react-router-dom'
import classes from './Map.module.css'
import { MapContainer, TileLayer, useMap,Popup,Marker } from 'react-leaflet'
import { useState,useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'
export default function Map(){
const [mapPosition,setPosition]=useState([40,0])
const [searchParams,setSearchParams] =useSearchParams()



 const navigate=useNavigate()
 const context=useCities()
    return (
        <div className={classes.mapContainer} onClick={()=>{navigate("form")}}>
         <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className={classes.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {
                context.citiesData.cities.map((city)=>{
                    return (
                        <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                            <Popup>
                              <span>{city.emoji} <span>{city.cityName}</span></span>
                            </Popup>
                        </Marker>
                    )
                })
            }
            
           <ChangeCenter position={mapPosition}/>
        </MapContainer>
       </div>
    )
    function ChangeCenter({position}){
        const map=useMap()
        map.setView(position)
        return null
    }
}