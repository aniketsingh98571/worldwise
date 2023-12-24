import classes from './CityList.module.css'
import CityItem from './CityItem'
import Message from './Message'
export default function CountryList({cities}){
    if(!cities.length) return <Message message="Add your first city by clicking on the map"/>
    console.log(cities)
    return (
        <ul className={classes.cityList}>
            {
                cities.map((city)=>{
                    return <CityItem key={city.id} city={city}/>
                })
            }
        </ul>
    )
}