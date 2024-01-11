import { useAuth } from "../contexts/FakeAuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function ProtectedRoute({children}){
    const context=useAuth()
    const naviagate=useNavigate()
    useEffect(()=>{
        if(!context.isAuthenticated) {
            naviagate("/")
        }
    },[naviagate,context.isAuthenticated])
    return (
       context.isAuthenticated? children:null
    )
}