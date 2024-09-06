import React, { useState , useRef,useEffect } from 'react'
import  './Navbar.css'
import mainlogo from "/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/navbarLogo.png"
import searchIcon from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/magnifying-glass.svg'
import{Link, useNavigate} from "react-router-dom"
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useDispatch,useSelector } from 'react-redux'
import { addToBasket,removeFromBasket,removeAll } from '../../Redux/shoppingSlice'
import {setFilter}from'../../Redux/filterSlice'
import ProductBar from '../ProductBar/ProductBar'
import { Calculate } from '@mui/icons-material'
import { isAllOf } from '@reduxjs/toolkit'
import { AllWhite, NavClick } from '../../Redux/meanuSlice'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import userImg from '/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/userImg.jpg'
import { setSignInState } from '../../Redux/userSlice'

export default function Navbar() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingSlice.cart)
  const shopData =useSelector(state => state.shoppingSlice.data)
  const isSignIn = useSelector(state => state.userSlice.isSignIn)
  const user = useSelector(state => state.userSlice)
  //search code section
  const navi = useNavigate()
  const searchRef =useRef('')
  const handleSearch =(e)=>{
    e.preventDefault();
    dispatch(AllWhite())
    if(searchRef.current.value == ''){
      navi('search/')
    }
    else{

      navi(`search/${searchRef.current.value}`)
    }
  }
  
  //meanu code section
  const meanuData = useSelector(state => state.meanuSlice)


  //change meanu text style
  const handleSelected = (e)=>{
    dispatch(NavClick(e.target.innerHTML))
    // setselected((prev) => ({...prev,[e.target.innerHTML]: true}))
  }

  //track if basket is open
  const basketRef = useRef(null)
  
  
  //control basket UI showing and hiding
  const [showingBasket,setShowingBasket] =useState(false)
  //when clicking outside the basket, close it
  useEffect (()=>{
    const handleOutsideClick = (e)=>{
      if(basketRef.current && !basketRef.current.contains(e.target) ){
        setShowingBasket(false)
      }
    }
    setShowingOption(false)
    document.addEventListener('mouseup',handleOutsideClick)
    return ()=>{
      document.removeEventListener('mouseup',handleOutsideClick)
    }
  },[])

  const handleFilter=()=>{
     dispatch(setFilter())
     console.log('filterclick')
  }
  

  const [isAnyItem,setIsAnyItem] = useState(false)
  const handleShowingBas = () =>{
    setShowingBasket(!showingBasket)
    //check if there is any item
    if(products.length > 0){
      setIsAnyItem(true)
      setTimeout(()=>{console.log('isAnyItem',isAnyItem)},1000)
    }
    if(products.length ==0){
      setIsAnyItem(false)
    }

  }
  //declare subtotal price
  let totalPrice=0

  //clear all products in cart
  const clearAll=()=>{
    dispatch(removeAll())
  }

  //declare showing option for signIned users
  const [showingOption,setShowingOption] = useState(false)
  //let users sign out
  const handleSignOut =()=>{
    dispatch(setSignInState())
    setShowingOption(false)
    navi('/')
  }

  //check out function
  const handleCheckOut =()=>{
    if(products.length == 0){
      setIsAnyItem(false)
      alert('You have to add at least one product to cart')
    }
    else if(!isSignIn){
      alert('You have to sign in first')
    }
    else{
      setShowingBasket(!showingBasket)

      navi('/step1')
    }
  }

  return (
    <div className='navBar'>

      <div className='leftNav'>
        <a href='/'className='mainLogoContainer'>
          <img className='mainLogo' src ={mainlogo}></img>
        </a>
        <ul className='navMeanu'>
          <li>
            <Link to='/' className={meanuData.Home ? 'selected':'.'} onClick={handleSelected}>Home</Link>
          </li>
          <li >
            <Link to='/shop' className={meanuData.Shop ? 'selected':'.'} onClick={handleSelected} >Shop</Link>
          </li>
          <li >
            <Link to='/featured' className={meanuData.Featured ? 'selected':'.'} onClick={handleSelected} >Featured</Link>
          </li>
          <li >
            <Link to='/recommended' className={meanuData.Recommended ? 'selected':''} onClick={handleSelected} >Recommended</Link>
          </li>
        </ul>
      </div>

      <div className='rightNav'>
        {meanuData.Shop && <div className="filter" onClick={handleFilter}>
              <div className="text">Filters</div>
              <FilterAltOutlinedIcon></FilterAltOutlinedIcon>
            </div>}
        <form action='' onSubmit={(e) =>{handleSearch(e)}} className="searchBar">

          <img className='searchIcon' src={searchIcon} alt="" />
          <input ref={searchRef} placeholder='Search product...'></input>
          
        </form>
        <div className="basket" onClick={handleShowingBas}>
          <ShoppingBasketOutlinedIcon></ShoppingBasketOutlinedIcon>
          {products.length >0 ? <span>{products.length}</span> :''}
        </div>
        {!isSignIn?<div className="signInUpGroup">
          <Link to='/signUp' className="signUp">Sign Up</Link>
          <Link className="signIn">Sign In</Link>
        </div> :
          <div className='user'>
            <div className="name">{user.username}</div>
            <div className="imgWrapper">
              <img src={userImg} alt="" />
            </div>
            <KeyboardArrowDownIcon onClick ={()=>setShowingOption(!showingOption)}/>
            
            <div className={showingOption?'dropOptions':'dis-none'}>
                <Link to='/account' className="viewAccout option">View Account <PersonOutlineIcon/></Link>
                <div className="signOut option" onClick={handleSignOut}>Sign Out<LogoutIcon/></div>
            </div>
          </div>} 
        </div>

      <div ref={basketRef} className={'basketSection' +' '+ `${!showingBasket? 'hideBasket': ''}`}>
        <div className="topSection">
          <div className="title">
            My Basket
            <div className="itemsCount">({products.length} items)</div>
          </div>
          <div className="buttonWrapper">
            <button className="close" onClick={handleShowingBas}>Close</button>
            <button className="clearBasket" onClick={clearAll}>Clear Basket</button>
          </div>
        </div>
        <div className="goodsSection">
          {!isAnyItem ? <h5>Your Basket is Empty</h5> : shopData.map((product)=>{
            if(product.added ==true){
              totalPrice = product.price * product.quantity + totalPrice
              return <ProductBar key={product.id} product={product}/>
            }
          })}
          
        </div>
        <div className="checkOutSection">
          <div className="totalCost">
            <div className='total'>Subtotal Amout:</div>
            <h3 className='cost'>${totalPrice}</h3>
          </div>
          <button className={isAnyItem&&isSignIn? 'checkOut' :'checkOutDisable'} onClick={handleCheckOut}>CHECK OUT</button>
        </div>
      </div>

    </div>
  )
}
