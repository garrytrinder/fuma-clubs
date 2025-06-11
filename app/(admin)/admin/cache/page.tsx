import options from "@/options";
import { MainLayout } from "@premieroctet/next-admin/adapters/next";
import { getMainLayoutProps } from "@premieroctet/next-admin/appRouter";
import Dashboard from "./dashboard";
import { Suspense } from "react";

const CustomPage = async () => {
  const mainLayoutProps = await getMainLayoutProps({
    basePath: "/admin",
    apiBasePath: "/api/admin",
    options,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainLayout {...mainLayoutProps}>
        <Dashboard />
      </MainLayout>
    </Suspense>
  );
};

export default CustomPage;
