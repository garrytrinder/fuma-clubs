import options from "@/options";
import { MainLayout } from "@premieroctet/next-admin/adapters/next";
import { getMainLayoutProps } from "@premieroctet/next-admin/appRouter";
import Dashboard from "./dashboard";

const CustomPage = async () => {
  const mainLayoutProps = await getMainLayoutProps({
    basePath: "/admin",
    apiBasePath: "/api/admin",
    options,
  });

  return (
    <MainLayout {...mainLayoutProps}>
      <Dashboard />
    </MainLayout>
  );
};

export default CustomPage;
