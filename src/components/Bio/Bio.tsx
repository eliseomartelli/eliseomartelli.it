import * as React from "react";

type BioProps = {
  bio: string;
  imageUrl: string;
  socials?: SocialProfile[];
};

type SocialProfile = {
  name: string;
  url: string;
  iconName: string;
};

export class Bio extends React.Component<BioProps> {
  render() {
    let socials;
    if (this.props.socials)
      socials = (
        <ul className="flex flex-row space-x-4">
          {this.props.socials.map((social) => (
            <li>
              <a title={social.name} target="blank" href={social.url}>
                <i className={`text-brand-blue fab ${social.iconName}`} />
              </a>
            </li>
          ))}
        </ul>
      );
    return (
      <div className="block p-8 bg-white shadow-2xl rounded-2xl space-y-4">
        <img
          className="w-16 h-16 h-auto max-w-full rounded-full shadow"
          src={this.props.imageUrl}
          alt="Profile Picture"
        />
        <p dangerouslySetInnerHTML={{ __html: this.props.bio }} />
        {socials}
      </div>
    );
  }
}
