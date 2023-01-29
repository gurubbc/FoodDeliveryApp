// Define all initialState of user and food items here

import { fetchUserInfo } from "../utils/fetchUser";

const userInfo=fetchUserInfo();

export const initialState = {
    user: userInfo,
    foodItems:null,
};