export interface JwtPayload {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'ADMIN' | 'user' | 'USER'; 
  }
  
export interface AuthContextType {
  user: JwtPayload | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}