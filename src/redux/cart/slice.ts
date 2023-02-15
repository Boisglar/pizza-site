import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCardFromLS } from '../../utils/getCardFS';
import { CardItem, CardSliceState } from './types';

const { items, totalPrice } = getCardFromLS()

const initialState: CardSliceState = {
    totalPrice: totalPrice,
    items: items,
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CardItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<CardItem>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            state.totalPrice = state.totalPrice - action.payload.price * action.payload.count;
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice = state.totalPrice - findItem.price;
            }
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, minusItem, clearItem } = cardSlice.actions;

export default cardSlice.reducer;
