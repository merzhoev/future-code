import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $api } from 'services/api'

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (params) => {
    const response = await $api.getOrders(params)
    return response.data
  }
)

const initialState = {
  items: [],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
      })
  },
})

export const { reducer: ordersReducer, actions: ordersActions } = ordersSlice
