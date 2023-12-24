import Sidebar from "../components/Sidebar"
import classes from './AppLayout.module.css'
import Map from "../components/Map"
export default function AppLayout(){
    return (
        <div className={classes.app}> 
            <Sidebar/>
            <Map/>
        </div>
    )
}