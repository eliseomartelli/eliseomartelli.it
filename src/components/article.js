import React from "react"
import { Link } from "gatsby"


const Article = (
    {
        articleName,
        articleExcerpt,
        articleDate,
        articleTime
    }) => (
    <Link
        to="/page-2"
        style={{
            textDecoration: `none`,
            color: `black`,
            marginBottom: `16px`
        }}>
        <div>
            <h1>{articleName}</h1>
            <span>{articleDate} - <i>{articleTime} minute read.</i></span>
            <p>{articleExcerpt}</p>
        </div>
    </Link>
)

export default Article;