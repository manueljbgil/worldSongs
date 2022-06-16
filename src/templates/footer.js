import React from "react"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import footerStyles from "./footer.module.css"



export default function Footer({ children }) {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                siteMetadata {
                    title
                }
                }
            }
        `
    )
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
