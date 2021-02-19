import React from "react"
import Container from "../components/container"
import AboutStyles from "./about.module.css"

const User = props => (
    <div className={AboutStyles.user}>
        <img src={props.avatar} className={AboutStyles.avatar} alt=""/>
    </div>
)

export default function About(){
    return(
        <Container>
            <h2>yooo</h2>
            <User avatar="https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/tutorial/part-two/pexels-daniel-xavier-1102341.jpg"/>
            <p>its me, Manel!</p>
        </Container>
    )
}