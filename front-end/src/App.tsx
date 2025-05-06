import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/NavBar"
import HomePage from "./pages/HomePage"

import BooksPage from "./pages/books/BooksPage"
import BookPage from "./pages/books/BookPage"

import AdminPage from "./pages/AdminPage"
import LoginPage from "./pages/users/LoginPage"
import RegisterPage from "./pages/users/RegisterPage"
import AdminRoute from "./components/AdminRoute"
import { AuthProvider } from "./contexts/AuthContext"
import CartPage from "./pages/cart/CartPage"
import { CartPageContextProvider } from "./contexts/CartContext"
import Footer from "./components/footer/Footer"
import CafePage from "./pages/cafe/CafePage"
import { DessertsPageContextProvider } from "./contexts/DessertContext"
import { DrinksPageContextProvider } from "./contexts/DrinkContext"




function App() {

  return (
    <AuthProvider>
      <CartPageContextProvider>
        <DessertsPageContextProvider>
          <DrinksPageContextProvider>
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:id" element={<BookPage />} />

                <Route path="/cafe" element={<CafePage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

                <Route path="/cart" element={<CartPage />} />

              </Routes>
              <Footer />
            </BrowserRouter>
          </DrinksPageContextProvider>
        </DessertsPageContextProvider>
      </CartPageContextProvider>
    </AuthProvider>
  )
}

export default App
