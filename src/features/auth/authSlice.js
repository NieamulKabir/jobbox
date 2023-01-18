import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
    email: "",
    role: "",
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
            state.email = ''
        },
        setUser: (state, { payload }) => {
            state.email = payload;
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
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
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
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
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
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer