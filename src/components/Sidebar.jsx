import classes from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'
export default function(){
    return (
        <div className={classes.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={classes.footer}>
                <p className={classes.copyright}>&copy; Copyright {new Date().getFullYear()} by Worldwise</p>
            </footer>
        </div>
    )
}