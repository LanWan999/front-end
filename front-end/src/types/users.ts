export interface User {
    _id: string;
    name?: string;
    surname?: string;
    username: string;
    email: string;
    password?: string;
    age?: number;
    bio?: string;
    avatar?: string;
    role?: 'USER' | 'ADMIN';
    favoriteDessert?: {
        _id?: string;
        name: string;
        price: number;
        image: string;
        description: string;
    };
    favoriteDrink?: {
        _id?: string;
        name: string;
        price: number;
        image: string;
        description: string;
    };
}
  