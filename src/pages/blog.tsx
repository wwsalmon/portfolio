import React from "react"
import Link from "gatsby-link"
import Layout from "../components/layout"

export default function BlogPage(props: {
    data: {
        allMarkdownRemark: {
            edges: {
                node: {
                    id: string,
                    timeToRead: number,
                    excerpt: string,
                    frontmatter: {
                        date: string,
                        title: string,
                    },
                }
            }[]
        }
    }
}) {
    return (
        <Layout>
            <h1>Blog</h1>
            {props.data.allMarkdownRemark.edges.map(post => (
                <>
                    <h3>{post.node.frontmatter.title}</h3>
                    <p>{post.node.frontmatter.date}</p>
                </>
            ))}
        </Layout>
    )
}

export const pageQuery = graphql`
    query BlogIndexQuery {
        allMarkdownRemark {
            edges {
                node {
                    id
                    frontmatter {
                        date
                        title
                    }
                    timeToRead
                    excerpt
                }
            }
        }
    }
`