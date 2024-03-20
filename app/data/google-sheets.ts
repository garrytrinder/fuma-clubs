import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function getGoogleSpreadsheet(): Promise<GoogleSpreadsheet> {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID || "",
    serviceAccountAuth
  );
  await doc.loadInfo();
  return doc;
}

export enum SheetIds {
  Players = "724675989",
  Teams = "1090915850",
  Table = "765264264",
  ScoresFixtures = "2098181175",
  HallOfFame = "491937758",
}
