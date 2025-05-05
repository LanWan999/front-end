import { NavLink } from "react-router-dom"
import styles from "./Footer.module.scss"


const Footer = () => {
    return(
        <div >
            <div >
                <div>
                    <NavLink to="/home">
                        <img src="/logo.png" alt="logo" className={styles.logo}/>
                    </NavLink>
                </div>
                <div >
                    <a href="https://facebook.com" target="_blank" >
                        <img src="https://cdn-icons-png.flaticon.com/512/20/20673.png" alt="Facebook icon" className={styles.socialMediaIcon}/>
                    </a>
                    <a href="https://instagram.com" target="_blank" >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Instagram icon" className={styles.socialMediaIcon}/>
                    </a>
                    <a href="https://tiktok.com" target="_blank" >
                        <img src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png" alt="TikTok icon" className={styles.socialMediaIcon}/>
                    </a>
                </div>
            </div>
            <div>
                <p >© Copyright 2025 Capy Bookshop. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer