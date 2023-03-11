import { configureStore } from '@reduxjs/toolkit';
import paymentsReducer from '../features/payments/paymentsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    payments: paymentsReducer,
    users: usersReducer
  },
});
