import React from 'react'
import './SixProductList.css'
import {Link} from 'react-router-dom'

export default function SixProductList({data}) {
  return (
    <div className='container'>

        {data.map((product)=>{
            return (
            <Link to ={`/product/${product.parameter}`}  className='productWrapper' key={product.id}>
             <div className="imgWrapper">
                <img src={product.img}></img>
             </div>
             <div to ={`/product/${product.parameter}`}  className="textWrapper">
                <div className="title">{product.name}</div>
                <div className="subTitle">{product.brand}</div>
             </div>
            </Link>)
        })}
    </div>
  )
}
