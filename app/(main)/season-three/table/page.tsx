import { prisma } from "@/app/lib/prisma";
import { TableRow, TournamentTable } from "./table";

export default async function Page() {
  const tableData = await prisma.$queryRaw<TableRow[]>`
    SELECT * FROM public.teamstandings_get(p_tournament_id := 3);
    `;

  const tournament = await prisma.tournament.findUnique({
    where: { id: 3 },
  });

  return (
    <>
      <h1 className="text-primary">{tournament?.name}</h1>
      <h2 className="text-secondary">Table</h2>

      <TournamentTable tableData={tableData} />
    </>
  );
}
