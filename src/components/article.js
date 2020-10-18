import React from "react"
import { Link } from "gatsby"


const Article = (
    {
        articleName,
        articleExcerpt,
        articleDate}
    ) => (
    <Link
        to="/page-2"
        style={{
            textDecoration: `none`,
            color: `black`,
            marginTop: `16px`
        }}>
        <div>
            <h1>{articleName}</h1>
            <span>{articleDate}</span>
            <p>{articleExcerpt}</p>
        </div>
    </Link>
)

export default Article;