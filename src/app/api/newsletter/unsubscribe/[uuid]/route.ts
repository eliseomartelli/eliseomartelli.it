import { NextResponse } from "next/server";
import { newsletterService } from "../../common";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ uuid: string }> },
) {
  try {
    const { uuid } = await params;
    await newsletterService.removeSubscriber(uuid);
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
