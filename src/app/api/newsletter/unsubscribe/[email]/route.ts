import { checkEmail } from "@/lib/checkEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { email: string } },
) {
  try {
    if (!checkEmail(params.email)) {
      return NextResponse.json(
        { message: "Email not valid." },
        { status: 422 },
      );
    }
    const exists = await prisma.subscriber.findUnique({
      where: {
        email: params.email,
      },
    });
    if (exists == null) {
      return NextResponse.json(
        { message: "Email not present." },
        { status: 409 },
      );
    }
    await prisma.subscriber.delete({
      where: {
        email: params.email,
      },
    });
    return NextResponse.json({ message: "Unsubscribed." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
