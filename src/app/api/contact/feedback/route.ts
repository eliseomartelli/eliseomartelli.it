import { NextResponse } from "next/server";
import { contactService } from "@/app/api/contact/common";
import { Feedback } from "@/types/feedback";
import { withApiGuard } from "@/lib/api-guard";

export const POST = withApiGuard(async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Feedback.parse(body);
    await contactService.sendFeedback(parsed);
    return NextResponse.json("Sent", { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
});
