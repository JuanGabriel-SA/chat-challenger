import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
    id: number,
    image: string,
    username: string,
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
}

export const userSlice = createSlice({
    name: 'all_users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [...action.payload];
        }
    }
})

export const { setUsers } = userSlice.actions

export default userSlice.reducer;