import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Message {
    content: string,
    created_at: string,
    id: number,
    reply_to?: number,
    score: number,
    user_id: number
}

interface MessageState {
    messages: Message[];
}

const initialState: MessageState = {
    messages: []
}

export const messageSlice = createSlice({
    name: 'all_messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = [...action.payload];
        }
    }
})

export const { setMessages } = messageSlice.actions

export default messageSlice.reducer;