import React, { useEffect } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import d3 from "d3";

export default function IndexPage() {
    useEffect(() => {

    })

    return (
        <Layout>
            <SEO title="Home"/>
            <h1 className="heading">Hi, my name is Samson Zhang. <br className="hidden block-sm"/>I love building things
                and telling stories.</h1>
            <p className="my-8 font-lg">I'm an incoming CS major at Georgia Tech and a developer, designer, and
                entrepreneur, with interests in AI/ML and quantum computing (and everything else floating around the
                screen 😊).</p>
        </Layout>
    )
}
