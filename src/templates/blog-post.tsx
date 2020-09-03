import React from "react"
import Link from "gatsby-link"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function BlogTemplate(props: {
    data: {
        markdownRemark: {
            timeToRead: number,
            html: string,
            frontmatter: {
                date: string,
                title: string,
            },
        }
    }
}) {
    const post = props.data.markdownRemark

    return (
        <Layout>
            <Link to="/blog">All posts</Link>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.html }}/>
        </Layout>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($regex: String!){
        markdownRemark(fileAbsolutePath: {regex: $regex}){
            html
            timeToRead
            frontmatter {
                title
                date
            }
        }
    }
`