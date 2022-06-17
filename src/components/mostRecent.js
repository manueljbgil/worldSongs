import { React, useEffect, useRef, useState } from "react"
import MostRecentStyles from "./mostRecent.module.css"
import { Link } from "gatsby"
import YouTube from 'react-youtube';

export default function MostRecent(props) {

    const [player, setPlayer] = useState(null)
    const [isOffScreen, setIsOffScreen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const iframeRef = useRef();
    /* const opts = {
        height: '225',
        width: '100%',
    } */

    // it runs after every render of the component
    useEffect(() => { 
        
        if(!isOffScreen && isPlaying){
            console.log(player.getCurrentTime());
            props.startVideo(props.id,player.getCurrentTime());
            player.pauseVideo()
        }
    },[isPlaying, isOffScreen, player])

    const _onPlay = (event) => {
        setIsPlaying(true);
    }
    const _onReady = (event) => {
        setPlayer(event.target)
        console.log(player);
        
    }

    //checks if is on Screen
    if(useOnScreen(iframeRef) != isOffScreen){
        setIsOffScreen(!isOffScreen);
    }
    

    return (
        <div className={MostRecentStyles.cardWrapper}>
            <div ref={iframeRef} className={MostRecentStyles.first} >
                <YouTube videoId={props.id} containerClassName={MostRecentStyles.videoWrapper} onPlay={_onPlay} onReady={_onReady} />
                {/*<div dangerouslySetInnerHTML={{ __html: props.html }} className={postcardStyles.videoWrapper} />*/}
            </div>
            <Link to={props.url}>
                <div className={MostRecentStyles.infoWrapper}>
                    <h4 className={MostRecentStyles.titleFirst}>
                        {props.title} - {props.artist}
                    </h4>
                    <p className={MostRecentStyles.dateFirst}>
                        {props.dat}
                    </p>
                    <p className={MostRecentStyles.dateFirst}>
                        {props.ex}
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