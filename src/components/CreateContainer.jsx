import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/stateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCaolries] = useState("");
  const [price, setPrice] = useState("");;
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset]= useState(null); // image download url
  const [fields, setFields]= useState(false); // to monitor is there any error or not
  // if there is any error, we need to display that particular field
  const [msg, setMsg]= useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [isLoading, setIsLoading]= useState(false); // Loading status

  const [{foodItems}, dispatch] = useStateValue()
  

  const fetchData = async () => {
    await getAllFoodItems().then(
      data => {
        dispatch({

          type: actionType.SET_FOOD_ITEMS,
          foodItems: data
        }
        )
      }
    )
  }

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile=e.target.files[0]; // we are uploading just single image
    console.log(imageFile)
    const storageRef=ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask=uploadBytesResumable(storageRef,imageFile);
    // The last function will return download url
    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    }, (err)=>{
      console.log(err);
      setFields(true)
      setMsg('Error while uploading image: Tray again ')
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)  
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
        console.log("downloadurl is ",downloadURL)
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image uploaded successfully")
        setAlertStatus("success") // we are not verifying
        setTimeout(() => {
          setFields(false)
        }, 4000);
      })
    })    
    
  }
  
  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg("Image Deleted successfully")
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 4000);

    })

  }
  
  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setCaolries('');
    setPrice('');
    setCategory('Select Category')
  }
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !calories || !imageAsset || !price) {
        setFields(true)
        setMsg('Mandatory fields must be filled ')
        setAlertStatus('danger')
        setTimeout(()=>{
          setFields(false)
          setIsLoading(false)
          
        },4000) 
      }
      else {
        const data = {
          id:`${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          price: price,
          qty: 1
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg("Data uploaded successfully")
        clearData()
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000);
      }
    }
    catch(error){
      console.log(error);
      setFields(true)
      setMsg('Error while uploading : Tray again ')
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000) 
    }

    fetchData()
  }
  

  return (

    
    <div className='w-full min-h-screen items-center justify-center flex'>
      <div className='gap-4 w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center'>
      {
        fields && (
          <motion.p  
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold  ${
            alertStatus==='danger'
            ? "bg-red-400 text-red-800"
            : "bg-emerald-400 text-emerald-800"
          }`}> {msg}
          </motion.p>
        )
      }
 
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
        <MdFastfood className='text-xl text-gray-700'/>
        <input 
          type="text"
          required
          value={title}
          placeholder='Enter a title...'
          className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
          onChange={e=>setTitle(e.target.value)}
          
        />
      </div>
      <div className='w-full'>
        <select onChange={(e)=> setCategory(e.target.value)} 
        className='w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
          <option value="other" className='bg-white'>Select Category</option>
          {
            categories && categories.map(item=>(
             <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor'
              value={item.urlParamName}
             >
              {item.name}
             </option> 

            ))
          }
        </select>
      </div>

      <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
      {
       isLoading ? 
        (<Loader/>) : <>
        {
          !imageAsset? <>
            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
              <div className='gap-2 w-full h-full flex flex-col items-center justify-center'>
              <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>

              <p className='text-gray-500 hover:text-gray-700'>
                Click here to upload
              </p>
              </div>

              <input 
                type="file" 
                name="uploadImage" 
                accept='image/*' 
                onChange={uploadImage}
                className="w-0 h-0"
                />
          </label>
          </>: 
          <>
          <div className='relative h-full'>
            <img src={imageAsset} alt="uploaded image"
            className='w-full h-full object-cover'
            />
            <button type="button" className='absolute bottom-3 right-3 p-3
            rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
            onClick={deleteImage}
            >
              <MdDelete className='text-white'/>


            </button>
          </div>
          </>
        }
        </>
      }
      </div>
      <div className='w-full flex flex-col md:flex-col items-center gap-3'>
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
        <MdFoodBank className='text-gray-700 text-2xl'/>
        <input 
        type='text' 
        value={calories}
        onChange={(e)=>setCaolries(e.target.value)}
        required 
        placeholder='Calories' 
        className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'/>

      </div>

      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
        <MdAttachMoney className='text-gray-700 text-2xl'/>
        <input 
        type='text' 
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        required 
        placeholder='Price' 
        className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'/>

      </div>
      </div>
      
      <div className='flex items-center w-full'>
      <button type="button" className='w-screen border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
              onClick={saveDetails}
      >Save</button>
      </div>
      </div>
    </div>
    
  )
}

export default CreateContainer