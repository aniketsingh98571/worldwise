import { useNavigate, useSearchParams } from 'react-router-dom'
import classes from './Map.module.css'

export default function Map(){
 const navigate=useNavigate()
    return (
        <div className={classes.mapContainer} onClick={()=>{navigate("form")}}>
            map
        </div>
    )
}