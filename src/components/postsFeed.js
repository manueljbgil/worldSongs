import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Postcard from "../components/postcard"
import * as feedStyles from "../components/postsFeed.module.css"

export default function PostsFeed(props) {

  var noSongs = false;
  var countNoSongs = 0;

  const data = useStaticQuery(
    graphql`
    query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            node {
              fields{
                slug
              }
              frontmatter {
                title
                date (formatString: "DD MMMM, YYYY")
                artist
                videoID
                excerpt
              }
              html
            }
          }
        }
      }
    `
  )

  const postcards = data.allMarkdownRemark.edges.map(({ node }, index) => {

    if (props.country === "") {
      return (
        <Postcard url={node.fields.slug} id={node.frontmatter.videoID} title={node.frontmatter.title} startVideo={(id, time) => props.startFloat(id, time)} dat={node.frontmatter.date} artist={node.frontmatter.artist} html={node.html} />
      )
    }
    else if (node.frontmatter.title === props.country) {
      return (
        <Postcard url={node.fields.slug} id={node.frontmatter.videoID} title={node.frontmatter.title} startVideo={(id, time) => props.startFloat(id, time)} dat={node.frontmatter.date} artist={node.frontmatter.artist} html={node.html} />
      )
    }
    else if (node.frontmatter.title !== props.country) {
      countNoSongs++;
    }

    if (countNoSongs === data.allMarkdownRemark.edges.length) {
      noSongs = true;
    }
  })

  if (noSongs === false) {
    return (
      <div className={feedStyles.feed}>
        {postcards}
      </div>
    )
  }
  else {
    return (
      <div className={feedStyles.feed}>
        <p>No songs yet...</p>
      </div>)
  }


}