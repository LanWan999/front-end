import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './NavBar.module.scss'


const Navbar: React.FC = () => {

  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           
    navigate('/login'); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/books" className={styles.navLink}>Books</Link>
        {/* <Link to="/capybaras">Capybaras</Link> */}
        {/* <Link to="/merch">Merch</Link> */}
        {/* <Link to="/cafe">Cafe</Link> */}
        {isAdmin && <Link to="/admin" className={styles.navLink}>Admin Page</Link>}

        {!user ? (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
          </>
        ) : (
          <>
            <Link to={`/users/${user._id || user.id}` } className={styles.navLink}>Welcome, {user.username}</Link>
            <button className={styles.navButton} onClick={handleLogout}>Logout</button>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/users" className={styles.navLink}>Users</Link>
            <Link to="/admin/panel" className={styles.navLink}>Admin Panel</Link>
          </>
        )}  
      </div>
    </nav>
  );
};

export default Navbar;
