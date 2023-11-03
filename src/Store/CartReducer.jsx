import { createSlice } from "@reduxjs/toolkit";
import { addCartItems, fetchCartItems } from "./Api";


const initialState = {
isCartOpen: false,
items: [],
requestStatus: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        cartOpenHandler(state) {
            state.isCartOpen = !state.isCartOpen;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.items = action.payload ? action.payload : [];
        });
        builder.addCase(addCartItems.pending, (state, action) => {
            state.requestStatus = {
                status: 'pending',
                action: 'Wait!',
                message: 'Sending items!'
            }
        });
        builder.addCase(addCartItems.fulfilled, (state, action) => {
            state.requestStatus = {
                status: 'success',
                action: 'Successfull!',
                message: 'Items sent!'
            }
        });
        builder.addCase(addCartItems.rejected, (state, action) => {
            state.requestStatus = {
                status: 'error',
                action: 'Failed!',
                message: 'Sending Failed!'
            }
        });
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;