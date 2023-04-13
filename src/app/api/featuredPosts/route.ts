import { NextResponse } from "next/server";
import { loadPostsByFile } from "../../../../lib/posts";
import PublicGoogleSheetsParser from "public-google-sheets-parser";

export async function GET(_: Request) {
  const { SPREADSHEET_ID } = process.env;
  const parser = new PublicGoogleSheetsParser(SPREADSHEET_ID);
  const items = await parser.parse();
  return NextResponse.json(
    loadPostsByFile(items.map((item) => item.slug + ".md"))
  );
}
