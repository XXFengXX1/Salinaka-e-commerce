import React from 'react'
import HomeTop from '../../Components/HomeTop/HomeTop'
import homeImg from '../../images/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png'
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react'
import shareFeatured from '../../data/homeFeaturedData'
import recShareFeatured from '../../data/recommendedData'
import SixProductList from '../../Components/SixProductList/SixProductList'
import './Home.css'
import Footer from '../../Components/Footer/Footer'
import { GoRec ,GoFeatured} from '../../Redux/meanuSlice';
import { useDispatch } from 'react-redux';

export default function Home() {
  const [productInfo,setProductInfo] = useState(null)
  const [recproductInfo,setRecProductInfo] = useState(null)

  const t = 
    <div>
      <span>See</span> everything
      <br></br>
      with <span>Clarity</span> 
    </div>

  useEffect(() => {
      // get homeFeatured data and set it to useState
      const homeFeaturedData =  shareFeatured()
      setProductInfo(homeFeaturedData)
      
      // get homeRec data and set it to useState
      const homeRecData = recShareFeatured()
      setRecProductInfo(homeRecData)
      //clean up function
      return () => {
    }
  }, [])

  const dispatch = useDispatch()
  //navigat to rec page 
  const goRec = ()=>{
    dispatch(GoRec())
  }
  //navigat to shop page 
  const goFeatured = ()=>{
    dispatch(GoFeatured())
  }
  return (
    <div className="home">

      <div className='content'>
        <HomeTop text = {t}  p = {true} ptext ={'Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we have got your eyes covered.'} button = {true} img ={homeImg}></HomeTop>

        <div className="featuredProducts">
          <div className="topText">
            <h2>Featured Products</h2>
            <Link to = '/featured' onClick={goFeatured}>See All</Link>
          </div>
          {productInfo && <SixProductList data = {productInfo}/>}
        </div>
        <div className="recommendedProducts">
          <div className="topText">
            <h2>Recommended Products</h2>
            <Link to = '/recommended' onClick={goRec}>See All</Link>
          </div>
          {recproductInfo && <SixProductList data = {recproductInfo}/>}
        </div>

        
      </div>
      <Footer></Footer>
    </div>
  )
}
