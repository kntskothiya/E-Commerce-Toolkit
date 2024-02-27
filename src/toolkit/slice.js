import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { cartURL } from '../config/url';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchClothData = createAsyncThunk('data/fetchClothData', async () => {
    return (await axios.get(cartURL).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
    })
    )
});


export const addToCart = createAsyncThunk('data/addToCart', async (clothInfo) => {
    try {
        const response = await axios.post(cartURL, clothInfo);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const updateQuantity = createAsyncThunk('data/updateQuantity', async ({ itemId, quantity }) => {
    try {
        const response = await axios.patch(`${cartURL}/${itemId}`, { quantity });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const removeFromCart = createAsyncThunk('data/removeFromCart', async (itemId) => {
    try {
        await axios.delete(`${cartURL}/${itemId}`);
        return itemId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const Slicereducer = createSlice({
    name: 'cloth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClothData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClothData.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(fetchClothData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                const updatedProductIndex = state.product.findIndex(product => product.id === action.payload.id);
                if (updatedProductIndex !== -1) {
                    state.product[updatedProductIndex].quantity = action.payload.quantity;
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.product = state.product.filter(item => item.id !== action.payload);
            });
    },
});

export default Slicereducer.reducer;
