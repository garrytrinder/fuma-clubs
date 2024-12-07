import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function getGoogleSpreadsheet(
  sheetId: GoogleSpreadsheets
): Promise<GoogleSpreadsheet> {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(sheetId || "", serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

export enum GoogleSpreadsheets {
  ManualProLeague = "1V2ooEhHbtywHP0X_Ffy16EMTgUyw_DRfHbUOlzuJMRc",
  PostResults = "1uLVYXob4gx4GYVAw0Gkco5_hCc6ZedAdJ9Q3Gw5RcG0",
  GkSystem = "1opkcUhFrNai3K1FY6nxYXV4GWDI0D_DrBwqxnmvm-8w",
  PreseasonSummer24 = "1Lf1k594LSR_eMU_ZBEAYD4Fw5TqVU2ZHP7ZhqoSkM0k",
}

export enum GoogleSheets {
  HallOfFame = "491937758",
  Overall = "1200680596",
  Players = "724675989",
  ScoresFixtures = "2098181175",
  Table = "765264264",
  Teams = "1090915850",
}

export enum GkSystemSheets {
  Base = "0",
  Profiles = "2021171954",
  PlayStyles = "126548641",
  v4 = "250967509",
  v4Changelog = "1287968148",
}

export enum PreseasonSummer24Sheets {
  Table = "0",
}
