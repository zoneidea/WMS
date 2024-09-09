import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constants } from "../../constants/constants";
import axios from "axios";

export const getUser = createAsyncThunk('getUser', async () => {
    const response = await axios.get(constants.GET_USER_API)
    console.log(`response`, response.data);
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user.push(action.payload)
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer