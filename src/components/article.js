import React from "react"
import { Link } from "gatsby"
import Time from "../components/time"

const Article = (
    {
        articleName, 
        articleExcerpt,
        articleDate,
        articleTime,
        articleSlug
    }) => {
    return (
        <Link
            to={articleSlug}
            style={{
                textDecoration: `none`,
                color: `black`,
                marginBottom: `16px`
            }}>
            <div>
                <h2
                    style={{
                        color: '#ff384e'
                    }}>
                    {articleName}
                </h2>
                <p>{articleDate} - <Time time={articleTime} />
                </p>
                <p>{articleExcerpt}</p>
            </div>
        </Link>
    )
}

export default Article;