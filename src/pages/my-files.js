import React from "react"
import { Link } from "gatsby"
import {graphql} from "gatsby"
import myFilesStyles from "./my-files.module.css"
import Container from "../components/container"

export default function MyFiles({data}) {
    console.log(data);

    return (
        <Container>
            <table className={myFilesStyles.table}>
                <thead>
                    <tr>
                        <th>country</th>
                        <th>artist</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allMarkdownRemark.edges.map(({node},index) => (
                        <tr key={index}>
                            <td>{node.frontmatter.title}</td>
                            <td>{node.frontmatter.artist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
    
}

export const query = graphql`
    query{
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        artist
                    }
                }
            }
        }
    }`