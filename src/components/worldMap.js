import React, { useRef, useEffect, useState } from "react"

//d3
import { select, geoPath, geoMercator, geoOrthographic, scaleLinear, min, max, zoom, zoomTransform } from 'd3'


//worldMap GeoJSON data
import data from "../utils/custom.geo.json"

import "./worldMap.module.css"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

export default function WorldMap(props) {

    const svgRef = useRef();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [song, setSong] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {

        const svg = select(svgRef.current); 

        if(props.country==""){
            setSelectedCountry(null)
        }
        for (let index = 0; index < data.features.length; index++) {
            if(data.features[index].properties.name === props.country){
                //toDo: transform first letter to capital letter
                setSelectedCountry(data.features[index])
            }
        }

        
        const colorScale = scaleLinear().domain([0,5]).range(["cadetblue","#B0DE13"]);
        const projection = geoMercator()
            .fitSize([window.innerWidth,window.innerHeight*0.6], selectedCountry || data)
            .precision(100);
        const pathGenerator = geoPath().projection(projection);


        let feat = svg.selectAll(".country").data(data.features)
        .join(
            enter => enter.append("path")
        )
        .on("click", (e,feature) => {
            props.onChangeCountry((selectedCountry === feature ? "" : feature.properties.name), 0)
        })
        .transition()
        .duration(2000)
        .attr("class","country")
        .attr("fill", feature => colorScale(feature.properties.numSongs))
        .attr("d", feature => pathGenerator(feature))

        // const zoomBehaviour = zoom().scaleExtent([0.5,5]).translateExtent([[0,0],[window.innerWidth,window.innerHeight]]).on("zoom",()=>{
        //     //console.log("zooomedd");
        // })
        //svg.call(zoomBehaviour)

    }, [data, selectedCountry, song, countryName, rotation, props]); //data

    return (<div className="banner">
                {/* innerWidth e innerHeight responsive */}
                <svg viewBox={"0 0 "+  window.innerWidth + " " + (window.innerHeight*0.6)} ref={svgRef}>
                {/* <g>
                    <text x="9%" y="37%" fontFamily="Roboto" fontSize="28" fill="cadetblue">{info}</text>
                    <text x="13.5%" y="49%" fontFamily="Roboto" fontSize="35" fill="cadetblue">{data.countries}</text>

                    <text x="81%" y="37%" fontFamily="Roboto" fontSize="28" fill="cadetblue">Songs</text>
                    <text x="83.5%" y="49%" fontFamily="Roboto" fontSize="35" fill="cadetblue">{data.numSongs}</text>
                </g> */}
                </svg>
            </div>);
}