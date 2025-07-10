export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="text-primary">Season Three</h1>
      <div>{children}</div>
    </>
  );
}
