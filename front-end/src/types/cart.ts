export type Product = {
    _id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    type: 'book' | string;
    author?: string;
    genres?: { _id: string; title: string }[];
}