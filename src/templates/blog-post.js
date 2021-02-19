import React from "react"
import { graphql } from "gatsby"
import postStyles from "./post.module.css"
import Container from "../components/container"


export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <Container>
      <div className={postStyles.post}>
        <h1 className={postStyles.postTitle} >{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <h3>More from {post.frontmatter.title}</h3>
      </div>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`