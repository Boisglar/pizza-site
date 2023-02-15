import { CardItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCardFromLS = () => {
    const data = localStorage.getItem('card')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items: items as CardItem[],
        totalPrice
    }
};