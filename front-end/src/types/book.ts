export interface Book {
    _id: string,
    author: string
    cover: string
    description: string
    title: string
    genres: Genre[]
    price: number
}
export interface Genre {
    _id: string
    title: string
    description: string
};