import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'inr',
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        updateCurrency: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateCurrency } = currencySlice.actions
export default currencySlice.reducer