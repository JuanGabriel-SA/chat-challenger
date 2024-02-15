import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export const deletingMessageSlice = createSlice({
    name: 'deleting_message',
    initialState: {
        id: 0
    },
    reducers: {
        setDeletingMessage: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        }
    }
})

export const { setDeletingMessage } = deletingMessageSlice.actions

export default deletingMessageSlice.reducer;