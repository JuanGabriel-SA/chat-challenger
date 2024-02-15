import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Modal {
    visible: boolean
}

const initialState: Modal = {
    visible: false
}

export const modalSlice = createSlice({
    name: 'modal_trigger',
    initialState,
    reducers: {
        setModalVisible: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        }
    }
})

export const { setModalVisible } = modalSlice.actions

export default modalSlice.reducer;