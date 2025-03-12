import { NewsletterEntry } from "@/types/newsletterentry";
import { NextResponse } from "next/server";
import { newsletterService } from "../common";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NewsletterEntry.parse(body);
    const response = await newsletterService.subscribe(parsed.email);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
