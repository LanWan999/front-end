export type Review = {
    _id: string
    username: string | { _id: string; username: string } 
    body: string
    favoriteCapybara: string | { _id: string; name: string } 
}
