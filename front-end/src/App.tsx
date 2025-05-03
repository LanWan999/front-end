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




function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
