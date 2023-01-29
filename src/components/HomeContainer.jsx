import React from 'react'
import Herobg from '../img/heroBg.png';
import Delivery from '../img/bike1.png'
import I1 from '../img/i1.png'
import { allPics } from '../utils/data';
const HomeContainer = () => {
    return (
        // <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className='py-2 flex-1 flex flex-col items-start md:items-center justify-center'>
                <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
                    <p className='text-base text-orange-500 font-semibold'>
                        Bike Delivery </p>
                    <div className='w-12 h-12 rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={Delivery} className="bg-white w-full h-full object-contain"></img>
                    </div>

                </div>

                <p className='text-[2.0rem] py-3 text-center font-bold tracking-wide text-headingColor'>
                    Rocket Speed Delivery In
                    <p className='text-orange-600 text-[3rem] text-center'>your City</p>
                </p>

                <p className='text-base text-textColor text-left'>
                    Welcome to Rocket Speed Food Delivery app - designed by timespro employees,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </p>

                <button type="button"
                    className='bg-gradient-to-br from-orange-400 to-orange-500 
                    px-2 py-2
                   rounded-lg hover:shadow-lg
                   transition-all ease-in-out duration-100
                   w-auto
                   '>
                    Order Now
                </button>
            </div>



            <div className='py-2 flex-1 flex items-center relative'>
                <img src={Herobg} className='ml-auto h-600' alt="hero-bg" />
                <div className='gap-4 
                            flex-wrap 
                            w-full 
                            h-full 
                            top-0 
                            left-2 
                            absolute 
                            flex 
                            items-center 
                            justify-center 
                            px-10 
                            py-4
                            drop-shadow-lg
                            '>
                    {
                        allPics &&
                        allPics.map((n) => (
                            <div
                                key={n.id}
                                className='w-190 
                    min-w-[190px] 
                    p-4 
                    bg-cardOverlay 
                    backdrop-blur-md 
                    rounded-3xl 
                    flex 
                    flex-col 
                    items-center 
                    justify-center'>

                                <img src={n.imageSrc} className='w-40 -mt-20' alt="Ice Cream" />

                                <p className='text-xl font-semibold text-textColor mt-4'>{n.name}</p>

                                <p className='text-sm text-lighttextGray font-semibold my-3'>
                                    {n.description}
                                </p>

                                <p text-sm font-semibold text-headingColor>
                                    <span className='text-sm text-red-600'>₹</span>{n.price}
                                </p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default HomeContainer