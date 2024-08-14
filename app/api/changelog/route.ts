import { NextResponse } from "next/server";
import {
  getGoogleSpreadsheet,
  GkSystemSheets,
  GoogleSpreadsheets,
} from "@/app/data/google-sheets";
import { ChangelogV4 } from "./type";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const googleSpreadsheet = await getGoogleSpreadsheet(
    GoogleSpreadsheets.GkSystem
  );

  const sheet = googleSpreadsheet.sheetsById[GkSystemSheets.v4Changelog];
  const rows = await sheet.getRows<ChangelogV4>();
  const data = rows.map((row) => {
    return {
      date: row.get("date"),
      detail: row.get("detail"),
      version: row.get("version"),
    };
  });

  return NextResponse.json(data);
}
