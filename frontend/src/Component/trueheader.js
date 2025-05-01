import React, { useState } from 'react'
 import logo from '../image/logo (1).jpeg'
import { Link } from 'react-router-dom'
import {FaUserCheck} from 'react-icons/fa'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {useSelector } from "react-redux";
// import { ToastContainer } from 'react-hot-toast';



const Header = () => {
     const[showMenu,setShowMenu]=useState(false);
     const userData = useSelector((state) => state.user);
     console.log(userData.email)
     const handleShowMenu =()=>{
        setShowMenu(preve => !preve)
     }

     console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
        <div className='fixed shadow-md w-full  pt-2 ps-2 pb-2 z-50  '>
             <div className='flex items-center justify-between'>
           <Link to={""}>
           <div className=''>
             <img src={logo} className='rounded-full h-10 ' alt=''/>
           </div>
           </Link>
           <div className='flex items-center gap-4 md:gap-7 cursor-pointer'>
                <nav className='flex items-center gap-4 md:gap-6 text-base md:text-lg'>
                    <Link to={""}>Home</Link>    
                    <Link to={"Menu"}>Menu</Link> 
                    <Link to={"About"}>About</Link> 
                    <Link to={"Contact"}>Contact</Link>       
                     </nav>
                <div className='text-2xl text-blue-950 relative'>
               < AiOutlineShoppingCart/>
                  <div className='absolute -top-2 -right-1  text-white bg-red-400 h-4 w-4 p-0 m-0 rounded-full text-sm text-center '>0</div>
               </div>
               <div className='text-xl text-blue-950 pe-2' onClick={handleShowMenu}>
                <div className='border-2 border-solid border-slate-600 p-1 rounded-full'>
                    <FaUserCheck/> 
                </div>
                {
                    showMenu && (<div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col'>
                      {
                        userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>

                      }
                    <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                  </div>)
                }
               
               </div>
           </div>
         </div>
        </div>
       

     


  )
}
export default Header