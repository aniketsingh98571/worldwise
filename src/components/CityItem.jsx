import { Link } from 'react-router-dom';
import classes from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';
export default function CityItem({city}){
    const context=useCities()
    const navigate=useNavigate()
    const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
    const {cityName,emoji,date,id,position}=city
    const handleDelete=(e)=>{
      e.preventDefault()
      context.deleteCity(city.id)
      // navigate("/app/cities")
    }
    return (
        <li >
          <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={id===context.currentCity.id?[classes['cityItem--active'],classes.cityItem].join(" "):classes.cityItem}>  
             <span className={classes.emoji}>
            {emoji}
            </span>
            <h3 className={classes.name}>{cityName}</h3>
            <time className={classes.date}>{formatDate(date)}</time>
            <button className={classes.deleteBtn} onClick={handleDelete}>&times;</button>
          </Link>
        </li>

    )
}