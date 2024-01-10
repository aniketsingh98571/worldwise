import classes from './CountryList.module.css'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'
export default function CityList(){
    const context =useCities()
    if(!context.citiesData.length) return <Message message="Add your first city by clicking on the map"/>
    console.log(context)
    const countries=context.citiesData.reduce((acc,cur)=>{
        // return (
            if(!acc.map((el)=>el.city).includes(cur.country)){
                return [...acc,{country:cur.country,emoji:cur.emoji,id:cur.id}]
            }
            else{
                return acc
            }
        // )
    },[])
    return (
        <ul className={classes.countryList}>
            {
                countries.map((country)=>{
                    return <CountryItem key={country.id} country={country}/>
                })
            }
        </ul>
    )
}