import styles from "./Footer.module.scss"


const Footer = () => {
    return(
        <div className={styles.pageContainer}>
            <div className={styles.footerContainer}>
                <div className={styles.overlay}></div> 
                <div className={styles.contentWrapper}>
                    <div className={styles.logoAndMediaIcons}>
                        <div className={styles.socialMediaIcons}>
                            <a href="https://facebook.com" target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/20/20673.png" alt="Facebook" className={styles.socialMediaIcon}/>
                            </a>
                            <a href="https://instagram.com" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Instagram" className={styles.socialMediaIcon}/>
                            </a>
                            <a href="https://tiktok.com" target="_blank">
                                <img src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png" alt="TikTok" className={styles.socialMediaIcon}/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        <p>© Copyright 2025 Capy Bookshop. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer