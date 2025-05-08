import React from 'react'; 
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div>
        <h1 className={styles.shopTitle}>Welcome to Capy Bookshop</h1>
        <p>
          Our cozy little world where books, coffee, and capybaras come together in perfect harmony. We’re a small, independent bookshop and café with a soft spot for good stories, warm drinks, and the gentle company of our resident capybaras. Whether you're here to browse our handpicked selection, relax with a cup of coffee, or share a peaceful moment with one of our furry friends, we’ve created a space where you can slow down, breathe, and feel at home.
        </p>
      </div>

      <div className={styles.homePageBooksSection}>
        <h2>Books!</h2>
        <div className={styles.sectionContent}>
          <ul>
            <li>In our book section, you’ll find a thoughtfully curated collection of titles ranging from contemporary fiction and timeless classics to inspiring non-fiction and hidden indie gems.</li>
            <li>Guests are welcome to browse, pick out a book that catches their eye, and either take it home or settle in and read right here.</li>
            <li>Whether you prefer a quiet corner inside, surrounded by shelves and soft lighting, or a peaceful seat outside with the capybaras nearby, we’ve created a space where stories can be savored slowly and comfortably.</li>
          </ul>
          <img src="/bookshop.jpg" alt="bookshop" className={styles.homePageImg}/>
        </div>
      </div>

      <div className={styles.homePageCafeSection}>
        <h2>Dessert?</h2>
        <div className={styles.sectionContent}>
          <ul>
            <li>Our cozy café is here to sweeten your reading experience.</li>
            <li>We serve a selection of homemade desserts, light snacks, and freshly brewed drinks — from rich coffees and herbal teas to refreshing cold brews and seasonal specialties.</li>
            <li>Whether you're diving into a new novel or just pausing for a quiet moment, there’s always something comforting on the menu.</li>
            <li>Feel free to enjoy your treat indoors among the books or outside with a capybara companion by your side. It’s all part of the slow, easygoing rhythm we love at Capy Bookshop.</li>
          </ul>
          <img src="/cafe.jpg" alt="cafe" className={styles.homePageImg}/>
        </div>
      </div>

      <div className={styles.homePageCapybarasSection}>
        <h2>Friends~</h2>
        <div className={styles.sectionContent}>
          <ul>
            <li>Our resident capybaras are more than just adorable – they’re an integral part of the Capy Bookshop experience!</li>
            <li>These gentle, curious creatures roam freely around the shop, adding an extra layer of calm and charm to the space.</li>
            <li>Whether they’re lounging by the café or quietly observing you from a cozy nook, their peaceful presence invites you to slow down and enjoy the moment. Feel free to interact with them, but remember, they’re happiest when allowed to approach at their own pace.</li>
          </ul>
          <img src="/capybaraRelaxing.webp" alt="Capybara relaxing" className={styles.homePageImg}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;