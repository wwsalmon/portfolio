const path = require("path")

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const postTemplate = path.resolve("src/templates/blog-post.tsx")
  return graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    timeToRead
                    excerpt
                    fileAbsolutePath
                    frontmatter {
                        date
                        title
                    }
                }
            }
        }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    for (const node of res.data.allMarkdownRemark.edges) {
      const absolutePathSplit = node.node.fileAbsolutePath.split("/");
      const fileName = absolutePathSplit[absolutePathSplit.length - 1].split(".")[0]
      const relativePath = absolutePathSplit[absolutePathSplit.length - 2]
        + "/" + fileName;
      createPage({
        path: relativePath,
        context: {
          regex: "/" + relativePath + "/",
        },
        component: postTemplate
      })
    }
  })
}