import cities from '../data/cities.json'
import { createContext, useContext,useReducer,useState } from "react";
const CitiesContext=createContext()
const initialState={
    citiesData:cities.cities,
    currentCity:{}
}
function reducer(state,action){
    switch(action.type){
        case 'city/get':
            return {...state,currentCity:action.payload}

        case 'city/delete':
            return {...state,citiesData:action.payload}

        case 'city/create':
            return {...state,citiesData:action.payload}
     }

}
 function CitiesProvider({children}){
    const [{citiesData,currentCity},dispatch]=useReducer(reducer,initialState)
    console.log(citiesData)
    function getCurrentCity(id){
        console.log(id,"city context")
        const tempCity=citiesData.filter((city)=>{
            if(city.id===Number(id)){
                console.log(city)
                dispatch({type:'city/get',payload:city})
                return city
            }
        })
     
        return tempCity[0]
    }
    function createCity(data){
        const prevData=[...citiesData]
        prevData.push(data)
        dispatch({type:'city/create',payload:prevData})
    }
    function deleteCity(id){
        console.log(id,"city context")
        const tempCity=citiesData.filter((city)=>{
            return city.id!==Number(id)
        })
        dispatch({type:'city/delete',payload:tempCity})
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