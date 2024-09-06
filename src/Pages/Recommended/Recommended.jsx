import React from 'react'
import HomeTop from '../../Components/HomeTop/HomeTop'
import homeImg from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/recoGirl.png'
import SixProductList from '../../Components/SixProductList/SixProductList'
import recShareFeatured from '../../data/recommendedData'
import { useState, useEffect } from 'react'

export default function Recommended() {
  const [productInfo,setProductInfo] = useState(null)

  useEffect(() => {
      // get recommended data and set it to useState
      const homeRecData =  recShareFeatured()
      setProductInfo(homeRecData)
      
      return () => {
    }
  }, [])

  return (
    <div className='content'>
        <HomeTop text = 'Recommended Products'  p = {false} ptext ={''} button = {false} img ={homeImg}></HomeTop>
        <br></br>
        <br></br>
        <br></br>
        {productInfo && <SixProductList data = {productInfo}/>}
    </div>
  )
}
