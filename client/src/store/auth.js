import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    id: null,
    token: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin(state, action) {
            state.user = action.payload.username
            state.token = action.payload.token
            state.id = action.payload.id
        },

        setLogout(state) {
            console.log('Logging out')
            state.user = null
            state.token = null
            state.id = null

        }
    }

})


export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer