import React from 'react'
import accountBac from'../../../images/accountBac.jpg'
import userImg from '../../../images/userImg.jpg'
import { useDispatch,useSelector } from 'react-redux'
import './Account.css'

export default function Account() {
    const user = useSelector(state => state.userSlice)


  return (
    <div className='accountPage'>
        <div className="topWrapper">
            <div className="text">Accout</div>
        </div>
        <div className="contentWrapper">
            <img src={accountBac} alt="" className='bac' />
            <div className="content">
                <div className="imgWrapper">
                    <img src={userImg} alt="" />
                </div>
                <h3>{user.username}</h3>
                <div className="email header">Email:</div>
                <div className="userEmail">{user.email}</div>
                <div className="header">Address:</div>
                <div className="Address">Address not set</div>
            </div>
        </div>
    </div>
  )
}
