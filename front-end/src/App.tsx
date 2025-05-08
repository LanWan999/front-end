import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Navbar from "./components/navbar/NavBar"
import HomePage from "./pages/homePage/HomePage"

import BooksPage from "./pages/books/BooksPage"
import BookPage from "./pages/books/BookPage"

import AdminPage from "./pages/adminPage/AdminPage"
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
import { BooksProvider } from "./contexts/BookContext"
import CapybarasPage from "./pages/capybaras/CapybarasPage"
import CapybaraPage from "./pages/capybaras/CapybaraPage"
import UserPage from "./pages/users/UserPage"
import UserList from "./components/Users/UserList"
import ContactsPage from "./pages/contacts/ContactsPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"




function App() {

  return (
    <AuthProvider>
      <CartPageContextProvider>
        <BooksProvider>
        <DessertsPageContextProvider>
          <DrinksPageContextProvider>
            <BrowserRouter>
            <div className="app-layout">
              <Navbar />
              <main className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contacts" element={<ContactsPage />} />

                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/books/:id" element={<BookPage />} />

                  <Route path="/capybaras" element={<CapybarasPage />} />
                  <Route path="/capybaras/:id" element={<CapybaraPage />} />

                  <Route path="/cafe" element={<CafePage />} />
                  
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:id" element={<UserPage />} />

                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </main>
              <Footer />
              <ToastContainer />
            </div>
            </BrowserRouter>
          </DrinksPageContextProvider>
        </DessertsPageContextProvider>
        </BooksProvider>
      </CartPageContextProvider>
    </AuthProvider>
  )
}

export default App
