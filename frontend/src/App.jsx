import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Collection from './pages/collection'
import Contact from './pages/contact'
import Product from './pages/product'
import Cart from './pages/Cart'
import Placeorder from './pages/placeorder'
import Order from './pages/order'
import Login from './pages/login'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/placeorder' element={<Placeorder/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
