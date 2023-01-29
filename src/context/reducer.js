// update the state / value by this action type
// if I want to update the user information, I will call this action type and 
// dispatch the updated value to that action type
// We are creating a data layer, which will sit on top of our entire component
// This layer will be accessible by all our child components
// If there is any change, we will push the data to that data layer
// so that all components will receive updated information / state/ value globally
// This way you don't need to pass the state from one component to another in case you 
// have multiple child components
export const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
}

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case actionType.SET_USER:
            console.log("reducer is working....." + action.type)
            console.log("action.user is " + action.user)
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_FOOD_ITEMS:
            console.log("reducer is working....." + action.type)
            console.log("action.foodItems is " + action.foodItems)
            return {
                ...state,
                foodItems: action.foodItems,
            };

        default:
            return state;
    }
}

export default reducer;