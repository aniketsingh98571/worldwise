import cities from '../data/cities.json'
import { createContext, useContext,useState } from "react";
const CitiesContext=createContext()
 function CitiesProvider({children}){
    const [citiesData,setCities]=useState(cities)
    const [currentCity,setCurrentCity]=useState({})
    console.log(citiesData)
    function getCurrentCity(id){
        console.log(id,"city context")
        const tempCity=citiesData.cities.filter((city)=>{
            console.log(typeof city.id)
            if(city.id===Number(id)){
                console.log(city)
                setCurrentCity(city)
                return city
            }
        })
        return tempCity[0]
    }
    return (
        <CitiesContext.Provider value={{citiesData,currentCity,getCurrentCity}}>
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