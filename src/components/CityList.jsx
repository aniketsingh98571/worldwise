import classes from './CityList.module.css'
import CityItem from './CityItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
export default function CountryList(){
    const context=useCities()
    console.log(context.citiesData)
    if(!context.citiesData.cities.length) return <Message message="Add your first city by clicking on the map"/>
    // console.log(cities)
    return (
        <ul className={classes.cityList}>
            {
                context.citiesData.cities.map((city)=>{
                    return <CityItem key={city.id} city={city}/>
                })
            }
        </ul>
    )
}