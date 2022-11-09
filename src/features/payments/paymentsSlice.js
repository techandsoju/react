import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const arrayEmptyInitialize = Array(25).fill({ sender: " ", receiver: " ", amount: " ", currency: " " });
const initialState = {
    values: [...arrayEmptyInitialize],
    hightlight: false,
    filterValues: [...arrayEmptyInitialize],
    filter: "",
    filterTerm: ""
};

export const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        addPayments: (state, action) => {
            state.values = [action.payload, ...state.values]
        },
        setFilterPayments: (state, action) => {
            state.filterValues = [...action.payload, ...arrayEmptyInitialize]
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const { addPayments, highlightPayment, setFilter, filterPayments, setFilterPayments } = paymentsSlice.actions
export default paymentsSlice.reducer