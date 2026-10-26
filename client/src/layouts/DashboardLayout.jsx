import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="ml-64 min-h-screen">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
