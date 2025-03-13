import { NextResponse } from "next/server";
import { contactService } from "@/app/api/contact/common";
import { Contact } from "@/types/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Contact.parse(body);
    await contactService.sendContact(parsed);
    return NextResponse.json("Sent", { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
