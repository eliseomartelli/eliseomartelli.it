export declare type FediActor = {
  "@context": string[];
  id: string;
  type: string;
  preferredUsername: string;
  inbox: string;
  outbox: string;
  publicKey: {
    id: string;
    owner: string;
    publicKeyPem: string;
  };
};
