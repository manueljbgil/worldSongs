import React from "react"
import * as containerStyles from "./container.module.css"
import Header from "../templates/header"
import Footer from "../templates/footer"

export default function Container({ children }) {

    return (
        <div className={containerStyles.container}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
