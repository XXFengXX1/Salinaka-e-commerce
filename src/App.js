
import './App.css';

import NotExists from './Pages/NotExists/NotExists';
import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home';
import Shop from "./Pages/Shop/Shop";
import Recommended from "./Pages/Recommended/Recommended";
import Featured from "./Pages/Featured/Featured";
import { Children } from 'react';
import { Form } from 'react-router-dom';
import Product from './Pages/Product/Product';
import Search from './Pages/Search/Search';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import Account from './Pages/Account/Edit/Account';
import Step1 from './Pages/CheckOut/Step1/Step1';

const Layout = () =>{
  return(
    <div className='app'>
      <Navbar></Navbar>

      <Outlet></Outlet>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[{
        path:"/",
        element:<Home/>
      },
      {
        path:"/shop",
        element:<Shop/>
      },
      {
        path:"/featured",
        element:<Featured/>
      },
      {
        path:"/recommended",
        element:<Recommended/>
      },{
        path:'product/:pa',
        element:<Product />
      },{
        path:'search/:name',
        element:<Search/>
      },{
        path:'search/',
        element:<NotExists/>
      }
      ,{
        path:'/signUp',
        element:<SignUp/>
      }
      ,{
        path:'/signIn',
        element:<SignIn/>
      },{
        path:'/account',
        element:<Account/>
      },{
        path:'/step1',
        element:<Step1/>
      }
    ]

  }])
function App() {
  return (
    <div className="app">
      <RouterProvider router ={router}/>
    </div>
  );
}

export default App;
