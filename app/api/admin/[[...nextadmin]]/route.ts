import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import options from "@/options";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import { NextResponse } from "next/server";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  options,
  onRequest: async (req) => {
    const session = await auth();
    if (!session?.user.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  },
});

export { run as DELETE, run as GET, run as POST };
