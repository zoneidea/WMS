import { configureStore } from '@reduxjs/toolkit'
import permissionReducer from '../features/permission/permissionSlice'

const store = configureStore({
    reducer: {
        permission: permissionReducer,
    }
})

export default store