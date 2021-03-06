import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import MostRecent from "../components/mostRecent"
import Postcard from "../components/postcard"
import feedStyles from "../components/postsFeed.module.css"
import { log } from "util";

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
    
    if (props.country == "") {
      /*if (index === 0) {
        return (
          <div className={feedStyles.mostRecent}>
              <h1 className={feedStyles.mostRecentTitle}> Most Recent </h1>
              <MostRecent url={node.fields.slug} id={node.frontmatter.videoID} title={node.frontmatter.title} startVideo={(id, time) => props.startFloat(id, time)} dat={node.frontmatter.date} artist={node.frontmatter.artist} html={node.html} ex={node.frontmatter.excerpt}/>
              <h1 className={feedStyles.mostRecentTitle}> Other Songs </h1>
          </div>
        )
      }
      else{*/
        return (
          <Postcard url={node.fields.slug} id={node.frontmatter.videoID} title={node.frontmatter.title} startVideo={(id, time) => props.startFloat(id, time)} dat={node.frontmatter.date} artist={node.frontmatter.artist} html={node.html} />
        )
      //}
    }
    else if (node.frontmatter.title == props.country) {
      //console.log("supp");    
      return (
        <Postcard url={node.fields.slug} id={node.frontmatter.videoID} title={node.frontmatter.title} startVideo={(id, time) => props.startFloat(id, time)} dat={node.frontmatter.date} artist={node.frontmatter.artist} html={node.html} />
      )
    }
    else if (node.frontmatter.title != props.country) {
      countNoSongs++;
      //console.log("countNoSongs",countNoSongs);
    }

    if (countNoSongs == data.allMarkdownRemark.edges.length) {
      noSongs = true;
    }
  })

  if(noSongs==false){
    return (
      <div className={feedStyles.feed}>
        {postcards}
      </div>
    )
  }
  else{
    return(
    <div className={feedStyles.feed}>
        <p>No songs yet...</p>
    </div>)
  }

  
}