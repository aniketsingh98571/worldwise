// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from '../contexts/CitiesContext'
export function convertToEmoji(countryCode) {
const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const context=useCities()
  const {lat,lng}=useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading,setIsLoading]=useState(false)
  const [emoji,setEmoji]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    fetchCityData()
  },[lat,lng])
  const fetchCityData=async()=>{
    try{
      setIsLoading(true)
      const res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
      const data=await res.json()
      console.log(data)
      if(!data.countryCode) throw new Error("Doesn't seem like a country, choose other place")
      setCityName(data.city||data.locality||"")
      setCountry(data.countryName)
      setEmoji(convertToEmoji(data.countryCode))
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    if(!cityName||!date)  return
    const newCity = {
      country,
      cityName,date,
      emoji,notes,position:{lat,lng},id:Math.random()
    }
    console.log(newCity)
    context.createCity(newCity)
    navigate("/app/cities")
  }
  if(isLoading)return <Spinner/>
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
         <DatePicker id="date" onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={()=>{}}>Add</Button>
        <Button onClick={(e)=>{e.preventDefault(); navigate(-1)}} type="back">&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
