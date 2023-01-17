import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const authSlice = createSlice({
    name: '',
    initialState,
    reducers: {

    },
})

// Action creators are generated for each case reducer function
export const { } = authSlice.actions

export default authSlice.reducer