export declare type FediOutbox = {
  "@context": string;
  id: string;
  type: string;
  first?: string;
  next?: string;
  prev?: string;
  partOf?: string;
  orderedItems?: {
    id?: string;
    type?: string;
    actor?: string;
    published?: string;
    to?: string[];
    cc?: string[];
    object?: string;
    name?: string;
    content?: string;
  }[];
};
