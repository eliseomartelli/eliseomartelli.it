import { sshKeys } from "../keys";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { key: string };
  }
) {
  return new Response(sshKeys[params.key] || sshKeys.default);
}
