import React, { useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/stateProvider'
import { useEffect } from 'react'

const MainContainer = () => {

    const [{foodItems}, dispatch] = useStateValue()
    const [scrollValue, setScrollValue]=useState(0)
    useEffect(()=> {}, [scrollValue])
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
        <HomeContainer/>

        <section className='w-[50%]'>
            <div className='w-full flex items-center justify-between'>
                <p className='text-2xl font-semibold capitalize  text-headingColor relative'>
                    Our Fresh & Healthy Fruits <div className='w-full h-1 bg-orange-500'></div>
                </p>
                <div className='md:flex items-center gap-3'>
                    <motion.div whileTap={{scale:0.75}}className='w-8 h-8 rounded-lg bg-orange-300 flex items-center hover:bg-orange-500 cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg justify-center'>
                        <MdChevronLeft className='text-white'
                        onClick={()=> setScrollValue(-200)}
                        />

                    </motion.div>
                    <motion.div whileTap={{scale:0.75}}className='w-8 h-8 rounded-lg bg-orange-300 flex items-center hover:bg-orange-500 cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg justify-center'>

                        <MdChevronRight className='text-white'
                        onClick={()=> setScrollValue(200)}
                        />
                    </motion.div>
                </div>
            </div>
           {/* <RowContainer flag={true} data={foodItems?.filter((n)=>n.category==="fruits")}/> */}
           <RowContainer flag={true} data={foodItems} scrollValue={scrollValue}/>
        </section>
        </div>

    )
}

export default MainContainer