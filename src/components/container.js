import React from "react"
import containerStyles from "./container.module.css"
import Header from "../templates/header"
import Footer from "../templates/footer"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

export default function Container({ children }) {
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
        <div className={containerStyles.container}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
