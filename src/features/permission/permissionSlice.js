import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constants } from '../../constants/constants'
import axios from "axios";

export const getMenu = createAsyncThunk('getMenu', async () => {
    const response = await axios.get(constants.GET_MENU_API)
    return response.data
})

export const getRole = createAsyncThunk('getRole', async () => {
    const response = await axios.get(constants.GET_ROLE_API)
    return response.data
})

export const addPermission = createAsyncThunk(
    'createPermission',
    async ({ roleName, menus }, { rejectWithValue }) => {
        try {
            const response = await axios.post(constants.POST_ROLE_API, { roleName: roleName, menus: menus, orgId: 1 });
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const editRoleStatus = createAsyncThunk(
    'editRoleStatus',
    async ({ roleId, roleActive }, { rejectWithValue }) => {
        try {
            const response = await axios.post(constants.PUT_ROLE_API, { roleId: roleId, roleActive: roleActive });
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        orgId: 1,
        menus: [],
        roleName: [],
        roleId: [],
        roleActive: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        //GetAllMenu
        builder.addCase(getMenu.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.menus = action.payload
        })
        //AddRolename
        builder.addCase(addPermission.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(addPermission.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.roleName.push(action.payload)
            state.menus.push(action.payload)
        })
        builder.addCase(addPermission.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        //GetAllRole
        builder.addCase(getRole.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getRole.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.role = action.payload
        })
        builder.addCase(getRole.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        //EditRoleStatus
        builder.addCase(editRoleStatus.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(editRoleStatus.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.roleId.push(action.payload)
            state.roleActive.push(action.payload)
        })
        builder.addCase(editRoleStatus.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export const { } = permissionSlice.actions

export default permissionSlice.reducer