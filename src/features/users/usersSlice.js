import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    values: {},
  };

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
       setUsers: (state, action) => {
            state.values = action.payload
       }
    }
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer