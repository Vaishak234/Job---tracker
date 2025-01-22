import { configureStore } from "@reduxjs/toolkit"
import userReducer from './User/UserSlice'
import applicationReducer from './application/applicationSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        applications:applicationReducer
    }
});


export default store;


