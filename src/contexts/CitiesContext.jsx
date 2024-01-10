import cities from '../data/cities.json'
import { createContext, useContext,useState } from "react";
const CitiesContext=createContext()
 function CitiesProvider({children}){
    const [citiesData,setCities]=useState(cities.cities)
    const [currentCity,setCurrentCity]=useState({})
    console.log(citiesData)
    function getCurrentCity(id){
        console.log(id,"city context")
        const tempCity=citiesData.filter((city)=>{
            if(city.id===Number(id)){
                console.log(city)
                setCurrentCity(city)
                return city
            }
        })
        return tempCity[0]
    }
    function createCity(data){
        const prevData=[...citiesData]
        prevData.push(data)
        setCities(prevData)
    }
    function deleteCity(id){
        console.log(id,"city context")
        const tempCity=citiesData.filter((city)=>{
            return city.id!==Number(id)
        })
        setCities(tempCity)
    }
    return (
        <CitiesContext.Provider value={{citiesData,currentCity,getCurrentCity,createCity,deleteCity}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context=useContext(CitiesContext)
    if(context===undefined) throw new Error("Cities Context was used outside the Cities Provider")
    console.log(context)
    return context
}
export {CitiesProvider,useCities}