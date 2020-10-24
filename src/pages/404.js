import React, { Component } from "react"
import App from "../components/App"
import { Browser } from "react-kawaii"
import Seo from "../components/Seo"

export default class NotFound extends Component {
  render() {
    return (
      <App>
        <Seo title="404" />
        <div
          style={{
            display: "flex",
            height: "45vh",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 128,
          }}
        >
          <h1>404: Not Found</h1>
          <Browser size={150} mood="sad" color="var(--primary)" />
          <p>The page you are looking for does not exist.</p>
        </div>
      </App>
    )
  }
}
