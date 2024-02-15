import { createSlice } from '@reduxjs/toolkit'

interface User {
    id: number,
    user_name: string,
    user_image: string
}

const initialState: User = {
    id: 1,
    user_name: 'juliusomo',
    user_image: 'images/avatars/image-juliusomo.webp'
}

export const userSlice = createSlice({
    name: 'current_user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer;