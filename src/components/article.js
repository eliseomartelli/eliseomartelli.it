import React from "react"
import { Link } from "gatsby"


const Article = (
    {
        articleName,
        articleExcerpt,
        articleDate,
        articleTime,
        articleSlug
    }) => {
        const time = (articleTime == 1) ?"minute" : "minutes"
        return (
            <Link
                to={articleSlug}
                style={{
                    textDecoration: `none`,
                    color: `black`,
                    marginBottom: `16px`
                }}>
                <div>
                    <h1>{articleName}</h1>
                    <p>{articleDate} - 🕒 <i>{articleTime} {time} read</i></p>
                    <p>{articleExcerpt}</p>
                </div>
            </Link>
        )
}

export default Article;