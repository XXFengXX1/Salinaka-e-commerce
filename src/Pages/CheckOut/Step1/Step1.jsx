import React, { useEffect } from 'react'
import  './Step1.css'
import{Link, useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { addToBasket,removeFromBasket,removeAll } from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/Redux/shoppingSlice.js'
import ProductBar from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/Components/ProductBar/ProductBar.jsx'
import { isAllOf } from '@reduxjs/toolkit'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Step1() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingSlice.cart)
  const shopData =useSelector(state => state.shoppingSlice.data)
  //search code section
  const navi = useNavigate()

  //declare subtotal price
  let totalPrice=0

  useEffect(()=>{
    if(products.length == 0){
      navi('/shop')
    }
  },[shopData])
  

  return (
    <div className='Step1Page'>
      <div className="topSteps">
        <div className="hrLine"></div>
        <div className="step currentStep">
          <div className="circleWrapper">
            <div className="steptext">1</div>
          </div>
          <div className="text">Order Summary</div>
        </div>
        <div className="step">
          <div className="circleWrapper">
            <div className="steptext">2</div>
          </div>
          <div className="text">Shipping Details</div>
        </div>
        <div className="step">
          <div className="circleWrapper">
            <div className="steptext">3</div>
          </div>
          <div className="text">Payment</div>
        </div>
      </div>
      <h3>Order Summary</h3>
      <div className="text">Review items in your basket</div>
      <div className="goodsSection">
            {shopData.map((product)=>{
            if(product.added ==true){
              totalPrice = product.price * product.quantity + totalPrice
              console.log('total',totalPrice)
              return <ProductBar key={product.id} product={product}/>
            }
          })}
          
        </div>
        <div className="continueSection">
          <div className="subtotal">Subtotal</div>
          <div className="total">${totalPrice}</div>
          <div className="btnGroup">
            <Link to='/shop' className="continueShopping">Continue Shopping</Link>
            <div className="nextStep">Next Step
              <ArrowForwardIcon/>
            </div>
          </div>
        </div>
    </div>
  )
}
