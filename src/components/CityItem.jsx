import { Link } from 'react-router-dom';
import classes from './CityItem.module.css'
export default function CityItem({city}){

    const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
    const {cityName,emoji,date,id,position}=city

    return (
        <li >
          <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={classes.cityItem}>  
             <span className={classes.emoji}>
            {emoji}
            </span>
            <h3 className={classes.name}>{cityName}</h3>
            <time className={classes.date}>{formatDate(date)}</time>
            <button className={classes.deleteBtn}>&times;</button>
          </Link>
        </li>

    )
}