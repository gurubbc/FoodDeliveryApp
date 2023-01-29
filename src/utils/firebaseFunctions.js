import { setDoc, doc, getDocs, query, collection, orderBy } from "firebase/firestore"
import { firestore } from "../firebase.config"

// Saving the new Items
// foodItems is the collection name
// merge if you have one more field, that will be merged properly
export const saveItem = async (data) => {
    await setDoc(doc(firestore,'foodItems',`${Date.now()}`),data,{merge:true});
};

// getall food items
export const getAllFoodItems = async() => {
    const items=await getDocs(
        query(collection(firestore,"foodItems"), orderBy("id","desc"))
    );

    return items.docs.map((doc)=>doc.data());
};