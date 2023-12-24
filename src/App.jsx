import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import cities from './data/cities.json'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path='pricing' element={<Pricing/>}/>
           <Route path='/app' element={<AppLayout/>}>
            <Route index element={<Navigate to="cities"/>}/>
            <Route path='cities' element={<CityList cities={cities.cities}/>}/>
            <Route path='cities/:id' element={<City cities={cities.cities}/>}/>
            <Route path='countries' element={<CountryList cities={cities.cities}/>}/>
            <Route path='form' element={<Form/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
