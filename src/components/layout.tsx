/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Navbar from "./navbar"

const Layout = ({ children }: { children: ReactNode }) => {
  const data = useStaticQuery(graphql`
      query SiteTitleQuery {
          site {
              siteMetadata {
                  title
              }
          }
      }
  `)

    return (
        <>
            <Navbar/>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960
                }}
            >
                <main>{children}</main>
                <footer>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </div>
        </>
    )
}

export default Layout
