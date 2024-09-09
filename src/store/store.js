import { configureStore } from '@reduxjs/toolkit'
import permissionReducer from '../features/permission/permissionSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        permission: permissionReducer,
        user: userReducer
    }
})

export default store