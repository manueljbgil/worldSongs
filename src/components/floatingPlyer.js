import {React, useEffect} from "react"
import { css } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"
import { BsFillXSquareFill } from "@react-icons/all-files/bs/BsFillXSquareFill";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import YouTube from 'react-youtube';

export default function FloatingPlayer(props) {

    useEffect(()=>{

    },[])

    const _onReady = (event) =>{
        event.target.seekTo(props.time,true)
        event.target.playVideo();
    }

    return (
        <div className="floatingPlayer">
            <div className="videoWrapper">
                <YouTube videoId={props.meta}  onReady={_onReady} />
                {/* <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+ props.meta + " "} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            </div>
            <div className="closeFloatingPlayer">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => props.onClick(false)} width="16" height="16" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
            </div>
           
        </div>
    )
}
