import React from 'react'
import HomeTop from '../../Components/HomeTop/HomeTop'
import homeImg from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/featuredImage.png'
import SixProductList from '../../Components/SixProductList/SixProductList'
import shareFeatured from '../../data/featuredData'
import { useState, useEffect } from 'react'

export default function Featured() {
    const [productInfo,setProductInfo] = useState(null)

    useEffect(() => {
        // get homeFeatured data and set it to useState
        const homeFeaturedData =  shareFeatured()
        setProductInfo(homeFeaturedData)
        
        return () => {
      }
    }, [])
    
  return (
    <div className='content'>
        <HomeTop text = 'Featured Products'  p = {false} ptext ={''} button = {false} img ={homeImg}></HomeTop>
        <br></br>
        <br></br>
        <br></br>
        {productInfo && <SixProductList data = {productInfo}/>}
    </div>
  )
}
