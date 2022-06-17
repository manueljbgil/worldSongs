import React from "react"
import footerStyles from "./footer.module.css"



export default function Footer({ children }) {
   
    return (
        <div className={footerStyles.footerWrapper}>
            <footer className={footerStyles.footerNav}>
                <div className={footerStyles.social}>
                    <img src={'/github.svg'}  alt="Logo" />
                    <img src={'/twitter.svg'}  alt="Logo" />
                    <img src={'/logotipo-spotify.svg'}  alt="Logo" />
                </div>
            </footer>
            <footer className={footerStyles.footerEnd}>
                <p className={footerStyles.footerText}>© 2021 Copyright - Manuel Gil</p>
            </footer>
        </div>
    )
}
