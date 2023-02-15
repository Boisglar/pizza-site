export type CardItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

export interface CardSliceState {
    totalPrice: number;
    items: CardItem[];
}