import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home";
// import Product from './components/product/Product';
import Contact from './components/contact/Contact';
import Material from './components/material/Material';
import SignUp from './components/signUP/SignUp';
import SignIn from './components/signIn/SignIn';
import GalleryUpload from './components/Gallery/GalleryUpload';

// import UserProfile from './components/userProfile/UserProfile';
// import UserProfile from './components/userProfile/UserProfile';
import DiyTutorials from './components/diyTutorial/DiyTutorials';
// import DefaultView from './components/defaultView/DefaultView';
// import Product1 from './components/product/Product1';
// import ProductCard from '.'

import ProductPage from './components/product/ProductPage';
// import ProductList from './components/product/ProductList';
import TutorialPage from './components/createTutorial/TutorialPage';
// import ProductCard from './components/product/ProductCard';
// import ProductCard from './components/product/ProductCard';

import Auth from "./components/auth/Auth";
import { Logout } from '@mui/icons-material';


import ProductDetail from './components/product/ProductDetail';
import UserProfile from './components/User/UserProfile';


import BuyerMaterialPage from './components/material/BuyerMaterialPage';
import CrafterMaterialPage from './components/material/CrafterMaterialPage';

import CrafterProfile from './components/User/CrafterProfile';
// import BuyerProfile from './components/User/BuyerProfile';


// import { Avatar } from "@mui/material";
function App() {
  return <>
    <BrowserRouter>
 
      <Routes>
        {/* <Route path="/" element={<DefaultView />} /> */}
        <Route path="/home" element={<Home />} />
         <Route path="/" element={<Home />} />
         {/* <Route path="/home" element={<Auth><Home /></Auth>} />  */}
                {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/contact" element={<Contact/>}/>
        {/* <Route path="/material" element={<Material/>}/> */}
        <Route path='/material-buyer' element={<BuyerMaterialPage/>}/>
        <Route path='/material-crafter' element={<CrafterMaterialPage/>}/>
<Route path='/crafter-profile' element={<CrafterProfile/>}/>
{/* <Route path="/buyer-profile" element={<BuyerProfile/>}/> */}
        {/* <Route path='/user' element={<UserProfile/>}/> */}

                <Route path='/diyTutorials' element={<DiyTutorials/>}/>
                <Route path="/tutorial" element={<TutorialPage/>}/>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
         {/* <Route path='/userdashboard' element={<Auth><UserProfile /></Auth>} /> */}
        <Route path='/logout' element={<Logout/>}></Route>
           <Route path="/product" element={<ProductPage />} />
        {/* <Route path='/login' element={<Login/>}/> */}
         <Route path="/gallery" element={<GalleryUpload />} />
         <Route path='/product/:id' element={<ProductDetail/>}/>

         {/* <Route path='/user' element={<UserProfile />}/> */}
           <Route path="/user-profile"element={ <Auth><UserProfile /></Auth>} />
 {/* <Route path="/user-profile"element={<UserProfile />} /> */}
          <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>

  </>

}

export default App;
