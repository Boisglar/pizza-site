import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams } from "./slice";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizzas/fetchPizzasStatus',
    async ({ order, sortBy, category, search, currentPage }) => {
        const { data } = await axios.get(
            `https://63b708764f17e3a931c8adda.mockapi.io/item?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
        );
        return data;
    },
);