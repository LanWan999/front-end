import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './NavBar.module.scss'
import { useCart } from '../../contexts/CartContext';
import { useEffect } from 'react';


const Navbar: React.FC = () => {

  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const { mergeGuestCartOnLogin } = useCart()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token) {
      mergeGuestCartOnLogin(token); 
    }
  }, [user]);

  const handleLogout = () => {
    logout();           
    navigate('/login'); 
  };

  const goToUserPage = () => {
    if (user) {
      navigate(`/users/${user._id}`);
    }
  };


  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLogo}>
        <img src="/logo.png" alt="logo"  style={{width: "60px"}}/>
        <div>Capy Bookshop</div>
      </Link>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/books" className={styles.navLink}>Books</Link>
        <Link to="/cafe" className={styles.navLink}>Cafe</Link>
        <Link to="/capybaras" className={styles.navLink}>Capybaras</Link>
        <Link to="/contacts" className={styles.navLink}>Contacts</Link>

      </div>
      <div className={styles.navLinks}>
        {isAdmin && <Link to="/admin" className={styles.navLink}>Admin Page</Link>}

        {!user ? (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
          </>
        ) : (
          <>
            <Link to={`/users/${user._id}`} className={styles.navLink} onClick={goToUserPage}>Welcome, {user.username} !</Link>
            <button className={styles.navButton} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
      <Link to="/cart">
          <img src="/cartImage.png" alt="cart image"  style={{width: "20px"}}/>
      </Link>
    </nav>
  );
};

export default Navbar;
