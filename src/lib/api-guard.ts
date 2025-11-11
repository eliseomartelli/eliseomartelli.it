import { NextResponse } from "next/server";

export function withApiGuard(
  handler: (req: Request) => Promise<NextResponse<unknown> | Response>,
) {
  const IS_API_ENABLED = process.env.API_ENABLED === "true";

  return async function (req: Request) {
    if (!IS_API_ENABLED) {
      return NextResponse.json({ message: "API is disabled" }, { status: 503 });
    }

    return await handler(req);
  };
}
