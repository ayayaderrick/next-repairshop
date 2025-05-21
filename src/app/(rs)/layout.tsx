import Header from "@/components/Header";

const RSLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default RSLayout;
