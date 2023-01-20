import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
    user: {
        email: "",
        role: "",
    },
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })
export const loginUser = createAsyncThunk("auth/loginUser",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })


export const googleLogin = createAsyncThunk("auth/googleLogin",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        return data.user.email;
    })

export const authSlice = createSlice({
    name: "auth",
    reducers: {
        logout: (state) => {
            state.user.email = ''
        },
        setUser: (state, { payload }) => {
            state.user.email = payload;
            state.isLoading = false;

        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })


            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })



            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { logout, setUser, toggleLoading } = authSlice.actions
export default authSlice.reducer