import React from 'react'
import mainlogo from "/Users/xiongfeng/reactProjectFolder/glass_shopping/src/images/navbarLogo.png"
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <div className="text">Developed by <span>FENG XIONG</span></div>
        <div className="centralLogo">
            <img src={mainlogo}></img>
            <div className="text">© 2024</div>
        </div>
        <div className="text">Fork this project <span>HERE</span></div>
    </div>
  )
}
