import { React, useRef} from "react"
import { graphql } from "gatsby"
import * as postStyles from "./post.module.css"
import Container from "../components/container"
import Posts from "../components/postsFeed"
import YouTube from 'react-youtube';


export default function BlogPost({ data }) {
  
  const iframeRef = useRef();
  const post = data.markdownRemark;
  console.log(post);
  
  const passVideoID = (id, time) =>{
    console.log("function passVideoID not working on songPost");
  }

  return (
    <Container>
      <div className={postStyles.post}>
        <h1 className={postStyles.postTitle} >{post.frontmatter.title}</h1>
        <div ref={iframeRef} >
                <YouTube videoId={post.frontmatter.videoID}/>
                {/*<div dangerouslySetInnerHTML={{ __html: props.html }} className={postcardStyles.videoWrapper} />*/}
        </div>
        <div className={postStyles.content}>
          <h1>{post.frontmatter.artist}</h1>
          <h4><span>{post.frontmatter.date}</span></h4>
          <p>{post.frontmatter.excerpt}</p>
          <h3 className={postStyles.more}>More from {post.frontmatter.title}</h3>
        </div>
        <div className={postStyles.others}>
          <Posts country={post.frontmatter.title} startFloat={(id,time) => passVideoID(id,time)}/>
        </div>
      </div>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        artist
        title
        videoID
        excerpt
      }
    }
  }
`