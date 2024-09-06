import React, { Component, useRef } from 'react'
import allDatas from '../../data/data_origin'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import SixProductList from '../../Components/SixProductList/SixProductList'
import recShareFeatured from '../../data/recommendedData'
import './Product.css'
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import {Link} from 'react-router-dom'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AllWhite ,GoShop} from '../../Redux/meanuSlice';

import { useDispatch,useSelector } from 'react-redux'
import { addToBasket,removeFromBasket,setSize,setColor } from '../../Redux/shoppingSlice'
import CheckIcon from '@mui/icons-material/Check';

export default function Product({parameter}) {
  const shoppingList = useSelector(state => state.shoppingSlice.cart)
  const shopData = useSelector(state=>state.shoppingSlice.data)
  //get data from useParams hook
  const {pa} = useParams();
  const allData= allDatas()
  //get the product data we need
  const productArr = shopData.filter((p)=>
    { return p.parameter == pa}
  )
  const product = productArr[0]

  const [productInfo,setProductInfo] = useState(null)

  const dispatch =useDispatch()

  const handleAdding = (product)=>{
      //select a size for glasses
    if(product.size[0]==selectRef.current.value){

    }else{
      dispatch(setSize({size:selectRef.current.value,pro:product}))
    }

      //adding

    let isAdded = false
    let numberNeedtoRemover = 0;
    for(let index in shoppingList){
      
      if(shoppingList[index].id == product.id){
          isAdded = true;
          numberNeedtoRemover =index
      }
    }
    if(!isAdded){

      dispatch(addToBasket(product))
    }
    else{
      let frontPart = shoppingList.slice(0,numberNeedtoRemover)
      let subNum = Number(numberNeedtoRemover) +1
    
      let lastPart = shoppingList.slice(subNum,shoppingList.length)
      let newCart = [...frontPart,...lastPart]
      newCart.push(shoppingList[numberNeedtoRemover])
      dispatch(removeFromBasket(numberNeedtoRemover))

    }
  }

  useEffect(() => {
      // get recommended data and set it to useState
      const homeRecData =  recShareFeatured()
      setProductInfo(homeRecData)
      
      //set meanu text to all white
      dispatch(AllWhite())
      return () => {
    }
  }, [])
  
  //click to go back to shop 
  const handleBackToShop = ()=>{
    dispatch(GoShop())
  }
  

  //select a size for glasses

  const selectRef = useRef('')
  

  //select a color for glasses

  const selectColor =(e,product)=>{
    console.log(e.target.style.backgroundColor)
    dispatch(setColor({color:e.target.style.backgroundColor,pro:product}))
  }


  return (
    <div key={product.parameter} className="productPage">
      <Link to = '/shop' className="backButton" onClick={handleBackToShop}><WestOutlinedIcon/>Back to Shop</Link>

      <div className='productDetail'>
          <div className={product.added==true? 'addedProduct proContentWrapper':"proContentWrapper"}>
            <div className="leftImageChoice">
              <img src={product.img}></img>
            </div>
            <div className="mainImage">
              <img src={product.img} key={product.id}></img>
            </div>
            <div className="detailWrapper">
              <div className="subTitle">{product.brand}</div>
              <div className="title">{product.name}</div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat similique dicta nulla praesentium deserunt. Corporis repellendus deleniti dolores eligendi.</p>
              <hr></hr>
              <br/>
              <div className="subTitle">Lens Width and Frame Size</div>

              <div className="selectContainer">
                <select ref={selectRef} placeholder='-Select Size-' id='selectCon' >
                  <option value={''} disabled selected>-Select Size-</option>
                  <option value={product.size[0]}>{product.size[0]}</option>
                  <option value={product.size[1]}>{product.size[1]}</option>
                  <option value={product.size[2]}>{product.size[2]}</option>
                </select>
                <label for='selectCon' ><KeyboardArrowDownOutlinedIcon/></label>
              </div>

              <br/>
              <div className="subTitle">Choose Color</div>
              <br/>
              {product.color.map((c)=>{
                if(c == product.selectColor){
                  
                  return <div key={c} className="colorDot" style={{backgroundColor:c}} onClick={(e)=>selectColor(e,product)}><CheckIcon/></div>
                }
                else{

                  return <div key={c} className="colorDot" style={{backgroundColor:c}} onClick={(e)=>selectColor(e,product)}></div>
                }
              })}
              <br></br>
              <div className="price">${product.price}</div>
              <button  onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
            </div>
         </div>
       </div>
        <div className='content'>
          <br></br>
          <br></br>
          <br></br>
          {productInfo && <SixProductList data = {productInfo}/>}
         </div>

    </div>
    
  )
}

