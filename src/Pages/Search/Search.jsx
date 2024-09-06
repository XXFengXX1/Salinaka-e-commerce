import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import './Search.css'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'
import { addToBasket,removeFromBasket } from '../../Redux/shoppingSlice'

export default function Search() {
  const {name} = useParams()
  const shopData = useSelector(state=>state.shoppingSlice.data)
  const shoppingList = useSelector(state => state.shoppingSlice.cart)
  const reg = new RegExp(`^${name}`)

  console.log('reg',reg) 
  const dispatch = useDispatch();
  
  const handleAdding = (product)=>{
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
    }else{
      let frontPart = shoppingList.slice(0,numberNeedtoRemover)
      let subNum = Number(numberNeedtoRemover) +1
    
      let lastPart = shoppingList.slice(subNum,shoppingList.length)
      let newCart = [...frontPart,...lastPart]
      newCart.push(shoppingList[numberNeedtoRemover])
      dispatch(removeFromBasket(numberNeedtoRemover))

    }
  }
  let productCount =0 
  let instantCount = 0

  useEffect(()=>{
     
    shopData.forEach((pro)=>{
        console.log(reg.test(pro.name))
        if(reg.test(pro.name)){
            productCount =productCount+1
        }
    })
    console.log('PC',productCount)
  },[instantCount])
    


  return (
    
    <div className='searchPage'>
       <div className={"Products"} >
        <div className='shopUI '>
        
          <div className="ShopContainer">
          {shopData.map((product)=>{
            // console.log(reg.test(product.name))
            console.log('pC',productCount)
            if(reg.test(product.name)){
                instantCount  =instantCount +1
                return (
                    <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'  } key={product.id}>
                    <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                        <div className="imgWrapper">
                        <img src={product.img}></img>
                        </div>
                        <div className="textWrapper">
                        <div className="title">{product.name}</div>
                        <div className="subTitle">{product.brand}</div>
                        <div className="price">${product.price}</div>
                        </div>
                    </Link>
                    <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
                    
                    </div>
                    )
            }
            else{
                if(instantCount  ==0 && product.id == 18){
                    return (
                        <h3>No products found.</h3>
                    )
                }
                return (<span className='dis-none'></span>)
                
            }
            
          })}
          </div>
          <div className="toptext">Found the {instantCount} products with the keyword {name}</div>
        </div>
        <Footer></Footer>


      </div>
    </div>
  )
}
