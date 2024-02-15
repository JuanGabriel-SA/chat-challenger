import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './reducers/currentUserSlice'
import messageReducer from './reducers/messageSlice'
import deletingMessageReducer from './reducers/deletingMessage'
import modalReducer from './reducers/modalSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
    reducer: {
        userState: userReducer,
        currentUserState: currentUserReducer,
        messageState: messageReducer,
        deletingMessage: deletingMessageReducer,
        modal: modalReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;