import React, { useState } from 'react'
import './SignUp.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setSignInState } from '../../Redux/userSlice';

export default function SignUp() {
    const [name,setName] =useState(null)
    const [email,setEmail] =useState(null)
    const [password,setPassword] =useState(null)
    const navi = useNavigate()
    const [isFullfilled,setIsFullfilled] = useState(true)
    const [isvalidEmail,setIsvalidEmail] = useState(true)
    const [isvalidPassword,setIsvalidPassword] = useState(true)

    const dispatch = useDispatch()

    
    let emailReg = new RegExp()
    emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    let passWReg = new RegExp()
    passWReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const signUp =()=>{
     if(emailReg.test(email)&&passWReg.test(password)){
         setIsFullfilled(true)
         localStorage.setItem('username',name)
         localStorage.setItem('email',email)
         localStorage.setItem('password',password)
         dispatch(setSignInState({name,email}))
        navi('/')

     }
     else{
        setIsFullfilled(false)
     }
    }

    const emailChange =(e)=>{
        setEmail(e.target.value)
        if(emailReg.test(e.target.value)){
            setIsvalidEmail(true)
        }
        else{
            setIsvalidEmail(false)
        }
    }
    const passChange =(e)=>{
        setPassword(e.target.value)
        if(passWReg.test(e.target.value)){
            setIsvalidPassword(true)
        }
        else{
            setIsvalidPassword(false)
        }
    }

    return (
    <div className='SignUpPage'>
        <div className="mainWrapper">
            <div className="leftPart">
                <h3 className="toptext">Sign Up to Salinaka</h3>
                <div className="inputGroup">
                    <div className="text">*Full Name</div>
                    <input type='text' placeholder='John Doe' onChange={(e)=>(setName(e.target.value))}/>
                </div>
                <div className="inputGroup">
                    {isvalidEmail?<div className="text">*Email</div> :<div className='inValidText'>Email is not valid.</div>}
                    <input className={isvalidEmail? '':'invaildInput'} type='text' placeholder='test@example.com' onChange={(e)=> emailChange(e)}/>
                </div>
                <div className="inputGroup">
                    {isvalidPassword?<div className="text">*Password</div>:<div className='inValidText'>Invalid Password,Minimum eight characters, at least one letter and one number:</div>}
                    <input className={isvalidPassword? '':'invaildInput'} type='text' placeholder='Your Password' onChange={(e)=> passChange(e)}/>
                </div>
                <button className='SignUp' onClick={signUp}>Sign Up</button>
                {!isFullfilled && <span>Please Enter valid Info</span>}
            </div>
            <div className="middPart">
                <div className="line"></div>
                <div className="text">or</div>
            </div>
            <div className="rightPart">
                <div className="btnWrapper fac">
                    <FacebookIcon/>
                    Continue with Facebook
                </div>
                <div className="btnWrapper goo">
                    <GoogleIcon/>
                    Continue with Google
                </div>
                <div className="btnWrapper git">
                    <GitHubIcon/>
                    Continue with GitHub
                </div>
            </div>
        </div>
        <div className="bottomWrapper">
            <div className="text">Already have a account?</div>
            <Link to='/signIn' className="signInButton">Sign IN</Link>
        </div>
    </div>
  )
}
