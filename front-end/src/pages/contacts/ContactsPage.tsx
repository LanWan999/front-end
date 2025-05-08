import React from 'react';
import styles from '../contacts/ContactsPage.module.scss'

const ContactsPage: React.FC = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <div className={styles.address}>
          <h2>Address</h2>
          <p>123 Bookshop St, Booktown, BK 12345</p>
        </div>
        <div className={styles.email}>
          <h2>Email</h2>
          <p>contact@bookshop.com</p>
        </div>
        <div className={styles.phone}>
          <h2>Phone</h2>
          <p>+378 256 235</p>
        </div>
      </div>

      <div className={styles.map}>
        <h2>Find Us Here:</h2>
        <div className={styles.mapEmbed}>
          <iframe
            title="Bookshop Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5074%2C-0.1276%2C51.5074&amp;layer=mapnik&amp;marker=51.5074%2C-0.1276"
            allowFullScreen
          ></iframe>
        </div>
      </div>



    </div>
  );
};

export default ContactsPage;
