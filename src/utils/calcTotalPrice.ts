import { CardItem } from "../redux/cart/types"

export const calcTotalPrice = (items: CardItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
}