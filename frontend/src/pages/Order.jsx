import React,{useContext} from 'react'
import{ShopContext} from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const {backendUrl,token,currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

const loadOrderData = async()=>{
  try {
    if(!token){
      return null
    }
    const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
    console.log(response.data);
    if(response.data.success){
      let allOrdersItem = []
      response.data.orders.map((order)=>{
        order.items.map((item)=>{
          item['status']=order.status
          item['payment']=order.payment
          item['paymentMethod']=order.paymentMethod
          item['date']=order.date
          allOrdersItem.push(item)

        })
      })
      setorderData(allOrdersItem.reverse());
    }
  } catch (error) {
    
  }
}

useEffect(()=>{
loadOrderData()
},[token])

  return (
    <div className='border-t pt-16 max-w-4xl mx-auto px-4'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
      <div>
        {
          orderData.map((item,index)=>(
          <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 shadow-sm bg-white'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-20 h-20 object-cover rounded-md' src={item.images[0]} alt=''/>
              <div>
                <p className='font-semibold text-base sm:text-lg'>{item.name}</p>
                <div className='flex flex-wrap gap-4 text-sm sm:text-base text-gray-700 mt-2'>
                  <p >{currency}{item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='mt-4 md:mt-0 md:w-1/3 flex items-center justify-start md:justify-end gap-2'>
            <div className='flex items-center gap-2'>
              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              <p className='text-sm md:text-base'>{item.status}</p>
            </div>
            <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'> Track Order</button>
            </div>
            
          </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
