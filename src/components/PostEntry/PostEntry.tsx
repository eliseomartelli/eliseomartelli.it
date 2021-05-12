import * as React from "react";

import { Link } from "gatsby";

type PostEntryProps = {
  title: string;
  date: string;
  excerpt: string;
  timeToRead?: number;
  url: string;
};

export class PostEntry extends React.Component<PostEntryProps> {
  render() {
    return (
      <Link to={this.props.url}>
        <h1>{this.props.title}</h1>
        <p className="text-sm pb-3">
          {this.props.date} <TimeToRead {...this.props} />
        </p>
        <p>{this.props.excerpt}</p>
      </Link>
    );
  }
}

type TimeToReadProps = {
  timeToRead?: number;
};

class TimeToRead extends React.Component<TimeToReadProps> {
  render() {
    if (!this.props.timeToRead) return <></>;
    return (
      <>
        - 🕒{" "}
        <i>
          {this.props.timeToRead} {this.getTimeUnit()} read
        </i>
      </>
    );
  }

  getTimeUnit() {
    return this.props.timeToRead === 1 ? "minute" : "minutes";
  }
}
