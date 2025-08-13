import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home";
import Product from './components/product/Product';
import Contact from './components/contact/Contact';
import Material from './components/material/Material';
import SignUp from './components/signUP/SignUp';
import SignIn from './components/signIn/SignIn';


import UserProfile from './components/userProfile/UserProfile';
// import UserProfile from './components/userProfile/UserProfile';
import DiyTutorials from './components/diyTutorial/DiyTutorials';
import DefaultView from './components/defaultView/DefaultView';
import Product1 from './components/product/Product1';
import TutorialForm from './components/createTutorial/TutorialForm';
import Auth from "./components/auth/Auth";
import UserProfileDashBoard from './components/userProfile/UserProfileDashBoard';
import BuyNow from './components/buyNow/BuyNow';
import { Logout } from '@mui/icons-material';

function App() {
  return <>
    <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<DefaultView />} />
        {/* <Route path="/home" element={<Auth><Home /></Auth>} /> */}
                <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/material" element={<Material/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        {/* <Route path='/diyTutorials' element={<Auth><DiyTutorials/></Auth>}/> */}
                <Route path='/diyTutorials' element={<DiyTutorials/>}/>
        {/* <Route path='/product1' element={<Auth><Product1/></Auth>}/> */}
                <Route path='/product1' element={<Product1/>}/>
        {/* <Route path="/tutorial" element={<Auth><TutorialForm/></Auth>}/> */}
                <Route path="/tutorial" element={<TutorialForm/>}/>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="/profile" element={<UserProfileDashBoard/>}/> */}
        <Route path='/buy-now' element={<BuyNow/>}/>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path='/logout' element={<Logout/>}></Route>

        {/* <Route path="/user" element={<UserProfile />} /> */}
{/* <Route path="/userdashboard" element={<UserProfileDashBoard />} /> */}

        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
    </BrowserRouter>

  </>

}

export default App;
