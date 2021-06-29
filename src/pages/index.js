import { Link } from "gatsby"
import { graphql } from "gatsby"
import Container from "../components/container"
import WorldMap from "../components/worldMap"
import Posts from "../components/postsFeed"
import FloatingPlayer from "../components/floatingPlyer"
import React, { useRef, useEffect, useState, prevState, useCallback } from "react"
import { useForm } from "react-hook-form";
import "@fontsource/cuprum";
import "@fontsource/amatic-sc";

export default function Home({ data }) {

  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode:'onSubmit'
  });
  const [country, setCountry] = useState({
    name:"",
    numSongs:0
  });
  const [floatingPlayer, setFloatingPayer] = useState(false);
  const [floatVideoID, setFloatVideoID] = useState('');
  const [videoTime, setVideoTime] = useState(0);
  
  const onSubmit = (data) => {
    setCountry(prevState => ({name:data.exampleRequired, numSongs: prevState.numSongs}));
  }
  console.log("sdd",watch("exampleRequired")); // watch input value by passing the name of it  

  const passVideoID = (id,time) =>{
    setFloatingPayer(true);
    setFloatVideoID(id);
    setVideoTime(time);
  }


  const FloatP = useCallback(() => {
    return( floatingPlayer ? <FloatingPlayer meta={floatVideoID} time={videoTime} onClick={(close) => setFloatingPayer(close)} /> : null );
  },[floatingPlayer,floatVideoID, videoTime])
  
  return (
    <Container>
      <div className="top-banner">
        { <div className={(country.name != "") ? "site-title-wrapper-active" : "site-title-wrapper"}>
          <h1 className="site-title-country">{(country.name != "" ? country.name : "World Wide FM" )}</h1>
          <h4 className="site-title-songs">{(country.name != "" ? country.numSongs + " Songs" : " "  )}</h4>
        </div> }
        <WorldMap country={country.name} onChangeCountry={(countryName,countryNumOfSongs) => setCountry({name:countryName,numSongs:countryNumOfSongs})}/>
        <div className={(country.name != "") ? "search-Wrapper-active" : "search-Wrapper-notActive"}></div>
        <div className="search-Wrapper">
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* include validation with required or other standard HTML validation rules */}
            <input name="exampleRequired" defaultValue="" placeholder="search for a country"  ref={register} className="search-country"/>
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <p>This field is required</p>}
          </form>
        </div>
      </div>
      {/* pass country name*/} 
      <Posts country={country.name} startFloat={(id,time) => passVideoID(id,time)}/>
      <FloatP />
    </Container>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields{
            slug
          }
          frontmatter {
            title
            date
          }
          excerpt
          html
        }
      }
    }
  }
`
