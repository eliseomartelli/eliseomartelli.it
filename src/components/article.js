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
                    <p>{articleDate} - 🕒
                        <i>
                            {articleTime} minute{(articleTime == 1) ? "" : "s"} read
                        </i>
                    </p>
                    <p>{articleExcerpt}</p>
                </div>
            </Link>
        )
}

export default Article;