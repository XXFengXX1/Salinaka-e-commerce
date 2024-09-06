import React from 'react'
import{Link} from 'react-router-dom'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import './HomeTop.css'

export default function HomeTop(props) {
  return (
    <div className='Wrapper'>  
       <div className="leftGroup">
            <div className="textWrapper">

                <h1>{props.text}</h1>
                {props.p && <p>{props.ptext}</p>}
                {props.button && 
                <Link to = '/shop' className='button'>
                    <div className="text">Shop Now</div>
                    <ArrowForwardOutlinedIcon/>
                </Link>}
            </div>
       </div>
       <div className="rightGroup" >
         <img src={props.img} alt="" />
       </div>
    </div>
  )
}
