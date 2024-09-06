import React from 'react'
import{Link} from 'react-router-dom'
import './ProductBar.css'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch,useSelector } from 'react-redux'
import { addToBasket,removeFromBasket,decrement,increment } from '../../Redux/shoppingSlice'

export default function ProductBar({product}) {

  const shoppingList = useSelector(state => state.shoppingSlice.cart)
  const shopData = useSelector(state=>state.shoppingSlice.data)
  const dispatch = useDispatch();
 
  //remove product
  const handleRemove =(product)=>{

    let numberNeedtoRemover = 0;

    for(let index in shoppingList){
      if(shoppingList[index].id == product.id){
          numberNeedtoRemover =index
      }
    }
    dispatch(removeFromBasket(numberNeedtoRemover))
  }

  //Increase quantity of product
  const handleIncreaseQuan =(product)=>{
     dispatch(increment(product))
  }

  //Decrease quantity of product
  const handleDecreaseQuan =(product)=>{
    if(product.quantity ==1){
      
    }else{
      dispatch(decrement(product))
    }
  }
  console.log('pSz',product.selectSize)

  return (
    <div className='ProductBar'>
        <div className="leftButton">
            <div className="addButton button" onClick={()=>{return handleIncreaseQuan(product)}}><AddIcon/></div>
            <div className="minusButton button" onClick={()=>{return handleDecreaseQuan(product)}}><RemoveIcon/></div>
        </div>
        <div className="midProductInfo">
          <img src={product.img}></img>
          <div className="textWrapper">
            <Link to={`/product/${product.parameter}`} className="title">{product.name}</Link>
            <div className="bottomWrapper">
              <div className="quantityWrapper">
                <div className="quantityText text">Quantity</div>
                <div className="quantity Imptext">{product.quantity}</div>
              </div>
              <div className="sizeWrapper">
                <div className="sizeText text">Size</div>
                <div className="size Imptext">{product.selectSize? product.selectSize:product.size[0]}mm</div>
              </div>
              <div className="colorWrapper">
                <div className="colorText text">Color</div>
                <div className="color" style={product.selectColor?{background : product.selectColor}:{background : product.color[0]}}></div>
              </div>
            </div>
          </div>
          <div className="price">${product.price * product.quantity}</div>
        </div>
        <div className="deleteButton" onClick={()=>{return handleRemove(product)}}>
           <ClearIcon/>
        </div>
    </div>
  )
}
