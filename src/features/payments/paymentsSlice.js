import { createSlice } from "@reduxjs/toolkit";

const arrayEmptyInitialize = Array(25).fill({
    sender: " ",
    receiver: " ",
    amount: " ",
    currency: " ",
});
const initialState = {
    values: [...arrayEmptyInitialize],
    hightlight: false,
    filterCategories: [],
    filter: "",
    filterTerm: "",
};

export const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        addPayments: (state, action) => {
            state.values = [action.payload, ...state.values];
        },
        setFilterCategories: (state, action) => {
            state.filterCategories = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const {
    addPayments,
    highlightPayment,
    setFilter,
    filterCategories,
    setFilterCategories,
} = paymentsSlice.actions;
export default paymentsSlice.reducer;
