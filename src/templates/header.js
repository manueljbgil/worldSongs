import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const ListLink = props => (
    <li>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default function Header({ children }) {
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
        <header>
            <ul>
                <ListLink  to="/">World Wide FM</ListLink>
                <ListLink to="/about/">About {data.site.siteMetadata.title}</ListLink>
                <ListLink to="/my-files/">Countries</ListLink>
            </ul>
        </header>
    )
}
