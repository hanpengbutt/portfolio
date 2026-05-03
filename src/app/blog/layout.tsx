import Header from "@/components/Header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-full min-h-screen grid-cols-[240px_minmax(0,1fr)] grid-rows-[100px_minmax(0,1fr)]">
      <div className="col-span-2 row-start-1">
        <Header />
      </div>
      <main className="col-span-2 row-start-2 overflow-y-auto">{children}</main>
    </div>
  );
}
