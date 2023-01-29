import React, { useState } from 'react'
import Logo from '../img/logo.png'
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md'
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { useStateValue } from '../context/stateProvider'
import { actionType } from '../context/reducer'


const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue()
    // isMenu is boolean initialized to false
    // setIsMenu is a function to set its value
    // setState() is a hook

    const [isMenu, setIsMenu] = useState(false)

    const logout = () => {
        setIsMenu(false)
        localStorage.clear()
        dispatch(
            {
                type: actionType.SET_USER,
                user: null,
            }
        )
        alert("Successfully logged out!!!")
    }

    const login = async () => {

        if (user == null) {

            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch(
                {
                    type: actionType.SET_USER,
                    user: providerData[0],
                }
            )

            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }
        else {
            // alert("Already logged in")
            setIsMenu(!isMenu) // like a toggle
            // setIsMenu(true) //guru
        }
    };


    return (


        <header className='fixed z-50 w-screen p-6 px-16'>
            {/* desktop and tablet */}
            <div className='hidden md:flex w-full h-full'>
                <Link to={'/'} className='flex item-center gap-2'>
                    <img src={Logo} className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold">
                        Home
                    </p>
                </Link>

                <motion.ul
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className='flex items-center gap-8 ml-auto'>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About us</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
                </motion.ul>

                <div className='relative flex items-center justify-center'>
                    <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer' />
                    <div className='relative -top-4 -left-3 w-4 h-4 rounded-full bg-red-600 flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold' >5</p>

                    </div>

                    <div className='relative'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                            src={user ? user.photoURL : Avatar}
                            alt="user profile"
                            referrerPolicy="no-referrer"
                            onClick={login}
                        />
                    </div>

                    {

                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 flex flex-col absolute top-12 right-0 bg-gray-50'>
                                {
                                    user && user.email == "gurumurthy.ramamurthy@gmail.com" && (
                                        <div>
                                            <Link to={'/createItem'}>
                                                <p className='px-4 py-1 hover:bg-slate-200 cursor-pointer flex items-center gap-2' onClick={()=>{setIsMenu(false)}}>New Item <MdAdd /></p>
                                            </Link>
                                            {/* this is only to show Logout at bottom */}
                                            <Link to={'/Logout'}>
                                                <p className='px-4 py-0 hover:bg-slate-200 cursor-pointer flex items-center gap-7' onClick={logout}>Logout <MdLogout /></p>
                                            </Link>
                                        </div>
                                    )
                                }
                            </motion.div>

                        )
                    }
                </div>


            </div>

            {/* mobile */}
            <div className='flex md:hidden w-full h-full' ></div>
        </header>
    )
}

export default Header