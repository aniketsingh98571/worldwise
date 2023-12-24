import {  NavLink } from "react-router-dom";
import classes from './PageNav.module.css'
import Logo from './Logo'
export default function PageNav(){
    return (
        <nav className={classes.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink className={classes.ctaLink} to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}