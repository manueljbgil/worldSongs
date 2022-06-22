import { React, useEffect, useRef, useState } from "react"
import * as postcardStyles from "./postcard.module.css"
import { Link } from "gatsby"
import YouTube from 'react-youtube';

export default function PostCard(props) {

    const [player, setPlayer] = useState(null)
    const [isOffScreen, setIsOffScreen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const iframeRef = useRef();
/*     const opts = {
        height: '225',
        width: '100%',
    } */

    const opts = {
        height: '200',
        width: '403',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    // it runs after every render of the component
    useEffect(() => { 
        
        if(!isOffScreen && isPlaying){
            console.log(player.getCurrentTime());
            props.startVideo(props.id,player.getCurrentTime());
            player.pauseVideo()
           
            //to not load again
            setIsPlaying(false);
        }
    },[isPlaying, isOffScreen, player])

    const _onPlay = (event) => {
        setIsPlaying(true);
    }
    const _onReady = (event) => {
        setPlayer(event.target)
        console.log(player);
        
    }

    //checks if is on Sceen
    if(useOnScreen(iframeRef) != isOffScreen){
        setIsOffScreen(!isOffScreen);
    }
    

    return (
        <div className={postcardStyles.cardWrapper}>
            <div ref={iframeRef} >
                <YouTube videoId={props.id} className={postcardStyles.videoWrapper}  opts={opts} onPlay={_onPlay} onReady={_onReady} />
                {/*<div dangerouslySetInnerHTML={{ __html: props.html }} className={postcardStyles.videoWrapper} />*/}
            </div>
            <Link to={props.url}>
                <div className={postcardStyles.infoWrapper}>
                    <h4>
                        {props.title}
                    </h4>
                    <p>
                        {props.artist}
                    </p>
                    <p>
                    {props.dat}
                    </p>
                </div>
            </Link>
        </div>
    )
}

//função para verificar se elemento está no ecrã (ver docs de INTERESECTION_OBSERVER)
const useOnScreen = (ref, rootMargin = '0px') => {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return isIntersecting;

}
