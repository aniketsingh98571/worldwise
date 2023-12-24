import classes from './CountryList.module.css'
import CityItem from './CityItem'
import Message from './Message'
import CountryItem from './CountryItem'
export default function CityList({cities}){
    if(!cities.length) return <Message message="Add your first city by clicking on the map"/>
    console.log(cities)
    const countries=cities.reduce((acc,cur)=>{
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