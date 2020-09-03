import React, { useEffect, useRef } from "react"
import { Link } from "gatsby";
import useResizeAware from 'react-resize-aware';

import Layout from "../components/layout";
import SEO from "../components/seo";
import * as d3 from "d3";
import wordCloud from "../../content/wordcloud.json";

export default function IndexPage() {
    const svgRef: any = useRef<HTMLDivElement>(null);
    const [resizeListener, sizes] = useResizeAware();

    useEffect(() => {
       const svg: any = d3.select("#wordCloud");
       const width = svgRef.current.clientWidth;
       const height = svgRef.current.clientHeight;

       console.log(sizes.width, sizes.height);

       const nodes = [...wordCloud.items.map(x => ({
           name: x.name
       })), {name: "center"}];

       // const links = wordCloud.items.map(x => ({
       //     source: "center",
       //     target: x.name
       // }));

       // console.log(nodes, links);

       const simulation = d3.forceSimulation(nodes)
           // .force("link", d3.forceLink(links).id((d: any) => d.name))
           .force("charge", d3.forceManyBody()
               .strength(-100))
           .force("center", d3.forceCenter(width / 2, height / 2))
           .on("tick", ticked);

       const node = svg.selectAll("text")
           .data(nodes)
           .join(
               function(enter: any) {
                   return enter.append("text")
                       .text((d: any) => d.name === "center" ? "" : d.name)
                       .attr("class", "wordcloud opacity-25")
                       .attr("alignment-baseline", "center")
                       .attr("text-anchor", "middle")
               }
           );


       function ticked() {
            node.attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
       }
    }, [sizes.width, sizes.height]);

    return (
        <Layout>
            <SEO title="Home"/>
            <div className="relative w-full">
                {resizeListener}
            </div>
            <svg id="wordCloud" className="absolute w-full z-0" style={{
                top: 0,
                left: 0,
                height: 800,
            }} ref={svgRef}>
            </svg>
            <div className="container-small z-10 relative">
                <h1 className="heading">Hi, my name is Samson Zhang. <br className="hidden block-sm"/>I love building things
                    and telling stories.</h1>
                <p className="my-8 font-lg">I'm an incoming CS major at Georgia Tech and a developer, designer, and
                    entrepreneur, with interests in AI/ML and quantum computing (and everything else floating around the
                    screen 😊).</p>
            </div>
        </Layout>
    )
}
