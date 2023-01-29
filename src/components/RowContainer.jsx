import React, { useEffect } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRef } from 'react'
const RowContainer = ({ flag, data, scrollValue }) => {
    console.log("Row Container",data)
    const rowContainer=useRef()
    useEffect(()=> {
        rowContainer.current.scrollLeft+=scrollValue
    },[scrollValue])
    return (
        // className={`w-[10%] my-12 flex items-center gap-2  
        <center>
        <div 
        ref={rowContainer}
        className={`w-full my-12 flex items-center gap-2 scroll-smooth  
        
        ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap'} bg-bgColor `}>

        {
            data && 
            data.map(item=>(
                <div 
                key={item?.id}
                className='w-300 md:w-340 h-auto my-12 shadow-md backdrop-blur-lg bg-cardOverlay rounded-2xl p-2 hover:drop-shadow-lg '>
                <div className='w-full flex items-center justify-between'>
                    <motion.img
                        whileHover={{ scale: 1.2 }}
                        src={item?.imageURL}
                        alt=''
                        className='w-40'
                    />
                </div>

                <motion.div
                    whileTap={{ scale: 0.7 }}
                    className='w-8 h-8 rounded-full bg-red-600 ml-auto -mt-4 flex items-center justify-center cursor-pointer'>
                    <MdShoppingBasket
                        className='text-white '
                    />

                </motion.div>
                
                <div className='w-full flex flex-col items-end justify-end'>

                    <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
                    <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
                    <p className='text-lg text-headingColor font-semibold'>
                        <span className='text-sm text-red-500'>$ </span>
                         {item?.price}</p>
                </div>

            </div>
            ))
        }



        </div>
        </center>
    )
}

export default RowContainer