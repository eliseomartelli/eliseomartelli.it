export declare type FediWebfinger = {
  subject: string;
  links: [
    {
      rel: "self";
      type: "application/activity+json";
      href: string;
    }
  ];
};
