import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import options from "@/options";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import PageLoader from "@premieroctet/next-admin/pageLoader";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  params: Promise<{ nextadmin: string | string[] }>;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  const nextAdminProps = await getNextAdminProps({
    params: (await params).nextadmin,
    searchParams: await searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options,
  });

  return <NextAdmin pageLoader={<PageLoader />} {...nextAdminProps} />;
}
