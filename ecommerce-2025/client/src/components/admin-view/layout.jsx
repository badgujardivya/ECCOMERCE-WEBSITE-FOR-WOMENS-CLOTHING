import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Add pt-16 here to prevent content from going under fixed header */}
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
